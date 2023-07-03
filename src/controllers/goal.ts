import { Request, Response, NextFunction } from "express"
import { Goal } from "../models/Goal"
import authMiddleware from "../middleware/authMiddleware";
import { GoalRecurrence } from "../models/GoalRecurrence";
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
  let _id = req.params.id;
  try {
    // authMiddleware(req, res)
    const goalUser = await Goal.findById(_id)
    return res.status(201).json(goalUser);
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
