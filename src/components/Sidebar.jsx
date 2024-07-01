"use client";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { RiDashboardFill, RiMoneyRupeeCircleFill } from "react-icons/ri";
import { MdOutlinePlayCircleFilled } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { getUserData } from "@/utils/action";

const LeftSideBar = ({}) => {
  const router = useRouter();
  const [option, setOption] = useState("dashboard");
  const [open, setOpen] = useState(false);
  const [data, setData] = useState();
  const fetchUser = async () => {
    try {
      const response = await getUserData();
      setData(response.data);
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  const logOutUser = () => {
    Cookies.remove("userToken");
    router.push("/");
    toast.success("Logout Successfully");
  };

  return (
    <>
      <div
        className="block absolute top-0 left-0 lg:hidden text-[30px] text-white px-4 py-8"
        onClick={() => setOpen((prev) => !prev)}
      >
        <RxHamburgerMenu />
      </div>
      <div
        className={`py-4 border-r-2 bg-clip-padding backdrop-filter backdrop-blur-[5px] bg-opacity-10 border-[#e4e4e42f] px-5 ${
          open ? "flex backdrop-blur-[20px]" : "hidden"
        } lg:flex flex-col justify-between h-full lg:static absolute w-full top-0 left-0 z-10`}
      >
        <div>
          <div className="h-auto w-[15%] min-w-[50px]">
            <svg
              width="987"
              height="987"
              viewBox="0 0 987 987"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              <g clipPath="url(#clip0_23_17)">
                <path
                  d="M714.594 481.569C695.072 485.864 676.398 489.974 659.724 494.177C630.627 501.521 612.568 515.9 573.048 555.436L568.583 559.87L564.257 564.196L560.917 567.536L555.513 572.987C516.054 612.522 501.644 630.565 494.347 659.632C490.144 676.428 486.049 695.195 481.723 714.747C454.503 838.203 423.666 978.148 314.959 986.661C311.973 986.908 309.048 987 306.092 987C200.756 987 136.403 849.303 74.1443 716.148C62.5824 691.408 51.6824 668.084 41.0596 646.838C-27.3422 510.004 -10.3457 401.466 96.1752 294.853L153.246 237.705L204.959 185.961L238.121 152.753L260.983 129.876L295.207 95.6209C336.251 54.5767 401.697 0 496.271 0C543.243 0 592.492 13.2247 646.838 40.4591C668.022 51.082 691.331 61.9665 715.948 73.5439C853.091 137.758 994.867 204.159 986.323 314.621C977.84 423.482 837.988 454.349 714.594 481.569ZM617.864 94.5278C571.447 71.25 531.203 60.6117 494.809 60.6117C435.182 60.6117 385.978 89.278 337.098 138.205C321.98 153.369 303.213 172.121 280.197 195.152C247.081 228.299 219.123 256.287 195.614 279.827C172.598 302.859 153.831 321.656 138.713 336.775C60.0113 415.553 33.7314 495.147 95.0821 617.849C155.478 738.533 223.926 923.509 305.276 923.509C306.661 923.509 308.047 923.479 309.432 923.355C386.086 917.336 408.717 745.307 434.382 642.943C445.759 597.665 469.652 570.154 511.205 528.571C514.114 525.676 517.009 522.736 519.919 519.811C522.859 516.855 525.784 513.976 528.663 511.082C570.215 469.514 597.742 445.574 642.959 434.166C745.23 408.502 917.089 385.855 923.078 309.078C929.529 225.851 740.519 156.017 617.864 94.5278ZM553.881 277.271H615.462V338.853H553.881V277.271ZM553.881 184.899H615.462V246.481H553.881V184.899ZM461.508 277.271H523.09V338.853H461.508V277.271ZM461.508 184.899H523.09V246.481H461.508V184.899ZM342.332 589.675C330.801 601.222 312.08 601.222 300.534 589.675L276.425 565.566L252.993 588.998C241.446 600.544 222.725 600.544 211.194 588.998C199.648 577.451 199.648 558.73 211.194 547.199L234.626 523.752L211.194 500.32C199.648 488.774 199.648 470.053 211.194 458.506C222.725 446.96 241.446 446.96 252.993 458.506L276.425 481.938L299.857 458.506C311.403 446.96 330.108 446.96 341.655 458.506C353.202 470.053 353.202 488.774 341.655 500.32L318.223 523.752L342.332 547.877C353.879 559.423 353.879 578.144 342.332 589.675Z"
                  fill="url(#paint0_linear_23_17)"
                />
              </g>
              <defs>
                <linearGradient
                  id="paint0_linear_23_17"
                  x1="0.229797"
                  y1="493.5"
                  x2="986.69"
                  y2="493.5"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#8C7CFD" />
                  <stop offset="1" stopColor="#BC89F1" />
                </linearGradient>
                <clipPath id="clip0_23_17">
                  <rect width="987" height="987" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <ul className="mt-5 w-full py-4 flex flex-col gap-3 text-xl font-light text-white">
            <Link
              onClick={() => {
                setOption("dashboard");
                setOpen(false);
              }}
              href="/"
            >
              <li
                className={`w-full p-2 rounded-md flex gap-2 items-center hover:bg-[#dfdfdf33] transition-all ${
                  option === "dashboard" ? "bg-[#dfdfdf1e]" : "bg-transparent"
                }`}
              >
                <div
                  className={
                    option === "dashboard" ? "text-[#8C7CFD]" : "text-white"
                  }
                >
                  <RiDashboardFill />
                </div>
                <span>Dashboard</span>
              </li>
            </Link>
            <Link
              onClick={() => {
                setOption("transaction");
                setOpen(false);
              }}
              href="/transaction"
            >
              <li
                className={`w-full p-2 rounded-md flex gap-2 items-center hover:bg-[#dfdfdf33] transition-all ${
                  option === "transaction" ? "bg-[#dfdfdf1e]" : ""
                }`}
              >
                <div
                  className={option === "transaction" ? "text-[#8C7CFD]" : ""}
                >
                  <RiMoneyRupeeCircleFill />
                </div>
                <span>Transaction</span>
              </li>
            </Link>
            {data?.role === "company" && (
              <Link
                onClick={() => {
                  setOption("games");
                  setOpen(false);
                }}
                href="/game"
              >
                <li
                  className={`w-full p-2 rounded-md flex gap-2 items-center hover:bg-[#dfdfdf33] transition-all ${
                    option === "games" ? "bg-[#dfdfdf1e]" : ""
                  }`}
                >
                  <div className={option === "games" ? "text-[#8C7CFD]" : ""}>
                    <MdOutlinePlayCircleFilled />
                  </div>
                  <span>Games</span>
                </li>
              </Link>
            )}
          </ul>
        </div>
        <div className="pt-5 lg:pt-0">
          <button
            onClick={() => logOutUser()}
            className="text-center flex justify-center tracking-[0.1rem] items-center gap-2 bg-gradient-to-r from-[#8C7CFD] hover:from-[#BC89F1] hover:to-[#8C7CFD] to-[#BC89F1] mx-auto text-white text-xl rounded-md p-2 font-[600] hover:shadow-[0_30px_10px_-15px_rgba(0,0,0,0.2)] transition-all duration-200 ease-in-out w-full"
          >
            <span>LOGOUT</span>
            <div className="text-2xl">
              <IoLogOut />
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

export default LeftSideBar;
