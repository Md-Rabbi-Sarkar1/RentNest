import { StatusCodes } from "http-status-codes"
import { catchAsync } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse"
import { reviewService } from "./review.service"
import { IRview } from "./interface"
import { NextFunction, Request, Response } from "express"

const giveReview = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
      const userId = req.user?.id
    const propertyId = req.params.id
           const payload = req.body
            
        if (!propertyId) {
        throw new Error( " Property asset tracking identifier is required");
    }
if (payload.rating === undefined || payload.rating === null) {
        throw new Error("Validation Error: Rating metric score is mandatory");
    }
    const ratingNumber = Number(payload.rating)
    if (isNaN(ratingNumber) || ratingNumber < 1 || ratingNumber > 5) {
        throw new Error("Validation Error: Rating value must be an integer bound between 1 and 5");
    }
const result = await reviewService.giveReview(propertyId as string,userId as string,{rating:ratingNumber,comment:payload.comment})
    sendResponse(res,{
                success:true,
                statusCode:StatusCodes.OK,
                message: 'Your evaluation feedback has been processed successfully',
                data: result
            })


})
export const reviewController ={
    giveReview
}