import express from "express";

import { showAllUsers, getUserById, createUser, updateUser, deleteUser } from "../controllers/user.js";
import { loginUser, registerUser } from "../controllers/login.js";

const router = express.Router();

router.get("/users", showAllUsers);
router.get("/users/:id", getUserById);
router.post("/users", createUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

router.post("/login", loginUser);
router.post("/register", registerUser);

export default router;