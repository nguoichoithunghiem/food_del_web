import mongoose from "mongoose";

// Tạo schema cho Category
const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },  // Tên danh mục
});

// Sử dụng mô hình category nếu chưa tồn tại
const categoryModel = mongoose.models.Category || mongoose.model("Category", categorySchema);

export default categoryModel;
