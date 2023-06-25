import { model, Schema } from "mongoose";

interface IGoal {
  name: string;
  valueFinal: number;
  dateInitial: Date;
  dateFinal: Date;
  valueRaised: number;
  id_user: string;
}

const GoalSchema = new Schema({
  name: String,
  valueFinal: Number,
  dateInitial: Date,
  dateFinal: Date,
  valueRaised: Number,
  id_user: String,
});

const Goal = model<IGoal>("Expense", GoalSchema);

export { Goal }

