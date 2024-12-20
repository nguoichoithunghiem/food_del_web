import mongoose from "mongoose";

// Tạo schema cho Order
const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },  // Người dùng
    userName: { type: String, required: true },  // Tên người dùng
    userPhone: { type: String, required: true },  // Số điện thoại
    userAddress: { type: String, required: true },  // Địa chỉ người dùng
    items: [{
        foodName: { type: String, required: true },  // Tên món ăn
        foodImage: { type: String, required: true },  // Hình ảnh món ăn
        foodPrice: { type: Number, required: true },  // Giá món ăn
        quantity: { type: Number, required: true },  // Số lượng
        totalPrice: { type: Number, required: true },  // Tổng giá của món ăn
        note: { type: String },  // Ghi chú (tuỳ chọn)
    }],
    status: { type: String, enum: ["pending", "confirmed", "shiping", "completed", "canceled"], default: "pending" },  // Trạng thái đơn hàng
    createdAt: { type: Date, default: Date.now },  // Thời gian tạo đơn hàng
});

const orderModel = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default orderModel;
