import { model, Schema } from "mongoose";

interface IExpense {
  description: string;
  value: number;
  date: Date;
  paymentConditions: string;
  expensePayment: boolean;
  valueRecurrence: number;
  qtdInstallments?: number;
  category?: string;
  local?: string;
  buyer?: string;
  observation?: string;
  id_goal?: string;
  id_user: string;
  _id: string;
}

const ExpenseSchema = new Schema({
  description: String,
  value: Number,
  date: Date,
  paymentConditions: String,
  expensePayment: Boolean,
  category: String,
  local: String,
  qtdInstallments: Number,
  buyer: String,
  observation: String,
  id_goal: String,
  id_user: String,
  valueRecurrence: Number,
});

const Expense = model<IExpense>("Expense", ExpenseSchema);

export { Expense }

