import { Router, } from "express";

import { UserController } from "./user.controller";


const router =Router()


router.post("/", UserController.CreateUser);

router.get("/",UserController.getUser)

export const UserRoute=router