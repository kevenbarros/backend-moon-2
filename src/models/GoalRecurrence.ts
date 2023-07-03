import mongoose, { model, Schema } from "mongoose";
import { Goal } from "./Goal";

interface IGoalRecurrence {
  value: number,
  date: Date,
  id_user: string;
  id_goal: string;
  _id?: string;
}

const GoalRecurrenceSchema = new Schema({
  value: Number,
  date: Date,
  id_user: String,
  id_goal: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "goal"
  },
});

const GoalRecurrence = model<IGoalRecurrence>("goalrecurrence", GoalRecurrenceSchema);

export { GoalRecurrence }

