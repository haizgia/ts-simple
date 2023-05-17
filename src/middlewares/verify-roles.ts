import { notAuth } from "./handle-error";
import { Request, Response, NextFunction } from 'express'

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    const { roleId } = (<any>req).user
    
    if (roleId !== 1) 
        return notAuth('Require role Admin', res)
    next()
}