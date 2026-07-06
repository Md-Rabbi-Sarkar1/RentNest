
import bcrypt from "bcrypt"


import { prisma } from "../../lib/prisma";
import { createUserPayload } from "./interface";
import config from "../../config";
// import { Prisma } from "../../generated/prisma/client";
const createUserIntoDB = async (payload: createUserPayload) => {
    const { name, email, password, profilePhoto } = payload;
    const isUserExist = await prisma.user.findUnique({
        where: { email }
    })
    if (isUserExist) {
        throw new Error("User with this email already exists")
    }
    const hashedPassword = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds))
    const creatUser = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            profile: {
                create: {
                    profilePhoto
                }
            }
        }
    })
    const user = await prisma.user.findUnique({
        where: {
            id: creatUser.id,
            email: creatUser.email || email
        },
        omit: {
            password: true
        },
        include: { profile: true }

    })
    return user
}
const getMyProfileFromDB = async (userId: string) => {
    const user = await prisma.user.findUniqueOrThrow({
        where: {
            id: userId
        },
        omit: {
            password: true
        },
        include: {
            profile: true
        }
    })
    return user
}
const updateMyprofileInDB = async (userId: string, payload: any) => {
    const { name, email, profilePhoto, bio } = payload;
    const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
            name,
            email,
            profilePhoto,
            profile: {
                update: {
                    where:{id:userId},
                    data:{ profilePhoto}
                   
                }
            }
        },
        omit: {
            password: true
        },
        include: {
            profile: true
        }
    })
    return updatedUser
}
export const userService = {
    createUserIntoDB,
    getMyProfileFromDB,
    updateMyprofileInDB
}