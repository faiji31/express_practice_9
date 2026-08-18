import { Router, } from "express";

import { UserController } from "./user.controller";


const router =Router()


router.post("/", UserController.CreateUser);

router.get("/",UserController.getUser)

router.get("/:id",UserController.getSingleUser)

router.put("/:id",UserController.UpdateUser)

export const UserRoute=router