import { Router } from "express";
import {
  createBook,
  deleteBook,
  editBook,
  findBooks,
  getLatestBook,
} from "../controller/books";
import { getLatestBookId } from "../database/books";
let latest: number;
getLatestBookId().then((res) => {
  latest = res + 1;
});
const router = Router();
router.get("/all", findBooks);
router.get("/latest", getLatestBook);
router.get("/:id", findBooks);
router.post("/:userID", createBook);
router.put("/:id", editBook);
router.delete("/:id", deleteBook);
router.get("/Selected",)
export default router;
