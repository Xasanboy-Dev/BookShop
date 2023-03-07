import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

export async function Sign(email: string, name: string, password: string) {
  const SECRET = process.env.SECRET;
  const payload = { email, name, password };
  return jwt.sign(payload, SECRET!);
}

export async function Verify(token: string) {
  const SECRET = process.env.SECRET;
  return jwt.verify(token, SECRET!);
}
