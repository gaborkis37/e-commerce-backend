import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { userRouter } from "./routes/users";

const app = express();

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  // tslint:disable-next-line:no-console
  .then(() => console.log("DB CONNECTION SUCCESS"))
  // tslint:disable-next-line:no-console
  .catch((error) => console.log(error));

app.use(express.json());
app.use("/api/users", userRouter());

app.listen(process.env.PORT || 5000, () => {
  // tslint:disable-next-line:no-console
  console.log("Backend server is running");
});
