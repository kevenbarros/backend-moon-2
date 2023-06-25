import { model, Schema } from "mongoose";

interface IUser {
  name: string;
  picture: string;
  email: string;
  wage?: number;
  id_google: string;
  _id?: string;
  creationDate: Date;
  updateDate?: Date;
  locale: string;
  given_name: string;
  family_name: string;
}

const UserSchema = new Schema({
  email: String,
  picture: String,
  name: String,
  id_google: String,
  creationDate: Date,
  updateDate: Date,
  locale: String,
  given_name: String,
  family_name: String,
  wage: Number,
});

const User = model<IUser>("Users", UserSchema);

export { User }

