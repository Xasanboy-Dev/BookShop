import axios from "axios";

export async function getBooks() {
  const response = await axios.get(`http://localhost:8080/books`);
  return response.data.books;
}
