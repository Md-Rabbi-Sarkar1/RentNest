import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

const rentalRequest = async(propertyId:string,userId:string)=>{
    const result = await prisma.rentalRequest.create({
        data:{

            propertyId,
            tenantId:userId
        }
    })
}
const getAllRentalRequest = async()=>{
    const result = await prisma.rentalRequest.findMany({
        include:{
            payments:true
        }
    })
    return result
}
const getAllRentalRequestRentalId = async(id:string)=>{
const result = await prisma.rentalRequest.findUniqueOrThrow({
    where:{
        id
    },
    include:{
        payments:true
    }
})
return result
}
export const rentalService={
    rentalRequest,
    getAllRentalRequest,
    getAllRentalRequestRentalId
}