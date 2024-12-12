import Category from '../models/CategoryModel.js'; // Giả sử bạn đã có model Category

// Thêm danh mục mới
export const addCategory = async (req, res) => {
    const { name, description } = req.body; // Lấy dữ liệu từ body

    try {
        // Tạo mới một danh mục
        const newCategory = new Category({
            name,
            description
        });

        await newCategory.save(); // Lưu danh mục vào cơ sở dữ liệu
        res.status(201).json({ success: true, message: "Danh mục đã được thêm thành công!" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Đã xảy ra lỗi khi thêm danh mục." });
    }
};

// Lấy danh sách tất cả các danh mục
export const listCategories = async (req, res) => {
    try {
        const categories = await Category.find(); // Lấy tất cả danh mục từ cơ sở dữ liệu
        res.status(200).json({ success: true, data: categories });
    } catch (error) {
        res.status(500).json({ success: false, message: "Lỗi khi lấy danh sách danh mục." });
    }
};

// Xóa danh mục theo ID
export const removeCategory = async (req, res) => {
    const { id } = req.body; // Lấy ID từ body request

    try {
        const category = await Category.findByIdAndDelete(id); // Xóa danh mục theo ID
        if (!category) {
            return res.status(404).json({ success: false, message: "Danh mục không tồn tại." });
        }
        res.status(200).json({ success: true, message: "Danh mục đã được xóa thành công." });
    } catch (error) {
        res.status(500).json({ success: false, message: "Lỗi khi xóa danh mục." });
    }
};

// Cập nhật danh mục theo ID
export const updateCategory = async (req, res) => {
    const { id } = req.params; // Lấy ID từ params
    const { name, description } = req.body; // Lấy dữ liệu từ body

    try {
        // Cập nhật danh mục theo ID
        const updatedCategory = await Category.findByIdAndUpdate(id, {
            name,
            description
        }, { new: true });

        if (!updatedCategory) {
            return res.status(404).json({ success: false, message: "Danh mục không tồn tại." });
        }

        res.status(200).json({ success: true, message: "Danh mục đã được cập nhật thành công!", data: updatedCategory });
    } catch (error) {
        res.status(500).json({ success: false, message: "Đã xảy ra lỗi khi cập nhật danh mục." });
    }
};

// Lấy thông tin danh mục theo ID
export const getCategoryById = async (req, res) => {
    const { id } = req.params; // Lấy ID từ params

    try {
        const category = await Category.findById(id); // Lấy danh mục theo ID
        if (!category) {
            return res.status(404).json({ success: false, message: "Danh mục không tồn tại." });
        }

        res.status(200).json({ success: true, data: category });
    } catch (error) {
        res.status(500).json({ success: false, message: "Lỗi khi lấy thông tin danh mục." });
    }
};
