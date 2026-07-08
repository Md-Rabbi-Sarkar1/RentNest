import { StatusCodes } from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { rentalService } from "./rental.service";
import { NextFunction, Request, Response } from "express";

const rentalRequest = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    const propertyId = req.params.postId 
    if(!propertyId){
        throw new Error("Property id required in params")
    }
    const userId = req.user?.id
    const result= await rentalService.rentalRequest(propertyId as string,userId as string)
        sendResponse(res,{
            success:true,
            statusCode:StatusCodes.OK,
            message: 'Rental request successfully',
            data: result
        })
})
const getAllRentalReqest = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{

    const result= await rentalService.getAllRentalRequest()
        sendResponse(res,{
            success:true,
            statusCode:StatusCodes.OK,
            message: 'Rental request retrive successfully',
            data: result
        })
})

const getAllRentalReqestByRentalId = catchAsync(async(req,res)=>{
    const id = req.params.id
    if (!id) {
        throw new Error( "Target tracking request ID parameter required");
    }
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