"use client";
import React, { useEffect, useState } from "react";
import { PiUserCircleThin } from "react-icons/pi";
import { useSelector } from "react-redux";
import { FaMoon } from "react-icons/fa";
import { IoSunny } from "react-icons/io5";


const Header = () => {
  const data = useSelector((state) => state.userData);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('dark-mode');
    if (savedMode) {
      setIsDarkMode(savedMode === 'true');
      if (savedMode === 'true') {
        document.body.classList.add('dark');
      }
    }
  }, []);

  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.body.classList.add('dark');
      localStorage.setItem('dark-mode', 'true');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('dark-mode', 'false');
    }
  };
  return (
    <div className="w-full flex flex-col dark:bg-Dark_light bg-white shadow-sm">
      <div className="w-[95%] mx-auto flex justify-between items-center py-4">
        <div>
          <div className="text-black dark:text-white text-[1.8rem] leading-tight font-semibold">Dashboard</div>
          <span className="dark:text-white text-opacity-75">Game CRM</span>
        </div>
        <div className="flex items-center space-x-4">
          <label htmlFor="dark-mode-toggle" className="flex items-center cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                id="dark-mode-toggle"
                className="sr-only"
                checked={isDarkMode}
                onChange={handleToggle}
              />
              <div className="block bg-gray-300 dark:bg-gray-600 w-14 h-8 rounded-full"></div>
              <div className={`dot absolute left-1 top-1 bg-white dark:bg-gray-800 w-6 h-6 rounded-full transition transform  duration-300 ${isDarkMode ? 'translate-x-6' : ''}`}>{isDarkMode?<FaMoon className="mt-1 text-white ml-[0.26rem]"/>:<IoSunny className="mt-1 text-yellow-500 ml-[0.26rem]"/>}</div>
            </div>
          </label>
          <div className="text-xl justify-center text-black p-2 rounded-md flex items-center gap-3">
            <div className="text-[3rem] text-[#7c8ffd]">
              <PiUserCircleThin />
            </div>
            <div>
              <p className="capitalize leading-7 dark:text-white">{data?.username}</p>
              <p className="capitalize leading-4 dark:text-white text-[14px]  opacity-85">
                {data?.role}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;