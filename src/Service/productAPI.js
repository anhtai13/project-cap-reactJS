import axios from "axios"

// Địa chỉ URL cơ bản của API
const API_URL = 'http://localhost:3131';

// Hàm để lấy danh sách tất cả sản phẩm
export const getListProducts = async () => {
    try {
        const response = await axios.get(`${API_URL}/product`);
        return response.data; // Trả về dữ liệu nhận được
    } catch (error) {
        throw error; // Nếu có lỗi, ném lỗi
    }
}

// Hàm để lấy danh sách tất cả các danh mục
export const getCategory = async () => {
    try {
        const response = await axios.get(`${API_URL}/category`)
        return response.data; // Trả về dữ liệu nhận được
    } catch (error) {
        throw error; // Nếu có lỗi, ném lỗi
    }
}

// Hàm để lấy danh sách sản phẩm theo danh mục
export const getProductByCategory = async (category) => {
    try {
        const response = await axios.get(`${API_URL}/category/${category}`);
        return response.data; // Trả về dữ liệu nhận được
    } catch (error) {
        throw error; // Nếu có lỗi, ném lỗi
    }
}

// Hàm để lấy chi tiết sản phẩm theo id
export const getDetailProducts = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/product/${id}`);
        return response.data; // Trả về dữ liệu nhận được
    } catch (error) {
        throw error; // Nếu có lỗi, ném lỗi
    }
}

// Hàm để lấy danh sách sản phẩm được sắp xếp theo tên
export const getListProductsSortedByName = async (sortType) => {
    try {
        const response = await axios.get(`${API_URL}/product?sortProductName=${sortType}`);
        return response.data; // Trả về dữ liệu nhận được
    } catch (error) {
        throw error; // Nếu có lỗi, ném lỗi
    }
}

// Hàm để lấy danh sách sản phẩm được sắp xếp theo vai trò
export const getListProductsSortedByRole = async (sortType) => {
    try {
        const response = await axios.get(`${API_URL}/product?sortRole=${sortType}`);
        return response.data; // Trả về dữ liệu nhận được
    } catch (error) {
        throw error; // Nếu có lỗi, ném lỗi
    }
}

// Hàm để lấy danh sách sản phẩm được sắp xếp theo họ
export const getListProductsSortedByLastName = async (sortType) => {
    try {
        const response = await axios.get(`${API_URL}/product?sortLastName=${sortType}`);
        return response.data; // Trả về dữ liệu nhận được
    } catch (error) {
        throw error; // Nếu có lỗi, ném lỗi
    }
}

// Hàm để thêm một sản phẩm mới
export const addProduct = async (formData) => {
    try {
        const response = await axios.post(`${API_URL}/product`, formData);
        return response.data; // Trả về dữ liệu nhận được
    } catch (error) {
        throw error; // Nếu có lỗi, ném lỗi
    }
};

// Hàm để cập nhật một sản phẩm
export const updateProduct = async (formData) => {
    try {
        const response = await axios.put(`${API_URL}/product`, formData);
        return response.data; // Trả về dữ liệu nhận được
    } catch (error) {
        throw error; // Nếu có lỗi, ném lỗi
    }
};

// Hàm để xóa một sản phẩm
export const deleteProduct = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/product/${id}`,);
        return response.data; // Trả về dữ liệu nhận được
    } catch (error) {
        throw error; // Nếu có lỗi, ném lỗi
    }
};
