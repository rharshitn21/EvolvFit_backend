import mongoose from "mongoose";
import { foodItemSchema } from "./foodItem.js";
export const typeOfMeal = ['Breakfast', 'Lunch', 'Evening Snack', 'Dinner'];


export const mealSchema = new mongoose.Schema({
    category: {
        type:String,
        enum:typeOfMeal,
    },
    name: String,
    foodItems: [foodItemSchema]
});
export const Meal = mongoose.model("Meal", mealSchema);