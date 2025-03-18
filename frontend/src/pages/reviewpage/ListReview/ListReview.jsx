import React, { useEffect, useState } from 'react';
import './ListReview.css'; // Giả sử bạn có một file CSS cho ListReview
import axios from "axios";
import { toast } from "react-toastify";
import { NavLink } from 'react-router-dom';

const ListReview = ({ url }) => {
    const [reviews, setReviews] = useState([]);
    const [searchFoodName, setSearchFoodName] = useState(""); // Thêm state cho tìm kiếm theo tên món ăn
    const [searchUserName, setSearchUserName] = useState(""); // Thêm state cho tìm kiếm theo tên người dùng

    // Lấy danh sách reviews từ API
    const fetchReviews = async () => {
        try {
            const response = await axios.get(`${url}/api/reviews/list`);
            if (response.data.success) {
                setReviews(response.data.reviews);
            } else {
                toast.error("Lỗi khi lấy danh sách reviews");
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi");
            console.error("Error fetching reviews:", error);
        }
    };

    // Xóa review
    const removeReview = async (reviewId) => {
        try {
            const response = await axios.delete(`${url}/api/reviews/remove/${reviewId}`);
            if (response.data.success) {
                toast.success(response.data.message);
                await fetchReviews(); // Cập nhật lại danh sách
            } else {
                toast.error("Lỗi khi xóa review");
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi khi xóa");
            console.error("Error removing review:", error);
        }
    };

    // Gọi fetchReviews khi component được mount
    useEffect(() => {
        fetchReviews();
    }, []);

    // Hàm để lọc danh sách reviews dựa trên tên món ăn và tên người dùng
    const filteredReviews = reviews.filter(item => {
        const foodNameMatch = item.foodName.toLowerCase().includes(searchFoodName.toLowerCase()); // Lọc theo tên món ăn
        const userNameMatch = item.userName.toLowerCase().includes(searchUserName.toLowerCase()); // Lọc theo tên người dùng
        return foodNameMatch && userNameMatch;
    });

    return (
        <div className='list flex-col'>
            <div className="header">
                <p>Danh sách Review</p>
                {/* Input tìm kiếm theo tên món ăn */}
                <input
                    type="text"
                    placeholder="Tìm kiếm theo tên món ăn"
                    value={searchFoodName}
                    onChange={(e) => setSearchFoodName(e.target.value)}
                    className="search-input"
                />
                {/* Input tìm kiếm theo tên người dùng */}
                <input
                    type="text"
                    placeholder="Tìm kiếm theo tên người dùng"
                    value={searchUserName}
                    onChange={(e) => setSearchUserName(e.target.value)}
                    className="search-input"
                />
            </div>
            <table className="list-table">
                <thead>
                    <tr>
                        <th>Tên Món Ăn</th>
                        <th>Tên Người Dùng</th>
                        <th>Đánh Giá</th>
                        <th>Ý Kiến</th>
                        <th>Ngày Review</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredReviews.map((item, index) => (
                        <tr key={index}>
                            <td>{item.foodName}</td>
                            <td>{item.userName}</td>
                            <td>{item.rating} sao</td>
                            <td>{item.comment}</td>
                            <td>{new Date(item.reviewDate).toLocaleDateString()}</td>
                            <td>

                                <p onClick={() => removeReview(item._id)} className='cursor'>Xóa</p>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListReview;
