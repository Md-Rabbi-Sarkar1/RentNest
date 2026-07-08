import { Router } from "express";
import { postController } from "./post.controller";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();
router.post('/properties',auth(Role.LANDLORD),postController.createPost)
router.get('/properties',auth(Role.LANDLORD,Role.ADMIN),postController.getAllPost)
router.get('/requests',auth(Role.LANDLORD),postController.getRentalRequestMyPost)
router.get('/:postId',auth(Role.LANDLORD,Role.ADMIN),postController.getPostById)
router.put('/:postId',auth(Role.LANDLORD),postController.updatePost)
router.delete('/:postId',auth(Role.LANDLORD,Role.ADMIN),postController.deletePost)
router.patch('/:id',auth(Role.LANDLORD),postController.changeRequestState)


export const postRouter= router