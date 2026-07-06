import cookieParser from 'cookie-parser';
import cors from 'cors'

import express, { Application, Request, Response } from 'express'
import config from './config';
import { userRouter } from './modules/user/user.route';
import { authRouter } from './modules/auth/auth.route';
import { postRouter } from './modules/post/post.route';
import { rentalRouter } from './modules/rental/rental.route';
import { notFound } from './middleware/notFound';
import { globalErrorHandler } from './middleware/globalErrorHandler';
import { adminRouter } from './modules/admin/admin.route';
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
app.use('/api/landlord',postRouter)
app.use('/api/rentals',rentalRouter)
app.use('/api/admin',adminRouter)
app.get("/", (req: Request, res: Response) => {
    res.send("Hello");
})
app.use(notFound)
// app.use(globalErrorHandler)
export default app;