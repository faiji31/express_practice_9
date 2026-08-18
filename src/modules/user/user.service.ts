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

const getSingleUserIntoDB=async(id:string)=>{
    const result = await pool.query(`SELECT * FROM users WHERE id=$1`, [id]);
    return result
}

const updateuserIntoDB=async( id:string,payload:IUser)=>{
        const{name, age, password, is_active,} = payload
    const result = await pool.query(
      `UPDATE users SET name = COALESCE($1, name), age = COALESCE($2, age),
       password = COALESCE($3, password), is_active = COALESCE($4, is_active)
       WHERE id = $5 RETURNING *`,
      [name, age, password, is_active, id],
    );
    return result
}

const deleteUserIntoDB= async(id:string)=>{
    const result = await pool.query(`
            DELETE FROM users WHERE id = $1 RETURNING *
            `,[id]);
            return result
}

 export const UserService ={
    CreateUserIntoDB,getUserIntoDB
    , getSingleUserIntoDB,
    updateuserIntoDB,deleteUserIntoDB
}