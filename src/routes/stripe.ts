import { Router } from "express";
import { payment } from "../controllers/stripeController";

export function stripeRouter(): Router {
  const router = Router();

  router.post("/payment", payment);

  return router;
}
