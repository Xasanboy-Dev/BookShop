import { useEffect, useState } from "react"
import { Author } from "./../../modules/module"
import { getAuthor } from "../../TypescriptFiles/author"

const addBook = ({ darkMode }: { darkMode: Boolean }) => {
    let [authors, setAuthors] = useState<Author[]>([])
    useEffect(() => {
        getAuthor().then(res => {
            setAuthors(res)
        })
    }, [])
    return (
        <div className={`text-[#a3cbe3] bg-${darkMode ? "light" : "dark"}`}>
            <h1 className="text-3xl p-5 bg-dark  text-bold cursor-pointer">New Book</h1>
            <div>
                <div className="flex m-5 text-2xl">
                    <div>
                        <label className="block">Title</label>
                        <input className="block" type={"text"} placeholder={"Book"} />
                    </div>
                    <div>
                        <label className="block">Author</label>
                        <select className="block">
                            {authors.map((author: Author) => (
                                <option>{author.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="flex">
                    <div>
                        <label className="block">Publish Date</label>
                        <input className="block" type={"date"} placeholder={"Book"} />
                    </div>
                    <div>
                        <label className="block">Page Count</label>
                        <input className="block" type={"text"} placeholder={"Thomas Edison"} />
                    </div>
                </div>
                <div className="flex">
                    <div className={`border border-${darkMode ? "dark" : "light"} text-[#a3cbe3] bg-${darkMode ? "light" : "dark"}`}>
                        <label htmlFor="file-upload" className="custom-file-upload">
                            Custom Upload
                        </label>
                        <input id="file-upload" type="file" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default addBook