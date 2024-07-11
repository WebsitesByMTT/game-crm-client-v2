"use client";
import { useEffect, useState } from "react";
import { GiTwoCoins } from "react-icons/gi";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { FaUserTie } from "react-icons/fa6";
import { Cell, Pie, ResponsiveContainer, PieChart } from "recharts";

const Dashboard = ({ data }) => {
  const [userData, setUserData] = useState(data);
  console.log(data);
  return (
    <div className="h-fit w-full">
      <div className="w-full m-auto  py-3 px-2 lg:h-[25vh]  flex gap-5 flex-wrap items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 h-full lg:grid-cols-4 w-[96%] gap-5 md:gap-x-5 rounded-xl">
          <Card
            name="Recharge"
            icon={<FaHandHoldingDollar />}
            amount={userData?.totalRecharged}
          ></Card>
          <Card
            name="Redeem"
            icon={<GiTwoCoins />}
            amount={userData?.totalRedeemed}
          ></Card>
          {userData?.role !== "player" && (
            <Card
              name="Clients"
              icon={<FaUserTie />}
              amount={userData?.subordinates?.length}
            ></Card>
          )}
          <Card
            name="Credits"
            icon={<GiTwoCoins />}
            amount={userData?.credits !== null ? userData?.credits : "\u221E"}
          ></Card>
        </div>
      </div>
    </div>
  );
};

const Card = ({ name, icon, amount }) => {
  const piedata = [
    { name: "Recharge", value: 35 },
    { name: "Reddem", value: 65 },
  ];
  const COLORS = ["#E6EbF1", "#6D81F5 "];

  return (
    <div className="w-full gap-2  md:gap-0 rounded-xl shadow-sm flex bg-white dark:bg-Dark_light flex-col p-6 md:p-4 justify-evenly">
      <div className="flex md:flex-row flex-col md:gap-2 text-2xl font-extralight md:items-center">
        <div className="border-[1px] border-[#847697] min-w-[20px] text-white bg-[#8C7CFD] w-fit p-2 md:p-1 rounded-md">
          {icon}
        </div>
        <span className="dark:text-white text-black font-semibold text-opacity-80 text-[14.5px] md:text-2xl">
          {name}
        </span>
      </div>
      <div className="flex justify-between items-center overflow-hidden">
        <span className="lg:text-[3.6rem] text-[3rem] dark:text-white text-black ">
          {amount}
        </span>
      </div>
    </div>
  );
};

export default Dashboard;
