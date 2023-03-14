import { Router } from "express";
import { Request } from "express";
import multer from "multer";
import { createBook, editBook } from "../controller/books";
import { postImageFromUser } from "../controller/image";
import { getLatestBookId } from "../database/books";
const router = Router();

export const image = multer.diskStorage({
  destination: (req: Request, file: any, cb: any) => {
    cb(null, "uploads");
  },
  filename: (req: Request, file: any, cb) => {
    let id = req.headers.authorization;
    cb(null, id + ".png");
  },
});

export const uploadBookImage = multer.diskStorage({
  destination: (req: Request, file: any, cb: any) => {
    cb(null, "uploadBooks");
  },
  filename: (req: Request, file: any, cb) => {
    const id = req.headers.accept;
    cb(null, "books" + (Number(id) + 1) + ".png");
  },
});
const uploadImages = multer({ storage: image });

const uploadProfileImages = multer({ storage: uploadBookImage });
router.post("/", uploadImages.single("avatar"), postImageFromUser);

router.post("/books/:userID", uploadProfileImages.single("avatar"), createBook);

const updateBookImage = multer({
  storage: multer.diskStorage({
    destination: (req: Request, file: any, cb: any) => {
      cb(null, "uploads");
    },
    filename: (req: Request, file: any, cb) => {
      let bookID = req.headers.authorization;
      cb(null, bookID + ".png");
    },
  }),
});
router.put("/books/:userID", updateBookImage.single("avatar"), editBook);

export default router;
