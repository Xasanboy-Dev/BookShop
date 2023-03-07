import { async } from "@firebase/util";
import axios from "axios";

export async function RegisterFile(
  name: string,
  surname: string,
  email: string,
  password: string
) {
  if (!name || !surname || !email || !password) {
    return alert("You fill all the gaps!");
  }
  if (name.length <= 3 || surname.length <= 3) {
    return alert("Your name or surname is not valid!");
  }
  if (!email.indexOf("@")) {
    return alert("Your email is not valid!");
  }
  if (password.length <= 3) {
    return alert("Your password is not valid!");
  }
  try {
    const response = await axios.post(`http://localhost:8080/user/register`, {
      name,
      surname,
      email,
      password,
    });
    return response.status;
  } catch (error: any) {
    return error.response.status;
  }
}

export async function LoginFile(email: string, password: string) {
  try {
    if (!email.includes("@")) {
      return "Your email is not valid!";
    }
    if (email.length <= 3) {
      return "Your email is not valid!";
    }
    if (password.length <= 2) {
      return "Your password is not valid!";
    }
    const response = await axios.post("http://localhost:8080/user/login", {
      email,
      password,
    });
    if (response.status !== 200) {
      return "Your data is not valid! or not exist!";
    }
    localStorage.setItem(
      "uuid",
      JSON.stringify({ id: response.data.token, userID: response.data.userID })
    );
    return 200;
  } catch (error: any) {
    return error;
  }
}
