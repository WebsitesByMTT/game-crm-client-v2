import { Poppins } from "next/font/google";
import "../../app/globals.css";
import { Providers } from "@/redux/Providers";
import LeftSideBar from "@/components/dashborad/LeftSideBar";
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
    <Providers>
      <div
        style={{ backgroundImage: "url(/bg1.png)" }}
        className="bg-cover h-screen bg-gradient-to-b from-[#1a1a1a] to-[#1c1b20] flex gap-2"
      >
        <div className="lg:w-[10%] w-fit lg:min-w-[250px]">
          <div className="w-full h-full">
            <LeftSideBar />
          </div>
        </div>

        <div className="w-full mx-auto flex flex-col">
          <div>
            <Header />
          </div>
          <div className="h-full overflow-auto w-[93%] m-auto my-5">{children}</div>
        </div>
      </div>
    </Providers>
  );
}