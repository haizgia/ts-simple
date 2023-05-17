import {Request, Response} from 'express';
import createError from 'http-errors'

export const notFound = (req: Request, res: Response) => {
    const error = createError.NotFound('This route is not defined')
    return res.status(error.status).json({
        type: error.name,
        statusCode: error.status,
        message: error.message
    })
}

export const notAuth = (err: string, res: Response) => {
    const error = createError.Unauthorized(err)
    return res.status(error.status).json({
        type: error.name,
        statusCode: error.status,
        message: error.message
    })
}

export const internalServerError = (res: Response) => {
    const error = createError.InternalServerError('Internal Server Error')
    return res.status(error.status).json({
        type: error.name,
        statusCode: error.status,
        message: error.message
    })
}