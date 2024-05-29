
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



// export {
//     LoginApi,
//     GetUserDataApi,
// };