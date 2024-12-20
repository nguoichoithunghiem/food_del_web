import express from 'express';
import {
    addOrder,
    listOrders,
    getOrderById,
    updateOrderStatus,
    removeOrder
} from '../controllers/orderController.js'; // Giả sử bạn đã tạo controller cho order

const orderRouter = express.Router();

// Route thêm đơn hàng
orderRouter.post("/add", addOrder);

// Route lấy danh sách đơn hàng
orderRouter.get("/list", listOrders);

// Route lấy thông tin đơn hàng theo ID
orderRouter.get("/:id", getOrderById);

// Route cập nhật trạng thái đơn hàng
orderRouter.post("/update/:id", updateOrderStatus);

// Route xóa đơn hàng
orderRouter.post("/remove", removeOrder);


export default orderRouter;
