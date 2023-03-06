import { Request, Response } from "express";
import {
  checkAuthorByName,
  checkAuthorExist,
  deleteAuthor,
  findAuthors,
  postAuthor,
  renameAuthor,
} from "../database/author";
import { checkUserExist } from "../database/user";

export async function getAuthors(req: Request, res: Response) {
  try {
    const authors = await findAuthors();
    res.status(200).json({ message: "All authors", authors });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: "Internal error" });
  }
}

export async function createAuthor(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const user = await checkUserExist(+id);
    if (!user) {
      return res.status(404).json({ message: "You must to login!" });
    }
    const { name } = req.body;
    const checkName = await checkAuthorByName(name);
    if (!checkName) {
      const author = await postAuthor(user.id, name);
      return res.status(201).json({ message: "Created succesfully", author });
    }
    res.status(409).json({ message: "Your author is already exist!" });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: "Internal error" });
  }
}

export async function editAuthor(req: Request, res: Response) {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({ messahe: "You must to login!" });
    }
    const user = await checkUserExist(+id);
    if (!user) {
      return res.status(404).json({ messahe: "You must to login!" });
    }
    const { authorID, name } = req.body;
    if (!authorID) {
      return res.status(404).json({ message: "Your author is not exist!" });
    }
    const author = await checkAuthorExist(+authorID);
    if (!author) {
      return res.status(404).json({ message: "Your author is not exist!" });
    }
    if (author.createdUser !== +id) {
      return res
        .status(409)
        .json({ message: "You cann't edit another user's author!" });
    }
    const editingName = await checkAuthorByName(name);
    if (editingName) {
      return res
        .status(409)
        .json({
          message:
            "Your author is already exist. You must to rename to another one!",
        });
    }
    const editedAuthor = await renameAuthor(+id, name);
    res.status(200).json({
      message: "Upodated succesfully!",
      author: editedAuthor,
    });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: "Internal error" });
  }
}

export async function deletedAuthor(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const user = await checkUserExist(+id);
    if (!user) {
      return res
        .status(404)
        .json({ message: "You can n't remove someone's author!" });
    }
    const { authorID } = req.body;
    const author = await checkAuthorExist(+authorID);
    if (!author) {
      return res.status(404).json({
        message: "Your author is not exist! Please check and try again later!",
      });
    }
    if (author.createdUser !== user.id) {
      if (!user) {
        return res
          .status(404)
          .json({ message: "You can n't remove someone's author!" });
      }
    }
    const deletedAuthor = await deleteAuthor(+authorID);
    if (!deletedAuthor) {
      return res.status(500).json({ message: "You have some problems!" });
    }
    res.status(200).json({ message: "Deleted author!", deletedAuthor });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: "Internal error" });
  }
}
