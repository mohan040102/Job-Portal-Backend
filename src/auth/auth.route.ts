import { Router } from "express";
import { AuthController } from "./auth.controller";
import Job from "../models/jobs";

export class AuthRoute {
    public router: Router;
    public AuthController: AuthController = new AuthController();

    constructor() {
        this.router = Router();
        this.route();
    }

    route() {
        this.router.post("/login", this.AuthController.login);
    }
} 