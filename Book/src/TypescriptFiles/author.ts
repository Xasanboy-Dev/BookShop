import axios from "axios";

export async function getAuthor() {
  const response = await axios.get(`http://localhost:8080/author`);
  return response.data.authors;
}
