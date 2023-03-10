import { Request, Response } from "express";
import { Sign, Verify } from "../database/token";
import {
  checkUserByEmail,
  getUser,
  addUser,
  checkUserExist,
  updatedUserByID,
  deleteUser,
} from "../database/user";

export async function getUsers(req: Request, res: Response) {
  try {
    const users = await getUser();
    res.status(200).json({ message: "All users", users });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: "Internal error" });
  }
}

export async function createUser(req: Request, res: Response) {
  try {
    const { name, surname, email, password } = req.body;
    const user = await checkUserByEmail(email);
    if (user) {
      return res.status(409).json({ message: "You have already registered!" });
    }
    const addedUser = await addUser(name, surname, email, password.toString());
    res.status(201).json({
      message: "Created succesfully",
      user: addedUser,
    });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: "Internal error" });
  }
}

export async function editUser(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const user = await checkUserExist(+id);
    if (!user) {
      return res.status(404).json({ message: "You must to login!" });
    }
    const { name, surname, email, password } = req.body;
    const data = {
      name: name ? name : user.name,
      surname: surname ? surname : user.surname,
      email: email ? email : user.email,
      password: password ? password : user.password,
      userID: user.id,
    };
    const updatedUser = await updatedUserByID(data);
    res
      .status(200)
      .json({ message: "Updated succesfully!", user: updatedUser });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: "Internal error" });
  }
}

export async function deleteUserByID(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const user = await checkUserExist(+id);
    if (!user) {
      return res.status(500).json({ message: "Internal error" });
    }
    const deletedUser = await deleteUser(+id);
    res.status(200).json({ message: "Deleted succesfully", user: deletedUser });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: "Internal errir" });
  }
}

export async function LoginUser(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const user = await checkUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "Your email is not exist!" });
    }
    if (user.password !== password) {
      return res
        .status(409)
        .json({ message: "You must to input correct data!" });
    }
    const token = await Sign(user.email, user.name, user.password);
    res.status(200).json({ message: "Token", token, userID: user.id });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: "Internal error" });
  }
}

export async function checkToken(req: Request, res: Response) {
  try {
    if (req.body.token) {
      const token = req.body.token;
      const validToken = await Verify(token);
      if (!validToken) {
        return res.status(404).json({ message: "You must to login!" });
      } else {
        return res.status(200).json({ message: "All good!", validToken });
      }
    } else {
      return res.status(404).json({ message: "You must to login!" });
    }
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: "Internal error" });
  }
}
export async function getUserByEmail(req: Request, res: Response) {
  try {
    const { email } = req.params;
    if (Number(email).toString() == "NaN") {
      const user = await checkUserByEmail(email);
      if (!user) {
        return res.status(404).json({ message: "You must to login!" });
      } else {
        return res.status(200).json({ message: "User", user });
      }
    } else {
      const user = await checkUserExist(+email);
      if (!user) {
        return res.status(404).json({ message: "Your user is not exist!" });
      } else {
        res.status(200).json({ message: "User", user });
      }
    }
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: "Internal error" });
  }
}
