import { Request, Response } from "express";
import { User, IUser } from "../models/User";
import CryptoJs from "crypto-js";
import jwt from "jsonwebtoken";

export const registerUser = async (req: Request, res: Response) => {
  const newUser: IUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJs.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });

  try {
    const savedUser: IUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const user: IUser = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(401).json("Wrong credentials");
    }

    const pass: string = CryptoJs.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    ).toString(CryptoJs.enc.Utf8);

    if (pass !== req.body.password) {
      return res.status(401).json("Wrong credentials");
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );

    const { password, ...userWithoutPassword } = user._doc;

    res.status(200).json({ ...userWithoutPassword, accessToken });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
