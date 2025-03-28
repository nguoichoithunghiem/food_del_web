import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";  // Đảm bảo kết nối DB
import foodRouter from "./routes/foodRoute.js";
import categoryRouter from "./routes/categoryRoute.js";
import userRouter from "./routes/userRouter.js";
import authRouter from "./routes/authRoute.js";
import orderRouter from "./routes/orderRouter.js";
import couponRouter from "./routes/couponRouter.js";
import reviewRouter from "./routes/reviewRouter.js";

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Kết nối tới DB
connectDB();

// Sử dụng route món ăn
app.use("/api/food", foodRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/orders', orderRouter);
app.use('/api/coupons', couponRouter);
app.use('/api/reviews', reviewRouter);

// Route cho ảnh
app.use("/images", express.static('uploads'));

// Route kiểm tra API
app.get("/", (req, res) => {
    res.send("API đang hoạt động");
});


app.listen(port, () => {
    console.log(`Server đang chạy trên http://localhost:${port}`);
});
