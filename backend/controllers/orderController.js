import Order from '../models/OrderModel.js'; // Import model Order

// Thêm đơn hàng mới
export const addOrder = async (req, res) => {
    const { userId, userName, userPhone, userAddress, items, status } = req.body; // Lấy dữ liệu từ body

    try {
        const newOrder = new Order({
            userId,
            userName,
            userPhone,
            userAddress,
            items,
            status
        });

        await newOrder.save(); // Lưu đơn hàng vào cơ sở dữ liệu
        res.status(201).json({ success: true, message: "Đơn hàng đã được thêm thành công!" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Đã xảy ra lỗi khi thêm đơn hàng." });
    }
};

// Lấy danh sách tất cả các đơn hàng
export const listOrders = async (req, res) => {
    try {
        const orders = await Order.find(); // Lấy tất cả đơn hàng từ cơ sở dữ liệu
        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        res.status(500).json({ success: false, message: "Lỗi khi lấy danh sách đơn hàng." });
    }
};

// Lấy thông tin đơn hàng theo ID
export const getOrderById = async (req, res) => {
    const { id } = req.params; // Lấy ID từ params

    try {
        const order = await Order.findById(id); // Lấy đơn hàng theo ID
        if (!order) {
            return res.status(404).json({ success: false, message: "Đơn hàng không tồn tại." });
        }

        res.status(200).json({ success: true, data: order });
    } catch (error) {
        res.status(500).json({ success: false, message: "Lỗi khi lấy thông tin đơn hàng." });
    }
};

// Cập nhật trạng thái đơn hàng
export const updateOrderStatus = async (req, res) => {
    const { id } = req.params; // Lấy ID từ params
    const { status } = req.body; // Lấy trạng thái từ body

    try {
        const updatedOrder = await Order.findByIdAndUpdate(id, { status }, { new: true });

        if (!updatedOrder) {
            return res.status(404).json({ success: false, message: "Đơn hàng không tồn tại." });
        }

        res.status(200).json({ success: true, message: "Trạng thái đơn hàng đã được cập nhật!", data: updatedOrder });
    } catch (error) {
        res.status(500).json({ success: false, message: "Đã xảy ra lỗi khi cập nhật trạng thái đơn hàng." });
    }
};

// Xóa đơn hàng theo ID
export const removeOrder = async (req, res) => {
    const { id } = req.body; // Lấy ID từ body request

    try {
        const order = await Order.findByIdAndDelete(id); // Xóa đơn hàng theo ID
        if (!order) {
            return res.status(404).json({ success: false, message: "Đơn hàng không tồn tại." });
        }
        res.status(200).json({ success: true, message: "Đơn hàng đã được xóa thành công." });
    } catch (error) {
        res.status(500).json({ success: false, message: "Lỗi khi xóa đơn hàng." });
    }
};

