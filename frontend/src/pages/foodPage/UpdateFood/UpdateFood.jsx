import React, { useEffect, useState } from 'react';
import './UpdateFood.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateFood = ({ url }) => {
    const { id } = useParams(); // Lấy ID từ URL
    const navigate = useNavigate(); // Để điều hướng sau khi cập nhật
    const [food, setFood] = useState({
        foodName: '',
        foodCategory: '',
        foodPrice: '',
        foodDescription: '',
        status: 'available', // Trạng thái mặc định là có sẵn
        foodImage: null
    });

    // Hàm để lấy thông tin món ăn hiện tại
    const fetchFood = async () => {
        try {
            const response = await axios.get(`${url}/api/food/${id}`); // Cập nhật endpoint theo cấu trúc của bạn
            if (response.data.success) {
                setFood(response.data.data); // Giả sử response.data.data có trường status
            } else {
                toast.error("Lỗi khi lấy thông tin món ăn");
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi");
            console.error("Error fetching food:", error);
        }
    };

    // Hàm để xử lý thay đổi input
    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setFood((prev) => ({ ...prev, [name]: value }));
    };

    // Hàm để xử lý submit form
    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('foodName', food.foodName);
        formData.append('foodCategory', food.foodCategory);
        formData.append('foodPrice', food.foodPrice);
        formData.append('foodDescription', food.foodDescription);
        formData.append('status', food.status); // Thêm trạng thái vào formData
        if (food.foodImage) {
            formData.append('foodImage', food.foodImage);
        }

        try {
            const response = await axios.post(`${url}/api/food/update/${id}`, formData);
            if (response.data.success) {
                toast.success(response.data.message);
                navigate('/list-food'); // Điều hướng đến danh sách món ăn
            } else {
                toast.error("Lỗi khi cập nhật món ăn");
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi khi cập nhật");
            console.error("Error updating food:", error);
        }
    };

    useEffect(() => {
        fetchFood(); // Gọi hàm lấy thông tin món ăn khi component được mount
    }, []);

    return (
        <div className='update-food'>
            <h2>Cập nhật Món Ăn</h2>
            <form onSubmit={onSubmitHandler} className='update-form'>
                <div className='form-group'>
                    <label>Tên Món Ăn:</label>
                    <input
                        type='text'
                        name='foodName'
                        value={food.foodName}
                        onChange={onChangeHandler}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label>Danh mục:</label>
                    <select
                        name='foodCategory'
                        value={food.foodCategory}
                        onChange={onChangeHandler}
                        required
                    >
                        <option value='Món chính'>Món chính</option>
                        <option value='Món tráng miệng'>Món tráng miệng</option>
                        <option value='Món khai vị'>Món khai vị</option>
                    </select>
                </div>
                <div className='form-group'>
                    <label>Giá:</label>
                    <input
                        type='number'
                        name='foodPrice'
                        value={food.foodPrice}
                        onChange={onChangeHandler}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label>Mô tả:</label>
                    <textarea
                        name='foodDescription'
                        value={food.foodDescription}
                        onChange={onChangeHandler}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label>Trạng thái:</label>
                    <select
                        name='status'
                        value={food.status}
                        onChange={onChangeHandler}
                        required
                    >
                        <option value='available'>Có sẵn</option>
                        <option value='unavailable'>Không có sẵn</option>
                    </select>
                </div>
                <div className='form-group'>
                    <label>Hình ảnh:</label>
                    <input
                        type='file'
                        name='foodImage'
                        onChange={(e) => setFood((prev) => ({ ...prev, foodImage: e.target.files[0] }))}
                    />
                </div>
                <button type='submit' className='update-btn'>Cập nhật</button>
            </form>
        </div>
    );
};

export default UpdateFood;
