import { NextFunction, Request, Response } from "express"
import db from "../config/db"
import User from "../models/users";
import { v4 as uuidV4 } from "uuid";
import httpStatus from "http-status"
import constant from "../constants/constant";
import handleError from "../utils/error-hanler";

export class UserController {
    createUser = async (req: any, res: Response) => {
        try {
            const isUserExist = await User.findOne({ email: req.body.email });
            
            if (isUserExist) {
                return res.status(httpStatus.BAD_REQUEST).json({ message: "Email already exists" });
            }

            req.body._id = uuidV4();
            const jobs = await User.insertOne(req.body);

            return res.status(httpStatus.OK).json({ message: "User Created Successfully" })
        }
        catch (err: any) {
            handleError(err, res);
        }
    }

    getUser = async (req: Request, res: Response) => {
        try {
            const user = await User.findOne({ email: req.params.email }, { _id: false, name: true, email: true, user_type: true });

            if (user) {
                return res.status(httpStatus.OK).json(user);
            }
            return res.status(httpStatus.NOT_FOUND).json({ message: "User Not Found" });
        } catch (err) {
            handleError(err, res)
        }
    }
}