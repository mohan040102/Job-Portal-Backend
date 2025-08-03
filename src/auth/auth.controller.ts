import express from "express";
import { Request, Response } from "express";
import AuthToken from "../models/auth-tokens";
import User from "../models/users";
import httpStatus from "http-status"
import { generateToken } from "../utils/generate-auth-token";

export class AuthController {
    login = async (req: Request, res: Response) => {
        const username = req.headers.user_name;
        const password = req.headers.password;

        const user = await User.findOne({ email: username, password: password });

        if (!user) {
            return res.status(httpStatus.UNAUTHORIZED).json({ message: "Invalid Username or Password" });
        }

        const token = generateToken();

        await AuthToken.updateOne(
            { user_id: user.id },               // Filter: match by user_id
            { $set: { token: token } },         // Update: set the new token
            { upsert: true }                    // Options: insert if not found
        );

        return res.status(httpStatus.OK).json(token);
    }

}