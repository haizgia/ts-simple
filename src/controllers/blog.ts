import { RequestHandler } from "express";
import * as services from "../services/index";
import { validationResult } from 'express-validator'

const limit: number = 2;

export const createBlog: RequestHandler = async (req, res, next) => {
  try {
    console.log(req.body, (<any>req).user.id);
    const errors = validationResult(req)
    
    if (!errors.isEmpty())
        return res.status(422).json(errors.array())
    
    const data = {
        authorId: (<any>req).user.id,
        ...req.body
    }

    console.log(data);
    
    const blog = await services.createBlog(data);
    
    return res
        .status(201)
        .json({
            statusCode: 201,
            message: "Blog created successfully", 
            data: blog 
        });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", data: error });
  }
};

export const updateBlog: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    // console.log(req.body, (<any>req).user.id);
    const errors = validationResult(req)
    
    if (!errors.isEmpty())
        return res.status(422).json(errors.array())
    
    const data = {
        ...req.body
    }

    const blog = await services.updateBlog(data, id);
    
    return res
        .status(201)
        .json({
            statusCode: 201,
            message: "Blog updated successfully", 
            data: blog 
        });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", data: error });
  }
};

export const deleteBlog: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    // console.log(req.body, (<any>req).user.id);
    const errors = validationResult(req)
    
    if (!errors.isEmpty())
        return res.status(422).json(errors.array())
    
    const blog = await services.deleteBlog(id);
    
    return res
        .status(200)
        .json({
            statusCode: 200,
            message: "Blog deleted successfully", 
            data: blog 
        });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", data: error });
  }
};

export const getBlogById: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const blog = await services.getBlogById(id);
    
    return res
        .status(200)
        .json({
            statusCode: 200,
            message: "Get successfully", 
            data: blog 
        });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", data: error });
  }
};

export const getAllBlog: RequestHandler = async (req, res, next) => {
  try {
    const blog = await services.getAllBlog();
    
    return res
        .status(200)
        .json({
            statusCode: 200,
            message: "Get all successfully", 
            data: blog 
        });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", data: error });
  }
};

export const getNewBlog: RequestHandler = async (req, res, next) => {
  try {
    const page = req.query.page ? req.query.page : "1";
    const offset: number = ((parseInt(page as string)) - 1) * limit
    
    const blog = await services.getNewBlog( offset, limit);
    
    return res
        .status(200)
        .json({
            statusCode: 200,
            message: "Get new blog successfully", 
            page,
            data: blog,
        });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", data: error });
  }
};

export const getSearch: RequestHandler = async (req, res, next) => {
  try {
    const keyword = req.query.keyword ? req.query.keyword : null;
    const page = req.query.page ? req.query.page : "1";
    const offset: number = ((parseInt(page as string)) - 1) * limit
    let blog:any = {}

    if (keyword === null) {
        blog = await services.getNewBlog( offset, limit);
    }else {
        blog = await services.getSearch(offset, limit, keyword);
    }
    
    return res
        .status(200)
        .json({
            statusCode: 200,
            message: "Get search blog successfully", 
            page,
            data: blog,
        });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", data: error });
  }
};