"use server";
import { revalidatePath, revalidateTag } from "next/cache";
import { config } from "./config";
import { getCookie } from "./cookie";

// export const getCaptcha = async () => {
//   try {
//     const response = await fetch(`${config.server}/captcha`);
//     if (!response.ok) {
//       const error = await response.json();
//       throw new Error(error.message);
//     }
//     const responseData = await response.json();
//     console.log(responseData);
//     return { responseData };
//   } catch (error) {
//     throw error;
//   }
// };

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
  } finally {
    revalidatePath("/");
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

export const getAllClients = async (page) => {
  const token = await getCookie();
  try {
    const response = await fetch(
      `${config.server}/api/users/all?page=${page}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Cookie: `userToken=${token}`,
        },
        next: { tags: ["client"] },
      }
    );
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

export const getMyClients = async (id) => {
  const token = await getCookie();
  try {
    const response = await fetch(`${config.server}/api/users/${id}`, {
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
  } finally {
    revalidatePath("/clients/all");
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
  } finally {
    revalidatePath("/clients/all");
  }
};

export const editPassword = async (existingPassword, password, id) => {
  const token = await getCookie();
  try {
    const response = await fetch(`${config.server}/api/users/${id}`, {
      method: "PUT",
      body: JSON.stringify({ password, existingPassword }),
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
  } finally {
    revalidateTag("client");
  }
};

export const getSubordinateTransactions = async (id, page) => {
  const token = await getCookie();
  try {
    const response = await fetch(
      `${config.server}/api/transactions/${id}?page=${page}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Cookie: `userToken=${token}`,
        },
        next: { tags: ["client"] },
      }
    );
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    const data = await response.json();
    console.log(data);
    return { data };
  } catch (error) {
    throw error;
  }
};

export const editCredits = async (credits, id) => {
  const token = await getCookie();
  try {
    const response = await fetch(`${config.server}/api/users/${id}`, {
      method: "PUT",
      body: JSON.stringify({ credits: credits }),
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
  } finally {
    revalidateTag("client");
  }
};

export const editStatus = async (status, id) => {
  const token = await getCookie();
  try {
    const response = await fetch(`${config.server}/api/users/${id}`, {
      method: "PUT",
      body: JSON.stringify({ status: status }),
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
  } finally {
    revalidateTag("client");
  }
};

export const getGames = async (platform, category) => {
  const token = await getCookie();
  try {
    const response = await fetch(
      `${config.server}/api/games?platform=${platform}&category=${category}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Cookie: `userToken=${token}`,
        },
      }
    );
    console.log(response, "getGames");
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

export const editGames = async (game, id) => {
  const token = await getCookie();
  try {
    const response = await fetch(`${config.server}/api/games/${id}`, {
      method: "PUT",
      credentials: "include",
      body: game,
      headers: {
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
  } finally {
    revalidatePath("/game");
  }
};

export const deleteGame = async (id) => {
  const token = await getCookie();
  try {
    const response = await fetch(`${config.server}/api/games/${id}`, {
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

export const uploadImage = async (image) => {
  const token = await getCookie();
  try {
    const response = await fetch(`${config.server}/api/games/thumbnail`, {
      method: "POST",
      body: JSON.stringify(image),
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

export const addGame = async (game) => {
  const token = await getCookie();
  try {
    const response = await fetch(`${config.server}/api/games`, {
      method: "POST",
      credentials: "include",
      body: game,
      headers: {
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

export async function getUserReport(id, type) {
  const token = await getCookie();
  try {
    const response = await fetch(
      `${
        config.server
      }/api/users/report?userId=${id}&type=${type.toLowerCase()}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Cookie: `userToken=${token}`,
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    const data = await response.json();
    console.log("data : ", data);

    return data;
  } catch (error) {
    throw error;
  }
}

export const addPlatform = async (platform) => {
  const token = await getCookie();
  try {
    const response = await fetch(`${config.server}/api/games/platforms`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(platform), // Ensure platform is stringified
      headers: {
        "Content-Type": "application/json", // Specify content type
        Cookie: `userToken=${token}`,
      },
    });

    console.log(response);

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

export async function getPlatform() {
  const token = await getCookie();

  try {
    const response = await fetch(`${config.server}/api/games/platforms`, {
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

    return data;
  } catch (error) {
    throw error;
  }
}
