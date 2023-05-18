import { Router } from 'express'
import { mailRules } from '../rules/mail.rules'
import { sendMail } from '../controllers/sendemail'

export const mailRoutes = Router()

mailRoutes.post('/', mailRules, sendMail)