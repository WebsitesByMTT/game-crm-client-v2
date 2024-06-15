"use server"
import { API_PATH } from "./Apipath";
import { getCookie } from "@/utils/cookie";

export const LoginApi = async (data) => {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_SERVER_BASE_URL + API_PATH.apiLogin, {
            method: 'POST',
            body: JSON.stringify(data),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        let responseData = await response.json();
        return { status: response.status, responseData };
    } catch (error) {
        throw error;
    }
};

export const GetUserDataApi = async () => {
    const token = await getCookie()
    console.log(token)
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_SERVER_BASE_URL + API_PATH.apigetUserData, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                Cookie: `userToken=${token}`
            }
        });

        const data = await response.json();
        return { status: response.status, data };
    } catch (error) {
        throw error;
    }
};

export const GetClientDataApi = async (postdata) => {
    const token = await getCookie()
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_SERVER_BASE_URL + API_PATH.apigetclients, {
            method: 'POST',
            body: JSON.stringify(postdata),
            credentials: 'include', 
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `userToken=${token}` 
            }
        });
        const data = await response.json();
        return { status: response.status, data };
    } catch (error) {
        throw error;
    }
};

export const AddClientDataApi = async (postdata) => {
    const token = await getCookie()
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_SERVER_BASE_URL + API_PATH.apiaddclient, {
            method: 'POST',
            body: JSON.stringify(postdata),
            credentials: 'include', 
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `userToken=${token}` 
            }
        });

        const data = await response.json();
        return { status: response.status, data };
    } catch (error) {
        throw error;
    }
};

export const AddCreditApi = async (postdata, creditdata) => {
    const token = await getCookie()
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}${API_PATH.apiAddCredits}${postdata}`, {
            method: 'POST',
            body: JSON.stringify(creditdata),
            credentials: 'include', 
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `userToken=${token}` 
            }
        });

        const data = await response.json();
        return { status: response.status, data };
    } catch (error) {
        throw error;
    }
};

export const apiChangePassword = async (postdata, changepassworddata) => {
    const token = await getCookie()
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}${API_PATH.apiChangePassword}${postdata}`, {
            method: 'PUT',
            body: JSON.stringify(changepassworddata),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `userToken=${token}`
            }
        });
        const data = await response.json();
        return { status: response.status, data };
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const apiTransaction = async (postdata) => {
    const token = await getCookie()
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}${API_PATH.apiGetTransaction}${postdata}`, {
            method: 'GET',
            credentials: 'include', 
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `userToken=${token}`
            }
        });

        const data = await response.json();
        return { status: response.status, data };
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const apiDelete = async (deletedata) => {
    const token = await getCookie();
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}${API_PATH.apiDeleteClient}${deletedata}`, {
            method: 'DELETE',
            credentials: 'include', 
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `userToken=${token}` 
            }
        });

        const contentType = response.headers.get('content-type');
        let data;
        if (contentType && contentType.includes('application/json')) {
            data = await response.json();
        } else {
            data = {}; 
        }
        return { status: response.status, data };
    } catch (error) {
        console.log(error);
        throw error;
    }
};
export const apiUpload = async (imageObject) => {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_SERVER_BASE_URL + API_PATH.apiUploadImage, {
            method: 'POST',
            body: JSON.stringify(imageObject),
            credentials: 'include', 
            headers: {
                'Content-Type': 'application/json', 
            },
        });
        const data = await response.json();
        return { status: response.status, data };
    } catch (error) {
        console.error(error,"error image");
        throw error;
    }
};

export const apiAddGames = async (postdata) => {
    const token = await getCookie()
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_SERVER_BASE_URL + API_PATH.apiAddGame, {
            method: 'POST',
            body: JSON.stringify(postdata),
            credentials: 'include', 
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `userToken=${token}` 
            }
        });
        const data = await response.json();
        return { status: response.status, data };
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const apiGetGames = async (getdata) => {
    const token = await getCookie()
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_SERVER_BASE_URL + API_PATH.apiGetGameData + '=' + getdata, {
            method: 'GET',
            credentials: 'include', 
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `userToken=${token}` 
            }
        });
        const data = await response.json();
        return { status: response.status, data };
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const apiEditGames = async (putdata) => {
    const token = await getCookie()
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_SERVER_BASE_URL + API_PATH.apiUpdateGames, {
            method: 'PUT',
            body: JSON.stringify(putdata),
            credentials: 'include', 
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `userToken=${token}` 
            }
        });
        const data = await response.json();
        console.log(data,"response edit game")

        return { status: response.status, data };
    } catch (error) {
        console.log(error,"edit game error");
        throw error;
    }
};







