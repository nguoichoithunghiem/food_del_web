// routes/couponRouter.js
import express from 'express';
import {
    addCoupon,
    listCoupons,
    removeCoupon,
    updateCoupon,
    getCouponById
} from '../controllers/couponController.js';

const couponRouter = express.Router();

// Route thêm mã giảm giá
couponRouter.post("/add", addCoupon);

// Route lấy danh sách mã giảm giá
couponRouter.get("/list", listCoupons);

// Route xóa mã giảm giá
couponRouter.post("/remove", removeCoupon);

// Route sửa mã giảm giá
couponRouter.post("/update/:id", updateCoupon);

// Route lấy mã giảm giá theo ID
couponRouter.get("/:id", getCouponById);

export default couponRouter;
