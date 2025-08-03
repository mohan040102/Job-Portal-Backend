import { NextFunction, Request, Response } from "express"
import db from "../config/db"
import Job from "../models/jobs";
import { v4 as uuidV4 } from "uuid";
import httpStatus from "http-status"
import constant from "../constants/constant";
import handleError from "../utils/error-hanler";

export class JobController {
    createJob = async (req: any, res: Response) => {
        try {
            req.body._id = uuidV4();
            req.body.creator_id = req.user.id;
            const jobs = await Job.insertOne(req.body);

            return res.status(httpStatus.OK).json({ message: "Job Created Successfully" })
        }
        catch (err: any) {
            handleError(err, res);
        }
    }

    getJob = async (req: Request, res: Response) => {
        try {
            const job = await Job.findOne({ _id: req.params.id }, { _id: false, title: true, description: true });

            if (job) {
                return res.status(httpStatus.OK).json(job);
            }
            return res.status(httpStatus.NOT_FOUND).json({ message: "Job Not Found" });
        } catch (err) {
            handleError(err, res)
        }
    }

    ListJobs = async (req: any, res: Response) => {
        try {
            const isRecruiter = req?.user?.user_type === constant.UserTypes.EMPLOYER;

            const jobs = await Job.find({ ...(isRecruiter && { creator_id: req.user.id }) }, { "_id": false, title: true, description: true });

            return res.status(httpStatus.OK).json(jobs)
        } catch (err) {
            handleError(err, res)
        }
    }
}