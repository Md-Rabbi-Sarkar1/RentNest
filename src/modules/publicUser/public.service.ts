import { prisma } from "../../lib/prisma"

const getAllPost = async ()=>{
   const result = await prisma.property.findMany()
return result
}
const getPostById= async(postId:string)=>{
    const result = await prisma.property.findUniqueOrThrow({
        where:{
            id:postId
        }
    })
    return result
}
export const publicService = {
    getAllPost,
    getPostById
}