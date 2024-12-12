import foodModel from "../models/foodModel.js";
import categoryModel from "../models/CategoryModel.js";
import fs from 'fs';
import mongoose from "mongoose"; // Đảm bảo import mongoose

// Thêm món ăn
const addFood = async (req, res) => {
    const { foodName, foodCategory, foodTitle, foodDescription, foodPrice } = req.body;

    // Tìm kiếm category bằng ID (dành cho trường hợp 'categoryId' là ObjectId)
    const category = await categoryModel.findById(foodCategory);  // foodCategory là ObjectId

    if (!category) {
        return res.json({ success: false, message: "Category không tồn tại" });
    }

    const image_filename = req.file ? req.file.filename : '';

    const food = new foodModel({
        foodName,
        foodCategory: category.name, // Lưu tên danh mục nếu bạn muốn lưu tên danh mục
        categoryId: category._id, // Lưu ObjectId của danh mục
        foodTitle,
        foodDescription,
        foodImage: image_filename,
        foodPrice,
    });

    try {
        await food.save();
        res.json({ success: true, message: "Food Added" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// Liệt kê tất cả món ăn và populate categoryId để lấy thông tin danh mục
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({})
            .populate('categoryId', 'name'); // Populating categoryId với tên danh mục

        res.json({ success: true, data: foods });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// Xóa món ăn
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        if (food) {
            fs.unlink(`uploads/${food.foodImage}`, (err) => {
                if (err) console.error("Error deleting image:", err);
            });
            await foodModel.findByIdAndDelete(req.body.id);
            res.json({ success: true, message: "Food Removed" });
        } else {
            res.json({ success: false, message: "Food không tồn tại" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// Cập nhật món ăn
const updateFood = async (req, res) => {
    try {
        const { id } = req.params;
        const { foodName, foodCategory, foodTitle, foodDescription, foodPrice } = req.body;

        const foodData = {
            foodName,
            foodCategory,
            foodTitle,
            foodDescription,
            foodPrice
        };

        // Nếu có file ảnh mới, xóa ảnh cũ và cập nhật ảnh mới
        if (req.file) {
            const food = await foodModel.findById(id);
            if (food) {
                fs.unlink(`uploads/${food.foodImage}`, (err) => {
                    if (err) console.error("Error deleting image:", err);
                });
                foodData.foodImage = req.file.filename;
            }
        }

        const updatedFood = await foodModel.findByIdAndUpdate(id, foodData, { new: true });
        if (!updatedFood) {
            return res.status(404).json({ success: false, message: 'Food không tồn tại' });
        }

        res.json({ success: true, message: "Food Updated", data: updatedFood });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// Lấy món ăn theo ID
const getFoodById = async (req, res) => {
    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: 'Invalid ID format' });
        }

        const food = await foodModel.findById(id).populate('categoryId', 'name'); // Populating categoryId
        if (!food) {
            return res.status(404).json({ success: false, message: 'Food not found' });
        }
        res.json({ success: true, data: food });
    } catch (error) {
        console.error("Error fetching food:", error);
        res.status(500).json({ success: false, message: error.message || 'Error fetching food' });
    }
};

export { addFood, listFood, removeFood, updateFood, getFoodById };
