import { Router } from "express";
import { auth } from "./auth.controller";


const router = Router()


router.post('/login',auth.loginUser)

 export const authRoute = router