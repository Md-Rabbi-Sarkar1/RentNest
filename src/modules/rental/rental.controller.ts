import { StatusCodes } from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { rentalService } from "./rental.service";

const rentalRequest = catchAsync(async(req,res)=>{
    const propertyId = req.params.postId 
    if(!propertyId){
        throw new Error("Property id required in params")
    }
    const userId = req.user?.id
    const result= await rentalService.rentalRequest(propertyId as string,userId as string)
        sendResponse(res,{
            success:true,
            statusCode:StatusCodes.OK,
            message: 'Make request successfully',
            data: result
        })
})
const getAllRentalReqest = catchAsync(async(req,res)=>{

    const result= await rentalService.getAllRentalRequest()
        sendResponse(res,{
            success:true,
            statusCode:StatusCodes.OK,
            message: 'Rental retrive successfully',
            data: result
        })
})

const getAllRentalReqestByRentalId = catchAsync(async(req,res)=>{
    const id = req.params.id
    const result= await rentalService.getAllRentalRequestRentalId(id as string)
        sendResponse(res,{
            success:true,
            statusCode:StatusCodes.OK,
            message: 'Rental details retrive successfully',
            data: result
        })
})
export const rentalController = {
    rentalRequest,
    getAllRentalReqest,
   getAllRentalReqestByRentalId
}