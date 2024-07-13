import { getCookie } from "@/utils/cookie";
import Dashboard from "../../components/Dashboard";
import { config } from "@/utils/config";
import Report from "@/components/Report";

const getUserData = async () => {
  try {
    const token = await getCookie();
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
    console.log(error);
  }
};

export default async function Home() {
  const data = await getUserData();
  return (
    <main className="w-[96%] overflow-y-scroll h-[90vh] mx-auto mt-4">
      {data && <Report id={data?.data?._id} />}
    </main>
  );
}
