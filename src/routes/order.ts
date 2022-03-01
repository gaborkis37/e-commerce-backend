import { Router } from "express";
import {
  getOrders,
  createOrder,
  getOrderByUserId,
  updateOrder,
  deleteOrder,
  getMonthlyIncome,
} from "../controllers/orderController";

import {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "../middlewares/verifyToken";

export function orderRouter(): Router {
  const router = Router();

  router.get("/", verifyTokenAndAdmin, getOrders);
  router.post("/", verifyToken, createOrder);
  router.get("/income", verifyTokenAndAdmin, getMonthlyIncome);
  router.get("/:userId", verifyTokenAndAuthorization, getOrderByUserId);
  router.put("/:id", verifyTokenAndAdmin, updateOrder);
  router.delete("/:id", verifyTokenAndAuthorization, deleteOrder);

  return router;
}
