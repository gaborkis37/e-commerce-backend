import { Request, Response } from "express";
import { Cart, ICart } from "../models/Cart";

export const getCarts = async (req: Request, res: Response) => {
  try {
    const carts: ICart[] = await Cart.find();

    res.status(200).json(carts);
  } catch (error) {
    res.send(500).json(error);
  }
};
export const getCartById = async (req: Request, res: Response) => {
  try {
    const cart: ICart = await Cart.findOne({ userId: req.params.userId });

    res.status(200).json(cart);
  } catch (error) {
    res.send(500).json(error);
  }
};

export const createCart = async (req: Request, res: Response) => {
  const newCart: ICart = new Cart(req.body);

  try {
    res.status(201).json(await newCart.save());
  } catch (error) {
    res.send(500).json(error);
  }
};

export const updateCart = async (req: Request, res: Response) => {
  try {
    const updatedCart: ICart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedCart);
  } catch (error) {
    res.send(500).json(error);
  }
};

export const deleteCart = async (req: Request, res: Response) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);

    res.status(200).json("Cart deleted successfully");
  } catch (error) {
    res.send(500).json(error);
  }
};
