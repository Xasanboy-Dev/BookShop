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

export async function createBook(
  title: string,
  author: string,
  pageCount: number,
  description: string,
  userID: number,
  image: any
) {
  if (!title || !author || !pageCount || !image || !description) {
    alert("You must to fill all the gaps");
    return;
  } else {
    const result = await axios.post(`http://localhost:8080/books/${userID}`, {
      page: pageCount,
      description,
      title,
      author,
    });
    if (result.status !== 201) {
      console.log(result.data);
      alert("Your book is not added!");
      return;
    } else {
      alert("Added succesfully!");
    }
  }
}
