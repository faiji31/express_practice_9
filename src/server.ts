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
            name VARCHAR(20) NOT NULL,
            email VARCHAR(20) NOT NULL,
            password VARCHAR(20) NOT NULL,
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



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})