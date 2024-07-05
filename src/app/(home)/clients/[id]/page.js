import { config } from "@/utils/config";
import { getCookie } from "@/utils/cookie";

const fetchData = async (id) => {
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

const page = async ({ params }) => {
  const data = await fetchData(params.id);
  console.log(data);
  return <div></div>;
};

export default page;
