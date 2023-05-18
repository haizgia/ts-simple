import * as bcrypt from "bcrypt";
import { check } from "express-validator";
import { User } from "../models/user.model";

export const mailRules = [
  check("email")
    .notEmpty().withMessage('Email is required')
    .isEmail()
    .withMessage("Invalid email format"),
  check("subject")
    .notEmpty().withMessage('Subject is required'),
  check("content")
    .notEmpty().withMessage('Content is required'),
];
