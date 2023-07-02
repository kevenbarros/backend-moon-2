import { model, Schema } from "mongoose";

export interface ICategories {
  title: string;
  color?: string;
  icon?: string;
  id_user: string;
  _id: string;
}

const CategoriesSchema = new Schema({
  title: String,
  value: String,
  id_user: String,
  color: String,
  icon: String,
});

const Categories = model<ICategories>("Categories", CategoriesSchema);

export { Categories }

