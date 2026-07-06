import { StatusCodes } from "http-status-codes";

import { NextFunction, Request,  Response } from "express";

import { userService } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

import { Role } from "../../../generated/prisma/enums";

declare global {
    namespace Express {
        interface Request {
            user?: {
                email: string;
                name: string;
                id: string,
                role: Role

            }
        }
    }
}

const registerUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body
    const user = await userService.createUserIntoDB(payload)
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "User registered successfull",
        data: {
            user
        }
    })
})

const getMyProfile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    //    console.log(req.user,'user request')
    const profile = await userService.getMyProfileFromDB(req.user?.id as string)
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'User profile fectched successfully',
        data: { profile }
    })
})
const updateProfile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id as string
    const payload = req.body
    const updateProfile = await userService.updateMyprofileInDB(userId, payload);
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "user profile update",
        data: { updateProfile }
    })
})

export const userController = {
    registerUser,
    getMyProfile,
    updateProfile
}