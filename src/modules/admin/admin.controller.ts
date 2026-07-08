import { StatusCodes } from "http-status-codes"
import { catchAsync } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse"
import { NextFunction, Request, Response } from "express"
import { adminService } from "./admin.service"
import { ICategory } from "./interface"

const getAllUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const result= await adminService.getAllUser()
        sendResponse(res,{
            success:true,
            statusCode:StatusCodes.OK,
            message:"All marketplace platform users retrieved successfully",
            data: result
        })
    })
const changeUserStatus=catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.params.id
        const status = req.body.status
const result = await adminService.changeUserStatus(userId as string,status);
        sendResponse(res,{
            success:true,
            statusCode:StatusCodes.OK,
            message:"User stats change succefully",
            data: result
        })
    })
    const getAllProperties=catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
 const result = await adminService.getAllProperties()

        sendResponse(res,{
            success:true,
            statusCode:StatusCodes.OK,
            message:"User stats change succefully",
            data: result
        })
    })
    const getAllRentals=catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {

        const result = await adminService.getAllRentals()
        sendResponse(res,{
            success:true,
            statusCode:StatusCodes.OK,
            message:"Rentals retrive succefully",
            data: result
        })
    })
    const postCategory =catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const payload = req.body
        const result = await adminService.postCategory(payload )
        sendResponse(res,{
            success:true,
            statusCode:StatusCodes.OK,
            message:"post succefully",
            data: result
        })
    })
    export const adminController ={
        getAllUser,
        changeUserStatus,
        getAllProperties,
        getAllRentals,
        postCategory

    }