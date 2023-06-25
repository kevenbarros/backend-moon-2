import { Request, Response, NextFunction } from "express"
import { User } from "../models/User"
import bcryptjs from "bcryptjs"
import { generateToken } from "../utils/generateToken"
import authMiddleware from "../middleware/authMiddleware";

const checkUser = async (req: Request, res: Response) => {
  try {
    const { id_google } = req.body
    const person = await User.findOne({
      id_google
    })
    if (!person) return res.status(201).json({ checkUser: false });
    res.status(201).json({ checkUser: true });
  } catch (err) {

  }
}
const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // authMiddleware(req,res)
    const people = await User.find();
    return res.status(200).json(people);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

const register = async (req: Request, res: Response, next: NextFunction) => {
  const { email, picture, name, id_google, locale, given_name, family_name } = req.body;
  try {
    const person = await User.findOne({
      id_google,
    });
    if (person) throw "user already exists";
    await User.create({
      email,
      picture,
      name,
      id_google,
      locale,
      given_name,
      family_name,
      creationDate: new Date(),
      updateDate: new Date(),
      wage: 0,
    });

    return res.status(201).json({ message: "Person added!" });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

const login = async (req: Request, res: Response) => {
  const { id_google } = req.body;

  try {
    const person = await User.findOne({ id_google });

    if (!person) throw "email of user is not correct";

    const token = generateToken({ sub: person._id, id_google: person.id_google });

    return res.status(201).send({ person, token });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

export { getAllUsers, register, login, checkUser };
