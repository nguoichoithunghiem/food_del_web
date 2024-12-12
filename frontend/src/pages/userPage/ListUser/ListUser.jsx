import React, { useEffect, useState } from 'react';
import './ListUser.css'; // Giả sử bạn có một file CSS cho ListUser
import axios from "axios";
import { toast } from "react-toastify";
import { NavLink } from 'react-router-dom';

const ListUser = ({ url }) => {
    const [list, setList] = useState([]);
    const [searchEmail, setSearchEmail] = useState(""); // Thêm state cho tìm kiếm theo email
    const [searchRole, setSearchRole] = useState(""); // Thêm state cho tìm kiếm theo vai trò (user/admin)

    // Lấy danh sách người dùng từ API
    const fetchList = async () => {
        try {
            const response = await axios.get(`${url}/api/users/list`);
            if (response.data.success) {
                setList(response.data.users);
            } else {
                toast.error("Lỗi khi lấy danh sách người dùng");
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi");
            console.error("Error fetching users:", error);
        }
    };

    // Xóa người dùng
    const removeUser = async (userId) => {
        try {
            const response = await axios.post(`${url}/api/users/remove`, { id: userId });
            if (response.data.success) {
                toast.success(response.data.message);
                await fetchList(); // Cập nhật lại danh sách
            } else {
                toast.error("Lỗi khi xóa người dùng");
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi khi xóa");
            console.error("Error removing user:", error);
        }
    };

    // Hàm để cập nhật vai trò người dùng
    const updateRole = async (userId, newRole) => {
        try {
            const response = await axios.post(`${url}/api/users/update-role/${userId}`, { role: newRole });
            if (response.data.success) {
                toast.success("Vai trò đã được cập nhật");
                await fetchList(); // Cập nhật lại danh sách
            } else {
                toast.error("Lỗi khi cập nhật vai trò");
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi khi cập nhật vai trò");
            console.error("Error updating role:", error);
        }
    };

    // Gọi fetchList khi component được mount
    useEffect(() => {
        fetchList();
    }, []);

    // Hàm để lọc danh sách người dùng dựa trên email và vai trò
    const filteredList = list.filter(item => {
        const emailMatch = item.email.toLowerCase().includes(searchEmail.toLowerCase()); // Lọc theo email
        const roleMatch = !searchRole || item.role === searchRole; // Lọc theo vai trò nếu có
        return emailMatch && roleMatch;
    });

    return (
        <div className='list flex-col'>
            <div className="header">
                <p>Danh sách Người Dùng</p>
                {/* Input tìm kiếm theo email */}
                <input
                    type="text"
                    placeholder="Tìm kiếm theo email"
                    value={searchEmail}
                    onChange={(e) => setSearchEmail(e.target.value)}
                    className="search-input"
                />
                {/* Dropdown tìm kiếm theo vai trò */}
                <select
                    value={searchRole}
                    onChange={(e) => setSearchRole(e.target.value)}
                    className="search-input"
                >
                    <option value="">Tất cả vai trò</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
            </div>
            <table className="list-table">
                <thead>
                    <tr>
                        <th>Tên Người Dùng</th>
                        <th>Email</th>
                        <th>Điện Thoại</th>
                        <th>Địa Chỉ</th>
                        <th>Vai Trò</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredList.map((item, index) => (
                        <tr key={index}>
                            <td>{item.userName}</td>
                            <td>{item.email}</td>
                            <td>{item.phone}</td>
                            <td>{item.address}</td>
                            <td>
                                {/* Cập nhật vai trò */}
                                <select
                                    value={item.role}
                                    onChange={(e) => updateRole(item._id, e.target.value)}
                                    className="role-select"
                                >
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </td>
                            <td>
                                <NavLink to={`/update-user/${item._id}`}>
                                    <button className="edit-button">Sửa</button>
                                </NavLink>
                                <p onClick={() => removeUser(item._id)} className='cursor'>X</p>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListUser;
