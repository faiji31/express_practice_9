import bcrypt from "bcryptjs"
import { pool } from "../db"

import jwt from "jsonwebtoken"
import config from "../config"


const loginuserIntoDB=async(payload:{email:string,password:string})=>{

    const {email,password} = payload


    // 1.check if the user exist
    // 2.compare the password
    // 3. generate jwt token


    const userData = await pool.query(`

        SELECT * FROM users WHERE  email = $1
        
        `,[email])

        if(userData.rows.length ===0){
            throw new Error("Invalid Credential")

        }

        const user = userData.rows[0]

        const matchPassword = await bcrypt.compare(password,user.password)

        if(!matchPassword){
            throw new Error("Invalid Credential")
        }
        // generate token

        const jwtpayload={
            name:user.name,
            id:user.id,
            is_active:user.is_active,
            email:user.email,
            age:user.age
        }

        const accessToken = jwt.sign(jwtpayload,config.secret as string,{expiresIn:"7d"})
        return {accessToken}



}

export const authService ={
    loginuserIntoDB
}