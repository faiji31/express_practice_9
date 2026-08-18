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

app.get("/api/users", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      `SELECT * FROM users
            `,
    );
    res.status(201).json({
      success: true,
      message: "user retrived successfully!",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
});
app.get("/api/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query(`SELECT * FROM users WHERE id=$1`, [id]);

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "user is not found!",
        data: {},
      });
    }
    res.status(201).json({
      success: true,
      message: "user retrived successfully!",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
});

app.put("/api/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, age, password, is_active } = req.body;

  try {
    const result = await pool.query(
      `UPDATE users SET name = COALESCE($1, name), age = COALESCE($2, age),
       password = COALESCE($3, password), is_active = COALESCE($4, is_active)
       WHERE id = $5 RETURNING *`,
      [name, age, password, is_active, id],
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "user is not found!",
        data: {},
      });
    }

    res.status(200).json({
      success: true,
      message: "user updated successfully!",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
});

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

