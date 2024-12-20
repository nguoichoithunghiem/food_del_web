import React, { useEffect, useState } from 'react';
import './ListOrder.css'; // Giả sử bạn có một file CSS cho ListOrder
import axios from "axios";
import { toast } from "react-toastify";
import { NavLink } from 'react-router-dom';

const ListOrder = ({ url }) => {
    const [list, setList] = useState([]);
    const [searchPhone, setSearchPhone] = useState(""); // Thêm state cho tìm kiếm theo số điện thoại
    const [searchStatus, setSearchStatus] = useState(""); // Thêm state cho tìm kiếm theo trạng thái

    // Các trạng thái đơn hàng (đổi sang tiếng Việt)
    const orderStatuses = [
        { value: "pending", label: "Đang chờ" },
        { value: "confirmed", label: "Đã xác nhận" },
        { value: "shipping", label: "Đang giao" },
        { value: "completed", label: "Hoàn thành" },
        { value: "canceled", label: "Đã hủy" }
    ];

    // Lấy danh sách đơn hàng từ API
    const fetchList = async () => {
        try {
            const response = await axios.get(`${url}/api/orders/list`);
            if (response.data.success) {
                setList(response.data.data);
            } else {
                toast.error("Lỗi khi lấy danh sách đơn hàng");
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi");
            console.error("Error fetching orders:", error);
        }
    };

    // Xóa đơn hàng
    const removeOrder = async (orderId) => {
        try {
            const response = await axios.post(`${url}/api/orders/remove`, { id: orderId });
            if (response.data.success) {
                toast.success(response.data.message);
                await fetchList(); // Cập nhật lại danh sách
            } else {
                toast.error("Lỗi khi xóa đơn hàng");
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi khi xóa");
            console.error("Error removing order:", error);
        }
    };

    // Cập nhật trạng thái đơn hàng
    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            const response = await axios.post(`${url}/api/orders/update/${orderId}`, { status: newStatus });
            if (response.data.success) {
                toast.success(response.data.message);
                await fetchList(); // Cập nhật lại danh sách
            } else {
                toast.error("Lỗi khi cập nhật trạng thái");
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi khi cập nhật trạng thái");
            console.error("Error updating order status:", error);
        }
    };

    // Gọi fetchList khi component được mount
    useEffect(() => {
        fetchList();
    }, []);

    // Hàm để lọc danh sách đơn hàng theo số điện thoại và trạng thái
    const filteredList = list.filter(item => {
        const matchesPhone = item.userPhone.toLowerCase().includes(searchPhone.toLowerCase());
        const matchesStatus = searchStatus ? item.status === searchStatus : true;

        return matchesPhone && matchesStatus;
    });

    // Sắp xếp danh sách đơn hàng từ dưới lên (mới nhất lên trên)
    const sortedList = filteredList.sort((a, b) => {
        // Nếu bạn có trường createdAt thì dùng cái này để sắp xếp:
        return new Date(b.createdAt) - new Date(a.createdAt); // Giả sử có trường createdAt
    });

    // Hàm tính toán tổng giá trị đơn hàng
    const calculateTotalPrice = (items) => {
        return items.reduce((total, item) => total + (item.foodPrice * item.quantity), 0);
    };

    return (
        <div className='list-order flex-col'>
            <div className="header">
                <p>Danh sách Đơn Hàng</p>

                {/* Input tìm kiếm theo số điện thoại */}
                <input
                    type="text"
                    placeholder="Tìm kiếm theo số điện thoại"
                    value={searchPhone}
                    onChange={(e) => setSearchPhone(e.target.value)}
                    className="search-input"
                />

                {/* Dropdown tìm kiếm theo trạng thái */}
                <select
                    value={searchStatus}
                    onChange={(e) => setSearchStatus(e.target.value)}
                    className="search-status-dropdown"
                >
                    <option value="">Tất cả trạng thái</option>
                    {orderStatuses.map((status, index) => (
                        <option key={index} value={status.value}>
                            {status.label}
                        </option>
                    ))}
                </select>
            </div>

            <table className="list-table">
                <thead>
                    <tr>
                        <th>Order ID</th> {/* Cột mới cho Order ID */}
                        <th>Tên Người Dùng</th>
                        <th>Số Điện Thoại</th>
                        <th>Địa Chỉ</th>
                        <th>Trạng Thái</th>
                        <th>Món Ăn</th> {/* Cột hiển thị món ăn */}
                        <th>Tổng Giá</th> {/* Cột hiển thị tổng giá */}
                        <th>Ghi Chú</th> {/* Cột hiển thị ghi chú */}
                        <th>Hành động</th> {/* Cột hiển thị hành động */}
                    </tr>
                </thead>
                <tbody>
                    {sortedList.map((item, index) => (
                        <tr key={index}>
                            <td>{item._id}</td> {/* Hiển thị Order ID */}
                            <td>{item.userName}</td>
                            <td>{item.userPhone}</td>
                            <td>{item.userAddress}</td>
                            <td>
                                <select
                                    value={item.status}
                                    onChange={(e) => updateOrderStatus(item._id, e.target.value)}
                                    className="status-dropdown"
                                >
                                    {orderStatuses.map((status, index) => (
                                        <option key={index} value={status.value}>
                                            {status.label}
                                        </option>
                                    ))}
                                </select>
                            </td>
                            <td>
                                {/* Hiển thị các món ăn trong đơn hàng */}
                                {item.items.map((food, foodIndex) => (
                                    <div key={foodIndex} className="order-item">
                                        <img
                                            src={`${url}/images/${food.foodImage}`} // Đảm bảo đường dẫn ảnh chính xác
                                            alt={food.foodName}
                                            style={{ width: "50px", height: "50px", objectFit: "cover" }}
                                        />
                                        <span>{food.foodName} - {food.quantity} x {food.foodPrice} VND</span>
                                    </div>
                                ))}
                            </td>
                            <td>
                                {/* Hiển thị tổng giá của đơn hàng */}
                                {calculateTotalPrice(item.items)} VND
                            </td>
                            <td>
                                {/* Hiển thị ghi chú của đơn hàng */}
                                {item.note || "Không có ghi chú"}
                            </td>
                            <td>
                                <p onClick={() => removeOrder(item._id)} className='cursor'>Xóa</p>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListOrder;