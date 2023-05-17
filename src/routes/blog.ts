import { Router } from "express";
import { blogRules } from "../rules/blog.rules";
import * as services from "../services";
import {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlog,
  getNewBlog,
  getBlogById,
  getSearch
} from "../controllers";
import { tokenGuard } from "../middlewares/token-guard";
import { isAdmin } from "../middlewares/verify-roles";

export const blogRoutes = Router();

blogRoutes.get("/", getAllBlog);
blogRoutes.get("/new", getNewBlog);
blogRoutes.get("/search", getSearch);
blogRoutes.get("/:id", getBlogById);
// admin
blogRoutes.use(tokenGuard);
blogRoutes.use(isAdmin);
blogRoutes.post("/", blogRules["forCreate"], createBlog);
blogRoutes.put("/:id", blogRules["forUpdate"], updateBlog);
blogRoutes.delete("/:id", deleteBlog);
