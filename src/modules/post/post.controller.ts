import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse"
import { StatusCodes } from "http-status-codes"
import { postService } from "./post.service"
import { IPQuery } from "./interface"
import { prisma } from "../../lib/prisma"

const createPost = catchAsync(async (req, res) => {
    const id = req.user?.id
    const payload = req.body
    const result = await postService.createPostIntoDB(payload, id as string)
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "Property listing created successfully",
        data: result
    })
})

const getAllPost = catchAsync(async (req, res) => {
    const query = req.query
    const result = await postService.getAllPost(query as IPQuery);
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Landlord property portfolio inventory retrieved successfully',
        data: result.data,
        meta: result.meta
    })
})
const getPostById = catchAsync(async (req, res) => {
    const postId = req.params.postId
    if (!postId) {
        throw new Error("Post id required in params")
    }
    const result = await postService.getPostById(postId as string)
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Property listing matching target reference ID successfully found',
        data: result
    })
})
const updatePost = catchAsync(async (req, res) => {
    const authorId = req.user?.id
  
    const postId = req.params.postId
    if (!postId) {
        throw new Error("Post id required in params")
    }
    const payload = req.body
    const result = await postService.updatePost(postId as string, payload, authorId as string)
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Property listing profile metadata refreshed successfully',
        data: result
    })
})
const deletePost = catchAsync(async (req, res) => {
    const authorId = req.user?.id
    const isAdmin = req.user?.role === "ADMIN"
    const postId = req.params.postId
    if (!postId) {
        throw new Error("Post id required in params")
    }
    await postService.deletePost(postId as string, authorId as string, isAdmin)
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Property listing records wiped out from active marketplace systems',
        data: null
    })
})

const getRentalRequestMyPost = catchAsync(async (req:Request, res:Response,next:NextFunction) => {
    const userId = req.user?.id
    const result = await postService.getRentalRequestMyPost(userId as string)

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Incoming requests matching Landlord property queue pulled successfully',
        data: result
    })
})

const changeRequestState = catchAsync(async (req,
    res) => {
    const requsestId = req.params.id
    const userId= req.user?.id
    const status=req.body.status
      if (!requsestId || !status) {
        throw new Error(" Both tracking ID and status mutation string parameters are mandatory");
    }
    const result = await postService.changeRequestState(requsestId as string,status,userId as string, )
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Tenant booking tracking status altered successfully',
        data: result
    })
})

export const postController = {
    createPost,
    getAllPost,
    getPostById,
    updatePost,
    deletePost,
    getRentalRequestMyPost,
    changeRequestState
}