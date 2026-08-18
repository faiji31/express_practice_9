import { Router, } from "express";

import { UserController } from "./user.controller";


const router =Router()


router.post("/", UserController.CreateUser);

export const UserRoute=router