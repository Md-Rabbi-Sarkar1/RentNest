import { Router } from "express";
import { adminController } from "./admin.controller";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";

const router=Router()
router.get('/users',auth(Role.ADMIN),adminController.getAllUser)
router.patch('/users/:id',auth(Role.ADMIN),adminController.changeUserStatus)
router.get('/properties',auth(Role.ADMIN),adminController.getAllProperties)
router.get('/rentals',auth(Role.ADMIN),adminController.getAllRentals)
router.post('/category',auth(Role.ADMIN),adminController.postCategory)
export const adminRouter = router;