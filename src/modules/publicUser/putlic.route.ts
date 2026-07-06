import { Router } from "express";
import { publicController } from "./public.Controller";

const router = Router()
router.get('/properties',publicController.getAllPost)
router.get('/properties/:id',publicController.getPostById)
export const publicRouter=router