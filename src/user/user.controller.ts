import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { v4 as uuidV4 } from "uuid";
import db from "../config/db";
import constant from "../constants/constant";
import UserAppliedJob from "../models/user-applied-jobs";
import User from "../models/users";
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

      return res.status(httpStatus.OK).json({ message: "User Created Successfully" });
    } catch (err: any) {
      handleError(err, res);
    }
  };

  getUser = async (req: any, res: Response) => {
    try {
      let user: any = await User.findOne({ email: req.user.email }, {
        _id: false,
        name: true,
        email: true,
        user_type: true,
      });

      if (user) {
        const userAppliedJobs = await UserAppliedJob.find({ user_id: req.user._id }, { _id: false, job_id: true });
        const appliedJobs = userAppliedJobs.map(job => job.job_id);
        const userObj = user.toObject();
        userObj.user_applied_jobs = appliedJobs;
        return res.status(httpStatus.OK).json(userObj);
      }

      return res.status(httpStatus.NOT_FOUND).json({ message: "User Not Found" });
    } catch (err) {
      handleError(err, res);
    }
  };
}
