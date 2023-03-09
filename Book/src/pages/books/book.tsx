import React, { useEffect, useState } from "react"
import { Author } from "./../../modules/module"
import { getAuthor } from "../../TypescriptFiles/author"
import { checkTokenValid } from "../../TypescriptFiles/Auth"
import axios from "axios"
import { async } from "@firebase/util"

const addBook = ({ darkMode }: { darkMode: Boolean }) => {
    let [title, setTitle] = useState("")
    let [author, setAuthor] = useState("")
    let [date, setDate] = useState("")
    let [page, setPage] = useState("")
    let [desc, setDesc] = useState("")
    let token = localStorage.getItem("uuid")
    if (token) {
        let uuid = JSON.parse(token)
        if (!uuid.id) {
            return window.location.href = '/login'
        } else {
            const result = checkTokenValid(token)
        }
    } else {
        return window.location.href = '/login'
    }
    let [authors, setAuthors] = useState<Author[]>([])
    useEffect(() => {
        getAuthor().then(res => {
            setAuthors(res)
        })
    }, [])

    let [url, setUrl] = useState("")

    function onhange(e: any | null) {
        setUrl(window.URL.createObjectURL(e.target.files[0]))
    }

    async function createBook(userID: number, title: string, author: string, date: string, pageNum: number, desc: string, image: string) {
        if (!title || !author || !date || !pageNum || !desc) {
            alert("You must to fill all the gaps!")
            return
        } else {
            const response = await axios.post(`http://localhost:8080/books/${userID}`, {
                page,
                description:desc,
                title,
                author ,
                user.id
            })
        }
    }
    return (
        <div style={{ height: innerHeight }} className={` text-[#a3cbe3] bg-${darkMode ? "light" : "dark"}`}>
            <h1 className="text-3xl p-5 bg-dark text-bold cursor-pointer">New Book</h1>
            <div>
                <div className=" flex m-5 text-2xl">
                    <div className="mr-[30%]">
                        <label className="block">Title</label>
                        <input onChange={(e) => setTitle(e.target.value)} className={`text-light rounded block w-[200%] bg-[#a3cbe3] text-light border border-${darkMode ? "dark" : "light"} `} type={"text"} />
                    </div>
                    <div>
                        <label className="block">Author</label>
                        <select onChange={(e) => console.log(e.target.value)} className={`rounded block w-[200%] bg-[#a3cbe3] text-light border border-${darkMode ? "dark" : "light"} `}>
                            <option disabled selected>Select author:</option>
                            {authors.map((author: Author) => (
                                <option>{author.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="flex gap-5 m-5 text-2xl">
                    <div className="mr-[34%]">
                        <label className="block">Publish Date</label>
                        <input onChange={(e) => setDate(e.target.value)} className={`rounded block w-[300%] bg-[#a3cbe3] text-light border border-${darkMode ? "dark" : "light"} `} type={"date"} placeholder={"Book"} />
                    </div>
                    <div>
                        <label className="block">Page Count</label>
                        <input onChange={(e) => setPage(e.target.value)} className={`rounded block w-[200%] bg-[#a3cbe3] text-light border border-${darkMode ? "dark" : "light"} `} type={"number"} />
                    </div>
                </div>
                <div className="flex gap-5 m-5 text-2xl">
                    <div className={`border rounded border-${darkMode ? "dark" : "light"} text-[#a3cbe3] bg-${darkMode ? "light" : "dark"}`}>
                        <label htmlFor="file-upload" className="h-[150px] w-[150px] m-2 bg-dark custom-file-upload">
                            <img src={`${url}`} className={`h-[150px] w-[150px]`} style={{ display: url !== "" ? "flex" : "none" }} />
                        </label>
                        <input onChange={(e) => onhange(e)} accept="image/*" id="file-upload" type="file" />
                    </div>
                    <div>
                        <span>Description</span>
                        <input type={"text"} className={`rounded w-[240%] h-[80%] text-center bg-[#a3cbe3] text-light`} />
                    </div>
                </div>
                <div className="flex justify-content-center gap-5">
                    <button onClick={() => window.location.href = '/'} className="border text-light rounded py-1 px-3 flex  items-center bg-red-700">Cancel</button>
                    <button onClick={() => createBook(title, author, date, +page, desc, url)} className="border text-light rounded py-1 px-3 flex  items-center bg-green-700 ">Create</button>
                </div>
            </div>
        </div >
    )
}

export default addBook