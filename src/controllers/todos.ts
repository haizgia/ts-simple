import { RequestHandler } from "express";

import { Todos } from "../models/todos.model";
import * as services from "../services/index";

export const createToDo: RequestHandler = async (req, res, next) => {
  try {
    console.log(req.body);
    
    var todos = await services.createToDo(req.body);
    // var todos = await Todos.create({ ...req.body });
    
    return res
      .status(200)
      .json({ message: "Todo created successfully", data: todos });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", data: error });
  }
};

export const deleteToDo: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedTodo = await services.deleteToDo(id);
    return res
      .status(200)
      .json({ message: "Todo deleted successfully", data: deletedTodo });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", data: error });
  }
};

export const getAllToDo: RequestHandler = async (req, res, next) => {
  try {
    const allTodos = await services.getAllToDo();
    
    return res
      .status(200)
      .json({ message: "Todo fetched successfully", data: allTodos });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", data: error });
  }
};

export const getTodoById: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const todos = await services.getTodoById(id);
    return res
      .status(200)
      .json({ message: "Todo fetched successfully", data: todos });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", data: error });
  }
};

export const updateTodo: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(req.body);
    
    const updatedTodos = await services.updateTodo(req.body, id);
    return res
      .status(200)
      .json({ message: "Todo updated successfully", data: updatedTodos });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", data: error });
  }
};