import axios from "axios";
import { Author } from "../modules/module";

export async function getAuthor() {
  const response = await axios.get(`http://localhost:8080/author`);
  return response.data.authors;
}

export async function deleteAuthor(author: Author, userID: number) {
  if (author.createdUser !== userID) {
    alert("You cann't delete someone's author!")
    return
  } else {
    const response = await axios.delete(`http://localhost:8080/author/${userID}`, { headers: { Authorization: author.id } })
    alert(response.data.message)
    window.location.href = '/author'
  }
}