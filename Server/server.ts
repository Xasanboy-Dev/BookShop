import dotenv from "dotenv"
dotenv.config()

import express from "express"
import cors from "cors"
import user from "./router/user"
import books from "./router/books"
import authors from "./router/author"    

const server = express()
const PORT = process.env.PORT

server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(cors())

server.use('/user', user)
server.use('/books', books)
server.use('/author',authors)

server.listen(PORT, () => {
    console.log(`SERVER: http://localhost:${PORT}`)
})