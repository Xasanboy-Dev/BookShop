import { User } from "./../../modules/module";
import { useEffect, useState } from "react";
import { findUserByID } from "../../TypescriptFiles/Auth";
import { changeInputFule } from "../../TypescriptFiles/fireBase";
import { saveDataUser } from "../../TypescriptFiles/user";

export default function Profile({ darkMode }: { darkMode: Boolean }) {
  let photo =
    "https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-512.png";
  let [name, setName] = useState("");
  let [surname, setSurname] = useState("");
  let [password, setPassword] = useState("");
  let [email, setEmail] = useState("");
  let [change, setChange] = useState(false);
  let [image, setImage] = useState("");
  let [FirstPhoto, setFirstPhoto] = useState("");
  const id = localStorage.getItem("uuid");
  let json: number = 0;
  if (id) {
    json = JSON.parse(id).userID;
  }
  let [user, setUser] = useState<User>();
  if (!id) {
    (window.location.href = "/login");
    return <div></div>
  } else {
    useEffect(() => {
      let userBio = findUserByID(json);
      userBio.then((res) => {
        if (res) {
          setUser(res);
          setName(res.name);
          setEmail(res.email);
          setPassword(res.password);
          setSurname(res.surname);
          setImage(res.imageURL);
          setFirstPhoto(res.imageURL);
        } else {
          window.location.href = "/login";
          return <div></div>;
        }
      });
    }, []);
  }
  let anything: any;
  if (user) {
    return (
      <div
        className={`bg-${darkMode ? "light" : "dark"}`}
        style={{ height: innerHeight }}
      >
        <h1
          className={`text-${darkMode ? "dark" : "light"
            } w-full text-center text-4xl py-4  `}
        >
          Profile
        </h1>
        <div
          className={`flex justify-content-between px-[15%] bg-${darkMode ? "light" : "dark"
            }`}
        >
          <ul>
            <li className="py-2">
              <div className={`flex items-center`}>
                <label
                  htmlFor="name"
                  className={`mx-4 my-4 text-3xl text-${darkMode ? "dark" : "light"
                    }`}
                >
                  Name:
                </label>
                <input
                  id="name"
                  className={`px-2 py-1 border text-2xl border-${darkMode ? "dark" : "light"
                    } bg-${darkMode ? "dark" : "light"} text-${darkMode ? "light" : "dark"
                    } rounded`}
                  value={name}
                  onChange={(e: any) => {
                    setChange(e.target.value !== user?.name ? true : false);
                    setName(e.target.value);
                    return;
                  }}
                />
              </div>
              <div className={`flex  items-center`}>
                <label
                  htmlFor="surname"
                  className={`mx-1 my-4 text-3xl text-${darkMode ? "dark" : "light"
                    }`}
                >
                  Surname:
                </label>
                <input
                  id="surname"
                  className={`px-2 py-1 border text-2xl border-${darkMode ? "dark" : "light"
                    } bg-${darkMode ? "dark" : "light"} text-${darkMode ? "light" : "dark"
                    } rounded`}
                  value={surname}
                  onChange={(e: any) => {
                    setChange(e.target.value !== user?.surname ? true : false);
                    setSurname(e.target.value);
                    return;
                  }}
                />
              </div>
            </li>
            <li className="">
              <div className={`flex  items-center`}>
                <label
                  htmlFor="surname"
                  className={`mx-[28px] my-4 text-3xl text-${darkMode ? "dark" : "light"
                    }`}
                >
                  Email:
                </label>
                <input
                  id="surname"
                  className={`px-2 py-1 border text-2xl border-${darkMode ? "dark" : "light"
                    } bg-${darkMode ? "dark" : "light"} text-${darkMode ? "light" : "dark"
                    } rounded`}
                  value={email}
                  type={`email`}
                  onChange={(e: any) => {
                    setChange(e.target.value !== user?.email ? true : false);
                    setEmail(e.target.value);
                    return;
                  }}
                />
              </div>
              <div className={`flex  items-center`}>
                <label
                  htmlFor="surname"
                  className={`text-3xl text-${darkMode ? "dark" : "light"}`}
                >
                  Password:
                </label>
                <input
                  id="surname"
                  className={`px-2 py-1 border text-2xl border-${darkMode ? "dark" : "light"
                    } bg-${darkMode ? "dark" : "light"} text-${darkMode ? "light" : "dark"
                    } rounded`}
                  value={password}
                  type={`password`}
                  onChange={(e: any) => {
                    setChange(e.target.value !== user?.password ? true : false);
                    setPassword(e.target.value);
                    return;
                  }}
                />
              </div>
            </li>
          </ul>
          <div
            onMouseOver={() => setImage(photo)}
            onMouseOut={() => setImage(FirstPhoto)}
            className="my-5 border border-dark w-full ml-[20%] mr-[20%]"
          >
            <label htmlFor="file-upload">
              <img
                className={` cursor-${image == photo ? "move w-[65%]" : "move"
                  } rounded-3xl h-[125%]`}
                src={`${image}`}
              />
            </label>
          </div>
          <input
            onChange={async (e) => {
              return (anything = await changeInputFule(e.target.files, json));
            }}
            accept="image/*"
            name="avatar"
            id="file-upload"
            type="file"
          />
        </div>
        <div className="mt-5 flex justify-center gap-5">
          <a
            onClick={() => saveDataUser(name, surname, email, password, user!)}
            className={`text-light  py-1 px-3 rounded  text-3xl ${change
              ? "cursor-pointer bg-green-800"
              : " cursor-not-allowed text-dark text	bg-green-400"
              }`}
          >
            Save
          </a>
          <a
            onClick={() => {
              setName(user?.name!)
              setEmail(user?.email!)
              setSurname(user?.email!)
              setPassword(user?.password!)
            }}
            className={`text-light  py-1 px-3 rounded  text-3xl ${change
              ? "cursor-pointer bg-red-800"
              : " cursor-not-allowed text-dark text	bg-red-400"
              }`}
          >
            Cancel
          </a>
        </div>
      </div>
    );
  } else {
    return <div className="flex justify-content-center">Loading......</div>;
  }
}
