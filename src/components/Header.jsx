"use client";
import React, { useEffect, useState } from "react";
import { PiUserCircleThin } from "react-icons/pi";
import { getUserData } from "@/utils/action";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const Header = () => {
  const data = useSelector((state) => state.user.userData);

  return (
    <div className="w-full flex flex-col">
      <div className="w-[97%] flex justify-end items-center py-4">
        <div className="text-xl justify-center text-white p-2 rounded-md flex items-center gap-3">
          <div className="text-[3rem] text-[#7c8ffd]">
            <PiUserCircleThin />
          </div>
          <div>
            <p className="capitalize leading-7">{data?.username}</p>
            <p className="capitalize leading-4 text-[14px] font-extralight opacity-85">
              {data?.role}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
