import express from "express";
import recipesModel from "../models/recipesModel.js";
import userModel from "../models/userModel.js";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    return res.json(await recipesModel.find({}));
  } catch (err) {
    res.json({ message: err.message });
    console.log(err.message);
  }
});

router.post("/", async (req, res) => {
  try {
    return res.json(await recipesModel.create(req.body));
  } catch (err) {
    res.json({ message: err.message });
    console.log(err.message);
  }
});

router.put("/", async (req, res) => {
  try {
    const user = await userModel.findById(req.body.userID);
    const savedRecipe = await recipesModel.findById(req.body.savedRecipe);
    user.savedRecipes.push(savedRecipe);
    await user.save();
    res.json({ savedRecipes: user.savedRecipes });
  } catch (err) {
    res.json({ message: err.message });
    console.log(err.message);
  }
});

router.get("/savedRecipes/:id", async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    const savedRecipe = await recipesModel.find({
      _id: { $in: user.savedRecipes },
    });
    res.json({ savedRecipe });
  } catch (err) {
    res.json({ message: err.message });
    console.log(err.message);
  }
});

router.get("/savedList/:id", async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    res.json({ savedList: user.savedRecipes });
  } catch (err) {
    res.json({ message: err.message });
    console.log("from savedList", err.message);
  }
});

export { router as recipesRouter };
