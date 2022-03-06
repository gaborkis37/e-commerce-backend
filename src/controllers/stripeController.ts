import { Request, Response } from "express";
import Stripe from "stripe";

const stripe = () => {
  return new Stripe(process.env.STRIPE_KEY, {
    apiVersion: "2020-08-27",
  });
};

export const payment = async (req: Request, res: Response) => {
  try {
    const charge: Stripe.Response<Stripe.Charge> =
      await stripe().charges.create({
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: "usd",
      });

    return res.status(200).json(charge);
  } catch (error) {
    res.status(500).json(error);
  }
};
