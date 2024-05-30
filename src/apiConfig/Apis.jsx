
import axios from "axios";
import Cookies from "js-cookie";
import { API_PATH } from "./apipath";
const token = Cookies.get("userToken");

export const LoginApi = async (data) => {
    try {
        const response = await axios.post(
            process.env.NEXT_PUBLIC_SERVER_BASE_URL + API_PATH.apiLogin,
            data,
            { withCredentials: true }
        );
        return response;
    } catch (error) {
        throw error;
    }
};

export const GetUserDataApi = async () => {
    try {
        const response = await axios.get(process.env.NEXT_PUBLIC_SERVER_BASE_URL + API_PATH.apigetUserData,
            {
                withCredentials: true,
                headers: {
                    cookies: {
                        userToken: token
                    }
                }
            }
        );
        return response;
    } catch (error) {
        throw error;
    }
};


export const GetClientDataApi = async (data) => {
    try {
        const response = await axios.post(process.env.NEXT_PUBLIC_SERVER_BASE_URL + API_PATH.apigetclients,data,
            {
                withCredentials: true,
                headers: {
                    cookies: {
                        userToken: token
                    }
                }
            }
        );
        return response;
    } catch (error) {
        throw error;
    }
};

export const AddClientDataApi = async (data) => {
    try {
        const response = await axios.post(process.env.NEXT_PUBLIC_SERVER_BASE_URL + API_PATH.apiaddclient,data,
            {
                withCredentials: true,
                headers: {
                    cookies: {
                        userToken: token
                    }
                }
            }
        );
        return response;
    } catch (error) {
        console.log(error)
        throw error;
    }
};

export const AddCreditApi = async (data,creditdata) => {
    try {
        const response = await axios.post(process.env.NEXT_PUBLIC_SERVER_BASE_URL + API_PATH.apiAddCredits+data,creditdata,
            {
                withCredentials: true,
                headers: {
                    cookies: {
                        userToken: token
                    }
                }
            }
        );
        return response;
    } catch (error) {
        console.log(error)
        throw error;
    }
};

export const apiChangePassword = async (data,changepassworddata) => {
    try {
        const response = await axios.put(process.env.NEXT_PUBLIC_SERVER_BASE_URL + API_PATH.apiChangePassword+data,changepassworddata,
            {
                withCredentials: true,
                headers: {
                    cookies: {
                        userToken: token
                    }
                }
            }
        );
        return response;
    } catch (error) {
        console.log(error)
        throw error;
    }
};

export const apiTransaction = async (data) => {
    try {
        const response = await axios.get(process.env.NEXT_PUBLIC_SERVER_BASE_URL + API_PATH.apiGetTransaction+data,
            {
                withCredentials: true,
                headers: {
                    cookies: {
                        userToken: token
                    }
                }
            }
        );
        return response;
    } catch (error) {
        console.log(error)
        throw error;
    }
};

export const apiDelete = async (data) => {
    try {
        const response = await axios.delete(process.env.NEXT_PUBLIC_SERVER_BASE_URL + API_PATH.apiDeleteClient+data,
            {
                withCredentials: true,
                headers: {
                    cookies: {
                        userToken: token
                    }
                }
            }
        );
        return response;
    } catch (error) {
        console.log(error)
        throw error;
    }
};






