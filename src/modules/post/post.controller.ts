import { Request } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse"
import { StatusCodes } from "http-status-codes"
import { postService } from "./post.service"
import { IPQuery } from "./interface"
import { prisma } from "../../lib/prisma"

const createPost = catchAsync(async (req, res) => {
    const id = req.user?.id
    console.log(id)
    const payload = req.body
    const result = await postService.createPostIntoDB(payload, id as string)
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "Post created successfully",
        data: result
    })
})

const getAllPost = catchAsync(async (req, res) => {
    const query = req.query
    console.log(query)
    const result = await postService.getAllPost(query as IPQuery);
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'post retrive successfully',
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
        message: 'post retrive successfully',
        data: result
    })
})
const updatePost = catchAsync(async (req, res) => {
    const authorId = req.user?.id
    // const islanLord = req.user?.role === "LANLORD"
    const postId = req.params.postId
    if (!postId) {
        throw new Error("Post id required in params")
    }
    const payload = req.body
    const result = await postService.updatePost(postId as string, payload, authorId as string)
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'post updated successfully',
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
        message: 'post delete successfully',
        data: null
    })
})

const getRentalRequestMyPost = catchAsync(async (req, res) => {
    const userId = req.user?.id
    console.log(userId)
    const result = await postService.getRentalRequestMyPost(userId as string)

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Rental request retrive successfully',
        data: result
    })
})

const changeRequestState = catchAsync(async (req,
    res) => {
    const requsestId = req.params.id
    const userId= req.user?.id
    const status=req.body.status
    const result = await postService.changeRequestState(requsestId as string,status,userId as string, )
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Rental request retrive successfully',
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