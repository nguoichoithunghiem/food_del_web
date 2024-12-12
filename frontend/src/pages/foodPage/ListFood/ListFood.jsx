import React, { useEffect, useState } from 'react';
import './ListFood.css'; // Giả sử bạn có một file CSS cho ListFood
import axios from "axios";
import { toast } from "react-toastify";
import { NavLink } from 'react-router-dom';

const ListFood = ({ url }) => {
    const [list, setList] = useState([]);
    const [searchName, setSearchName] = useState(""); // Thêm state cho tìm kiếm theo tên
    const [searchStatus, setSearchStatus] = useState(""); // Thêm state cho tìm kiếm theo trạng thái

    // Lấy danh sách món ăn từ API
    const fetchList = async () => {
        try {
            const response = await axios.get(`${url}/api/food/list`);
            if (response.data.success) {
                setList(response.data.data);
            } else {
                toast.error("Lỗi khi lấy danh sách món ăn");
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi");
            console.error("Error fetching foods:", error);
        }
    };

    // Xóa món ăn
    const removeFood = async (foodId) => {
        try {
            const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
            if (response.data.success) {
                toast.success(response.data.message);
                await fetchList(); // Cập nhật lại danh sách
            } else {
                toast.error("Lỗi khi xóa món ăn");
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi khi xóa");
            console.error("Error removing food:", error);
        }
    };

    // Hàm để cập nhật trạng thái món ăn
    const updateStatus = async (foodId, newStatus) => {
        try {
            const response = await axios.post(`${url}/api/food/update-status`, { id: foodId, status: newStatus });
            if (response.data.success) {
                toast.success("Trạng thái đã được cập nhật");
                await fetchList(); // Cập nhật lại danh sách
            } else {
                toast.error("Lỗi khi cập nhật trạng thái");
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi khi cập nhật trạng thái");
            console.error("Error updating status:", error);
        }
    };

    // Gọi fetchList khi component được mount
    useEffect(() => {
        fetchList();
    }, []);

    // Hàm để lọc danh sách món ăn dựa trên tên và trạng thái
    const filteredList = list.filter(item => {
        const nameMatch = item.foodName.toLowerCase().includes(searchName.toLowerCase());
        const statusMatch = !searchStatus || item.status === searchStatus;
        return nameMatch && statusMatch;
    });

    return (
        <div className='list flex-col'>
            <div className="header">
                <p>Danh sách Món Ăn</p>
                <NavLink to="/add-food">
                    <button className="add-button">Thêm Món Ăn</button>
                </NavLink>
                {/* Input tìm kiếm theo tên */}
                <input
                    type="text"
                    placeholder="Tìm kiếm theo tên món ăn"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    className="search-input"
                />
                <p></p>
            </div>
            <table className="list-table">
                <thead>
                    <tr>
                        <th>Hình ảnh</th>
                        <th>Tên Món Ăn</th>
                        <th>Giá</th>
                        <th>Mô tả</th>
                        <th>Danh mục</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredList.map((item, index) => (
                        <tr key={index}>
                            <td>
                                <img src={`${url}/images/${item.foodImage}`} alt={item.foodName} className="food-image" />
                            </td>
                            <td>{item.foodName}</td>
                            <td>{item.foodPrice} VNĐ</td>
                            <td>{item.foodDescription}</td>
                            <td>{item.foodCategory}</td>
                            <td>
                                <NavLink to={`/update-food/${item._id}`}>
                                    <button className="edit-button">Sửa</button>
                                </NavLink>
                                <p onClick={() => removeFood(item._id)} className='cursor'>X</p>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListFood;
