import { Router } from "express";
import { getBooks } from "../controller/books";
    
const router = Router()

router.get('/',getBooks)
router.post("/",)


export default router