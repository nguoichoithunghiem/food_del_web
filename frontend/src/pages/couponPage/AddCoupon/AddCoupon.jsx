import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // Thêm useNavigate
import './AddCoupon.css'; // Giả sử bạn sẽ có CSS riêng cho AddCoupon

const AddCoupon = ({ url }) => {
    const [data, setData] = useState({
        code: "",
        description: "",
        discountType: "percentage", // Mặc định là percentage
        discountValue: "",
        expiryDate: "",
    });

    const navigate = useNavigate(); // Khai báo navigate

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(prevData => ({ ...prevData, [name]: value }));
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(`${url}/api/coupons/add`, data);
            if (response.data.success) {
                setData({
                    code: "",
                    description: "",
                    discountType: "percentage",
                    discountValue: "",
                    expiryDate: "",
                });
                toast.success(response.data.message);
                navigate('/list-coupons'); // Chuyển hướng đến trang danh sách mã giảm giá
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi khi thêm mã giảm giá");
            console.error("Error:", error);
        }
    };

    return (
        <div className='add-coupon'>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                <div className="add-coupon-code flex-col">
                    <p>Mã giảm giá</p>
                    <input
                        onChange={onChangeHandler}
                        value={data.code}
                        type="text"
                        name='code'
                        placeholder='Nhập mã giảm giá'
                        required
                    />
                </div>

                <div className="add-coupon-description flex-col">
                    <p>Mô tả</p>
                    <input
                        onChange={onChangeHandler}
                        value={data.description}
                        type="text"
                        name='description'
                        placeholder='Nhập mô tả cho mã giảm giá'
                    />
                </div>

                <div className="add-coupon-discount-type flex-col">
                    <p>Kiểu giảm giá</p>
                    <select
                        name="discountType"
                        value={data.discountType}
                        onChange={onChangeHandler}
                    >
                        <option value="percentage">Phần trăm</option>
                        <option value="fixed">Cố định</option>
                    </select>
                </div>

                <div className="add-coupon-discount-value flex-col">
                    <p>Giá trị giảm</p>
                    <input
                        onChange={onChangeHandler}
                        value={data.discountValue}
                        type="number"
                        name='discountValue'
                        placeholder='Nhập giá trị giảm'
                        required
                    />
                </div>

                <div className="add-coupon-expiry-date flex-col">
                    <p>Ngày hết hạn</p>
                    <input
                        onChange={onChangeHandler}
                        value={data.expiryDate}
                        type="datetime-local"
                        name='expiryDate'
                        required
                    />
                </div>

                <button type='submit' className='add-btn'>THÊM MÃ GIẢM GIÁ</button>
            </form>
        </div>
    );
};

export default AddCoupon;
