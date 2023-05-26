import { Express, Request, Response, NextFunction } from "express";
import { userRoutes } from "./userRouter";
import { authRoutes } from "./authRouter";

const router = ( app: Express) => {
    app.use('/api/auth', authRoutes)
    app.use('/api/user', userRoutes)

    // http://127.0.0.1:5000/api
    return app.use('/', (req: Request, res: Response, next: NextFunction) => {
        return res.send('Home')
    })
}

export default router