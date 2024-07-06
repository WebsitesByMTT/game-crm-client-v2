"use client";
import { useEffect, useState } from "react";
import { GiTwoCoins } from "react-icons/gi";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { FaUserTie } from "react-icons/fa6";

const Dashboard = ({ data }) => {
  const [userData, setUserData] = useState(data);

  useEffect(() => {
    setUserData(data);
  }, []);

  return (
    <div className="h-full w-full flex flex-col">
      <div className="w-full m-auto md:py-5 py-3 px-2 md:px-4 flex gap-5 flex-wrap items-center justify-center">
        <div className="h-auto lg:h-[200px] w-[71%]  bg-[#2a2a2aad] rounded-xl flex justify-between">
          <Card
            name="Recharge"
            icon={<FaHandHoldingDollar />}
            amount={userData?.totalRecharged}
          ></Card>
          <div className="h-[70px] lg:h-[80%] border-[1px] border-[#75757551] m-auto"></div>
          <Card
            name="Redeem"
            icon={<GiTwoCoins />}
            amount={userData?.totalRedeemed}
          ></Card>
          <div className="h-[70px] lg:h-[80%] border-[1px] border-[#75757551] m-auto"></div>
          <Card
            name="Clients"
            icon={<FaUserTie />}
            amount={userData?.subordinates?.length}
          ></Card>
        </div>
        <div className="h-auto lg:h-[200px] w-[23%] bg-[#2a2a2aad] rounded-xl flex flex-col p-2 md:p-4 justify-evenly text-white">
          <div className="flex md:flex-row flex-col md:gap-2 text-2xl font-extralight md:items-center">
            <div className="bg-[#8C7CFD] w-fit p-2 md:p-1 rounded-md">
              <GiTwoCoins />
            </div>
            <span className="text-[#dfdfdf9d] text-[14.5px] md:text-2xl">
              Credits
            </span>
          </div>
          <span className="lg:text-[4.5rem] text-[2.5rem] md:text-center font-semibold text-transparent bg-clip-text bg-gradient-to-bl from-[#bc89f1] from-[24%] via-[#D5CAFF] via-[36%] to-[#8c7cfd] drop-shadow-2xl">
            {userData?.credits !== null ? userData?.credits : "\u221E"}
          </span>
        </div>
      </div>
    </div>
  );
};

const Card = ({ name, icon, amount }) => {
  return (
    <div className="w-[30%] gap-2  md:gap-0 rounded-xl flex flex-col p-2 md:p-4 justify-evenly text-white">
      <div className="flex md:flex-row flex-col md:gap-2 text-2xl font-extralight md:items-center">
        <div className="border-[1px] border-[#847697] min-w-[20px] bg-[#8C7CFD] w-fit p-2 md:p-1 rounded-md">
          {icon}
        </div>
        <span className="text-[#dfdfdf9d] text-[14.5px] md:text-2xl">
          {name}
        </span>
      </div>
      <span className="lg:text-[4.5rem] text-[2rem] md:text-center font-semibold text-transparent bg-clip-text bg-gradient-to-bl from-[#bc89f1] from-[24%] via-[#D5CAFF] via-[36%] to-[#8c7cfd] drop-shadow-2xl">
        {amount}
      </span>
    </div>
  );
};

export default Dashboard;
