import { JwtPayload } from "jsonwebtoken";

export interface JWTUserPayload extends JwtPayload {
  id: string;
  isAdmin: boolean;
}
