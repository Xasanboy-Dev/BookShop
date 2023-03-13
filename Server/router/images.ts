import { Router } from "express";
import { Request, Response } from "express";
import multer from "multer";
import { postImageFromUser } from "../controller/image";
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

const uploadImages = multer({ storage: image });

router.post("/", uploadImages.single("avatar"), postImageFromUser);

export default router;
