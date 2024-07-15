"use client";
import { getUserReport } from "@/utils/action";
import React, { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { FaArrowDown, FaArrowUp } from "react-icons/fa6";
import Loader from "./ui/Loader";
import LoadingSkeleton from "./ui/skeleton/LoadingSkeleton";
import { useRouter, usePathname } from "next/navigation";

const Report = ({ id }) => {
  const [data, setData] = useState({});
  const [reportType, setReportType] = useState("Daily");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(id);
  const router = useRouter();
  const pathname = usePathname();
  const [pie, setpie] = useState();

  useEffect(() => {
    setUserId(id);
  }, [id]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await getUserReport(id, reportType);
      console.log("report ", res);
      setLoading(false);
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
  useEffect(() => {
    let piedata;
    if (data?.role === "company") {
      piedata = [
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
    } else {
      piedata = [
        {
          name: "Inactive",
          value: data?.users?.inactive,
        },
        {
          name: "active",
          value: data?.users?.active,
        },
      ];
    }
    setpie(piedata);
  }, [data]);

  const COLORS = ["#fc7272", "#7cfe9b", "#ffda00", "#dc7de5", "#58c3f8"];

  return (
    <>
      <div className="rounded-2xl flex flex-col gap-4">
        <div className=" flex items-center justify-between">
          <h5 className="text-2xl dark:text-white font-medium ml-3">
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
          <Dashboard data={data} loading={loading} />
          <div className="flex w-[98%] m-auto flex-col xl:flex-row xl:justify-between gap-5 xl:min-h-[55vh]">
            <div className="w-full h-full bg-white rounded-xl dark:bg-Dark_light py-5 px-6 relative">
              <h3 className="dark:text-white font-medium text-2xl mb-4">
                Recent Transactions
              </h3>
              <div className="grid text-nowrap grid-cols-2 gap-x-3 gap-y-3 h-[90%] mt-2">
                {!loading ? (
                  data?.transactions?.length > 0 ? (
                    <>
                      {data.transactions.map((item, index) => (
                        <TransactionCards data={item} key={index} />
                      ))}
                      {pathname === "/" && (
                        <div
                          className={`${
                            data?.transactions?.length % 2 === 0
                              ? "col-span-2"
                              : "col-span-1"
                          } flex w-[95%] mx-auto items-end justify-end `}
                        >
                          <button
                            onClick={() => {
                              router.push("/transaction/my?page=1");
                            }}
                            className="text-white text-md px-4 py-1 bg-gradient-to-b from-[#bc89f1] to-[#8c7cfd] rounded-full border-[1px]"
                          >
                            View all
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    <p className="h-full w-full dark:text-white text-center col-span-2 mt-5">
                      No recent transactions
                    </p>
                  )
                ) : (
                  <LoadingSkeleton
                    LoadingStyle={"w-[95%] m-auto rounded-xl h-[4rem]"}
                    count={9}
                  />
                )}
              </div>
            </div>
            {data?.role !== "player" && (
              <div
                className={`${
                  data?.users &&
                  Object.values(data.users).every((value) => value === 0)
                    ? "h-fit"
                    : "h-[40vh] lg:h-[56vh]"
                } w-full  lg:w-full xl:w-[50%] bg-white dark:bg-Dark_light rounded-xl px-6 py-5`}
              >
                <h3 className="dark:text-white font-medium text-2xl">
                  Client Distribution
                </h3>
                {data?.users &&
                Object.values(data.users).every((value) => value === 0) ? (
                  <p className="h-full w-full dark:text-white text-center col-span-2 mt-8">
                    No clients created
                  </p>
                ) : (
                  <div className="w-full h-[95%] bg-white rounded-xl dark:bg-Dark_light flex items-center justify-center">
                    <ResponsiveContainer
                      width="100%"
                      height="100%"
                      className={
                        "relative flex items-center justify-center rounded-2xl"
                      }
                    >
                      <PieChart width="100%" height="100%">
                        <Pie
                          data={pie}
                          innerRadius={"70%"}
                          outerRadius={"85%"}
                          paddingAngle={0}
                          dataKey="value"
                          className="w-full h-full"
                          label
                        >
                          {pie?.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                              className="outline-none"
                            />
                          ))}
                        </Pie>
                      </PieChart>
                      {data?.users && (
                        <>
                          <div className="absolute top-[50%] left-[50%] text-center  translate-x-[-50%] translate-y-[-50%]">
                            {data?.role !== "company" ? (
                              <div className="text-center">
                                <div className="dark:text-white  text-[1.2rem] ">
                                  Active
                                  <span className="inline-block w-[15px] h-[15px] ml-2 rounded-full bg-[#7cfe9b]"></span>
                                </div>
                                <div className="dark:text-white text-[1.2rem] ">
                                  InActive
                                  <span className="inline-block w-[15px] h-[15px] ml-2 rounded-full bg-[#fc7272]"></span>
                                </div>
                              </div>
                            ) : (
                              <div className="text-center flex flex-col gap-2">
                                <div className="dark:text-white text-sm grid grid-cols-2">
                                  <span>Master</span>
                                  <span className="inline-block w-[15px] h-[15px] m-auto rounded-full bg-[#fc7272]"></span>
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
                                  <span className="inline-block w-[15px] h-[15px] m-auto rounded-full bg-[#58c3f8]"></span>
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
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Report;

const TransactionCards = ({ data }) => {
  return (
    <div className="w-[95%] mx-auto rounded-xl p-2 border-[1px] bg-[#dfdfdf2a] border-[#dfdfdf38] dark:bg-[#1515157a]">
      <div className="w-full flex flex-col xl:flex-col xl:gap-1  2xl:flex-row justify-between h-full overflow-hidden">
        <div className="flex flex-col text-md w-fit justify-evenly dark:text-white overflow-hidden">
          <div className="grid grid-cols-2 gap-x-2">
            <p>Creditor :</p>
            <span className="opacity-90 dark:opacity-50 font-extralight">
              {data.creditor}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-x-2">
            <p>Debtor :</p>
            <span className="opacity-90 dark:opacity-50  font-extralight">
              {data.debtor}
            </span>
          </div>
        </div>
        <div className="flex gap-2 text-2xl lg:text-3xl w-fit  justify-center text-right dark:text-white my-auto">
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
