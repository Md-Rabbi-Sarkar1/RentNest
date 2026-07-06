import { StatusCodes } from "http-status-codes"
import { catchAsync } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse"
import { publicService } from "./public.service"

const getAllPost=catchAsync(async (req,
    res) => {
const result = await publicService.getAllPost()
            sendResponse(res, {
                    success: true,
                    statusCode: StatusCodes.OK,
                    message: 'Rental request retrive successfully',
                    data: result
                })
    })
export const getPostById = catchAsync(async (req,
    res) => {
        const postId = req.params.id
        const result = await publicService.getPostById(postId as string)
sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Post retrive successfully',
        data: result
    })
    })
export const publicController={
    getAllPost,
    getPostById
}