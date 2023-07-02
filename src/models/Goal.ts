import { model, Schema } from "mongoose";

interface IGoal {
  name: string;
  valueFinal: number;
  dateInitial: Date;
  dateFinal: Date;
  valueRaised: number;
  valueInitial: number;
  id_user: string;
  complete: boolean;
  _id?: string;
}

const GoalSchema = new Schema({
  name: String,
  valueFinal: Number,
  dateInitial: Date,
  dateFinal: Date,
  valueRaised: Number,
  valueInitial: Number,
  complete: Boolean,
  id_user: String,
});

const Goal = model<IGoal>("Goal", GoalSchema);

export { Goal }

