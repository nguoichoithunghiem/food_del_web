// controllers/couponController.js
import Coupon from '../models/CouponModel.js'; // Import model Coupon

// Thêm mã giảm giá mới
export const addCoupon = async (req, res) => {
    const { code, description, discountType, discountValue, expiryDate } = req.body;

    try {
        // Kiểm tra nếu mã giảm giá đã tồn tại
        const existingCoupon = await Coupon.findOne({ code });
        if (existingCoupon) {
            return res.status(400).json({ success: false, message: 'Mã giảm giá đã tồn tại.' });
        }

        // Tạo mã giảm giá mới
        const newCoupon = new Coupon({
            code,
            description,
            discountType,
            discountValue,
            expiryDate
        });

        await newCoupon.save();
        res.status(201).json({ success: true, message: 'Mã giảm giá đã được thêm thành công!' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Đã xảy ra lỗi khi thêm mã giảm giá.' });
    }
};

// Lấy danh sách tất cả mã giảm giá
export const listCoupons = async (req, res) => {
    try {
        const coupons = await Coupon.find();  // Lấy tất cả các coupon
        res.status(200).json({ success: true, data: coupons });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Lỗi khi lấy danh sách mã giảm giá.' });
    }
};

// Xóa mã giảm giá theo ID
export const removeCoupon = async (req, res) => {
    const { id } = req.body;

    try {
        const coupon = await Coupon.findByIdAndDelete(id); // Xóa coupon theo ID
        if (!coupon) {
            return res.status(404).json({ success: false, message: 'Mã giảm giá không tồn tại.' });
        }
        res.status(200).json({ success: true, message: 'Mã giảm giá đã được xóa thành công.' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Lỗi khi xóa mã giảm giá.' });
    }
};

// Cập nhật mã giảm giá theo ID
export const updateCoupon = async (req, res) => {
    const { id } = req.params; // Lấy ID từ params
    const { code, description, discountType, discountValue, expiryDate, active } = req.body;  // Lấy dữ liệu từ body

    try {
        // Cập nhật mã giảm giá theo ID
        const updatedCoupon = await Coupon.findByIdAndUpdate(id, {
            code,
            description,
            discountType,
            discountValue,
            expiryDate,
            active
        }, { new: true });

        if (!updatedCoupon) {
            return res.status(404).json({ success: false, message: 'Mã giảm giá không tồn tại.' });
        }

        res.status(200).json({ success: true, message: 'Mã giảm giá đã được cập nhật thành công!', data: updatedCoupon });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Đã xảy ra lỗi khi cập nhật mã giảm giá.' });
    }
};

// Lấy thông tin mã giảm giá theo ID
export const getCouponById = async (req, res) => {
    const { id } = req.params;

    try {
        const coupon = await Coupon.findById(id);
        if (!coupon) {
            return res.status(404).json({ success: false, message: 'Mã giảm giá không tồn tại.' });
        }
        res.status(200).json({ success: true, data: coupon });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Lỗi khi lấy thông tin mã giảm giá.' });
    }
};
