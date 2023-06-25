import { Request, Response, NextFunction } from "express"
import { Gain } from "../models/Gain"
import authMiddleware from "../middleware/authMiddleware";

const updateGain = async (req: Request, res: Response) => {
  let { id, data } = req.body;
  try {
    authMiddleware(req, res)
    const updateGain = await Gain.findByIdAndUpdate(id, data)
    const gain = await Gain.findById(id)
    return res.status(201).json(gain);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}
const deleteGain = async (req: Request, res: Response) => {
  let { id } = req.body;
  try {
    authMiddleware(req, res)
    const userId = await Gain.findById(id)
    if (!userId?._id) {
      return res.status(500).json({ error: "Ganho não encontrado" });
    }
    const gain = await Gain.deleteOne({
      _id: id
    })
    const returnAll = await Gain.find({
      id_user: userId?.id_user
    })

    return res.status(201).json(returnAll);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}
const allGain = async (req: Request, res: Response) => {
  let { id_user } = req.body;
  try {
    authMiddleware(req, res)
    const gainUser = await Gain.find({
      id_user
    })
    return res.status(201).json(gainUser);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}
const getGain = async (req: Request, res: Response) => {
  try {
    authMiddleware(req, res)
    let { id } = req.body;
    const gain = await Gain.findOne({
      _id: id
    })
    return res.status(201).json(gain);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}
const registerGain = async (req: Request, res: Response, next: NextFunction) => {
  authMiddleware(req, res)
  let {
    description,
    value,
    date,
    paymentConditions,
    paidGain,
    category,
    observation,
    id_user,
    valueRecurrence,
    qtdInstallments
  } = req.body;
  if (!description || !value || !date || !paymentConditions || !id_user) {
    return res.status(500).json({ error: "Há obrigatorios campos não preenchidos" });
  }
  if (!category) {
    category = "no information"
  }
  if (!observation) {
    observation = ""
  }
  if (!observation) {
    observation = ""
  }
  if (!paidGain) {
    paidGain = false
  }
  if (!valueRecurrence) {
    valueRecurrence = 0
  }
  if (!qtdInstallments) {
    qtdInstallments = 0
  }
  try {
    await Gain.create({
      description,
      value,
      date,
      paymentConditions,
      paidGain,
      id_user,
      valueRecurrence,
      qtdInstallments
    });

    return res.status(201).json({ message: "Ganho criado com sucesso!" });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

export { registerGain, getGain, allGain, deleteGain, updateGain };
