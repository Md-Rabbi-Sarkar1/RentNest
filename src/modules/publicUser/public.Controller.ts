import { StatusCodes } from "http-status-codes"
import { catchAsync } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse"
import { publicService } from "./public.service"
import { NextFunction, Request, Response } from "express"

const getAllPost=catchAsync(async (req: Request, res: Response, next: NextFunction) => {
const result = await publicService.getAllPost()
            sendResponse(res, {
                    success: true,
                    statusCode: StatusCodes.OK,
                    message: 'Properties retrive successfully',
                    data: result
                })
    })
export const getPostById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const postId = req.params.id
        const result = await publicService.getPostById(postId as string)
sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Porperty retrive successfully',
        data: result
    })
    })
const getPropertyCategories = catchAsync(async (req: Request, res: Response) => {
  const result = await publicService.getAllCategoriesFromDB();

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Property categories with property fetched successfully",
    data: result,
  });
});

export const publicController={
    getAllPost,
    getPostById,
     getPropertyCategories
}