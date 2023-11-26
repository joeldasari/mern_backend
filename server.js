import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import { UserRouter } from "./routes/userRouter.js";
import { recipesRouter } from "./routes/recipesRouter.js";

dotenv.config();

const port = process.env.port || 5500;
const uri = process.env.mongodb_uri;

const app = express();

mongoose
  .connect(uri)
  .then(() => {
    console.log("DB connected");
    app.listen(port, () => console.log(`Server is running on port ${port}`));
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use(cors());
app.use(express.json());
app.use("/users", UserRouter);
app.use("/recipes", recipesRouter);
