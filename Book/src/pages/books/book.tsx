import { useEffect, useState } from "react";
import { Author } from "./../../modules/module";
import { getAuthor } from "../../TypescriptFiles/author";
import { checkTokenValid } from "../../TypescriptFiles/Auth";
import { createBook } from "../../TypescriptFiles/books";
import axios from "axios";
import { async } from "@firebase/util";
const addBook = ({ darkMode }: { darkMode: Boolean }) => {
  let [title, setTitle] = useState("");
  let [author, setAuthor] = useState("");
  let [date, setDate] = useState("");
  let [page, setPage] = useState("");
  let [desc, setDesc] = useState("");
  let [userID, setUserId] = useState("");
  let token = localStorage.getItem("uuid");
  if (token) {
    let uuid = JSON.parse(token);
    if (!uuid.id) {
      window.location.href = "/login";
      return <div></div>;
    } else {
      const result = checkTokenValid(token);
      result.then((res) => {
        setUserId(res);
      });
    }
  } else {
    window.location.href = "/login";
    return <div></div>;
  }
  let [authors, setAuthors] = useState<Author[]>([]);
  useEffect(() => {
    getAuthor().then((res) => {
      setAuthors(res);
    });
  }, []);

  let [url, setUrl] = useState("");
  let [data, setData] = useState<any>()
  async function onhange(e: any | null) {
    let data = new FormData()
    data.append("avatar", e)
    const blob = new Blob([e], ({ type: "type/text" }))
    setUrl(URL.createObjectURL(blob))
    const response = await axios.post(`http://localhost:8080/image/books/${userID}`, data, { headers: { Authorization: userID } })
    alert(response.data)
  }
  return (  
    <div
      style={{ height: innerHeight }}
      className={` text-[#a3cbe3] bg-${darkMode ? "light" : "dark"}`}
    >
      <h1 className="text-3xl p-5 bg-dark text-bold cursor-pointer">
        New Book
      </h1>
      <div>
        <div className=" flex m-5 text-2xl">
          <div className="mr-[30%]">
            <label className="block">Title</label>
            <input
              onChange={(e) => setTitle(e.target.value)}
              className={`text-light rounded block w-[200%] bg-[#a3cbe3] text-light border border-${darkMode ? "dark" : "light"
                } `}
              type={"text"}
            />
          </div>
          <div>
            <label className="block">Author</label>
            <select
              onChange={(e) => setAuthor(e.target.value)}
              className={`rounded block w-[200%] bg-[#a3cbe3] text-light border border-${darkMode ? "dark" : "light"
                } `}
            >
              <option disabled selected>
                Select author:
              </option>
              {authors.map((author: Author) => (
                <option>{author.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex gap-5 m-5 text-2xl">
          <div>
            <label className="block">Page Count</label>
            <input
              onChange={(e) => setPage(e.target.value)}
              className={`rounded block w-[200%] bg-[#a3cbe3] text-light border border-${darkMode ? "dark" : "light"
                } `}
              type={"number"}
            />
          </div>
        </div>
        <div className="flex gap-5 m-5 text-2xl">
          <div
            className={`border rounded border-${darkMode ? "dark" : "light"
              } text-[#a3cbe3] bg-${darkMode ? "light" : "dark"}`}
          >
            <label
              htmlFor="file-upload"
              className="h-[150px] w-[150px] m-2 bg-dark custom-file-upload"
            >
              <h1 className="my-5" style={{ display: url ? "none" : "flex" }}>
                {" "}
                Select photo
              </h1>
              <img
                src={`${url}`}
                className={`h-[150px] w-[150px]`}
                style={{ display: url !== "" ? "flex" : "none" }}
              />
            </label>
            <input
              onChange={(e) => onhange(e.target.files ? e.target.files[0] : alert("Hello"))}
              accept="image/*"
              name="avatar"
              id="file-upload"
              type="file"
            />
          </div>
          <div>
            <span>Description</span>
            <input
              onChange={(e) => setDesc(e.target.value)}
              type={"text"}
              className={`rounded w-[240%] h-[80%] text-center bg-[#a3cbe3] text-light`}
            />
          </div>
        </div>
        <div className="flex justify-content-center gap-5">
          <button
            onClick={() => (window.location.href = "/")}
            className="border text-light rounded py-1 px-3 flex  items-center bg-red-700"
          >
            Cancel
          </button>
          <button
            onClick={() => createBook(title, author, +page, desc, +userID, url)}
            className="border text-light rounded py-1 px-3 flex  items-center bg-green-700 "
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default addBook;
