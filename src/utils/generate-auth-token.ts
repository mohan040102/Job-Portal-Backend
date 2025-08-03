import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.SECRET_KEY as string
const JWT_EXPIRES_IN = "1d";

export const generateToken = (payload: Object = {}): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

export const verifyToken = (token: string): Object => {
  try {
    jwt.verify(token, JWT_SECRET) as Object;
    return true;
  } catch (err: any) {
    return false;
  }
};