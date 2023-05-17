import * as bcrypt from "bcrypt";
import { check } from 'express-validator';

export const blogRules = {
    forCreate: [
        check('title').notEmpty().withMessage('Title is required'),
        check('image').notEmpty().withMessage('Image is required'),
        check('content').notEmpty().withMessage('Content is required'),
    ],
    forUpdate: [
        check('title').notEmpty().withMessage('Title is required'),
        check('image').notEmpty().withMessage('Image is required'),
        check('content').notEmpty().withMessage('Content is required'),
    ],
}