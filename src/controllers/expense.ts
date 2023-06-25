import { Request, Response, NextFunction } from "express"
import { Expense } from "../models/Expense"
import authMiddleware from "../middleware/authMiddleware";

const updateExpense = async (req: Request, res: Response) => {
  let { id, data } = req.body;
  try {
    authMiddleware(req,res)
    const updateExpense = await Expense.findByIdAndUpdate(id, data)
    const expense = await Expense.findById(id)
    return res.status(201).json(expense);
  }catch(err){
    return res.status(500).json({ error: err });
  }
}
const deleteExpense = async (req: Request, res: Response) => {
  let { id } = req.body;
  try{
    authMiddleware(req,res)
    const userId = await Expense.findById(id)
    if(!userId?._id){
      return res.status(500).json({ error: "Gasto não encontrado" });
    }
    const expense = await Expense.deleteOne({
      _id : id
    })
    const returnAll = await Expense.find({
      id_user: userId?.id_user
    })

    return res.status(201).json(returnAll);
  }catch(err){
    return res.status(500).json({ error: err });
  }
}
const allExpense = async (req: Request, res: Response) => {
  let { id_user } = req.body;
  try{
    authMiddleware(req,res)
    const gainUser = await Expense.find({
      id_user
    })
    return res.status(201).json(gainUser);
  }catch(err){
    return res.status(500).json({ error: err });
  }
} 
const getExpense = async (req: Request, res: Response) => {
  try {
    authMiddleware(req,res)
    let { id } = req.body;
    const gain = await Expense.findOne({
      _id : id
    })
    return res.status(201).json(gain);
  }catch(err){
    return res.status(500).json({ error: err });
  }
}
const registerExpense = async (req: Request, res: Response, next: NextFunction) => {
  authMiddleware(req,res)
  let {  
    description ,
    value,
    date,
    paymentConditions,
    expensePayment,
    category ,
    local ,
    qtdInstallments,
    buyer,
    observation,
    id_goal,
    id_user,
    valueRecurrence,
  } = req.body;
  if(!description || !value || !date|| !paymentConditions || !id_user || expensePayment === undefined){
    return res.status(500).json({ error: "Há obrigatorios campos não preenchidos" });
  }
  if(!valueRecurrence){
    valueRecurrence = 0
  }
  if(!category){
    category = "no information"
  }
  if(!observation){
    observation = ""
  }
  if(!local){
    observation = ""
  }
  if(!id_goal){
    id_goal = ""
  }
  if(!buyer){
    buyer = ""
  }
  if(!qtdInstallments){
    qtdInstallments = 0
  }

  try {
    await Expense.create({
      description ,
      value,
      date,
      paymentConditions,
      expensePayment,
      category ,
      local ,
      qtdInstallments,
      buyer,
      observation,
      id_goal,
      id_user,
      valueRecurrence,
    });

    return res.status(201).json({ message: "Gasto cadastrado com sucesso!" });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

export { registerExpense, getExpense, allExpense, deleteExpense, updateExpense };
