"use client";
import { getUserReport } from "@/utils/action";
import React, { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { FaArrowDown, FaArrowUp } from "react-icons/fa6";
import Loader from "./ui/Loader";

const Report = ({ id }) => {
  const [data, setData] = useState({});
  const [reportType, setReportType] = useState("Daily");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(id);
  const [pie, setpie] = useState();

  useEffect(() => {
    setUserId(id);
  }, [id]);

  useEffect(() => {
    (async () => {
      const res = await getUserReport(id, reportType);
      setData(res);
    })();
  }, [id, reportType]);

  const formatDate = (dateString) => {
    const options = {
      day: "numeric",
      month: "long",
      year: "2-digit",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    };
    return new Date(dateString).toLocaleString("en-US", options);
  };

  const handleReportTypeChange = (event) => {
    setReportType(event.target.value);
  };

  const piedata = [
    {
      name: "Master",
      value: data?.users?.master,
    },
    {
      name: "distributor",
      value: data?.users?.distributor,
    },
    {
      name: "Sub-distributor",
      value: data?.users?.subdistributor,
    },
    {
      name: "Store",
      value: data?.users?.store,
    },
    {
      name: "player",
      value: data?.users?.player,
    },
  ];
  const COLORS = ["#58c3f8", "#7cfe9b", "#ffda00", "#dc7de5", "#fc7272"];

  return (
    <>
      <div className="rounded-2xl flex flex-col gap-4">
        <div className=" flex items-center justify-between">
          <h5 className="text-2xl dark:text-white font-semibold ml-3">
            {reportType} Report
          </h5>
          <select
            id="reportType"
            value={reportType}
            onChange={handleReportTypeChange}
            className=" px-4 rounded-xl cursor-pointer outline-none dark:bg-Dark_light dark:text-white p-2"
          >
            <option value="Daily" className="cursor-pointer">
              Daily
            </option>
            <option value="Weekly" className="cursor-pointer">
              Weekly
            </option>
            <option value="Monthly" className="cursor-pointer">
              Monthly
            </option>
          </select>
        </div>
        <div className="flex flex-col">
          <Dashboard data={data} />
          <div className="flex justify-between gap-5">
            <div className="w-full min-h-[55vh] h-fit bg-white rounded-xl dark:bg-Dark_light p-3">
              <h3 className="dark:text-white font-semibold text-2xl">
                Recent Transactions
              </h3>
              <div className="grid grid-cols-2 gap-x-3 gap-y-3 h-[90%] mt-2">
                {data?.transactions?.map((item, index) => (
                  <TransactionCards data={item} key={index} />
                ))}
              </div>
            </div>
            {data?.role !== "player" && (
              <div className="w-[50%] h-[55vh] bg-white rounded-xl dark:bg-Dark_light">
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                  className={
                    "relative flex items-center justify-center rounded-2xl shadow-sm pb-20 pt-8 "
                  }
                >
                  <PieChart width="100%" height="100%">
                    <Pie
                      data={piedata}
                      innerRadius={140}
                      outerRadius={180}
                      paddingAngle={0}
                      dataKey="value"
                      label
                    >
                      {piedata.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                  {data?.users && (
                    <>
                      <div className="absolute top-[45%] left-[50%] text-center  translate-x-[-50%] translate-y-[-50%]">
                        {data?.role !== "company" ? (
                          <div className="text-center">
                            <div className="dark:text-white  text-[1.2rem] ">
                              Active
                              <span className="inline-block w-[15px] h-[15px] ml-2 rounded-full bg-[#6D81F5]"></span>
                            </div>
                            <div className="dark:text-white text-[1.2rem] ">
                              InActive
                              <span className="inline-block w-[15px] h-[15px] ml-2 rounded-full bg-cyan-300"></span>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center flex flex-col gap-2">
                            <div className="dark:text-white text-sm grid grid-cols-2">
                              <span>Master</span>
                              <span className="inline-block w-[15px] h-[15px] m-auto rounded-full bg-[#58c3f8]"></span>
                            </div>
                            <div className="dark:text-white text-sm grid grid-cols-2">
                              <span>Distributor</span>
                              <span className="inline-block w-[15px] h-[15px] m-auto rounded-full bg-[#7cfe9b]"></span>
                            </div>
                            <div className="dark:text-white text-sm grid grid-cols-2">
                              <span>Sub-Distributor</span>
                              <span className="inline-block w-[15px] h-[15px] m-auto rounded-full bg-[#ffda00]"></span>
                            </div>
                            <div className="dark:text-white text-sm grid grid-cols-2">
                              <span>Store</span>
                              <span className="inline-block w-[15px] h-[15px] m-auto rounded-full bg-[#dc7de5]"></span>
                            </div>
                            <div className="dark:text-white text-sm grid grid-cols-2">
                              <span>Player</span>
                              <span className="inline-block w-[15px] h-[15px] m-auto rounded-full bg-[#fc7272]"></span>
                            </div>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>
      </div>
      <Loader show={loading} />
    </>
  );
};

export default Report;

const TransactionCards = ({ data }) => {
  return (
    <div className="w-full bg-[#dfdfdf21] rounded-md p-2">
      <div className="w-full flex justify-between h-full">
        <div className="flex flex-col text-lg w-[50%] justify-evenly dark:text-white">
          <div className="grid grid-cols-2">
            <p>Creditor :</p>
            <span className="opacity-50">{data.creditor}</span>
          </div>
          <div className="grid grid-cols-2">
            <p>Debtor :</p>
            <span className="opacity-50">{data.debtor}</span>
          </div>
        </div>
        <div className="flex gap-2 text-4xl dark:text-white my-auto">
          <p>{data.amount}</p>
          {data.type === "redeem" ? (
            <span className="text-red-500">
              <FaArrowDown />
            </span>
          ) : (
            <span className="text-green-500">
              <FaArrowUp />
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
