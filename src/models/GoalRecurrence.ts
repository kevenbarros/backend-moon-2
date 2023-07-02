import { model, Schema } from "mongoose";

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
  id_goal: String,
});

const GoalRecurrence = model<IGoalRecurrence>("GoalRecurrence", GoalRecurrenceSchema);

export { GoalRecurrence }

