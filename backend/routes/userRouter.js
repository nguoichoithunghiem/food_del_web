// routes/userRouter.js
import express from 'express';
import {
    addUser,
    listUsers,
    removeUser,
    updateUser,
    getUserById,
    updateRole
} from '../controllers/userController.js';

const userRouter = express.Router();

// Route thêm người dùng
userRouter.post("/add", addUser);

// Route lấy danh sách người dùng
userRouter.get("/list", listUsers);

// Route xóa người dùng
userRouter.post("/remove", removeUser);

// Route sửa người dùng
userRouter.post("/update/:id", updateUser);

// Route lấy người dùng theo ID
userRouter.get("/:id", getUserById);

// Route mới để cập nhật vai trò người dùng
userRouter.post('/update-role/:id', updateRole);

export default userRouter;
