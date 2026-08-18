import type { Request, Response } from "express";
import { pool } from "../../db";


const CreateUser=()=>{
    async (req: Request, res: Response) => {
  const { name, age, password, email } = req.body;
  try {
    const result = await pool.query(
      `
            INSERT INTO users(name,age,password,email) VALUES($1,$2,$3,$4) RETURNING *
            
            `,
      [name, age, password, email],
    );

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
}

export const UserController ={
    CreateUser,
}