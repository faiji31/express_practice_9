import type { Request, Response } from "express";
import { pool } from "../../db";
import { UserService } from "./user.service";


const CreateUser=
    async (req: Request, res: Response) => {
//   const { name, age, password, email } = req.body;
  try {
    const result = await UserService.CreateUserIntoDB(req.body)
    

    res.status(201).json({
      success: true,
      message: "user created successfully!",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
}


export const UserController ={
    CreateUser,
}