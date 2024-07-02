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
        className="bg-cover h-screen bg-gradient-to-b from-[#1a1a1a] to-[#1c1b20] flex gap-2"
      >
        <div className="lg:w-[10%] w-fit lg:min-w-[210px]">
          <div className="w-full h-full">
            <Sidebar />
          </div>
        </div>

        <div className="w-full mx-auto flex flex-col">
          <div>
            <Header />
          </div>
          <div className="h-full overflow-auto w-[93%] m-auto my-5">
            {children}
          </div>
        </div>
      </div>
  );
}
