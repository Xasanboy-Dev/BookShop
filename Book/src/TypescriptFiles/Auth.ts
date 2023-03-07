import axios from "axios";

export function RegisterFile(
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

  axios.
}
