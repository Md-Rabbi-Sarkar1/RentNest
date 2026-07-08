import { ActiveStatus } from "../../../generated/prisma/enums"
import { prisma } from "../../lib/prisma"
import { ICategory } from "./interface"


const getAllUser = async () => {
    const result = await prisma.user.findMany({
        omit: {
            password: true
        },
        orderBy: {
            createdAt: "desc"
        }
    })
    return result
}

const changeUserStatus = async (userId: string, status: ActiveStatus) => {
    const userExists = await prisma.user.findUnique({ where: { id: userId } });

    if (!userExists) {
        throw new Error("The targeted user account records do not exist");
    }

    const result = await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            activeStatus: status
        },
        omit: {
            password: true
        }
    })
    return result
}
const getAllProperties = async () => {
    const result = await prisma.property.findMany({
        include: {
            category: {
                select: { name: true }
            },
            landlord: { select: { id: true, name: true, email: true } }
        },
        orderBy:{createdAt:"desc"}
    })
    return result
}
const getAllRentals = async () => {
    const result = await prisma.rentalRequest.findMany({
        include:{
            property:{select:{title:true}},
            tenant:{select:{name:true,email:true}}
        },
        orderBy:{createdAt:"desc"}
    })
    return result
}
const postCategory = async (payload: ICategory) => {
    const duplicateCategory = await prisma.category.findUnique({
        where: { name: payload.name }
    });
        if (duplicateCategory) {
        throw new Error("A structural marketplace classification already exists with this exact name");
    }
    const result = await prisma.category.create({
        data: {
            name: payload.name as string
        }

    })
    return result
}
export const adminService = {
    getAllUser,
    changeUserStatus,
    getAllProperties,
    getAllRentals,
    postCategory

}