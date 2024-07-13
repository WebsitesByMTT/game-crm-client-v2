"use client";
import { useEffect, useState } from "react";
import { GiTwoCoins } from "react-icons/gi";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { FaUserTie } from "react-icons/fa6";
import LoadingSkeleton from "./ui/skeleton/LoadingSkeleton";

const Dashboard = ({ data, loading }) => {
  const [userData, setUserData] = useState(data);
  const [totalusers, setTotalusers] = useState();

  function sumUserValues(users) {
    const sum = Object.values(users).reduce(
      (acc, currentValue) => acc + currentValue,
      0
    );
    return sum;
  }

  useEffect(() => {
    setUserData(data);
    if (data?.users) {
      const count = sumUserValues(data?.users);
      setTotalusers(count);
    } else {
      setTotalusers(0);
    }
  }, [data]);
  return (
    <div className="w-full">
      <div className="w-full lg:h-[25vh] m-auto  py-3 px-2  flex gap-5 flex-wrap items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 h-full lg:grid-cols-4 w-full gap-5 md:gap-x-5 rounded-xl">
          <Card
            name="Recharge"
            icon={<FaHandHoldingDollar />}
            amount={userData?.recharge}
            loading={loading}
          ></Card>
          <Card
            name="Redeem"
            icon={<GiTwoCoins />}
            amount={userData?.redeem}
            loading={loading}
          ></Card>
          {userData?.role !== "player" && (
            <Card
              name="Clients"
              icon={<FaUserTie />}
              amount={totalusers}
              loading={loading}
            ></Card>
          )}
          {userData?.role === "company" && (
            <Card
              name="Players"
              icon={<GiTwoCoins />}
              amount={userData?.users?.player}
              loading={loading}
            ></Card>
          )}
        </div>
      </div>
    </div>
  );
};

const Card = ({ name, icon, amount, loading }) => {
  return (
    <div className="w-full gap-2  md:gap-0 rounded-xl shadow-sm flex bg-white dark:bg-Dark_light flex-col p-6 md:p-4 justify-evenly">
      <div className="flex md:flex-row flex-col md:gap-2 text-2xl font-light md:items-center">
        <div className="border-[1px] border-[#847697] min-w-[20px] text-white bg-[#8C7CFD] w-fit p-2 md:p-[5px] rounded-xl">
          {icon}
        </div>
        <span className="dark:text-white text-black text-opacity-80 text-[14.5px] md:text-2xl">
          {name}
        </span>
      </div>
      <div className="flex justify-between items-center overflow-hidden w-full">
        {loading ? (
          <LoadingSkeleton
            LoadingStyle={"w-[3rem] rounded-md h-[5.2rem]"}
            count={1}
          />
        ) : (
          <span className="lg:text-[3.6rem] text-[3rem] text-transparent bg-gradient-to-br from-[#8c7cfd] via-[#6c7fdd] dark:via-[#bfcaff] to-[#bc89f1] bg-clip-text text-black ">
            {amount}
          </span>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
