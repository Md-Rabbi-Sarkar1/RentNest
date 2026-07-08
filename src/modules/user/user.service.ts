
import bcrypt from "bcrypt"


import { prisma } from "../../lib/prisma";
import { createUserPayload, IUpdateUser } from "./interface";
import config from "../../config";
import { Role } from "../../../generated/prisma/enums";
const createUserIntoDB = async (payload: createUserPayload) => {
    const { name, email, password, profilePhoto,role } = payload;
    if ((role as unknown) === Role.ADMIN) {
    throw new Error(
        "You don't register as a admin"
    );
  }
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
            role,
            profile: {
                create: {
                    profilePhoto:profilePhoto ||'',
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
const updateMyprofileInDB = async (userId: string, payload: IUpdateUser) => {
    const { name, email, profilePhoto, bio } = payload;
    const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
            name,
            email,
            profilePhoto,
            profile: {
                update: {
                   
                    data:{ profilePhoto , bio}
                   
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