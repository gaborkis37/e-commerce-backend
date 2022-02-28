import { Schema, model, Model, Document } from "mongoose";

interface IProduct extends Document {
  title: string;
  desc: string;
  img: string;
  categories: Array<Object>;
  size: String;
  color: String;
  price: Number;
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
