import { Request, Response, NextFunction } from "express"
import { Categories } from "../models/Categories"
import authMiddleware from "../middleware/authMiddleware";
const createCategory = async (req: Request, res: Response) => {
  let {
    title,
    color,
    icon,
    id_user,
  } = req.body;
  try {
    // authMiddleware(req, res)
    if (!id_user) {
      return res.status(500).json({ error: "id user required" });
    }
    if (!title) {
      return res.status(500).json({ error: "title required" });
    }
    color = color ? color : ""
    icon = icon ? icon : ""
    await Categories.create({
      id_user,
      title,
      color,
      icon,
    });

    const allCategories = await Categories.find({
      id_user
    })

    return res.status(201).json(allCategories);
  } catch (e) {
    return res.status(500).json({ error: "err" });
  }
}
const allList = async (req: Request, res: Response) => {
  let { id_user } = req.body;
  try {
    // authMiddleware(req, res)
    const categoriesUser = await Categories.find({
      id_user
    })
    return res.status(201).json(categoriesUser);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}
export { allList, createCategory };
