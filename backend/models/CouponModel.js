// models/CouponModel.js
import mongoose from 'mongoose';

// Tạo schema cho Coupon
const couponSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },  // Mã giảm giá
    description: { type: String, default: '' },  // Mô tả về coupon
    discountType: {
        type: String,
        enum: ['percentage', 'fixed'],
        default: 'percentage'  // Kiểu giảm giá: phần trăm hay số tiền cố định
    },
    discountValue: { type: Number, required: true },  // Giá trị giảm (phần trăm hoặc cố định)
    expiryDate: { type: Date, required: true },  // Ngày hết hạn
    active: { type: Boolean, default: true }  // Trạng thái có hiệu lực hay không
});

// Sử dụng mô hình coupon nếu chưa tồn tại
const couponModel = mongoose.models.Coupon || mongoose.model("Coupon", couponSchema);

export default couponModel;
