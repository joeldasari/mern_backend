import mongoose from "mongoose";
const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  savedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "recipesModel" }],
});
const userModel = mongoose.model("userModel", userSchema);
export default userModel;
