import apiClient from "./clientAPI";

export const fetchUserInfo = async (props) => {
    const response = await apiClient.post("/user", {params: props});
    return response.data; // Accessing the data property of the Axios response
};