import { Request, Response, NextFunction } from "express"
import { Goal } from "../models/Goal"
import authMiddleware from "../middleware/authMiddleware";
import { GoalRecurrence } from "../models/GoalRecurrence";
import mongoose, { Mongoose } from "mongoose";
const createGoal = async (req: Request, res: Response) => {
  let {
    name,
    valueFinal,
    dateFinal,
    valueRaised,
    valueInitial,
    id_user,
  } = req.body;
  try {
    // authMiddleware(req, res)
    let params = [
      name,
      valueFinal,
      dateFinal,
      valueRaised,
      valueInitial,
      id_user
    ]
    if (Object.values(params).some(e => !e)) {
      return res.status(500).json({ error: "there are empty fields" });
    }
    let dateInitial = new Date()
    let complete = false
    await Goal.create({
      name,
      valueFinal,
      dateFinal,
      valueRaised,
      valueInitial,
      id_user,
      dateInitial,
      complete
    });

    const allCategories = await Goal.find({
      id_user
    })

    return res.status(201).json(allCategories);
  } catch (e) {
    return res.status(500).json({ error: "err" });
  }
}

const getOneGoal = async (req: Request, res: Response) => {
  let goalId = req.params.id;
  try {
    authMiddleware(req, res)
    type ObjectIdConstructor = {
      (str: string): mongoose.Types.ObjectId;
      new(str: string): mongoose.Types.ObjectId;
    }
    const objId = (mongoose.Types.ObjectId as unknown as ObjectIdConstructor)(goalId);
    let responseGoal = await Goal.aggregate([
      {
        $match: { _id: objId }
      },
      {
        $lookup: {
          from: "goalrecurrences",
          localField: "_id",
          foreignField: "id_goal",
          as: "recurrence"
        }
      }
    ])
      .exec(function (err, result) {
        if (err) {
          // Lida com erros
          console.error(err);
          return res.status(500).json({ error: "Ocorreu um erro ao consultar o banco de dados." });
        }

        if (result.length === 0) {
          // Goal não encontrado
          return res.status(404).json({ error: "Goal não encontrado." });
        }

        const goal = result[0];

        res.json(goal);
      });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}
const allList = async (req: Request, res: Response) => {
  let { id_user } = req.body;
  try {
    const response = await Goal.aggregate([
      { $match: { id_user } },
      {
        $lookup: {
          from: "goalrecurrences",
          localField: "_id",
          foreignField: "id_goal",
          as: "recurrence"
        }
      }
    ]).exec()

    return res.status(201).json(response);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}
export { allList, createGoal, getOneGoal };
