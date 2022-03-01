import { Request, Response } from "express";
import { Order, IOrder } from "../models/Order";

export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders: IOrder[] = await Order.find();

    res.status(200).json(orders);
  } catch (error) {
    res.send(500).json(error);
  }
};

export const getOrderByUserId = async (req: Request, res: Response) => {
  try {
    const orders: IOrder[] = await Order.find({ userId: req.params.userId });

    res.status(200).json(orders);
  } catch (error) {
    res.send(500).json(error);
  }
};

export const createOrder = async (req: Request, res: Response) => {
  const newOrder: IOrder = new Order(req.body);

  try {
    res.status(201).json(await newOrder.save());
  } catch (error) {
    res.send(500).json(error);
  }
};

export const updateOrder = async (req: Request, res: Response) => {
  try {
    const updatedOrder: IOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.send(500).json(error);
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    await Order.findByIdAndDelete(req.params.id);

    res.status(200).json("Order deleted successfully");
  } catch (error) {
    res.send(500).json(error);
  }
};

export const getMonthlyIncome = async (req: Request, res: Response) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
};
