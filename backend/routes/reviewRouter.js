// routes/reviewRouter.js
import express from 'express';
import { listReviews, removeReview } from '../controllers/reviewController.js';

const reviewRouter = express.Router();

// Route lấy danh sách reviews
reviewRouter.get("/list", listReviews);

// Route xóa review
reviewRouter.delete("/remove/:reviewId", removeReview);

export default reviewRouter;
