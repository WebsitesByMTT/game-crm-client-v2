import { config } from "@/utils/config";
import { getCookie } from "@/utils/cookie";
import Image from "next/image";
import Link from "next/link";

const getPlatform = async () => {
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
      return { error: error.message };
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
};
const page = async () => {
  const platforms = await getPlatform();
  return (
    <div>
      <div className="grid gap-5 grid-cols-12 pt-10 pl-1 md:px-10">
        {platforms?.map((item, ind) => (
          <Link
            href={`/game/${item.name}`}
            key={ind}
            className="rounded-[.3rem] capitalize tracking-wide text-base text-center py-6 bg-white dark:bg-Dark_light text-black dark:text-white col-span-12 md:col-span-6 lg:col-span-3 shadow-xl cursor-pointer hover:scale-95 border dark:border-gray-600 transition-all dark:shadow-Dark"
          >
            <Image
              src={"/coin.png"}
              height={300}
              width={300}
              quality={100}
              className="w-[30%] mx-auto mb-5"
              alt="icon"
            />
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default page;
