import jwt from "jsonwebtoken";
import { Response } from "express";
import { IGetUserAuthInfoRequest } from "../models/IGetUserAuthInfoRequest";
import { JWTUserPayload } from "../models/JWTUserPayload";

export const verifyToken = (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: () => void
) => {
  const authHeader = req.headers.token as string;
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) {
        return res.status(403).json("Token is not valid");
      }

      req.user = user as JWTUserPayload;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated");
  }
};

export const verifyTokenAndAuthorization = (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: () => void
) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not authorized to perform that action");
    }
  });
};

export const verifyTokenAndAdmin = (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: () => void
) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not authorized to perform that action");
    }
  });
};
