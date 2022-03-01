import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/productController";
import { verifyTokenAndAdmin } from "../middlewares/verifyToken";

export function productRouter(): Router {
  const router = Router();

  router.get("/", getProducts);
  router.post("/", verifyTokenAndAdmin, createProduct);
  router.put("/:id", verifyTokenAndAdmin, updateProduct);
  router.get("/:id", getProductById);
  router.delete("/:id", verifyTokenAndAdmin, deleteProduct);

  return router;
}
