import { Router } from "express";
import {
  createUser,
  getUsers,
  editUser,
  deleteUserByID,
  LoginUser,
  checkToken,
  getUserByEmail,
} from "../controller/user";

const router = Router();

router.get("/", getUsers);
router.post("/register", createUser);
router.post("/login", LoginUser);
router.put("/:id", editUser);
router.delete("/:id", deleteUserByID);
router.post("/token", checkToken);
router.get("/:email", getUserByEmail)

export default router;
