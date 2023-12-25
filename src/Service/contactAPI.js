import axios from "axios"

const API_URL = 'http://localhost:3131';

export const getListContact = async () => {
    try {
        const response = await axios.get(`${API_URL}/contact`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getDetailContact = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/contact/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const addContact = async (contact) => {
    try {
        const response = await axios.post(`${API_URL}/contact`, contact);
        return response.data;
    } catch (error) {
        throw error;
    }

}

export const updateContact = async (contact) => {
    try {
        const response = await axios.put(`${API_URL}/contact`, contact);
        return response.data;
    } catch (error) {
        throw error;
    }

}

export const deleteContact = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/contact/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }

}
