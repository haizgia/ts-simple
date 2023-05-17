import { Router } from 'express'
import { userRules } from '../rules/user.rules'
import { UserService } from '../services/auth'
import { register, login, logout, detail } from "../controllers/index"
import { tokenGuard } from '../middlewares/token-guard'

export const authRoutes = Router()

authRoutes.post('/register', userRules['forRegister'], register)

authRoutes.post('/login', userRules['forLogin'], login)
authRoutes.get('/logout', logout)
authRoutes.get('/:id', tokenGuard, detail)