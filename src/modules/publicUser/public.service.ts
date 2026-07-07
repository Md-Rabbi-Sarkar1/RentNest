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
const getAllCategoriesFromDB = async ()=> {
  
const categories = await prisma.category.findMany({
    include:{
        properties:true
    },
  orderBy: {
    name: 'asc' 
  }
});
return categories
};

export const publicService = {
    getAllPost,
    getPostById,
     getAllCategoriesFromDB
}