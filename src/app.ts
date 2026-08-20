import express, {
  type Application,
  type Request,
  type Response,
} from "express";

import { UserRoute } from "./modules/user/user.routes";
import { profileroute } from "./modules/profile/profile.route";
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

app.use('/api/profiles',profileroute)









export default app

