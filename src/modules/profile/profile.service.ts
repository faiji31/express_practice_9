
import { pool } from "../../db"
import bcrypt from "bcryptjs";


const createUserIntoDB=async(payload:any)=>{
    const {user_id,bio,phone,address,gender} = payload

   
    const user = await pool.query(`
        SELECT * FROM users WHERE id=$1 
        `,[user_id])
        

        if(user.rows.length===0){
            throw new Error("user not exists")
        }

        const result = await pool.query(`
            INSERT INTO profiles(user_id,bio,phone,address,gender) VALUES($1,$2,$3,$4,$5)

            `,[user_id,bio,phone,address,gender])

            return result
}

export const profileservice={
    createUserIntoDB
}