import express from 'express';
import bodyParser from 'body-parser';
import path from 'path'
import mongoose from "mongoose";
import ejs from 'ejs';
import { foodItemSchema, FoodItem, units } from './models/foodItem.js';
import { typeOfMeal, mealSchema, Meal } from './models/meal.js';
import { userSchema, User } from './models/user.js';


const __dirname = path.resolve();
const app = express();

app.locals.ejs = ejs;
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));



mongoose.connect("mongodb://localhost:27017/mealDB");


app.get("/addfoodItem", (req, res)=>{
    res.render("fooditem", {Itemadded: false, units: units});
});

app.get("/addmeal", (req, res) => {
    FoodItem.find({}, (err, foodItems)=>{
        if (err)
            console.log(err);
        else {
            res.render("meal", {typeOfMeal: typeOfMeal, foodItems: foodItems});
        }
    });
});

app.get("/createmealplan", (req, res)=>{
    Meal.find({}, (err, meals)=>{
        if(err)
            crossOriginIsolated.log(err);
        else {
            res.render("user", {meals: meals});
        }
    })
});




app.post("/addfooditem", (req, res)=>{
    console.log(req.body);
    const fooditem = new FoodItem({
        name: req.body.name,
        calories: req.body.calories,
        protien: req.body.protien,
        carb: req.body.carb,
        fat: req.body.fat,
        acceptedUnits: req.body.units,
        itemWeight: req.body.itemWeight
    });

    fooditem.save((err)=>{
        if(err)
            res.render("fooditem", {Itemadded: false});
        else {
            res.render("fooditem", {Itemadded: true});
        }
    }); 
});

app.post("/addMeal", function (req, res){
    if(req.body.foodItem) {
        FoodItem.find({
            '_id': { $in: req.body.foodItem} 
        }, (err, embfooditem)=>{
            if(err)
                console.log(err);
            else {
                const meal = new Meal({
                    category: req.body.typeOfMeal,
                    name: req.body.name,
                    foodItems: embfooditem
                });

                meal.save((err)=>{
                    if(err) {
                        console.log(err);
                    }
                    else {
                        res.redirect("/addMeal");
                    }
                });
            }
        })
    }
    
});


app.get("/showmealplan", async (req, res)=>{
    const id = "62d987151ca3165ccb3e0f17"
    const mealPlan = await User.findOne({_id: id}).populate('mealPlan.meal');
    console.log(mealPlan.mealPlan[0].meal);
})
app.post("/createUser", (req, res)=>{

});

app.post("/addmealplan", (req, res)=>{
    const id = "62d987151ca3165ccb3e0f17";
    console.log(req.body);
    User.findByIdAndUpdate(id, {$push: {mealPlan: {
        date: req.body.date,
        meal: req.body.meal
    }}}, (err, success)=>{
        if(err){
            console.log(err);
        }
        else {
            console.log(success);
            res.redirect("/createmealplan");
        }
    });

});










app.listen(3000, ()=>{
console.log("The server is up and running at port 3000...");
});