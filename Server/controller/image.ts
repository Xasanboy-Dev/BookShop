import { Request, Response } from "express";
import { editImageURL } from "../database/image";
import { checkUserExist } from "../database/user";


export async function postImageFromUser(req: Request, res: Response) {
  try {
    const id = req.headers.authorization;
    if (!id) {
      return res.status(404).json({
        message: "Your id is not exist!. Please check and try again later!",
      });
    }
    const user = await checkUserExist(+id);
    if (!user) {
      return res.status(404).json({
        message: "Your id is not exist!. Please check and try again later!",
      });
    } else {
      const edited = await editImageURL(+id);
      return res.status(200).json({ message: "Uploaded succesfully!" });
    }
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: "Internal error" });
  }
}
