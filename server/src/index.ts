import express from "express";
import { json, urlencoded } from "body-parser";
import router from "./routes/index";
import connectDB from "./config/connectDB";
import cors = require('cors');
import cookieSession from "cookie-session";
import passport from "passport";
import "./passport";
require('dotenv').config()

const app = express()

app.use(cors({
    origin: process.env.URL_CLIENT,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
}))

app.use(json());
app.use(urlencoded({ extended: true }));

app.use(
    cookieSession({
      name: "session",
      maxAge: 24 * 60 * 60 * 1000,
      keys: [process.env.COOKIE_KEY as string],
    })
);

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// route
router(app);

connectDB
    .sync()
    .then(() => {
    console.log("Database successfully connected");
    })
    .catch((err: any) => {
    console.log("Error", err);
    });

const port = process.env.PORT || 8888

app.listen(port, () => { console.log('Server is running on the port ' + port) })
