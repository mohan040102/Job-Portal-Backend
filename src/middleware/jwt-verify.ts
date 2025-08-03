import { NextFunction, Response } from "express";
import { verifyToken } from "../utils/generate-auth-token";
import httpStatus from "http-status"
import AuthToken from "../models/auth-tokens";
import User from "../models/users";

export const verifyAuthuToken = async (req: any, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")?.[1] as string;
    const isValidToken = token ? verifyToken(token) : false;

    if (!isValidToken) {
        return res.status(httpStatus.UNAUTHORIZED).json({ message: "Invalid Token" });
    }

    const tokenData = await AuthToken.findOne({ token: token });
    const userData = await User.findOne({ id: tokenData?.user_id });

    req.user = userData;

    next();
}

export const userTypeValidation = (userType: string[]) => {
    return (req: any, res: Response, next: NextFunction) => {
        if (!userType.includes(req.user.user_type)) {
            return res.status(httpStatus.UNAUTHORIZED).json({message: "Unauthorized"})
        }

        next();
    }
}
