import { Router } from "express";
import { rentalController } from "./rental.controller";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();
router.post('/:postId',auth(Role.TENANT),rentalController.rentalRequest)
router.get('/',auth(Role.ADMIN, Role.LANDLORD),rentalController.getAllRentalReqest)
router.get('/:id',auth(Role.TENANT, Role.LANDLORD, Role.ADMIN),rentalController.getAllRentalReqestByRentalId)
export const rentalRouter = router;