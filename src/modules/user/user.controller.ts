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

const getUser = async (req: Request, res: Response) => {
  try {
    const result = await UserService.getUserIntoDB(req.body)
    
    res.status(201).json({
      success: true,
      message: "user retrived successfully!",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
}

const getSingleUser= async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await UserService.getSingleUserIntoDB(id as string)
    

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "user is not found!",
        data: {},
      });
    }
    res.status(201).json({
      success: true,
      message: "user retrived successfully!",
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

const UpdateUser= async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, age, password, is_active } = req.body;

  try {
    const result = await UserService.updateuserIntoDB(id as string,req.body)
    

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "user is not found!",
        data: {},
      });
    }

    res.status(200).json({
      success: true,
      message: "user updated successfully!",
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
    CreateUser,getUser,getSingleUser,UpdateUser
}