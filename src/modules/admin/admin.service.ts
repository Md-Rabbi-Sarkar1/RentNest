import { ActiveStatus } from "../../../generated/prisma/enums"
import { prisma } from "../../lib/prisma"
import { ICategory } from "./interface"


const getAllUser = async()=>{
const result = await prisma.user.findMany()
return result
}

const changeUserStatus=async(userId : string,status:ActiveStatus)=>{
 const result = await prisma.user.update({
    where:{
        id: userId
    },
    data:{
        activeStatus:status
    }
 })
 return result
}
const getAllProperties =async()=>{
const result = await prisma.property.findMany()
return result
}
const getAllRentals=async()=>{
const result = await prisma.rentalRequest.findMany()
return result
}
const postCategory = async (payload :ICategory)=>{
    const result = await prisma.category.create({
        data:{
            name:payload.name as string
        }
        
    })
    return result
}
export const adminService ={
    getAllUser,
    changeUserStatus,
    getAllProperties,
        getAllRentals,
        postCategory

}