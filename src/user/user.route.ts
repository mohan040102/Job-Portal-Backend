import { Router } from "express";
import { UserController } from "./user.controller";

export class UserRoute {
    public router: Router;
    public UserController: UserController = new UserController();

    constructor() {
        this.router = Router();
        this.route()
    }

    route() {
        this.router.post("/", this.UserController.createUser);
        this.router.get("/", this.UserController.getUser);
    }
} 