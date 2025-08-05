import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { v4 as uuidV4 } from "uuid";
import db from "../config/db";
import constant from "../constants/constant";
import Job from "../models/jobs";
import UserAppliedJob from "../models/user-applied-jobs";
import handleError from "../utils/error-hanler";

export class JobController {
  createJob = async (req: any, res: Response) => {
    try {
      req.body._id = uuidV4();
      req.body.creator_id = req.user.id;
      const jobs = await Job.insertOne(req.body);

      return res.status(httpStatus.OK).json({ message: "Job Created Successfully" });
    } catch (err: any) {
      handleError(err, res);
    }
  };

  getJob = async (req: Request, res: Response) => {
    try {
      const job = await Job.findOne({ _id: req.params.id }, { _id: false, title: true, description: true });

      if (job) {
        return res.status(httpStatus.OK).json(job);
      }
      return res.status(httpStatus.NOT_FOUND).json({ message: "Job Not Found" });
    } catch (err) {
      handleError(err, res);
    }
  };

  ListJobs = async (req: any, res: Response) => {
    try {
      const isRecruiter = req?.user?.user_type === constant.UserTypes.EMPLOYER;

      const jobs = await Job.find({ ...(isRecruiter && { creator_id: req.user.id }) }, {
        title: true,
        description: true,
        company: true,
        location: true,
        salary: true,
        created_at: true,
      });

      return res.status(httpStatus.OK).json(jobs);
    } catch (err) {
      handleError(err, res);
    }
  };

  applyJob = async (req: any, res: Response) => {
    console.log(req.body)
    const job_id = req.body.id;
    const user_id = req.user._id;

    const isJobExist = await Job.findOne({ _id: job_id });

    if (!isJobExist) {
      return res.status(httpStatus.NOT_FOUND).json({ message: "Job Not Found" });
    }

    const isJobApplied = await UserAppliedJob.findOne({ job_id, user_id });

    if (isJobApplied) {
      return res.status(httpStatus.BAD_REQUEST).json({ message: "You have already applied for this job" });
    }

    await UserAppliedJob.insertOne({ job_id, user_id });

    return res.status(httpStatus.OK).json({ message: "Job Applied Successfully" });
  };
}
