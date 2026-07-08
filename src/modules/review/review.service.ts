import { stringify } from "node:querystring"
import { prisma } from "../../lib/prisma"
import { IPost } from "../post/interface"
import { IRview } from "./interface"
import { RequestStatus } from "../../../generated/prisma/enums"

const giveReview = async (propertyId:string,userId:string,payload:IRview)=>{
    const {rating,comment}=payload 
    
    const approvedBooking = await prisma.rentalRequest.findFirst({
    where:{
       propertyId,
       tenantId:userId,
        status: RequestStatus.COMPLETED
    }  
})
if(!approvedBooking){
     throw new Error("You must complete a rental agreement transaction for this property to post reviews")
}
    if (!approvedBooking) {
        throw new Error("UNAUTHORIZED_REVIEW");
    }
     const result = await prisma.review.create({
        data: {
            rating: Number(rating),
            comment: comment ?? "",
            tenantId:userId,
            propertyId
        },
        include: {
            property: { select: { title: true } },
            tenant: { select: { name: true } }
        }
    });

    return result;
}
export const reviewService = {
    giveReview
}