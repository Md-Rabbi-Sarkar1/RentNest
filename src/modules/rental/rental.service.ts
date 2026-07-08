import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

const rentalRequest = async(propertyId:string,userId:string)=>{
        const property = await prisma.property.findUnique({
        where: { id: propertyId }
    });
        if (!property) {
        throw Error("The requested rental property listing does not exist");
    }
       if (!property.isAvailable) {
        throw new Error( "This property listing is not currently accepting booking requests");
    }
    const result = await prisma.rentalRequest.create({
        data:{

            propertyId,
            tenantId:userId,
            totalAmount:property.price
        },
        include:{
            property:{
                select:{
                    title:true
                }
            }
        }
    })
    return result
}
const getAllRentalRequest = async()=>{
    const result = await prisma.rentalRequest.findMany({
        include:{
            payments:true,
            property:{select:{title:true,address:true}},
            tenant:{select:{name:true,email:true}}  
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
        payments:true,
        property:true,
        tenant:{select:{id:true,name:true,email:true}}
    }
})
return result
}
export const rentalService={
    rentalRequest,
    getAllRentalRequest,
    getAllRentalRequestRentalId
}