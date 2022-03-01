import { Request } from "express";
import { JWTUserPayload } from "./JWTUserPayload";

export interface IGetUserAuthInfoRequest extends Request {
  user: JWTUserPayload;
}
