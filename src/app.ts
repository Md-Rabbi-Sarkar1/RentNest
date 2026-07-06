import cookieParser from 'cookie-parser';
import cors from 'cors'

import express, { Application, Request, Response } from 'express'
import config from './config';
import { userRouter } from './modules/user/user.route';
import { authRouter } from './modules/auth/auth.route';
const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors({
    origin: config.app_url,
    credentials: true
}))

app.use('/api/user',userRouter)
app.use('/api/auth',authRouter)


app.get("/", (req: Request, res: Response) => {
    res.send("Hello");
})
export default app;