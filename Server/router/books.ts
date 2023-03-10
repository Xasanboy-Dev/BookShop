import { Router } from "express";
import multer from "multer";
import { Request } from "express";
import {
  createBook,
  deleteBook,
  editBook,
  findBooks,
} from "../controller/books";

const router = Router();
const storage = multer.diskStorage({
  destination: (req: Request, file: any, cb: any) => {
    cb(null, "uploads");
  },
  filename: (req: Request, file: any, cb) => {
    cb(null, `${Date.now()}-${req.body.author}.png`);
  },
});
const uploadImage = multer({ storage });
router.get("/", findBooks);
router.post("/:userID", uploadImage.single('avatar'), createBook);
router.put("/:id", editBook);
router.delete("/:id", deleteBook);

export default router;
