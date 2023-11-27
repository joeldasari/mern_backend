import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import { UserRouter } from "./routes/userRouter.js";
import { recipesRouter } from "./routes/recipesRouter.js";

dotenv.config();

const port = process.env.PORT || 5500;
const uri = process.env.MONGODB_URI;

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

const corsOptions = {
  origin:
    "https://656437ec25e19401b1f47dc3--illustrious-cobbler-ea783d.netlify.app/",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use("/users", UserRouter);
app.use("/recipes", recipesRouter);
