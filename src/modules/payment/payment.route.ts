import { Router } from "express";
import { paymentController } from "./payment.Controller";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router()
router.post('/create/:id',auth(Role.TENANT),paymentController.createPayment)
router.post('/confirm',paymentController.verifyPayment)
router.get('/',auth(Role.TENANT),paymentController.getPaymentHistory)
router.get('/:id',auth(Role.ADMIN,Role.TENANT),paymentController.getPaymentHistoryById)
export const paymentRouter = router