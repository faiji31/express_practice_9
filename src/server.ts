import express, { type Application, type Request, type Response } from 'express'
import {Pool} from 'pg'
const app:Application = express()
const port = 5000


app.use(express.json())


const pool = new Pool(
    {
        connectionString:"postgresql://neondb_owner:npg_iMYaPWXm98tU@ep-orange-king-ayvuyane-pooler.c-5.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
    }
)

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