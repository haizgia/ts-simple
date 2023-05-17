import { RequestHandler } from "express";
import { matchedData, validationResult } from 'express-validator'
import { UserAddModel } from '../models/user.model'
import { UserService } from '../services/auth'
import { internalServerError } from '../middlewares/handle-error'
const userService = new UserService()

export const register: RequestHandler = async (req, res, next) => {
  try {
    // console.log(req.body);
    const errors = validationResult(req)
    
    if (!errors.isEmpty())
        return res.status(422).json(errors.array())

    const payload = matchedData(req) as UserAddModel
    const result = await userService.register(payload)
    
    // return user.then(u => res.json(u))

    return res
      .status(200)
      .json(result);
  } catch (error) {
    return internalServerError(res)
  }
};

export const login: RequestHandler = async (req, res, next) => {
  try {
    // console.log(req.body);
    const errors = validationResult(req)
    
    if (!errors.isEmpty())
        return res.status(422).json(errors.array())

    const payload = matchedData(req) as UserAddModel
    const result = userService.login(payload)
    // console.log(result);
    
    return result.then(r => res.status(r.statusCode).json(r))

    // return res
    //   .status(200)
    //   .json(result);
  } catch (error) {
    return internalServerError(res)
  }
};

export const logout: RequestHandler = async (req, res, next) => {
  try {
    return res
      .status(200)
      .json({
        statusCode: 200,
        message: 'Logout successfully'
      });
  } catch (error) {
    return internalServerError(res)
  }
};

export const detail: RequestHandler = async (req, res, next) => {
  try {
    console.log((<any>req).user);
    const errors = validationResult(req)
    
    if (!errors.isEmpty())
        return res.status(422).json(errors.array())

    const payload = matchedData(req) as UserAddModel
    const result = userService.getUserById(req.params.id)
    // console.log(result);
    
    return result.then(r => res.status(200).json(r))

    // return res
    //   .status(200)
    //   .json(result);
  } catch (error) {
    return internalServerError(res)
  }
};