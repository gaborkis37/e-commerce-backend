import { Schema, model, Model, Document } from "mongoose";

interface IOrder extends Document {
  userId: string;
  products: object[];
  amount: string;
  address: string;
  status: object[];
}

const OrderSchema: Schema = new Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

export const Order: Model<IOrder> = model("Order", OrderSchema);
