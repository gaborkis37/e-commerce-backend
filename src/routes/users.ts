import { Router } from "express";
import { verifyTokenAndAuthorization } from "../middlewares/verifyToken";
import { updateUser } from "../controllers/userController";

export function userRouter(): Router {
  const router = Router();

  router.put("/:id", verifyTokenAndAuthorization, updateUser);

  return router;
}
