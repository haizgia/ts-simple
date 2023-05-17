import { Sequelize } from "sequelize-typescript";
// import { Todos } from "../models/todos.model";
// import { Book } from "../models/book.model";
require('dotenv').config()

const host = process.env.DB_HOST
const username = process.env.DB_USER
const password = process.env.DB_PASSWORD
const database = process.env.DB_NAME

const connection = new Sequelize({
  dialect: "mysql",
  host: host,
  port: 3306,
  username: username,
  password: password,
  database: database,
  logging: false,
  timezone: "+07:00",
  // models: [Todos],
  models: [__dirname + '/../models/*.model.ts'],
  modelMatch: (filename, member) => {
    return filename.substring(0, filename.indexOf('.model')) === member.toLowerCase();
  },
});

export default connection;