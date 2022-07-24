import mongoose from "mongoose";
export const units = ["ml", "litre", "kg", "g", "item"];

export const foodItemSchema = new mongoose.Schema({
    name: String,
    calories: Number,
    protien: mongoose.Decimal128,
    carb: mongoose.Decimal128,
    fat: mongoose.Decimal128,
    acceptedUnits: {
        type: String,
        enum: units
    },
    itemWeight: mongoose.Decimal128
});
export const FoodItem = mongoose.model("FoodItem", foodItemSchema);