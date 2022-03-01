import { Schema, model, Model, Document } from "mongoose";

export interface IProduct extends Document {
  title: string;
  desc: string;
  img: string;
  categories: object[];
  size: string;
  color: string;
  price: number;
}

const ProductSchema: Schema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    categories: { type: Array, default: false },
    size: { type: String },
    color: { type: String },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

export const Product: Model<IProduct> = model("Product", ProductSchema);
