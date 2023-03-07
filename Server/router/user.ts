import { Router } from "express";
import {
  createUser,
  getUsers,
  editUser,
  deleteUserByID,
  LoginUser,
} from "../controller/user";

const router = Router();

router.get("/", getUsers);
router.post("/register", createUser);
router.post("/login", LoginUser);
router.put("/:id", editUser);
router.delete("/:id", deleteUserByID);

export default router;
