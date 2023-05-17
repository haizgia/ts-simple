import { Blog } from "../models/blog.model";
import { Op } from "sequelize";

export const createBlog = (data: any) => new Promise(async (resolve, reject) => {
    // resolve(body);
    try {
        const blog = await Blog.create(data);
        resolve(blog)
    } catch (error) {
        reject(error);
    }
})

export const updateBlog = (data: any, id: any) => new Promise(async (resolve, reject) => {
    try {
        await Blog.update(data, { where : { id } });
        const blog = await Blog.findByPk(id)

        resolve(blog)
    } catch (error) {
        reject(error);
    }
})

export const deleteBlog = (id: any) => new Promise(async (resolve, reject) => {
    // resolve(body);
    try {
        const blog = await Blog.findByPk(id)
        await Blog.destroy({ where: {id}})

        resolve(blog)
    } catch (error) {
        reject(error);
    }
})

export const getBlogById = (id: any) => new Promise(async (resolve, reject) => {
    try {
        const blog = await Blog.findByPk(id);
    
        resolve(blog)
    } catch (error) {
        reject(error);
    }
})

export const getAllBlog = () => new Promise(async (resolve, reject) => {
    try {
        const blog = await Blog.findAll();
    
        resolve(blog)
    } catch (error) {
        reject(error);
    }
})

export const getNewBlog = (offset: any, limit: any) => new Promise(async (resolve, reject) => {
    try {
        const blog = await Blog.findAll({
            order: [
                ['id', 'DESC']
            ],
            offset, 
            limit
        });
    
        resolve(blog)
    } catch (error) {
        reject(error);
    }
})

export const getSearch = (offset: any, limit: any, key: any) => new Promise(async (resolve, reject) => {
    try {
        const blog = await Blog.findAll({
            where: {
                title: {
                    [Op.like]: `%${key}%`,
                }
            },
            order: [
                ['id', 'DESC']
            ],
            offset, 
            limit
        });
    
        resolve(blog)
    } catch (error) {
        reject(error);
    }
})

