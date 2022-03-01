import { Request, Response } from "express";
import CryptoJs from "crypto-js";
import { IUser, User } from "../models/User";

export const getUsers = async (req: Request, res: Response) => {
  const query = req.query.new;

  try {
    const users: IUser[] = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user: IUser = await User.findById(req.params.id);

    const { password, ...userWithoutPassword } = user._doc;

    res.status(200).json(userWithoutPassword);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getUserStats = async (req: Request, res: Response) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

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

export const deleteUser = async (req: Request, res: Response) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted successfully");
  } catch (error) {
    res.status(500).json(error);
  }
};
