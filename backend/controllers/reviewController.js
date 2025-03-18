// controllers/reviewController.js
import Review from '../models/reviewModel.js';

// Lấy danh sách reviews
export const listReviews = async (req, res) => {
    try {
        const reviews = await Review.find().populate('userId', 'userName'); // populate để lấy tên người dùng
        res.status(200).json({ success: true, reviews });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Đã xảy ra lỗi', error: error.message });
    }
};

// Xóa review
export const removeReview = async (req, res) => {
    const { reviewId } = req.params;  // Nhận reviewId từ URL

    try {
        const review = await Review.findById(reviewId);
        if (!review) {
            return res.status(404).json({ success: false, message: 'Review không tồn tại' });
        }

        await Review.findByIdAndDelete(reviewId);
        res.status(200).json({ success: true, message: 'Review đã bị xóa thành công!' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Đã xảy ra lỗi', error: error.message });
    }
};
