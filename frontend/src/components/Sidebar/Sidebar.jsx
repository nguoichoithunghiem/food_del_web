// src/components/Sidebar/Sidebar.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // Nếu cần thiết, bạn có thể thêm CSS cho Sidebar

const Sidebar = ({ onLogout }) => {
    return (
        <div className="sidebar">
            <h2>Chào Mừng Trở lại</h2>
            <ul>
                <li><Link to="/list-food">Danh Sách Món</Link></li>
                <li><Link to="/list-categories">Danh Sách Danh Mục</Link></li>
                <li><Link to="/list-user">Danh Sách Người Dùng</Link></li>
            </ul>

            {/* Nút đăng xuất */}
            <button onClick={onLogout} className="logout-button">Đăng Xuất</button>
        </div>
    );
};

export default Sidebar;
