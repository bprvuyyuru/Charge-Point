import express from "express";
import {
  createUser,
  getAllUsers,
  getUser,
} from "../controllers/user.controller.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/signIn", getUser);
router.post("/signUp", createUser);
router.get("/all", auth, getAllUsers);

export default router;
