import { Request, Response, NextFunction } from "express"
import { Goal } from "../models/Goal"
import authMiddleware from "../middleware/authMiddleware";
import { GoalRecurrence } from "../models/GoalRecurrence";
const createGoalRecurrence = async (req: Request, res: Response) => {
  let {
    value,
    date,
    id_goal,
    id_user,
  } = req.body;
  try {
    // authMiddleware(req, res)
    let params = [
      value,
      date,
      id_goal,
      id_user,
    ]
    if (Object.values(params).some(e => !e)) {
      return res.status(500).json({ error: "there are empty fields" });
    }
    await GoalRecurrence.create({
      value,
      date,
      id_goal,
      id_user,
    });

    const allCategories = await GoalRecurrence.find({
      id_goal
    })

    return res.status(201).json(allCategories);
  } catch (e) {
    return res.status(500).json({ error: "err" });
  }
}
const getRecurrence = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    authMiddleware(req, res)
    const goalUser = await GoalRecurrence.findOne({
      id
    })
    return res.status(201).json(goalUser);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}

const allList = async (req: Request, res: Response) => {
  let { id_goal } = req.body;
  try {
    // authMiddleware(req, res)
    const goalUser = await GoalRecurrence.find({
      id_goal
    })
    return res.status(201).json(goalUser);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}
export { allList, createGoalRecurrence, getRecurrence };
