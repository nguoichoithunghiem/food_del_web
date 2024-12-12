import User from '../models/userModel.js';
import crypto from 'crypto';

// Hàm mã hóa mật khẩu bằng SHA-256
const hashPassword = (password) => {
    return crypto.createHash('sha256').update(password).digest('hex');
};

// Controller đăng nhập
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Kiểm tra xem email có tồn tại trong cơ sở dữ liệu không
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ success: false, message: 'Email không tồn tại' });
    }

    // Mã hóa mật khẩu người dùng nhập vào
    const hashedPassword = hashPassword(password);

    // So sánh mật khẩu đã mã hóa với mật khẩu lưu trong cơ sở dữ liệu
    if (hashedPassword !== user.password) {
        return res.status(400).json({ success: false, message: 'Mật khẩu không chính xác' });
    }

    // Kiểm tra vai trò người dùng (chỉ cho phép role là 'admin' đăng nhập)
    if (user.role !== 'admin') {
        return res.status(403).json({ success: false, message: 'Bạn không có quyền truy cập' });
    }

    // Đăng nhập thành công
    res.status(200).json({
        success: true,
        message: 'Đăng nhập thành công',
        user: {
            userName: user.userName,
            email: user.email,
            role: user.role,
        },
    });
};
