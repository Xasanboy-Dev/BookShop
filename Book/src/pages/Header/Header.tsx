import { useEffect, useState } from "react";
import { getUserByID } from "../../TypescriptFiles/Auth";

export default function Header({
  darkMode,
  setDarkMode,
}: {
  darkMode: Boolean;
  setDarkMode: (darkMode: Boolean) => void;
}) {
  let dark = "dark";
  let [bool, setBool] = useState(Boolean);
  let id = localStorage.getItem("uuid");
  if (id) {
    let json = JSON.parse(id).userID;
    useEffect(() => {
      const user = getUserByID(+json);
      user.then((res) => {
        setBool(res);
      });
    }, []);
  } else {
    useEffect(() => {
      setBool(false);
    }, []);
  }
  return (
    <div className={`w-full bg-${darkMode ? "light" : "dark"}`}>
      <ul
        className={`border border-${
          darkMode ? "dark" : "light"
        } items-center text-[#a3cbe3] flex justify-content-between py-3`}
      >
        <h1 className="text-3xl bold mx-5">
          <a
            href="/"
            className={`px-2 py-1 border text-[#85A9BF] border-${
              darkMode ? "dark" : "light"
            } bg-${dark} rounded-[10px]`}
          >
            Library
          </a>
        </h1>
        <div className="flex">
          <h1
            style={{ display: darkMode ? "none" : "flex" }}
            className={`text-${darkMode ? "dark" : "light"}`}
            onClick={() => setDarkMode(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
              />
            </svg>
          </h1>
          <h1
            style={{ display: darkMode ? "flex" : "none" }}
            className={`text-${darkMode ? "dark" : "light"}`}
            onClick={() => setDarkMode(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
              />
            </svg>
          </h1>
        </div>
        <div className="flex gap-5 mx-5">
          <li
            className={`cursor-pointer bg-${dark} text-xl border border-${
              darkMode ? "dark" : "light"
            } p-1 rounded`}
          >
            <a href="/addBook">Add book</a>
          </li>
          <li
            className={`cursor-pointer border bg-${dark} text-xl border-${
              darkMode ? "dark" : "light"
            } p-1 rounded`}
          >
            <a href="/author">Authors</a>
          </li>
          <li
            style={{ display: bool ? "flex" : "none" }}
            className={`cursor-pointer border items-center bg-${dark} border-${
              darkMode ? "dark" : "light"
            } p-1 rounded-full`}
          >
            <a href="/profile">Profile</a>
          </li>
        </div>
      </ul>
    </div>
  );
}
