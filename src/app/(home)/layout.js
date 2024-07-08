import { Poppins } from "next/font/google";
import "../../app/globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

const inter = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Game Crm",
  description: "Game Crm",
};

export default function RootLayout({ children }) {
  return (
      <div
        className="bg-cover h-screen bg-[#F3F4F6] dark:bg-Dark flex"
      >
       
        <div>
          <div className="w-full h-full">
            <Sidebar />
          </div>
        </div>

        <div className="w-full mx-auto ">
          <div>
            <Header />
          </div>
          <div className="h-full overflow-auto w-[100%] m-auto">
            {children}
          </div>
        </div>
      </div>
  );
}
