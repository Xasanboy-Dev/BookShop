import { user } from "@prisma/client";
import axios from "axios";

export async function saveDataUser(
  name: string,
  surname: string,
  email: string,
  password: string,
  user: user
) {
  if (
    user.name !== name ||
    user.surname !== surname ||
    user.password !== password ||
    user.email !== email
  ) {
    const response = await axios.put(`http://localhost:8080/user/${user.id}`, {
      email,
      password,
      name,
      surname,
    });
    alert(response.data.message);
  } else {
    return;
  }
}
