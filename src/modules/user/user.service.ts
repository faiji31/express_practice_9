import { pool } from "../../db";
import type { IUser } from "./user.interface";


const CreateUserIntoDB=async(payload:IUser)=>{
    const {name, age, password, email}=payload
const result = await pool.query(
      `
            INSERT INTO users(name,age,password,email) VALUES($1,$2,$3,$4) RETURNING *
            
            `,
      [name, age, password, email],
    );
    return result
}

const getUserIntoDB=async(payload:IUser)=>{
    const result = await pool.query(
      `SELECT * FROM users
            `,
    );
    return result
}

 export const UserService ={
    CreateUserIntoDB,getUserIntoDB
}