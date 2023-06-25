import { model, Schema } from "mongoose";

export interface IRecurrence {
  date: Date;
  value: number;
  recurrence: number;
  paidOut: boolean;
  id_expense: string;
  id_user: string;
  _id: string;
}

const RecurrenceSchema = new Schema({
  date: Date,
  value: Number,
  recurrence: Number,
  paidOut: Boolean,
  id_expense: String,
  id_user: String,
  _id: String,
});

const Recurrence = model<IRecurrence>("Recurrence", RecurrenceSchema);

export { Recurrence }

