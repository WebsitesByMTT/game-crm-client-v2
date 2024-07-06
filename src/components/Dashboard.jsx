"use client";
import { useEffect, useState } from "react";
import { GiTwoCoins } from "react-icons/gi";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { FaUserTie } from "react-icons/fa6";
import {
  AreaChart,
  Area,
  XAxis,
  PieChart,
  Pie,
  Sector,
  Cell,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getClients } from "@/utils/action";

const Dashboard = ({ data }) => {
  const [userData, setUserData] = useState(data);
  const [clientData, setClientData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const response = await getClients();
      setClientData(response.data);
    };
    fetchData();
    setUserData(data);
  }, [data]);

  const chartdata = [
    {
      name: "Jan",
      Received_Amount: 20,
      Due_Amount: 30,
      amt: 2400,
    },
    {
      name: "Feb",
      Received_Amount: 60,
      Due_Amount: 18,
      amt: 2210,
    },
    {
      name: "Mar",
      Received_Amount: 45,
      Due_Amount: 23,
      amt: 2290,
    },
    {
      name: "Apr",
      Received_Amount: 56,
      Due_Amount: 61,
      amt: 2000,
    },
    {
      name: "May",
      Received_Amount: 34,
      Due_Amount: 12,
      amt: 2181,
    },
    {
      name: "Jun",
      Received_Amount: 44,
      Due_Amount: 32,
      amt: 2500,
    },
    {
      name: "Jul",
      Received_Amount: 78,
      Due_Amount: 45,
      amt: 2100,
    },
    {
      name: "Aug",
      Received_Amount: 67,
      Due_Amount: 55,
      amt: 2100,
    },
    {
      name: "Sep",
      Received_Amount: 35,
      Due_Amount: 45,
      amt: 2100,
    },
    {
      name: "Oct",
      Received_Amount: 89,
      Due_Amount: 56,
      amt: 2100,
    },
    {
      name: "Nov",
      Received_Amount: 80,
      Due_Amount: 34,
      amt: 2100,
    },
    {
      name: "Dec",
      Received_Amount: 90,
      Due_Amount: 55,
      amt: 2100,
    },
  ];

  const piedata = [
    {
      name: "Active",
      value: clientData?.filter((item) => item.status == "active")?.length,
    },
    {
      name: "inActive",
      value: clientData?.filter((item) => item.status == "inactive")?.length,
    },
  ];
  const COLORS = ["#6D81F5", "cyan"];

  return (
    <div className="h-full w-full">
      <div className="w-full m-auto  py-3 px-2 h-[25vh]  flex gap-5 flex-wrap items-center justify-center">
        <div className="h-auto lg:h-[200px] w-[71%] rounded-xl space-x-5 flex justify-between">
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
        </div>
        <div className="h-auto lg:h-[200px] w-[23%] bg-white shadow-sm rounded-xl flex flex-col p-2 md:p-4 justify-evenly text-white">
          <div className="flex md:flex-row flex-col md:gap-2 text-2xl font-extralight md:items-center">
            <div className="bg-[#8C7CFD] w-fit p-2 md:p-1 rounded-md">
              <GiTwoCoins />
            </div>
            <span className="text-black font-semibold text-opacity-80 text-[14.5px] md:text-2xl">
              Credits
            </span>
          </div>
          <span className="text-center lg:text-[4.8rem] text-[2rem] text-black ">
            {userData?.credits !== null ? userData?.credits : "\u221E"}
          </span>
        </div>
      </div>
      <div className="rounded-2xl flex space-x-10  h-[60vh]  w-[95%] mx-auto">
        {/* GRaph */}
        <ResponsiveContainer
          width="60%"
          height="100%"
          className={"bg-white rounded-2xl shadow-sm pb-28 pt-8 "}
        >
          <div className="flex justify-between p-4">
            <div className="text-[1.2rem] text-black font-semibold">
              Payment Overview
            </div>
            <div className="flex items-center space-x-2">
              <div className="text-[1.1rem] ">SHORT BY:</div>
              <select className="bg-white border border-gray-300 text-black py-2 px-4 pr-8 rounded leading-tight focus:outline-none  focus:border-blue-500">
                <option value="monthly">Monthly</option>
                <option value="weakly">Weakly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
          </div>
          <AreaChart
            width={500}
            height={400}
            data={chartdata}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="Received_Amount"
              stroke="cyan"
              strokeWidth={5}
              fill="cyan"
            />
            <Area
              type="monotone"
              dataKey="Due_Amount"
              stroke="#6D81F5"
              strokeWidth={5}
              fill="#6D81F5"
            />
          </AreaChart>
        </ResponsiveContainer>
        {/* pieChart */}
        <ResponsiveContainer
          width="40%"
          height="100%"
          className={"relative rounded-2xl shadow-sm bg-white pb-20 pt-8 "}
        >
          <PieChart width="100%" height="100%">
            <Pie
              data={piedata}
              innerRadius={140}
              outerRadius={180}
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
          {data?.length > 0 && (
            <>
              <div className="absolute top-[50%] left-[50%] text-center  translate-x-[-50%] translate-y-[-50%]">
                <div className="text-black  text-[1.2rem] ">Clients</div>
                <div className="text-black  text-[1.5rem] font-semibold">
                  {data?.length}
                </div>
              </div>
              <div className="text-center">
                <div className="text-black  text-[1.2rem] ">
                  Active
                  <span className="inline-block w-[15px] h-[15px] ml-2 rounded-full bg-[#6D81F5]"></span>
                </div>
                <div className="text-black  text-[1.2rem] ">
                  InActive
                  <span className="inline-block w-[15px] h-[15px] ml-2 rounded-full bg-cyan-300"></span>
                </div>
              </div>
            </>
          )}
        </ResponsiveContainer>
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
    <div className="w-full gap-2  md:gap-0 rounded-xl shadow-sm flex bg-white flex-col p-2 md:p-4 justify-evenly">
      <div className="flex md:flex-row flex-col md:gap-2 text-2xl font-extralight md:items-center">
        <div className="border-[1px] border-[#847697] min-w-[20px] text-white bg-[#8C7CFD] w-fit p-2 md:p-1 rounded-md">
          {icon}
        </div>
        <span className="text-black font-semibold text-opacity-80 text-[14.5px] md:text-2xl">
          {name}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <span className="lg:text-[4.5rem] text-[2rem] text-black ">
          {amount}
        </span>
        <ResponsiveContainer width="40%" height="100%">
          <PieChart width="100%" height="100%">
            <Pie
              data={piedata}
              innerRadius={25}
              outerRadius={35}
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
``;
