
import { userController } from "./user.controller";

import { Role } from "../../../generated/prisma/enums";


import { Router } from "express";
import { authRouter } from "../auth/auth.route";
import { auth } from "../../middleware/auth";

const router = Router()

router.post('/register', userController.registerUser)

router.get('/me',
    auth(Role.TENANT, Role.LANDLORD, Role.ADMIN), 
    userController.getMyProfile)
router.put('/my-profile',auth(Role.TENANT, Role.LANDLORD, Role.ADMIN),userController.updateProfile)
export const userRouter = router