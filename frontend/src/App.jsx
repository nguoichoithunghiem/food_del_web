import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AddFood from './pages/foodPage/AddFood/AddFood';
import ListFood from './pages/foodPage/ListFood/ListFood';
import UpdateFood from './pages/foodPage/UpdateFood/UpdateFood';
import Sidebar from './components/Sidebar/Sidebar';
import './App.css';
import AddCategory from './pages/categoryPage/AddCategory/AddCategory';
import ListCategory from './pages/categoryPage/ListCategory/ListCategory';
import UpdateCategory from './pages/categoryPage/UpdateCategory/UpdateCategory';
import ListUser from './pages/userPage/ListUser/ListUser';
import UpdateUser from './pages/userPage/UpdateUser/UpdateUser';
import Login from './pages/authPage/Login'; // Import trang đăng nhập
import ListOrder from './pages/orderPage/ListOrder/ListOrder';
import ListCoupon from './pages/couponPage/ListCoupon/ListCoupon';
import UpdateCoupon from './pages/couponPage/UpdateCoupon/UpdateCoupon';
import AddCoupon from './pages/couponPage/AddCoupon/AddCoupon';

const App = () => {
  const url = "http://localhost:5000";  // Define the base URL for your API
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Kiểm tra trạng thái đăng nhập khi ứng dụng được tải
  useEffect(() => {
    const token = localStorage.getItem('isLoggedIn');
    if (token === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Hàm đăng xuất
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="app-container">
        {/* Hiển thị Sidebar chỉ khi người dùng đã đăng nhập */}
        {isAuthenticated && <Sidebar onLogout={handleLogout} />}

        <div className="content">
          <Routes>
            {/* Route trang chủ */}
            <Route path="/" element={isAuthenticated ? <h1>Trang Chính</h1> : <Navigate to="/login" />} />

            {/* Các route khác yêu cầu đăng nhập */}
            <Route path="/add-food" element={isAuthenticated ? <AddFood url={url} /> : <Navigate to="/login" />} />
            <Route path="/list-food" element={isAuthenticated ? <ListFood url={url} /> : <Navigate to="/login" />} />
            <Route path="/update-food/:id" element={isAuthenticated ? <UpdateFood url={url} /> : <Navigate to="/login" />} />
            <Route path="/add-categories" element={isAuthenticated ? <AddCategory url={url} /> : <Navigate to="/login" />} />
            <Route path="/list-categories" element={isAuthenticated ? <ListCategory url={url} /> : <Navigate to="/login" />} />
            <Route path="/update-categories/:id" element={isAuthenticated ? <UpdateCategory url={url} /> : <Navigate to="/login" />} />
            <Route path="/list-user" element={isAuthenticated ? <ListUser url={url} /> : <Navigate to="/login" />} />
            <Route path="/update-user/:id" element={isAuthenticated ? <UpdateUser url={url} /> : <Navigate to="/login" />} />
            <Route path="/list-orders" element={isAuthenticated ? <ListOrder url={url} /> : <Navigate to="/login" />} />
            <Route path="/list-coupons" element={isAuthenticated ? <ListCoupon url={url} /> : <Navigate to="/login" />} />
            <Route path="/update-coupons/:id" element={isAuthenticated ? <UpdateCoupon url={url} /> : <Navigate to="/login" />} />
            <Route path="/add-coupons" element={isAuthenticated ? <AddCoupon url={url} /> : <Navigate to="/login" />} />

            {/* Route đăng nhập */}
            <Route path="/login" element={<Login onLoginSuccess={() => setIsAuthenticated(true)} />} />

            {/* Trang 404 nếu không tìm thấy route */}
            <Route path="*" element={<h1>Không tìm thấy trang</h1>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
