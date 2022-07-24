import mongoose from "mongoose";
// import { Meal } from "./meal";


export const userSchema = new mongoose.Schema({
    name: String,
    calorieRequirement: Number,
    mealPlan: [{
        date: Date,
        meal: {type: mongoose.Schema.Types.ObjectId, ref: 'Meal'}
    }]
});

export const User = mongoose.model("User", userSchema);