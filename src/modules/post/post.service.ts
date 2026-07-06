import { RequestStatus } from "../../../generated/prisma/enums"
import { PropertyWhereInput } from "../../../generated/prisma/models"
import { prisma } from "../../lib/prisma"
import { IPost, IPQuery, IUpdatePost } from "./interface"

const createPostIntoDB = async (payload: IPost, userId: string) => {
    const user = await prisma.user.findUniqueOrThrow({
        where:{
            id:userId
        }
        
    })

    const result = await prisma.property.create({
        data: {
            ...payload,
            landlordId: userId
        }
    })
    return result
}

const getAllPost = async (query: IPQuery) => {
    const limit = query.limit? Number(query.limit):1;
    const page = query.page? Number(query.page):1;
    const skip = (page -1) *limit;
    const sortBy = query.sortBy?query.sortBy:"price";
    const sortOrder = query.sortOrder?query.sortOrder:"desc";
    const andCondition : PropertyWhereInput[] = []
    if(query.searchTerm){
        andCondition.push({
            OR:[
                {
                            title:{
                                contains:query.searchTerm,
                                mode:"insensitive"
                            }
                        
                        },
                        {
                                description:{
                                contains:query.searchTerm,
                                mode:"insensitive"
                            }
                        }
            ]
        })
    }

const post = await prisma.property.findMany({

        
        where:{
            AND:andCondition
        },
        take:limit,
        skip:skip,
        orderBy:{
            [sortBy]:sortOrder
        },
        include: {
            landlord: {
                omit: {
                    password: true
                }
            },
            reviews: true
        }
    })
    const totalPostCount = await prisma.property.count({
        where:{
            AND:andCondition
        }
    })
    return {
        data:post,
        meta:{
            page:page,
            limit:limit,
            total:totalPostCount,
            totalPages: Math.ceil(totalPostCount/limit)
        }
    }
}
const getPostById = async (postId: string) => {


//         const result = await prisma.property.findUniqueOrThrow({
//             where: {
//                 id: postId,
//             },
//             include: {
//                 landlord: {
//                     omit: {
//                         password: true
//                     }
//                 }
    
//                 }
            
//         })
        
//   return result

}
const updatePost = async (postId: string, payload: IUpdatePost, lanlordId: string) => {
    const post = await prisma.property.findUnique({
        where: {
            id: postId
        },
    })
    if (post?.landlordId !== lanlordId) {
        throw new Error('You are not the owner of this post')
    }
    const result = await prisma.property.update({
        where: {
            id: postId
        },
        data: payload,
        include: {
            landlord: {
                omit: {
                    password: true
                }
            }
        }
    })
    return result
}
const deletePost = async (postId: string, authorId: string, isAdmin: boolean) => {
    const post = await prisma.property.findUnique({
        where: {
            id: postId
        },
    })
    if (!isAdmin && post?.landlordId !== authorId) {
        throw new Error('You are not the owner of this post')
    }
    await prisma.property.delete({
        where: {
            id: postId
        }
    })

}

const getRentalRequestMyPost = async(userId:string)=>{
    const result = await prisma.rentalRequest.findMany({
        where:{
            property:{
                landlordId:userId
            }
        },
        include:{
            property:true,
            tenant:{
                select:{
                    id:true,
                }
            }
        }
    })
    return result
}

const changeRequestState = async(requestId:string,status:RequestStatus,userId:string)=>{
    
    const result = await prisma.rentalRequest.update({
        where:{
            id: requestId,
            // property:{
            //     landlordId:userId
            // }
        },
        data:{
            status,
            
        }
    })
    return result
}
export const postService ={
    createPostIntoDB,
    getAllPost,
    getPostById,
    updatePost,
    deletePost,
    getRentalRequestMyPost,
    changeRequestState
}