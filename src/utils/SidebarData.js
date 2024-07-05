import { FaUserTie, FaUsers } from "react-icons/fa";
import { MdOutlinePlayCircleFilled } from "react-icons/md";
import { RiDashboardFill, RiMoneyRupeeCircleFill } from "react-icons/ri";
import { SiGamedeveloper } from "react-icons/si";
import { IoLogoGameControllerB } from "react-icons/io";
import { AiOutlineTransaction } from "react-icons/ai";
import { RiUserAddFill } from "react-icons/ri";

export const SideBar = {
  company: [
    {
      LinkName: "Dashboard",
      Link: "/",
      icon: <RiDashboardFill />,
    },
    {
      LinkName: "Clients",
      icon: <FaUsers />,
      Link: "",
      showDropDown: true,
      nested: [
        {
          LinkName: "My Clients",
          Link: "/clients",
          icon: <FaUserTie />,
        },
        {
          LinkName: "All Clients",
          Link: "/clients",
          icon: <FaUsers />,
        },
        {
          LinkName: "Add Client",
          Link: "/add-client",
          icon: <RiUserAddFill />,
        },
      ],
    },
    {
      LinkName: "Transaction",
      Link: "",
      icon: <RiMoneyRupeeCircleFill />,
      showDropDown: true,
      nested: [
        {
          LinkName: "My Transaction",
          Link: "/transaction",
          icon: <AiOutlineTransaction />,
        },
        {
          LinkName: "All Transaction",
          Link: "/transaction",
          icon: <RiMoneyRupeeCircleFill />,
        },
      ],
    },
    {
      LinkName: "Games",
      Link: "",
      icon: <MdOutlinePlayCircleFilled />,
      showDropDown: true,
      nested: [
        {
          LinkName: "Hosted Game",
          Link: "/game",
          icon: <IoLogoGameControllerB />,
        },
        {
          LinkName: "Add Game",
          Link: "/add-game",
          icon: <SiGamedeveloper />,
        },
      ],
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
      icon: <FaUsers />,
      Link: "",
      showDropDown: true,
      nested: [
        {
          LinkName: "My Clients",
          Link: "/clients",
          icon: <FaUserTie />,
        },
        {
          LinkName: "All Clients",
          Link: "/clients",
          icon: <FaUsers />,
        },
        {
          LinkName: "Add Clients",
          Link: "/add-client",
          icon: <FaUsers />,
        },
      ],
    },
    {
      LinkName: "Transaction",
      Link: "",
      icon: <RiMoneyRupeeCircleFill />,
      showDropDown: true,
      nested: [
        {
          LinkName: "My Transaction",
          Link: "/transaction",
          icon: <RiMoneyRupeeCircleFill />,
        },
        {
          LinkName: "All Transaction",
          Link: "/transaction",
          icon: <RiMoneyRupeeCircleFill />,
        },
      ],
    },
  ],
};
