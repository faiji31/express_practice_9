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







app.delete("/api/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query(`
            DELETE FROM users WHERE id = $1 RETURNING *
            `,[id]);

    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "user is not found!",
        data: {},
      });
    }
    res.status(200).json({
      success: true,
      message: "user deleted successfully!",
      data: {},
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
});

export default app

