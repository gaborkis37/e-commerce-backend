import { Router } from "express";
import { registerUser, loginUser } from "../controllers/authController";

export function authRouter(): Router {
  const router = Router();

  router.post("/register", registerUser);
  router.post("/login", loginUser);

  return router;
}
