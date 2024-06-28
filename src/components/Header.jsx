"use client";
import React, { useEffect, useState } from "react";
import { PiUserCircleThin } from "react-icons/pi";
import { FiSearch } from "react-icons/fi";
import { GiTwoCoins } from "react-icons/gi";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { FaUserTie } from "react-icons/fa6";
import { getUserData } from "@/utils/action";
import toast from "react-hot-toast";

const Header = () => {
  const [data, setData] = useState();
  const [search, setSearch] = useState("");
  const fetchUserData = async () => {
    try {
      const response = await getUserData();
      setData(response.data);
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex gap-2 justify-evenly items-center p-4">
        <div className="w-[80%]">
          <div className="w-full flex shadow-lg items-center gap-2 text-white  rounded-md  font-extralight bg-[#dfdfdf1d] py-2 px-4 ">
            <div className="text-lg">
              <FiSearch />
            </div>
            <input
              name="search"
              className="focus:outline-none placeholder:text-[#fffbfb7c] text-md bg-transparent w-full"
              placeholder="Search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </div>
        </div>
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
      <div className="w-full m-auto py-5 px-4 flex gap-5 flex-wrap items-center justify-center">
        <div className="h-[200px] w-[71%] bg-[#dfdfdf2b] rounded-xl flex justify-between">
          <Card
            name="Recharge"
            icon={<FaHandHoldingDollar />}
            amount={data?.totalRecharged}
          ></Card>
          <div className="h-[80%] border-[1px] border-[#16151551] m-auto"></div>
          <Card
            name="Redeem"
            icon={<GiTwoCoins />}
            amount={data?.totalRedeemed}
          ></Card>
          <div className="h-[80%] border-[1px] border-[#16151551] m-auto"></div>
          <Card
            name="Clients"
            icon={<FaUserTie />}
            amount={data?.subordinates?.length}
          ></Card>
        </div>
        <div className="h-[200px] w-[23%] bg-[#dfdfdf2b] rounded-xl flex flex-col p-4 justify-evenly text-white">
          <div className="flex gap-2 text-2xl font-extralight items-center">
            <GiTwoCoins />
            <span>Credits</span>
          </div>
          <span className="text-[4.5rem] text-center font-semibold text-transparent bg-clip-text bg-gradient-to-bl from-[#bc89f1] from-[24%] via-[#D5CAFF] via-[36%] to-[#8c7cfd] drop-shadow-2xl">
            {data?.credits ? data?.credits : "\u221E"}
          </span>
        </div>
      </div>
    </div>
  );
};

const Card = ({ name, icon, amount }) => {
  return (
    <div className="w-[30%] rounded-xl flex flex-col p-4 justify-evenly text-white">
      <div className="flex gap-2 text-2xl font-extralight items-center">
        <div className="min-w-[20px]">{icon}</div>
        <span>{name}</span>
      </div>
      <span className="lg:text-[4.5rem] text-[2rem] text-center font-semibold text-transparent bg-clip-text bg-gradient-to-bl from-[#bc89f1] from-[24%] via-[#D5CAFF] via-[36%] to-[#8c7cfd] drop-shadow-2xl">
        {amount}
      </span>
    </div>
  );
};

export default Header;
