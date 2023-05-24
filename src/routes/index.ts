import { Express, Request, Response, NextFunction } from "express";
import todoRoutes from "./todos";
import { authRoutes } from './auth'
import { blogRoutes } from "./blog";
import { mailRoutes } from "./sendmail";
import swaggerUi from 'swagger-ui-express'
import * as swaggerDocument from '../swagger.json'

const router = (app: Express) => {
    app.use('/api/v1/todos', todoRoutes)
    app.use('/api/v1/auth', authRoutes)
    app.use('/api/v1/blog', blogRoutes)
    app.use('/api/v1/send-mail', mailRoutes)
    // app.use(tokenGuard())
    app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    return app.use('/api/v1', (req: Request, res: Response, next: NextFunction) => {
        return res.send('Home')
    })
};

export default router