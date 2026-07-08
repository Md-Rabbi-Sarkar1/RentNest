import { connect } from "node:http2"
import { RequestStatus } from "../../../generated/prisma/enums"
import { PropertyWhereInput } from "../../../generated/prisma/models"
import { prisma } from "../../lib/prisma"
import { IPost, IPQuery, IUpdatePost } from "./interface"

const createPostIntoDB = async (payload: IPost, userId: string) => {
    const {categoryId,...restPayload}=payload

    const result = await prisma.property.create({
        data: {
            ...restPayload,
            landlordId: userId,
            categoryId:categoryId
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
            category:{select:{name:true}},
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


        const result = await prisma.property.findUniqueOrThrow({
            where: {
                id: postId,
            },
            include: {
                landlord: {
                    select:{id: true, name: true, email: true}
                },
                category:true,
                reviews:true
    
                }
            
        })
        
  return result

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
        include: { category: { select: { name: true } } }
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
            property:{select: { id: true, title: true }},
            tenant:{
                select:{
                    id:true,name: true, email: true
                }
            }
        }
    })
    return result
}

const changeRequestState = async(requestId:string,status:RequestStatus,userId:string)=>{
    const request = await prisma.rentalRequest.findUnique({
        where: { id: requestId },
        include: { property: true }
    });
        if (!request) {
        throw new Error("The incoming tenant booking request records are absent");
    }
    if (request.property.landlordId !== userId) {
        throw new Error(" Alteration commands matching current owner profile invalid");
    }
    const result = await prisma.rentalRequest.update({
        where:{
            id: requestId,
            
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