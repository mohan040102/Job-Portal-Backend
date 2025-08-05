import { Router } from "express";
import { JobController } from "./job.controller";
import Job from "../models/jobs";
import { userTypeValidation } from "../middleware/jwt-verify";
import constant from "../constants/constant";

export class JobRoute {
    public router: Router;
    public JobController: JobController = new JobController();

    constructor() {
        this.router = Router();
        this.route()
    }

    route() {
        this.router.get("/", this.JobController.ListJobs);

        this.router.get("/:id", this.JobController.getJob);

        this.router.post("/", userTypeValidation([constant.UserTypes.EMPLOYER]), this.JobController.createJob);

        this.router.post("/apply", userTypeValidation([constant.UserTypes.JOBSEEKER]), this.JobController.applyJob);
    }
} 