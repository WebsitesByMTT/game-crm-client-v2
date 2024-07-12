"use client";
import { PiUserCircleThin } from "react-icons/pi";
import { useSelector } from "react-redux";
import { FaMoon } from "react-icons/fa";
import { IoSunny } from "react-icons/io5";
import { useEffect, useState } from "react";
import Modal from "./ui/Modal";
import { addPlatform } from "@/utils/action";
import toast from "react-hot-toast";
import Loader from "./ui/Loader";

const Header = () => {
  const userData = useSelector((state) => state.user.userData);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [platform, setPlatform] = useState("");
  const [load, setLoad] = useState(false);

  const handleModalOpen = (type) => {
    setModalType(type);
    setOpen(true);
  };

  useEffect(() => {
    const savedMode = localStorage.getItem("dark-mode");
    if (savedMode) {
      setIsDarkMode(savedMode === "true");
      if (savedMode === "true") {
        document.body.classList.add("dark");
      }
    }
  }, []);

  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("dark-mode", "true");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("dark-mode", "false");
    }
  };

  //Add Platfrom api
  const handeladdPlatform = async () => {
    if (platform === "") {
      return toast.error("This is a required field");
    }
    try {
      setLoad(true);
      const response = await addPlatform({ name: platform });
      if (response?.data?.name) {
        toast.success("Platform added successfuly!");
        setOpen(false);
        setPlatform("");
      }
      setLoad(false);
    } catch (error) {
      toast.error("Somthing Went Wrong!");
      setOpen(false);
      setLoad(false);
    }
  };

  return (
    <>
      <div className="w-full flex flex-col dark:bg-Dark_light bg-white shadow-sm">
        <div className="w-[95%] mx-auto flex  justify-end items-center py-4">
          <div className="lg:visible hidden">
            <div className="text-black dark:text-white text-[1.8rem] leading-tight font-semibold">
              Dashboard
            </div>
            <span className="dark:text-white text-opacity-75">Game CRM</span>
          </div>
          <div className="flex items-center space-x-4">
            {/* <div
              className="text-gray-800 dark:text-white dark:bg-Dark px-5 py-2 rounded-md hover:bg-opacity-70 bg-gray-200  cursor-pointer"
              onClick={() => handleModalOpen("Add Platform")}
            >
              Add Platform
            </div> */}
            <label
              htmlFor="dark-mode-toggle"
              className="flex items-center cursor-pointer"
            >
              <div className="relative">
                <input
                  type="checkbox"
                  id="dark-mode-toggle"
                  className="sr-only"
                  checked={isDarkMode}
                  onChange={handleToggle}
                />
                <div className="block bg-gray-300 dark:bg-gray-600 w-14 h-8 rounded-full"></div>
                <div
                  className={`dot absolute left-1 top-1 bg-white dark:bg-gray-800 w-6 h-6 rounded-full transition transform  duration-300 ${
                    isDarkMode ? "translate-x-6" : ""
                  }`}
                >
                  {isDarkMode ? (
                    <FaMoon className="mt-1 text-white ml-[0.26rem]" />
                  ) : (
                    <IoSunny className="mt-1 text-yellow-500 ml-[0.26rem]" />
                  )}
                </div>
              </div>
            </label>
            <div className="bg-[#dfdfdf24] py-1 px-4 rounded-md dark:text-white text-lg">
              <p>
                Credits :{" "}
                <span className="text-[#dfdfdf9c]">
                  {userData?.credits !== null ? userData?.credits : "\u221E"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Add Platform */}
      <Modal
        open={open}
        setOpen={setOpen}
        modalType={modalType}
        setModalType={setModalType}
      >
        <div className="">
          <div class="mb-5">
            <input
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              type="text"
              placeholder="Add platform"
              id="password"
              className="rounded-md shadow-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div className=" flex justify-center mt-2">
            <button
              onClick={handeladdPlatform}
              className="text-center flex justify-center px-4 items-center gap-2 bg-gradient-to-r from-[#8C7CFD] hover:from-[#BC89F1] hover:to-[#8C7CFD] to-[#BC89F1] mx-auto text-white text-xl rounded-md p-2 font-light hover:shadow-[0_30px_10px_-15px_rgba(0,0,0,0.2)] transition-all duration-200 ease-in-out"
            >
              Add
            </button>
          </div>
        </div>
      </Modal>
      <Loader show={load} />
    </>
  );
};

export default Header;
