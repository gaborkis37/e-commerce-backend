import { Request, Response } from "express";
import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51KYtCxHozQn6l5ya1kfDqwSzC3AOXdiUinZ3qMK4tncqilwPkC52ZPTLp2e5ZRHIISv1p0cEtJsptSmZUPze25xr00DV1QSbiy",
  {
    apiVersion: "2020-08-27",
  }
);

export const payment = async (req: Request, res: Response) => {
  try {
    const charge: Stripe.Response<Stripe.Charge> = await stripe.charges.create({
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    });

    return res.status(200).json(charge);
  } catch (error) {
    res.status(500).json(error);
  }
};
