import React, { useEffect, useState } from 'react';
import './ListCoupon.css'; // Giả sử bạn có một file CSS cho ListCoupon
import axios from "axios";
import { toast } from "react-toastify";
import { NavLink } from 'react-router-dom';

const ListCoupon = ({ url }) => {
    const [list, setList] = useState([]);
    const [searchCode, setSearchCode] = useState(""); // Thêm state cho tìm kiếm theo mã giảm giá

    // Lấy danh sách mã giảm giá từ API
    const fetchList = async () => {
        try {
            const response = await axios.get(`${url}/api/coupons/list`);
            if (response.data.success) {
                setList(response.data.data);
            } else {
                toast.error("Lỗi khi lấy danh sách mã giảm giá");
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi");
            console.error("Error fetching coupons:", error);
        }
    };

    // Xóa mã giảm giá
    const removeCoupon = async (couponId) => {
        try {
            const response = await axios.post(`${url}/api/coupons/remove`, { id: couponId });
            if (response.data.success) {
                toast.success(response.data.message);
                await fetchList(); // Cập nhật lại danh sách
            } else {
                toast.error("Lỗi khi xóa mã giảm giá");
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi khi xóa");
            console.error("Error removing coupon:", error);
        }
    };

    // Gọi fetchList khi component được mount
    useEffect(() => {
        fetchList();
    }, []);

    // Hàm để lọc danh sách mã giảm giá theo mã
    const filteredList = list.filter(item => {
        return item.code.toLowerCase().includes(searchCode.toLowerCase());
    });

    return (
        <div className='list-coupon flex-col'>
            <div className="header">
                <p>Danh sách Mã Giảm Giá</p>
                <NavLink to="/add-coupons">
                    <button className="add-button">Thêm Mã Giảm Giá</button>
                </NavLink>
                {/* Input tìm kiếm theo mã giảm giá */}
                <input
                    type="text"
                    placeholder="Tìm kiếm theo mã giảm giá"
                    value={searchCode}
                    onChange={(e) => setSearchCode(e.target.value)}
                    className="search-input"
                />
            </div>
            <table className="list-table">
                <thead>
                    <tr>
                        <th>Mã Giảm Giá</th>
                        <th>Miêu Tả</th>
                        <th>Giảm Giá</th>
                        <th>Ngày Hết Hạn</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredList.map((item, index) => (
                        <tr key={index}>
                            <td>{item.code}</td>
                            <td>{item.description}</td>
                            <td>{item.discountValue} {item.discountType === 'percentage' ? '%' : 'VND'}</td>
                            <td>{new Date(item.expiryDate).toLocaleString()}</td>
                            <td>
                                <NavLink to={`/update-coupons/${item._id}`}>
                                    <button className="edit-button">Sửa</button>
                                </NavLink>
                                <p onClick={() => removeCoupon(item._id)} className='cursor'>X</p>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListCoupon;
