// api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

export const postData = async (endpoint, data) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/${endpoint}`, data);
        console.log(response);
        return response.data;
    } catch (error) {
        // Handle errors here or throw them to be caught by the calling function
        throw error;
    }
};
