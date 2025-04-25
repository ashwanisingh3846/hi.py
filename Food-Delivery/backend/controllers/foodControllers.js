import dotenv from 'dotenv';
dotenv.config();

import foodModel from '../models/foodModels.js';
import fs from 'fs';
const addFood = async (req, res) => {
    console.log("Inside addFood");
    console.log("req.file:", req.file);
    if (!req.file) {
    return res.status(400).json({ success: false, message: "Image file is required." });
    }

    const file_image = req.file.filename;
    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: file_image,
        category: req.body.category,
        });
    
    try {
        await food.save();
        res.status(200).json({
        success: true,
        message: "Food added successfully",
        });
    } catch (error) {
        res.status(400).json({
        success: false,
        message: "Error while adding food",
    });
    console.log(error);
    }
};
const getFood = async (req, res) => {
    console.log("Inside getFood");
    try {
    const food = await foodModel.find({});
    res.status(200).json({
        success: true,
        message: "Food fetched successfully",
        food,
    });
} catch (error) {
    res.status(400).json({
    success: false,
    message: "Error while fetching food",
});
console.log(error);
}
};
const removeFood = async (req, res) => {

console.log("Inside removeFood");
try {
    const food = await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`, () => {});
    console.log("Food deleted successfully");
    await foodModel.findByIdAndDelete(req.body.id);
    res.status(200).json({
    success: true,
    message: "Food deleted successfully",
});
} catch (error) {
res.status(400).json({
success: false, 
message: "Error while deleting food",
});
console.log(error);
}
};
export default {
    addFood,
    getFood,
    removeFood,
    
};        