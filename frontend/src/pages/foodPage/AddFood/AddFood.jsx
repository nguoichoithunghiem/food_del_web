import React, { useState, useEffect } from 'react';
import { assets } from '../../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';
import './AddFood.css';

const AddFood = ({ url }) => {
    const [image, setImage] = useState(null);
    const [data, setData] = useState({
        foodTitle: "",
        foodName: "",
        foodCategory: "",  // Chưa có giá trị mặc định vì danh mục sẽ được tải từ server
        foodPrice: "",
        foodDescription: "",
    });
    const [categories, setCategories] = useState([]); // Lưu danh sách danh mục

    // Hàm lấy danh mục từ server
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${url}/api/categories/list`);
                if (response.data.success) {
                    setCategories(response.data.data); // Cập nhật danh mục vào trạng thái
                } else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                toast.error("Đã xảy ra lỗi khi tải danh mục");
                console.error("Error:", error);
            }
        };

        fetchCategories(); // Gọi API để lấy danh mục
    }, [url]); // useEffect sẽ chạy khi component mount hoặc url thay đổi

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(prevData => ({ ...prevData, [name]: value }));
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("foodTitle", data.foodTitle);
        formData.append("foodName", data.foodName);
        formData.append("foodCategory", data.foodCategory);
        formData.append("foodPrice", data.foodPrice);
        formData.append("foodDescription", data.foodDescription);
        formData.append("foodImage", image);

        try {
            const response = await axios.post(`${url}/api/food/add`, formData);
            if (response.data.success) {
                setData({
                    foodTitle: "",
                    foodName: "",
                    foodCategory: "",  // Reset foodCategory
                    foodPrice: "",
                    foodDescription: "",
                });
                setImage(null);
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi khi thêm món ăn");
            console.error("Error:", error);
        }
    };

    return (
        <div className='add-food'>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                <div className="add-img-upload flex-col">
                    <p>Tải lên hình ảnh món ăn</p>
                    <label htmlFor="image">
                        <img width={200} src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                    </label>
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
                </div>
                <div className="add-food-name flex-col">
                    <p>Tên món ăn</p>
                    <input onChange={onChangeHandler} value={data.foodName} type="text" name='foodName' placeholder='Nhập tên món ăn' required />
                </div>
                <div className="add-food-title flex-col">
                    <p>Tiêu đề món ăn</p>
                    <input onChange={onChangeHandler} value={data.foodTitle} type="text" name='foodTitle' placeholder='Nhập tiêu đề món ăn' required />
                </div>
                <div className="add-food-description flex-col">
                    <p>Mô tả món ăn</p>
                    <textarea onChange={onChangeHandler} value={data.foodDescription} name="foodDescription" rows="6" placeholder='Viết mô tả món ăn' required></textarea>
                </div>
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Danh mục món ăn</p>
                        <select onChange={onChangeHandler} name="foodCategory" value={data.foodCategory} required>
                            <option value="">Chọn danh mục</option>
                            {categories.map((category) => (
                                <option key={category._id} value={category._id}>{category.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="div add-price flex-col">
                        <p>Giá món ăn</p>
                        <input onChange={onChangeHandler} value={data.foodPrice} type="number" name='foodPrice' placeholder='$20' required />
                    </div>
                </div>
                <button type='submit' className='add-btn'>THÊM MÓN</button>
            </form>
        </div>
    );
};

export default AddFood;
