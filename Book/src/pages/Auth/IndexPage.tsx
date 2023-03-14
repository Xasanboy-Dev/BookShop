import { Book } from "../../modules/module";
import { useEffect, useState } from "react";
import { getBooks, removeBook } from "../../TypescriptFiles/books";
import SelectedBook from "../books/selectedBook";

export default function IndexPage({ darkMode }: { darkMode: Boolean }) {
  let userID = 0;
  let uuid = localStorage.getItem("uuid");
  let full = "";
  let [selected, setSelected] = useState<number>(1)
  if (uuid) {
    userID = JSON.parse(uuid).userID;
  }
  let [books, setBooks] = useState([]);
  useEffect(() => {
    const books = getBooks();
    books.then((res) => {
      if (res.length !== 0) {
        full = "full";
      }
      setBooks(res);
    });
  }, []);

  async function deleteBook(id: number, userID: number) {
    const result = await removeBook(id, userID);
    alert(result);
    window.location.href = "/";
    return;
  }

  return (
    <div
      className={`h-${full ? "full" : "[1115px]"} py-5  bg-${darkMode ? "light" : "dark"
        }`}
    >
      <h1 className="text-center text-4xl p-5 text-[#85A9BF] ">
        <span
          className={`border border-${darkMode ? "dark" : "light"
            } p-3 rounded cursor-pointer bg-dark`}
        >
          Recently Added
        </span>
      </h1>
      <div className="px-[50px]  grid gap-5 grid-cols-4">
        {books.map((book: Book) => (
          <div
            onClick={() => alert(book.id)}
            className={`border cursor-pointer bg-dark border-${darkMode ? "dark" : "light"
              } rounded py-3 px-2 shadow-lg`}
          >
            <h1 className={`border p-2 rounded text-2xl text-light`}>{book.title}</h1>
            <img className="w-full" src={`${book.imageURL}`} alt={`${book.imageURL}`} />
            <div className=" border p-3 rounded flex justify-content-between px-3">
              <button
                onClick={() => alert(`clicked in ${book.id}`)}
                className={`border cursor-pointer border-${darkMode ? "dark" : "light"
                  } px-3 py-2 mt-1 rounded text-light bg-green-700`}
              >
                About
              </button>
              <button
                style={{ display: book.userID == userID ? "flex" : "none" }}
                onClick={() => deleteBook(book.id, userID)}
                className={`border cursor-pointer border-${darkMode ? "dark" : "light"
                  } px-3 py-2 mt-1 rounded text-light bg-red-700`}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
