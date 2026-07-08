import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import config from "../../config";
import { AuthenticatedRequest } from "./interface";
import { JwtPayload } from "jsonwebtoken";
import { paymentService } from "./payment.service";


export const createPayment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user
    const rentalRequestId = req.params.id
     if (!rentalRequestId) {
        throw new Error("Validation Error: Rental request ID parameter is required");
    }
const result = await paymentService.createPayment( rentalRequestId as string,user as JwtPayload)

            sendResponse(res, {
                success: true,
                statusCode: StatusCodes.OK,
                message: "SSLCommerz payment session url generated successfully",
                data:{gatewayUrl:result } 
            })
    })

const verifyPayment = catchAsync(async (req, res) => {
  const { orderId, tranId, status } = req.query;
    const user = req.user
  const payload = req.body;

  const response = await paymentService.verifyPayment(
    orderId as string,
    tranId as string,
    status as string,
    payload,
  );

  if (response === "success") {
    res.redirect("https://web.programming-hero.com/dashboard");
  } else if (response === "fail") {
    res.redirect("https://www.facebook.com");
  } else if (response === "cancel") res.redirect("https://www.youtube.com");
});

const getPaymentHistory =catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
   const result= await paymentService.getPaymentHistory()
    sendResponse(res, {
                success: true,
                statusCode: StatusCodes.OK,
                message: "User successfully login",
                data: result
            })
    })
const getPaymentHistoryById=catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const paymentId = req.params.id
    const result = await paymentService.getPaymentHistoryById(paymentId as string )
    sendResponse(res, {
                success: true,
                statusCode: StatusCodes.OK,
                message: "User successfully login",
                data: result
            })
    })
export const paymentController = {
    createPayment,
    verifyPayment,
    getPaymentHistory,
    getPaymentHistoryById
}