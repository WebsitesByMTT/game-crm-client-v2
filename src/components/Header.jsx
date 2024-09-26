"use client";
import { PiUserCircleThin } from "react-icons/pi";
import { useSelector } from "react-redux";
import { FaMoon } from "react-icons/fa";
import { IoSunny } from "react-icons/io5";
import { TbSettingsCheck } from "react-icons/tb";
import { TbSettingsExclamation } from "react-icons/tb";
import { useEffect, useRef, useState } from "react";
import Modal from "./ui/Modal";
import { addPlatform, getToggle, updateToggle } from "@/utils/action";
import toast from "react-hot-toast";
import Loader from "./ui/Loader";
import AddPlatform from "./ui/modals/AddPlatform";
import Maintenance from "./ui/modals/Maintenance";

const Header = () => {
  const userData = useSelector((state) => state.user.userData);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [load, setLoad] = useState(false);
  const [maintenance, setMaintenance] = useState(false);
  const countdownTimer = useRef(null);

  const handleMaintenance = () => {
    if (!maintenance) {
      handleModalOpen("Maintenance");
    } else {
      handleModalOpen("Maintenance");
      // updateToggleValue("null");
      // stopCountdown();
    }
  };

  //countdown
  function startCountdown(targetDate) {
    if (userData?.role === "company") {
      stopCountdown();

      const countdownElement = document.getElementById("countdown");

      countdownTimer.current = setInterval(() => {
        const now = new Date();
        const timeDifference = targetDate - now;

        // Check if the time difference is greater than 24 hours
        if (timeDifference > 0 && timeDifference > 24 * 60 * 60 * 1000) {
          // Format the target date for display
          const formattedDate = targetDate.toLocaleString("en-US", options); // Adjust options as needed
          countdownElement.innerText = `${formattedDate}`;
          return;
        }

        if (isNaN(targetDate?.getTime()) || timeDifference < 0) {
          clearInterval(countdownTimer.current);
          countdownElement.innerText = "Maintenance";
          updateToggleValue("null");
          return;
        }

        const hours = Math.floor(
          (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        const formattedTime = `${String(hours).padStart(2, "0")}:${String(
          minutes
        ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

        countdownElement.innerText = formattedTime;
      }, 1000);
    }
  }

  const options = {
    year: "2-digit",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  const stopCountdown = () => {
    if (userData?.role === "company") {
      if (countdownTimer.current) {
        clearInterval(countdownTimer.current);
        countdownTimer.current = null;
        const countdownElement = document.getElementById("countdown");
        countdownElement.innerText = "Maintenance";
      }
    }
  };

  //fetch under Maintenance value
  const fetchToggle = async () => {
    const response = await getToggle();
    setMaintenance(response.underMaintenance);
    const availableDate = new Date(response.availableAt);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    startCountdown(new Date(response.availableAt));
    if (availableDate.getTime() === today.getTime()) {
      updateToggleValue("null");
    }
  };

  //update toggle value
  const updateToggleValue = async (startDate) => {
    let availableAt = "null";
    if (startDate !== "null") {
      availableAt = new Date(startDate).toISOString();
    }
    const response = await updateToggle(availableAt);
    if (response?.error) {
      return toast.error(response?.error);
    }
    if (availableAt !== "null") {
      setMaintenance(true);
      startCountdown(new Date(response.availableAt));
      toast.success(response?.message || "Maintenance scheduled successfully");
    } else {
      setMaintenance(false);
    }
    setOpen(false);
  };

  const handleModalOpen = (type) => {
    setModalType(type);
    setOpen(true);
  };

  useEffect(() => {
    if (!open && !maintenance) {
      setMaintenance(false);
    }
  }, [open]);

  let ModalContent;
  switch (modalType) {
    case "Add Platform":
      ModalContent = <AddPlatform setOpen={setOpen} setLoad={setLoad} />;
      break;

    case "Maintenance":
      ModalContent = (
        <Maintenance
          maintenance={maintenance}
          updateToggle={updateToggleValue}
          stopCountdown={stopCountdown}
        />
      );
      break;

    default:
      ModalContent = null;
  }

  useEffect(() => {
    fetchToggle();
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

  return (
    <>
      <div className="w-full flex flex-col items-center">
        <div className="w-[95%] mx-auto flex flex-col justify-center items-end gap-3">
          <div className="flex items-center space-x-4">
            <div
              className="text-gray-800 dark:text-white dark:bg-Dark px-5 py-2 rounded-md hover:bg-opacity-70 bg-gray-200  cursor-pointer border-[1px] border-[#dfdfdf32]"
              onClick={() => handleModalOpen("Add Platform")}
            >
              Add Platform
            </div>
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
                <span className="dark:text-[#dfdfdf9c]">
                  {userData?.credits !== null ? userData?.credits : "\u221E"}
                </span>
              </p>
            </div>
          </div>

          {userData?.role === "company" && (
            <div className={`flex items-center gap-2 px-4 rounded-xl py-2 }`}>
              <span
                id="countdown"
                className="text-lg text-black dark:text-white font-light opacity-80"
              >
                Maintenance :
              </span>
              <div className="relative">
                <label
                  htmlFor="maintenance-toggle"
                  className="flex items-center cursor-pointer"
                >
                  <div className="relative">
                    <input
                      type="checkbox"
                      className="sr-only"
                      id="maintenance-toggle"
                      checked={maintenance}
                      value={maintenance}
                      onChange={handleMaintenance}
                    />
                    <div
                      className={`block ${
                        maintenance
                          ? "bg-[#ab242480] border-[#ab2424] border-[1px]"
                          : "bg-[#27b03488] border-[#27b035] border-[1px]"
                      } w-16 h-8 rounded-full`}
                    ></div>
                    <div
                      className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition transform  duration-300 ${
                        maintenance ? "translate-x-8" : ""
                      }`}
                    >
                      {maintenance ? (
                        <TbSettingsExclamation className="mt-1 text-red-500 ml-[0.26rem]" />
                      ) : (
                        <TbSettingsCheck className="mt-1 text-green-500 ml-[0.26rem]" />
                      )}
                    </div>
                  </div>
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Add Platform */}
      <Modal
        open={open}
        setOpen={setOpen}
        modalType={modalType}
        setModalType={setModalType}
      >
        {ModalContent}
      </Modal>
      <Loader show={load} />
    </>
  );
};

export default Header;
