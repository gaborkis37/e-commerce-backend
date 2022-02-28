import { Router } from "express";

export function userRouter(): Router {
  const router = Router();

  router.get("/userTest", (req: any, res: any) => {
    res.send("User test is successfull");
  });

  router.post("/userPostTest", (req: any, res: any) => {
    const userName: string = req.body.username;
    res.send(userName);
  });

  return router;
}
