import { Todos } from "../models/todos.model";

export const createToDo = (body: any) => new Promise(async (resolve, reject) => {
    // resolve(body);
    try {
        const todos = await Todos.create({ ...body });
        resolve(todos)
    } catch (error) {
        reject(error);
    }
})

export const deleteToDo = (id: any) => new Promise(async (resolve, reject) => {
    try {
        const todos = await Todos.findByPk(id);
        await Todos.destroy({ where: { id } });
    
        resolve(todos)
    } catch (error) {
        reject(error);
    }
})

export const getAllToDo = () => new Promise(async (resolve, reject) => {
    try {
        const todos = await Todos.findAll();
        
        resolve(todos)
    } catch (error) {
        reject(error);
    }
})

export const getTodoById = (id: any) => new Promise(async (resolve, reject) => {
    try {
        const todos = await Todos.findByPk(id);
    
        resolve(todos)
    } catch (error) {
        reject(error);
    }
})

export const updateTodo = (body: any, id: any) => new Promise(async (resolve, reject) => {
    try {
        await Todos.update(body , { where: { id: id } });
        const todos = await getTodoById(id);
    
        resolve(todos)
    } catch (error) {
        reject(error);
    }
})