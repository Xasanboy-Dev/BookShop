import { useState } from "react"
import { checkTokenValid } from "../../TypescriptFiles/Auth"
import { createAuthor } from "../../TypescriptFiles/author"

export default function addAuthor({ darkMode }: { darkMode: Boolean }) {
    let token = localStorage.getItem('uuid')
    let [userID, setUserID] = useState("")
    let [wasBorn, setwasBorn] = useState("")
    let [wasDied, setwasDied] = useState("")
    const uuid = localStorage.getItem("uuid")
    if (token) {
        let uuid = JSON.parse(token)
        if (!uuid.id) {
            window.location.href = '/login'
            return <div></div>
        } else {
            const result = checkTokenValid(token)
            result.then(res => {
                setUserID(res)
            })
        }
    } else {
        window.location.href = '/login'
        return <div></div>
    }
    let [name, setName] = useState("")
    return (
        <div className={`h-[1138px] bg-${darkMode ? "light" : "dark"}`}>
            <div className="text-2xl mx-[15%] py-5">
                <h1 className={`text-4xl mb-5 text-${darkMode ? "dark" : "[#9FC8E3]"}`}>New Author</h1>
                <div className="w-[80%]">
                    <h1 className={`text-${darkMode ? "dark" : "[#9FC8E3]"}`}>Name:</h1>
                    <input
                        className={`p-2 text-md  w-full border border-dark ${darkMode ? 'text-light bg-dark' : "text-dark bg-light"}`}
                        type="text"
                        onChange={(e) => setName(e.target.value)} value={name} />
                    <ul className={`flex gap-4 my-4 text-${darkMode ? "dark" : "[#9FC8E3]"}`}>
                        <li>
                            <h1>Date of birth:</h1>
                            <input
                                onChange={(e) => setwasBorn(e.target.value)}
                                className={`${darkMode ? 'text-[#9FC8E3] bg-dark' : "text-dark bg-light"} p-1 text-md rounded`}
                                type={"date"} />
                        </li>
                        <li>
                            <h1>Date of die (if died) :</h1>
                            <input onChange={(e) => setwasDied(e.target.value)}
                                className={`${darkMode ? 'text-light bg-dark' : "text-dark bg-light"} p-1 text-md rounded`}
                                type={"date"} />
                        </li>
                    </ul>
                    <div className={`text-${darkMode ? "dark" : "light"} mt-4 gap-5 flex justify-content-end`}>
                        <a href="/" className="bg-red-700 py-1 px-3 rounded">Cancel</a>
                        <button onClick={() => createAuthor(name, +userID, wasBorn, wasDied)} className="bg-green-700 py-1 px-3 rounded">Create</button>
                    </div>
                </div>
            </div>
            <div className="text-light">
                Hello World
            </div>
        </div>
    )
}