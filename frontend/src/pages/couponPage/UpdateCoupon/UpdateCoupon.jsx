import React, { useEffect, useState } from 'react';
import './UpdateCoupon.css'; // Đảm bảo bạn có file CSS cho UpdateCoupon
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateCoupon = ({ url }) => {
    const { id } = useParams(); // Lấy ID từ URL
    const navigate = useNavigate(); // Để điều hướng sau khi cập nhật
    const [coupon, setCoupon] = useState({
        code: '',
        description: '',
        discountValue: '',
        discountType: 'percentage', // Có thể chọn "percentage" hoặc "amount"
        expiryDate: ''
    });

    // Hàm để lấy thông tin mã giảm giá hiện tại
    const fetchCoupon = async () => {
        try {
            const response = await axios.get(`${url}/api/coupons/${id}`); // Cập nhật endpoint theo cấu trúc API của bạn
            if (response.data.success) {
                setCoupon(response.data.data); // Giả sử response.data.data chứa các trường của mã giảm giá
            } else {
                toast.error("Lỗi khi lấy thông tin mã giảm giá");
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi");
            console.error("Error fetching coupon:", error);
        }
    };

    // Hàm để xử lý thay đổi input
    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setCoupon((prev) => ({ ...prev, [name]: value }));
    };

    // Hàm để xử lý submit form
    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${url}/api/coupons/update/${id}`, coupon);
            if (response.data.success) {
                toast.success(response.data.message);
                navigate('/list-coupons'); // Điều hướng đến danh sách mã giảm giá
            } else {
                toast.error("Lỗi khi cập nhật mã giảm giá");
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi khi cập nhật");
            console.error("Error updating coupon:", error);
        }
    };

    useEffect(() => {
        fetchCoupon(); // Gọi hàm lấy thông tin mã giảm giá khi component được mount
    }, []);

    return (
        <div className='update-coupon'>
            <h2>Cập nhật Mã Giảm Giá</h2>
            <form onSubmit={onSubmitHandler} className='update-form'>
                <div className='form-group'>
                    <label>Mã Giảm Giá:</label>
                    <input
                        type='text'
                        name='code'
                        value={coupon.code}
                        onChange={onChangeHandler}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label>Miêu Tả:</label>
                    <input
                        type='text'
                        name='description'
                        value={coupon.description}
                        onChange={onChangeHandler}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label>Giảm Giá:</label>
                    <input
                        type='number'
                        name='discountValue'
                        value={coupon.discountValue}
                        onChange={onChangeHandler}
                        required
                        min="0"
                    />
                </div>
                <div className='form-group'>
                    <label>Loại Giảm Giá:</label>
                    <select
                        name='discountType'
                        value={coupon.discountType}
                        onChange={onChangeHandler}
                    >
                        <option value="percentage">Theo phần trăm</option>
                        <option value="amount">Theo giá trị cố định</option>
                    </select>
                </div>
                <div className='form-group'>
                    <label>Ngày Hết Hạn:</label>
                    <input
                        type='datetime-local'
                        name='expiryDate'
                        value={coupon.expiryDate}
                        onChange={onChangeHandler}
                        required
                    />
                </div>
                <button type='submit' className='update-btn'>Cập nhật</button>
            </form>
        </div>
    );
};

export default UpdateCoupon;
