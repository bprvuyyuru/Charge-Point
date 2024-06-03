import express from "express";
import { createUser, getUser } from "../controllers/auth.controller.js";

const router = express.Router();

router.post('/signIn', getUser);
router.post('/signUp', createUser);

export default router;