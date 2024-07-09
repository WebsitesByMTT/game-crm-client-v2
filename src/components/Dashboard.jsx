"use client";
import { useEffect, useState } from "react";
import { GiTwoCoins } from "react-icons/gi";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { FaUserTie } from "react-icons/fa6";
import { Cell, Pie, ResponsiveContainer, PieChart } from "recharts";

const Dashboard = ({ data }) => {
  const [userData, setUserData] = useState(data);
  return (
    <div className="h-full w-full">
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
          <Card
            name="Clients"
            icon={<FaUserTie />}
            amount={userData?.subordinates?.length}
          ></Card>
          <div className="h-auto lg:h-[200px] w-[100%] bg-white dark:bg-Dark_light shadow-sm rounded-xl flex flex-col p-6 md:p-4 justify-evenly text-white">
            <div className="flex md:flex-row flex-col md:gap-2 text-2xl font-extralight md:items-center">
              <div className="bg-[#8C7CFD] w-fit p-2 md:p-1 rounded-md">
                <GiTwoCoins />
              </div>
              <span className="dark:text-white text-black font-semibold text-opacity-80 text-[14.5px] md:text-2xl">
                Credits
              </span>
            </div>
            <span className="text-center lg:text-[3.6rem] text-[4rem] dark:text-white text-black ">
              {userData?.credits !== null ? userData?.credits : "\u221E"}
            </span>
          </div>
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
      <div className="flex justify-between items-center">
        <span className="lg:text-[3.6rem] text-[3rem] dark:text-white text-black ">
          {amount}
        </span>
        <ResponsiveContainer width="40%" height="100%">
          <PieChart width="100%" height="100%">
            <Pie
              data={piedata}
              innerRadius={'70%'}
              outerRadius={'100%'}
              fill="#8884d8"
              paddingAngle={2}
              dataKey="value"
            >
              {piedata.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
