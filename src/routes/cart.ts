import { Router } from "express";
import {
  createCart,
  deleteCart,
  getCartById,
  getCarts,
  updateCart,
} from "../controllers/cartController";
import {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "../middlewares/verifyToken";

export function cartRouter(): Router {
  const router = Router();

  router.get("/", verifyTokenAndAdmin, getCarts);
  router.post("/", verifyToken, createCart);
  router.get("/:userId", verifyTokenAndAuthorization, getCartById);
  router.put("/:id", verifyTokenAndAuthorization, updateCart);
  router.delete("/:id", verifyTokenAndAuthorization, deleteCart);

  return router;
}
