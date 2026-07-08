import { Router } from "express";
import { reviewController } from "./review.Controller ";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();
router.post('/:id',auth(Role.TENANT),reviewController.giveReview)
export const reviewRouter = router