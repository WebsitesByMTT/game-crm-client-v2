import { getCookie } from "@/utils/cookie";
import Dashboard from "../../components/Dashboard";
import { config } from "@/utils/config";

const getUserData = async () => {
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

export default async function Home() {
  const data = await getUserData();
  return (
    <main>
      <Dashboard data={data?.data} />
    </main>
  );
}
