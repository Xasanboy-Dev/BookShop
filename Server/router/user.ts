import { Router } from "express";
import { createUser, getUsers } from "../controller/user";
import editUser from "../router/user";

const router = Router();

router.get("/", getUsers);
router.post("/", createUser);
router.put("/:id", editUser);
router.delete("/:id",)

export default router;
