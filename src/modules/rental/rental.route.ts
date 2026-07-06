import { Router } from "express";
import { rentalController } from "./rental.controller";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();
router.post('/:postId',auth(Role.LANDLORD),rentalController.rentalRequest)
router.get('/',rentalController.getAllRentalReqest)
router.get('/:id',rentalController.getAllRentalReqestByRentalId)
export const rentalRouter = router;