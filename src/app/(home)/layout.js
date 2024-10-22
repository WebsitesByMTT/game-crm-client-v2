import { Poppins } from "next/font/google";
import "../../app/globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import DataSetter from "@/utils/DataSetter";
import { config } from "@/utils/config";
import { getCookie } from "@/utils/cookie";

const inter = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Game Crm",
  description: "Game Crm",
};

const getUserData = async () => {
  const token = await getCookie();
  const response = await fetch(`${config.server}/api/users`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Cookie: `userToken=${token}`,
    },
  });
  const data = await response.json();
  return { data };
};

export default async function RootLayout({ children }) {
  const data = await getUserData();

  return (
    <div className="bg-cover h-screen overflow-hidden bg-[#F3F4F6] dark:bg-Dark flex">
      <DataSetter data={data.data} />
      <div>
        <div className="w-full h-full">
          <Sidebar />
        </div>
      </div>
      <div className="w-full h-full mx-auto ">
        <div className="w-full py-4 flex items-center justify-center dark:bg-Dark_light bg-white">
          <Header />
        </div>
        <div className="h-[90%] w-[100%] mx-auto overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
