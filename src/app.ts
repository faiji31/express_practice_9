import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import config from "./config";
import { initDB, pool } from "./db";
import { UserRoute } from "./modules/user/user.routes";
const app: Application = express();


app.use(express.json());





app.get("/", (req: Request, res: Response) => {
  //   res.send('server is running!')
  res.status(200).json({
    success: true,
    message: "next level",
  });
});

app.use('/api/users',UserRoute)









export default app

