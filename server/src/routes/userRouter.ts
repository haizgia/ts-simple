import { Router } from 'express'
import { verifyToken } from '../middleware/verifyToken'
import { getOne } from '../controllers/userController'

export const userRoutes = Router()

userRoutes.get('/get-one', verifyToken, getOne)