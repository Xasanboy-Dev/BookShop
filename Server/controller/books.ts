import { Request, Response } from "express";

export async function getBooks(req: Request, res: Response) {
    try {
  console.log(`GETTING BOOKS`)
    } catch (error:any) {
        console.log(error.message)
        res.status(500).json({message:"Internal error"})
    }
}

export async function createBook(req: Request, res: Response) {
    try {
        
    } catch (error:any) {
        console.log(error.message)
        res.status(500).json({message:"Internal error"})
    }
}