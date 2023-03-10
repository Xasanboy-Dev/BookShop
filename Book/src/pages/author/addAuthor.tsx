import { useState } from "react"
import { checkTokenValid } from "../../TypescriptFiles/Auth"

export default function addAuthor() {
    const uuid = localStorage.getItem("uuid")
    if (!uuid) {
        window.location.href = '/login'
        return <div></div>
    }
    let [create, setCreate] = useState(true)
    let [name, setName] = useState("")
    return (
        <div>
            <div>
                New Author
            </div>
            <div style={{ display: create ? "flex" : "none" }}>
                <input className="border border-dark w-[80%] inline-flex justify-content-center" type="text" value={name} />
            </div>
            <div>
                <input type={"text"} onChange={(e) => setName(e.target.value)} value={name} />
            </div>
        </div>
    )
}