import { useEffect, useState } from "react"
import { getAuthor } from "../../TypescriptFiles/author"

export default function searchBooks() {
    let [authors, setAuthors] = useState([])
    useEffect(() => {
        let allAuthor = getAuthor()
        allAuthor.then(res => {
            setAuthors(res!)
            console.log(res)
        })
    }, [])
    console.log(authors)
    return (
        <div>
            <h1>New Book</h1>
            <div>
                <div>
                    <label>Title</label>
                    <input type={"text"} placeholder={"Book"} />
                </div>
                <div className="flex">
                    <label className="block">Title</label>
                    <input type={"text"} placeholder={"Thomas Edison"} />
                </div>
            </div>
        </div>
    )
}