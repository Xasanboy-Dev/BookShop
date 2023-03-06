import { Router } from 'express'
import { createUser, getUsers } from '../controller/user'

const router = Router()

router.get('/', getUsers)
router.post('/', createUser)

export default router
