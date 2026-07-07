import { Router } from "express";
import { paymentController } from "./payment.Controller";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router()
router.post('/create/:id',auth(Role.LANDLORD),paymentController.createPayment)
router.post('/confirm',paymentController.verifyPayment)
router.get('/',paymentController.getPaymentHistory)
router.get('/:id',paymentController.getPaymentHistoryById)
export const paymentRouter = router