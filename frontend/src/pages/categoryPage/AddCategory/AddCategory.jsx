import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // Thêm useNavigate
import './AddCategory.css';

const AddCategory = ({ url }) => {
    const [data, setData] = useState({
        name: "",
        description: "",
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
            const response = await axios.post(`${url}/api/categories/add`, data);
            if (response.data.success) {
                setData({
                    name: "",
                });
                toast.success(response.data.message);
                navigate('/list-categories'); // Chuyển hướng đến trang danh sách danh mục
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi khi thêm danh mục");
            console.error("Error:", error);
        }
    };

    return (
        <div className='add-category'>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                <div className="add-category-name flex-col">
                    <p>Tên danh mục</p>
                    <input
                        onChange={onChangeHandler}
                        value={data.name}
                        type="text"
                        name='name'
                        placeholder='Nhập tên danh mục'
                        required
                    />
                </div>
                <button type='submit' className='add-btn'>THÊM DANH MỤC</button>
            </form>
        </div>
    );
};

export default AddCategory;
