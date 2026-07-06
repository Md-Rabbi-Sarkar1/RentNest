import { Router } from "express";
import { adminController } from "./admin.controller";

const router=Router()
router.get('/users',adminController.getAllUser)
router.patch('/users/:id',adminController.changeUserStatus)
router.get('/properties',adminController.getAllProperties)
router.get('/rentals',adminController.getAllRentals)
export const adminRouter = router;