import { Request, Response } from "express";
import CryptoJs from "crypto-js";
import { User } from "../models/User";

export const updateUser = async (req: Request, res: Response) => {
  if (req.body.password) {
    req.body.password = CryptoJs.AES.decrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(CryptoJs.enc.Utf8);
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json(error);
  }
};
