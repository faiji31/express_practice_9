import express, { type Application, type Request, type Response } from 'express'
import {Pool} from 'pg'
import config from './config'
const app:Application = express()
const port = config.port


app.use(express.json())


const pool = new Pool(
    {
        connectionString:config.connection_string
    }
)


const initDB=async()=>{
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(20) NOT NULL,
            is_active BOOLEAN DEFAULT true,
            age INT,

            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
            )
            
            
            `)
    console.log('database connect successfully!!')

        
    } catch (error) {
        console.log(error)
       
    }
}
initDB()

app.get('/', (req:Request, res:Response) => {
//   res.send('server is running!')
  res.status(200).json({
        success:true,
        message:"next level"
       
    })
})

app.post('/api/users',async(req:Request,res:Response)=>{

    const{name,age,password,email} = req.body
    try {
        const result = await pool.query(`
            INSERT INTO users(name,age,password,email) VALUES($1,$2,$3,$4) RETURNING *
            
            `,[name,age,password,email])

            res.status(201).json({
                success:true,
                message:"user created successfully!",
                data:result.rows[0]
            })
        
    } catch (error:any) {
        res.status(500).json({
            success:false,
            message:error.message,
            error:error
        })
        
    }
})

app.get('api/users.')



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})