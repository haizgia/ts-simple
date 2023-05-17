import express from "express";
import connection from "./config/database";
import { json, urlencoded } from "body-parser";
import router from "./routes/index";
// import * as helmet from "helmet";
import * as cors from "cors";

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));

// router
router(app);

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.status(500).json({ message: err.message });
  }
);

connection
  .sync()
  .then(() => {
    console.log("Database successfully connected");
  })
  .catch((err: any) => {
    console.log("Error", err);
  });
  
app.listen(3000, () => {
  console.log("Server started on port 3000");
});