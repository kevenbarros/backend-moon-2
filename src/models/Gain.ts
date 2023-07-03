import mongoose, { model, Schema } from "mongoose";

export interface IGain {
  description: string;
  value: number;
  date: Date;
  paymentConditions: string;
  paidGain?: boolean;
  category?: string;
  observation?: string;
  id_user: string;
  valueRecurrence: number;
  qtdInstallments?: number;
  _id: string;
}


const GainSchema = new Schema({
  description: String,
  value: Number,
  date: Date,
  paymentConditions: String,
  paidGain: {
    type: Boolean,
    required: false,
  },
  category: String,
  observation: String,
  qtdInstallments: Number,
  valueRecurrence: Number,
  id_user: String,
});

const Gain = model<IGain>("Gain", GainSchema);

export { Gain }

