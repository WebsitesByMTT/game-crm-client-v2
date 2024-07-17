import { getCookie } from "@/utils/cookie";
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
    <main className="w-[98%] !overflow-y-scroll mx-auto px-3 h-auto">
      {data && <Report id={data?.data?._id} />}
    </main>
  );
}
