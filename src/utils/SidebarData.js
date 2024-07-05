import { FaUserTie, FaUsers } from "react-icons/fa";
import { MdOutlinePlayCircleFilled } from "react-icons/md";
import { RiDashboardFill, RiMoneyRupeeCircleFill } from "react-icons/ri";

export const SideBar = {
  company: [
    {
      LinkName: "Dashboard",
      Link: "/",
      icon: <RiDashboardFill />,
    },
    {
      LinkName: "Clients",
      Link: "/clients",
      icon: <FaUsers />,
    },
    {
      LinkName: "Transaction",
      Link: "/transaction",
      icon: <RiMoneyRupeeCircleFill />,
    },
    {
      LinkName: "Games",
      Link: "/game",
      icon: <MdOutlinePlayCircleFilled />,
    },
  ],
  all: [
    {
      LinkName: "Dashboard",
      Link: "/",
      icon: <RiDashboardFill />,
    },
    {
      LinkName: "Clients",
      Link: "/clients",
      icon: <FaUsers />,
    },
    {
      LinkName: "Transaction",
      Link: "/transaction",
      icon: <RiMoneyRupeeCircleFill />,
    },
  ],
};
