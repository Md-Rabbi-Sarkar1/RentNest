import { stringify } from "node:querystring"
import { prisma } from "../../lib/prisma"
import { IPost } from "../post/interface"
import { IRview } from "./interface"

const giveReview = async (propertyId:string,userId:string,payload:IRview)=>{
    const {rating,comment}=payload 
    console.log(payload,userId,propertyId)
    
    const approvedBooking = await prisma.rentalRequest.findFirst({
    where:{
       propertyId,
       tenantId:userId,
        status:"ACCEPTED"
    }  
})
    if (!approvedBooking) {
        throw new Error("UNAUTHORIZED_REVIEW");
    }
     const result = await prisma.review.create({
        data: {
            rating: Number(rating),
            comment: comment ?? "",
            tenant: {
                connect: { id: userId } // ইউজারের মেইন আইডির সাথে সরাসরি কানেক্ট করবে
            },
            property: {
                connect: { id: propertyId } // প্রপার্টির মেইন আইডির সাথে সরাসরি কানেক্ট করবে
            }
        }
    });

    return result;
}
export const reviewService = {
    giveReview
}