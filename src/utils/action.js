"use server";
import { config } from "./config";
import { getCookie } from "./cookie";

export const loginUser = async (data) => {
  try {
    const response = await fetch(`${config.server}/api/users/login`, {
      method: "POST",
      body: JSON.stringify(data),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    const responseData = await response.json();
    return { responseData };
  } catch (error) {
    throw error;
  }
};

export const getUserData = async () => {
  const token = await getCookie();
  try {
    const response = await fetch(`${config.server}/api/users`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: `userToken=${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    const data = await response.json();
    return { data };
  } catch (error) {
    throw error;
  }
};

export const getClients = async () => {
  const token = await getCookie();
  try {
    const response = await fetch(`${config.server}/api/users/all`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: `userToken=${token}`,
      },
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    const data = await response.json();
    return { data };
  } catch (error) {
    throw error;
  }
};

export const addClient = async (user) => {
  const token = await getCookie();
  try {
    const response = await fetch(`${config.server}/api/users`, {
      method: "POST",
      body: JSON.stringify({ user }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: `userToken=${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    const data = await response.json();
    return { data };
  } catch (error) {
    throw error;
  }
};

export const deleteClient = async (id) => {
  const token = await getCookie();
  try {
    const response = await fetch(`${config.server}/api/users/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: `userToken=${token}`,
      },
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    const data = await response.json();
    return { data };
  } catch (error) {
    throw error;
  }
};

export const editClient = async (
  existingPassword,
  password,
  credits,
  status,
  id
) => {
  const token = await getCookie();
  const data = {};
  if (credits) {
    data.credits = credits;
  } else if (existingPassword && password) {
    data.existingPassword = existingPassword;
    data.password = password;
  } else if (status) {
    data.status = status;
  }
  console.log(data);
  try {
    const response = await fetch(`${config.server}/api/users/${id}`, {
      method: "PUT",
      body: JSON.stringify({ data }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: `userToken=${token}`,
      },
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    const responseData = await response.json();
    return { responseData };
  } catch (error) {
    throw error;
  }
};
