import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import config from "../config";
import { jwtUtils } from "../utils/jwt";
import { JwtPayload } from "jsonwebtoken";
import { prisma } from "../lib/prisma";
import { Role } from "../../generated/prisma/enums";

export const auth = (...requiredRoles: Role[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.cookies.accessToken ?
            req.cookies.accessToken
            :
            req.headers.authorization?.startsWith("Bearer ") ?
                req.headers.authorization.split(" ")[1]
                : req.headers.authorization
        if (!token) {
            throw new Error("your are not loged in")
        }
        const verifiedToken = await jwtUtils.veryfyToken(token, config.jwt_access_secret);
        if (!verifiedToken.success) {
            throw new Error(verifiedToken.error);
        }
        const { email, name, id, role } = await verifiedToken.data as JwtPayload
        if (!requiredRoles.length && !requiredRoles.includes(role)) {
            throw new Error("forbidden")
        }
        const user = await prisma.user.findUnique({
            where: {
                id,
                email,
                name,
                role
            }
        })
        if (!user) {
            throw new Error("User not found")
        }
        if (user.activeStatus === "BLOCKED") {
            throw new Error("Your account has been blocked")
        }
        req.user = {
            email,
            name,
            id,
            role
        }
        next()
    })
}