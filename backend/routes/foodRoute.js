import express from "express";
import { addFood, getFoodById, listFood, removeFood, updateFood } from "../controllers/foodController.js";
import multer from "multer";

const foodRouter = express.Router();

// Image Storage Engine
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

// Route cho các chức năng của food
foodRouter.post("/add", upload.single("foodImage"), addFood);
foodRouter.get("/list", listFood);
foodRouter.post("/remove", removeFood);
foodRouter.post("/update/:id", upload.single("foodImage"), updateFood); // Thêm route cho sửa food
foodRouter.get('/:id', getFoodById);

export default foodRouter;
