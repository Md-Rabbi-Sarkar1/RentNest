import { Router } from "express";
import { rentalController } from "./rental.controller";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();
router.get('/',auth( Role.TENANT),rentalController.getAllRentalReqest)
router.post('/:postId',auth(Role.TENANT),rentalController.rentalRequest)

router.get('/:id',auth(Role.TENANT,),rentalController.getAllRentalReqestByRentalId)
export const rentalRouter = router;