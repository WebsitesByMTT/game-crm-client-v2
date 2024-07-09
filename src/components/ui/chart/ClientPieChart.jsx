"use client";
import { getMyClients } from "@/utils/action";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { PieChart, Pie, ResponsiveContainer, Cell } from "recharts";

const ClientPieChart = () => {
  const [data, setData] = useState();
  const userData = useSelector((state) => state.user.userData);
  const userId = userData?._id;
  useEffect(() => {
    const fetchMyClients = async () => {
      const response = await getMyClients(userId);
      setData(response.data.subordinates);
    };
    fetchMyClients();
  }, []);

  const piedata = [
    {
      name: "Active",
      value: data?.filter((item) => item.status == "active")?.length,
    },
    {
      name: "inActive",
      value: data?.filter((item) => item.status == "inactive")?.length,
    },
  ];
  const COLORS = ["#6D81F5", "cyan"];
  return (
    <ResponsiveContainer
      className={"relative rounded-2xl md:w-[40%] h-full shadow-sm dark:bg-Dark_light bg-white pb-[12rem] md:pb-20 pt-8 "}
    >
      <PieChart width="100%" height="100%">
        <Pie
          data={piedata}
          innerRadius={'80%'}
          outerRadius={'100%'}
          fill="#8884d8"
          paddingAngle={2}
          dataKey="value"
        >
          {piedata.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
      {data?.length > 0 && (
        <>
          <div className="absolute top-[50%] left-[50%] text-center  translate-x-[-50%] translate-y-[-50%]">
            <div className="text-black dark:text-white text-[1.2rem] ">Clients</div>
            <div className="text-black dark:text-white text-[1.5rem] font-semibold">
              {data?.length}
            </div>
          </div>
          <div className="text-center">
            <div className="text-black dark:text-white text-[1.2rem] ">
              Active
              <span className="inline-block w-[15px] h-[15px] ml-2 rounded-full bg-[#6D81F5]"></span>
            </div>
            <div className="text-black dark:text-white text-[1.2rem] ">
              InActive
              <span className="inline-block w-[15px] h-[15px] ml-2 rounded-full bg-cyan-300"></span>
            </div>
          </div>
        </>
      )}
    </ResponsiveContainer>
  );
};

export default ClientPieChart;
