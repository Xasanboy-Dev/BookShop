import { Router } from "express";
import {
  createBook,
  deleteBook,
  editBook,
  findBooks,
} from "../controller/books";

const router = Router();

router.get("/", findBooks);
router.post("/:userID", createBook);
router.put("/:id", editBook);
router.delete("/:id", deleteBook);

export default router;
