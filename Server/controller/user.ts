import { Request, Response } from 'express'
import { checkUserByEmail, getUser, addUser } from '../database/user'

export async function getUsers(req: Request, res: Response) {
    try {
        const users = await getUser()
        res.status(200).json({ message: 'All users', users })
    } catch (error: any) {
        console.log(error.message)
        res.status(500).json({ message: 'Internal error' })
    }
}

export async function createUser(req: Request, res: Response) {
    try {
        const { name, surname, email, password } = req.body
        const user = await checkUserByEmail(email)
        if (user) {
            return res
                .status(409)
                .json({ message: 'You have already registered!' })
        }
        const addedUser = await addUser(
            name,
            surname,
            email,
            password.toString()
        )
        res.status(201).json({
            message: 'Created succesfully',
            user: addedUser,
        })
    } catch (error: any) {
        console.log(error.message)
        res.status(500).json({ message: 'Internal error' })
    }
}
