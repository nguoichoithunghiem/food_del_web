import React, { useEffect, useState } from 'react';
import './ListCategory.css'; // Giả sử bạn có một file CSS cho ListCategory
import axios from "axios";
import { toast } from "react-toastify";
import { NavLink } from 'react-router-dom';

const ListCategory = ({ url }) => {
    const [list, setList] = useState([]);
    const [searchName, setSearchName] = useState(""); // Thêm state cho tìm kiếm theo tên

    // Lấy danh sách danh mục từ API
    const fetchList = async () => {
        try {
            const response = await axios.get(`${url}/api/categories/list`);
            if (response.data.success) {
                setList(response.data.data);
            } else {
                toast.error("Lỗi khi lấy danh sách danh mục");
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi");
            console.error("Error fetching categories:", error);
        }
    };

    // Xóa danh mục
    const removeCategory = async (categoryId) => {
        try {
            const response = await axios.post(`${url}/api/categories/remove`, { id: categoryId });
            if (response.data.success) {
                toast.success(response.data.message);
                await fetchList(); // Cập nhật lại danh sách
            } else {
                toast.error("Lỗi khi xóa danh mục");
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi khi xóa");
            console.error("Error removing category:", error);
        }
    };

    // Gọi fetchList khi component được mount
    useEffect(() => {
        fetchList();
    }, []);

    // Hàm để lọc danh sách danh mục theo tên
    const filteredList = list.filter(item => {
        return item.name.toLowerCase().includes(searchName.toLowerCase());
    });

    return (
        <div className='list-category flex-col'>
            <div className="header">
                <p>Danh sách Danh Mục</p>
                <NavLink to="/add-categories">
                    <button className="add-button">Thêm Danh Mục</button>
                </NavLink>
                {/* Input tìm kiếm theo tên danh mục */}
                <input
                    type="text"
                    placeholder="Tìm kiếm theo tên danh mục"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    className="search-input"
                />
            </div>
            <table className="list-table">
                <thead>
                    <tr>
                        <th>Tên Danh Mục</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredList.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>
                                <NavLink to={`/update-categories/${item._id}`}>
                                    <button className="edit-button">Sửa</button>
                                </NavLink>
                                <p onClick={() => removeCategory(item._id)} className='cursor'>X</p>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListCategory;
