import { async } from "@firebase/util";
import axios from "axios";

export async function getBooks() {
  const response = await axios.get(`http://localhost:8080/books`);
  return response.data.books;
}

export async function removeBook(bookID: number, userID: number) {
  try {
    const deletedBook = await axios.delete(
      "http://localhost:8080/books/" + userID,
      { headers: { Authorization: bookID } }
    );
    if (deletedBook.status !== 200) {
      return `In deleteting books have some problems\nYou need try again later`;
    } else {
      return "Deleted succesfully!";
    }
  } catch (error: any) {
    return `In deleteting books have some problems\nYou need try again later`;
  }
}
