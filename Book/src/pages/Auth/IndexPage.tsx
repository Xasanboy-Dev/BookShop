import { Book } from "../../modules/module"
import { useEffect, useState } from "react"
import { getBooks } from "../../TypescriptFiles/books"

export default function IndexPage({ darkMode }: { darkMode: Boolean }) {
    let userID = JSON.parse(localStorage.getItem("uuid")!).userID
    let [books, setBooks] = useState([])
    useEffect(() => {
        const books = getBooks()
        books.then(res => {
            setBooks(res)
        })
    }, [])
    return (
        <div style={{ height: innerHeight }} className={`text-[#85A9BF] bg-${darkMode ? "light" : 'dark'}`}>
            <h1 className="text-center text-4xl p-5">
                <span className={`border border-${darkMode ? 'dark' : "light"} p-3 rounded cursor-pointer bg-dark`}>Recently Added
                </span>
            </h1>
            <div className="px-[50px]  grid grid-cols-4">
                {books.map((book: Book) => (
                    <div className={` border cursor-pointer bg-dark border-${darkMode ? "dark" : "light"} rounded py-3 px-2`}>
                        <h1 className="text-2xl">{book.title}</h1>
                        <img src={`http://localhost:8080/images/2023-03-06T192945.341Z-1.jpg`} />
                        <div className="flex justify-content-between px-3">
                            <button className={`border cursor-pointer border-${darkMode ? "dark" : "light"} px-3 py-2 mt-1 rounded text-light bg-green-700`}>Read</button>
                            <button style={{ display: book.userID == userID ? 'flex' : 'none' }} className={`border cursor-pointer border-${darkMode ? "dark" : "light"} px-3 py-2 mt-1 rounded text-light bg-red-700`}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}