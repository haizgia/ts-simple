import { Express, Request, Response, NextFunction } from "express";
import todoRoutes from "./todos";
import { authRoutes } from './auth'
import { blogRoutes } from "./blog";

const router = (app: Express) => {
    app.use('/api/v1/todos', todoRoutes)
    app.use('/api/v1/auth', authRoutes)
    app.use('/api/v1/blog', blogRoutes)
    // app.use(tokenGuard())
    return app.use('/api/v1', (req: Request, res: Response, next: NextFunction) => {
        return res.send('Home')
    })
};

export default router