import bcyrpt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import express from "express";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();
const secret = process.env.SECRET;

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const findUser = await userModel.findOne({ email });
  if (findUser) {
    return res.json({
      message: "User already exists, please login to your account",
    });
  }
  const hashedPassword = await bcyrpt.hash(password, 10);
  try {
    const register = await userModel.create({
      email,
      password: hashedPassword,
    });
    res.json({ message: "Registered Successfully" });
  } catch (err) {
    res.json({ message: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const findUser = await userModel.findOne({ email });
  if (findUser) {
    const comparePassword = await bcyrpt.compare(password, findUser.password);
    if (comparePassword) {
      const token = jwt.sign({ id: findUser._id }, secret);
      return res.json({ token, userID: findUser._id });
    }
    return res.json({ message: "Incorrect Password, Please try again" });
  }
  res.json({ message: "User doesn't exists" });
});

export { router as UserRouter };
