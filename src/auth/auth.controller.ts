import express from "express";
import { Request, Response } from "express";
import AuthToken from "../models/auth-tokens";
import User from "../models/users";
import httpStatus from "http-status"
import { generateToken } from "../utils/generate-auth-token";
import moment from "moment";

export class AuthController {
    login = async (req: Request, res: Response) => {
        const encodedPassword = req.headers.authorization?.split(" ")[1] as string;
        const basicAuth = Buffer.from(encodedPassword, 'base64').toString('utf-8').split(':');
        
        const username = basicAuth?.[0];
        const password = basicAuth?.[1];

        console.log(basicAuth);
        const user = await User.findOne({ email: username, password: password });

        if (!user) {
            return res.status(httpStatus.UNAUTHORIZED).json({ message: "Invalid Username or Password" });
        }

        const token = generateToken();
        const result = {token: token, expires_at: moment().add(1, "days").format("YYYY-MM-DD HH:mm:ss")};

        await AuthToken.updateOne(
            { user_id: user.id },               // Filter: match by user_id
            { $set: { token: token } },         // Update: set the new token
            { upsert: true }                    // Options: insert if not found
        );

        return res.status(httpStatus.OK).json(result);
    }

}