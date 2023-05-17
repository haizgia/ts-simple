import { Router } from "express";

import {
  createToDo,
  deleteToDo,
  getAllToDo,
  updateTodo,
  getTodoById,
} from "../controllers/todos";

const todoRoutes = Router();

todoRoutes.post("/", createToDo);

todoRoutes.get("/", getAllToDo);

todoRoutes.get("/:id", getTodoById);

todoRoutes.put("/:id", updateTodo);

todoRoutes.delete("/:id", deleteToDo);

export default todoRoutes;