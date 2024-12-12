import express from 'express';
import {
    addCategory,
    listCategories,
    removeCategory,
    updateCategory,
    getCategoryById
} from '../controllers/categoryController.js'; // Giả sử bạn đã tạo controller cho category

const categoryRouter = express.Router();

// Route thêm danh mục
categoryRouter.post("/add", addCategory);

// Route lấy danh sách danh mục
categoryRouter.get("/list", listCategories);

// Route xóa danh mục
categoryRouter.post("/remove", removeCategory);

// Route sửa danh mục
categoryRouter.post("/update/:id", updateCategory); // Sửa danh mục

// Route lấy danh mục theo ID
categoryRouter.get("/:id", getCategoryById);

export default categoryRouter;
