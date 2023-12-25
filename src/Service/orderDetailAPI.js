import axios from "axios"

const API_URL = 'http://localhost:3131';

export const getListOrdersDetail = async (id) => {
    try {
        const response = await axios.post(`${API_URL}/order_details`, { id: id });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getOrderDetailById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/order_total/${id}`);
        return response.data
    } catch (error) {
        throw error
    }
}

export const getDetailOrdersDetail = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/order/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getDetailOrdersDetailById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/order_id/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const addOrderDetail = async (order) => {
    try {
        const response = await axios.post(`${API_URL}/order`, order);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const updateOrderDetail = async (orderUpdated) => {
    try {
        const response = await axios.put(`${API_URL}/order`, orderUpdated);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteOrderDetail = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/order/${id}`,);
        return response.data;
    } catch (error) {
        throw error;
    }
};