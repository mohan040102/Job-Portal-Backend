import { Router } from "express";
import { JobRoute } from "../job/job.route";
import httpStatus from "http-status";
import { AuthRoute } from "../auth/auth.route";
import { verify } from "crypto";
import { verifyAuthuToken } from "../middleware/jwt-verify";
import { UserRoute } from "../user/user.route";
import { UserController } from "../user/user.controller";

export class JobPortalRoute {
    public router: Router;

    constructor() {
        this.router = Router();
        this.route();
    }

    route() {

        this.router.get('/health-check', (req: any, res: any) => {
            res.status(httpStatus.OK).send({ message: "Backend is up & running." });
        });

        this.router.post('/user', new UserController().createUser)
        
        this.router.use("/auth", new AuthRoute().router);

        this.router.use(verifyAuthuToken);

        this.router.use("/job", new JobRoute().router);

        this.router.use("/user", new UserRoute().router);

    }
}