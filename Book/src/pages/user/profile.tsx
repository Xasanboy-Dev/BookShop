import { User } from "./../../modules/module"
import { useEffect, useState } from "react"
import { findUserByID } from "../../TypescriptFiles/Auth"

export default function Profile({ darkMode }: { darkMode: Boolean }) {
    const id = localStorage.getItem("id")
    let [user, setUser] = useState<User>()
    if (!id) {
        window.location.href = '/login'
        return <div></div>
    } else {
        useEffect(() => {
            const user = findUserByID(+id)
            user.then(res => {
                if (res) {
                    setUser(res)
                } else {
                    window.location.href = '/login'
                    return <div></div>
                }
            })
        })
    }
    if (user) {
        return (
            <div>
                <ul className="">
                    <div className="justify-content-center flex">
                        <li className="flex items-center">
                            <h1>Name:</h1>
                            <input
                                className={`border border-dark`}
                                value={user.name}
                            />
                        </li>
                        <li className={`flex items-center`}>
                            <h1>Surname:</h1>
                            <input
                                className={` border border-dark`}
                                value={user.surname}
                            />
                        </li>
                    </div>
                    <div className="justify-content-center flex">
                        <li>
                            <h1>Email:</h1>
                            <input
                                className={`border border-dark`}
                                value={user.email}
                            />
                        </li>
                        <li>
                            <h1>Password:</h1>
                            <input
                                className={`border border-dark`}
                                value={user.password}
                            />
                        </li>
                    </div>
                </ul>
            </div>
        )
    } else {
        return (
            <div className="flex justify-content-center">Loading......</div>
        )
    }
}