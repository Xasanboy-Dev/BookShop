import { useEffect, useState } from "react"
import { Author } from "../../modules/module"
import { checkTokenValid } from "../../TypescriptFiles/Auth"
import { deleteAuthor, getAuthor } from "../../TypescriptFiles/author"

export default function Authors({ darkMode }: { darkMode: Boolean }) {
    const uuid = localStorage.getItem("uuid")
    let [userId, setUserID] = useState(0)
    if (uuid) {
        const author = checkTokenValid(uuid)
        author.then(res => {
            setUserID(res)
        })
    } else {
        window.location.href = '/login'
        return <div></div>
    }
    const [authors, setAuthors] = useState<Author[]>()
    const [full, setFull] = useState("")
    useEffect(() => {
        const author = getAuthor()
        author.then(res => {
            if (res.length > 10) {
                setFull("full")
            }
            setAuthors(res)
        })
    }, [])
    return (
        <div className={`h-${full ? "full" : "[907px]"} text-[#85A9BF]  bg-${darkMode ? "light" : "dark"}`}>
            <ul className={`bg-${darkMode ? 'light' : 'dark'} text-${darkMode ? 'dark' : 'light'} py-5`}>
                <div className="flex justify-content-center">
                    <h1 className={`my-5 text-[#85A9BF] py-3 px-3 rounded border 
                    border-${darkMode ? "dark" : "light"} bg-${darkMode ? "light" : "dark"} shadow  w-[25%] flex justify-content-center text-4xl`}>Recently Added</h1>
                </div>
                {authors?.map(author => (
                    <li className={`shadow shadow-2xl flex px-5 rounded text-xl justify-content-between items-center border border-${darkMode ? "dark" : "light"} w-[80%] mx-auto flex py-3 mb-3   justify-content-center`}>
                        <h1 className="cursor-pointer text-[#85A9BF]">{author.name}</h1>
                        <div className={`flex gap-5 text-${darkMode ? "light" : "dark"}`}>
                            <button className={`bg-${darkMode ? "yellow-700" : "[#A5DEFD]"} py-1 px-3 rounded`}>View</button>
                            <button className="bg-green-700 text-light py-1 px-3 rounded" style={{ display: author.createdUser == userId ? "flex" : "none" }} >Edit</button>
                            <button onClick={() => deleteAuthor(author, userId)} className="bg-red-700  text-light py-1 px-3 rounded" style={{ display: author.createdUser == userId ? "flex" : "none" }}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}