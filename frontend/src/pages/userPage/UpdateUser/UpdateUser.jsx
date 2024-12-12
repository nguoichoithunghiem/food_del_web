import React, { useEffect, useState } from 'react';
import './UpdateUser.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateUser = ({ url }) => {
    const { id } = useParams(); // Lấy ID từ URL
    const navigate = useNavigate(); // Để điều hướng sau khi cập nhật
    const [user, setUser] = useState({
        userName: '',
        email: '',
        phone: '',
        address: '',
        role: 'user' // Giá trị mặc định là 'user'
    });

    // Hàm để lấy thông tin người dùng hiện tại
    const fetchUser = async () => {
        try {
            const response = await axios.get(`${url}/api/users/${id}`); // Cập nhật endpoint theo cấu trúc của bạn
            if (response.data.success) {
                setUser(response.data.user); // Giả sử response.data.user có các trường userName, email, phone, address, role
            } else {
                toast.error("Lỗi khi lấy thông tin người dùng");
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi");
            console.error("Error fetching user:", error);
        }
    };

    // Hàm để xử lý thay đổi input
    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setUser((prev) => ({ ...prev, [name]: value }));
    };

    // Hàm để xử lý submit form
    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${url}/api/users/update/${id}`, user);
            if (response.data.success) {
                toast.success(response.data.message);
                navigate('/list-user'); // Điều hướng đến danh sách người dùng
            } else {
                toast.error("Lỗi khi cập nhật người dùng");
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi khi cập nhật");
            console.error("Error updating user:", error);
        }
    };

    useEffect(() => {
        fetchUser(); // Gọi hàm lấy thông tin người dùng khi component được mount
    }, []);

    return (
        <div className='update-user'>
            <h2>Cập nhật Người Dùng</h2>
            <form onSubmit={onSubmitHandler} className='update-form'>
                <div className='form-group'>
                    <label>Tên Người Dùng:</label>
                    <input
                        type='text'
                        name='userName'
                        value={user.userName}
                        onChange={onChangeHandler}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label>Email:</label>
                    <input
                        type='email'
                        name='email'
                        value={user.email}
                        onChange={onChangeHandler}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label>Điện Thoại:</label>
                    <input
                        type='text'
                        name='phone'
                        value={user.phone}
                        onChange={onChangeHandler}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label>Địa Chỉ:</label>
                    <input
                        type='text'
                        name='address'
                        value={user.address}
                        onChange={onChangeHandler}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label>Vai Trò:</label>
                    <select
                        name='role'
                        value={user.role}
                        onChange={onChangeHandler}
                    >
                        <option value='user'>User</option>
                        <option value='admin'>Admin</option>
                    </select>
                </div>
                <button type='submit' className='update-btn'>Cập nhật</button>
            </form>
        </div>
    );
};

export default UpdateUser;
