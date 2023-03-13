import { Router } from "express";
import multer from "multer";
import { Request } from "express";
import {
  createBook,
  deleteBook,
  editBook,
  findBooks,
} from "../controller/books";
import { getLatestBookId } from "../database/books";
let latest: number;
getLatestBookId().then((res) => {
  latest = res + 1;
});
const router = Router();
router.get("/", findBooks);
router.post("/:userID", createBook);
router.put("/:id", editBook);
router.delete("/:id", deleteBook);

export default router;
