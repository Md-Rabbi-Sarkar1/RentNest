import cookieParser from 'cookie-parser';
import cors from 'cors'

import express, { type Application, type Request, type Response } from 'express'
import config from './config';
import { userRouter } from './modules/user/user.route';
import { authRouter } from './modules/auth/auth.route';
import { postRouter } from './modules/post/post.route';

import { notFound } from './middleware/notFound';
import { globalErrorHandler } from './middleware/globalErrorHandler';
import { adminRouter } from './modules/admin/admin.route';
import { reviewRouter } from './modules/review/review.route';

import { paymentRouter } from './modules/payment/payment.route';
import { rentalRouter } from './modules/rental/rental.route';
import { publicRouter } from './modules/publicUser/putlic.route';
const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
const allowedOrigins = ['http://localhost:5000', 'https://rent-nest-new.vercel.app'];

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}))

app.use('/api/user',userRouter)
app.use('/api/auth',authRouter)
app.use('/api/landlord',postRouter)
app.use('/api/rentals',rentalRouter)
app.use('/api/admin',adminRouter)
app.use('/api/reviews',reviewRouter)
app.use('/api',publicRouter)
app.use('/api/payments',paymentRouter)
app.get("/", (req: Request, res: Response) => {
    res.send("Hello");
})
app.use(notFound)
app.use(globalErrorHandler)
export default app;