import { Router } from "express";
import {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "../middlewares/verifyToken";
import {
  updateUser,
  deleteUser,
  getUserById,
  getUsers,
  getUserStats,
} from "../controllers/userController";

export function userRouter(): Router {
  const router = Router();

  router.get("/", verifyTokenAndAdmin, getUsers);
  router.get("/stats", verifyTokenAndAdmin, getUserStats);
  router.get("/:id", verifyTokenAndAdmin, getUserById);
  router.put("/:id", verifyTokenAndAuthorization, updateUser);
  router.delete("/:id", verifyTokenAndAuthorization, deleteUser);

  return router;
}
