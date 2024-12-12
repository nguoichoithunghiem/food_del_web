import mongoose from "mongoose";

// Tạo schema cho Food
const foodSchema = new mongoose.Schema({
    foodName: { type: String, required: true },
    foodCategory: { type: String, required: true }, // Đây là tên danh mục
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }, // Lưu ObjectId từ Category
    foodTitle: { type: String, required: true },
    foodDescription: { type: String, required: true },
    foodImage: { type: String, required: true },
    foodPrice: { type: Number, required: true }
});

// Sử dụng mô hình food nếu chưa tồn tại
const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);

export default foodModel;
