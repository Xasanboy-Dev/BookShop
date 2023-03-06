import { Router } from 'express'
import {
    createAuthor,
    deletedAuthor,
    editAuthor,
    getAuthors,
} from '../controller/author'

const router = Router()

router.get('/', getAuthors)
router.post('/:id', createAuthor)
router.put('/:id', editAuthor)
router.delete('/:id', deletedAuthor)

export default router
