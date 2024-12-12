// controllers/userController.js
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';  // Dùng để mã hóa mật khẩu

// Thêm người dùng
export const addUser = async (req, res) => {
    const { userName, email, phone, address, password, role } = req.body;

    try {
        // Kiểm tra email đã tồn tại chưa
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ success: false, message: "Email đã tồn tại" });
        }

        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10);

        // Tạo người dùng mới
        const newUser = new User({
            userName,
            email,
            phone,
            address,
            password: hashedPassword,
            role,
        });

        await newUser.save();
        res.status(201).json({ success: true, message: 'Người dùng đã được thêm thành công!' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Đã xảy ra lỗi', error: error.message });
    }
};

// Lấy danh sách người dùng
export const listUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ success: true, users });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Đã xảy ra lỗi', error: error.message });
    }
};

// Xóa người dùng
export const removeUser = async (req, res) => {
    const { id } = req.body;

    try {
        await User.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Người dùng đã bị xóa thành công!' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Đã xảy ra lỗi', error: error.message });
    }
};

// Sửa thông tin người dùng
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { userName, email, phone, address, password, role } = req.body;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'Người dùng không tồn tại' });
        }

        // Nếu mật khẩu thay đổi, mã hóa lại mật khẩu
        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }

        user.userName = userName || user.userName;
        user.email = email || user.email;
        user.phone = phone || user.phone;
        user.address = address || user.address;
        user.role = role || user.role;

        await user.save();
        res.status(200).json({ success: true, message: 'Thông tin người dùng đã được cập nhật!' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Đã xảy ra lỗi', error: error.message });
    }
};

// Lấy thông tin người dùng theo ID
export const getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'Người dùng không tồn tại' });
        }
        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Đã xảy ra lỗi', error: error.message });
    }
};

// Cập nhật vai trò người dùng
export const updateRole = async (req, res) => {
    const { id } = req.params; // Lấy id người dùng từ URL
    const { role } = req.body; // Lấy vai trò mới từ body

    try {
        // Tìm người dùng theo id
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'Người dùng không tồn tại' });
        }

        // Cập nhật vai trò mới
        user.role = role;

        // Lưu thông tin người dùng đã thay đổi
        await user.save();
        res.status(200).json({ success: true, message: 'Vai trò người dùng đã được cập nhật thành công!' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Đã xảy ra lỗi', error: error.message });
    }
};
