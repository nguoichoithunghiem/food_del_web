import React, { useEffect, useState } from 'react';
import './UpdateCategory.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateCategory = ({ url }) => {
    const { id } = useParams(); // Lấy ID từ URL
    const navigate = useNavigate(); // Để điều hướng sau khi cập nhật
    const [category, setCategory] = useState({
        name: '',
        description: ''
    });

    // Hàm để lấy thông tin danh mục hiện tại
    const fetchCategory = async () => {
        try {
            const response = await axios.get(`${url}/api/categories/${id}`); // Cập nhật endpoint theo cấu trúc của bạn
            if (response.data.success) {
                setCategory(response.data.data); // Giả sử response.data.data có trường description
            } else {
                toast.error("Lỗi khi lấy thông tin danh mục");
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi");
            console.error("Error fetching category:", error);
        }
    };

    // Hàm để xử lý thay đổi input
    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setCategory((prev) => ({ ...prev, [name]: value }));
    };

    // Hàm để xử lý submit form
    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${url}/api/categories/update/${id}`, category);
            if (response.data.success) {
                toast.success(response.data.message);
                navigate('/list-categories'); // Điều hướng đến danh sách danh mục
            } else {
                toast.error("Lỗi khi cập nhật danh mục");
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi khi cập nhật");
            console.error("Error updating category:", error);
        }
    };

    useEffect(() => {
        fetchCategory(); // Gọi hàm lấy thông tin danh mục khi component được mount
    }, []);

    return (
        <div className='update-category'>
            <h2>Cập nhật Danh Mục</h2>
            <form onSubmit={onSubmitHandler} className='update-form'>
                <div className='form-group'>
                    <label>Tên Danh Mục:</label>
                    <input
                        type='text'
                        name='name'
                        value={category.name}
                        onChange={onChangeHandler}
                        required
                    />
                </div>
                <button type='submit' className='update-btn'>Cập nhật</button>
            </form>
        </div>
    );
};

export default UpdateCategory;
