import * as jwt from 'jsonwebtoken'
import { IncomingHttpHeaders } from 'http'
import { Request, Response, NextFunction } from 'express'
import { UserService } from '../services/auth'

const userService = new UserService()

function getTokenFromHeaders(headers: IncomingHttpHeaders) {
    const header = headers.authorization as string

    if (!header) {
        return header
    }

    return header.split(' ')[1]
}

export const tokenGuard: any = (req: Request, res: Response, next: NextFunction) => {
    const token = getTokenFromHeaders(req.headers) || req.query.token || req.body.token || ''
    // const hasAccess = userService.verifyToken(token)

    // hasAccess.then (a => {
    //     if (!a) {
    //         return res.status(403).send({ message: 'No access'})
    //     }
    //     next()
    // })
    
    if (!token) {
        res.send({
            success: false,
            statusCode: 401,
            message: 'No token found or invalid token!!'
        })
    }else {
        const tokenSecret = userService._jwtSecret
        jwt.verify(token, tokenSecret, (err: any, value: any) => {
            if (err) {
                res.send({
                    success: false,
                    statusCode: 401,
                    message: 'invalid token!!'
                })
            } else {
                (<any>req).user = value
                
                next()
            }
        })
    }
}