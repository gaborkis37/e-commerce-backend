import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { userRouter } from "./routes/users";
import { authRouter } from "./routes/auth";
import { productRouter } from "./routes/product";
import { orderRouter } from "./routes/order";
import { cartRouter } from "./routes/cart";
import cors from "cors";
import { stripeRouter } from "./routes/stripe";

const app = express();

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  // tslint:disable-next-line:no-console
  .then(() => console.log("DB CONNECTION SUCCESS"))
  // tslint:disable-next-line:no-console
  .catch((error) => console.log(error));

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRouter());
app.use("/api/users", userRouter());
app.use("/api/products", productRouter());
app.use("/api/orders", orderRouter());
app.use("/api/carts", cartRouter());
app.use("/api/checkout", stripeRouter());

app.listen(process.env.PORT || 8080, () => {
  // tslint:disable-next-line:no-console
  console.log("Backend server is running");
});
