import { StatusCodes } from "http-status-codes"
import { catchAsync } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse"
import { reviewService } from "./review.service"
import { IRview } from "./interface"

const giveReview = catchAsync(async(req,res)=>{
      const userId = req.user?.id
    const propertyId = req.params.id
           const payload = req.body
            
    
console.log(userId)

const result = await reviewService.giveReview(propertyId as string,userId as string,payload)
    sendResponse(res,{
                success:true,
                statusCode:StatusCodes.OK,
                message: 'Your review sent successfully',
                data: result
            })


})
export const reviewController ={
    giveReview
}