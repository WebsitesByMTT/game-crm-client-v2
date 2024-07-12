"use client";
import { getUserReport } from "@/utils/action";
import React, { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import TableComponent from "./TableComponent";

const Report = ({ id }) => {
  const [data, setData] = useState({});
  const [reportType, setReportType] = useState("Daily");

  useEffect(() => {
    (async () => {
      const res = await getUserReport(id, reportType);
      setData(res);
      console.log("Report", res);
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

  const transactionTableData = {
    tableHead: ["type", "amount", "creditor", "debtor", "Updated At"],
    tableBody: ["type", "amount", "creditor", "debtor", "updatedAt"],
    Filter: ["recharge", "redeem"],
  };

  const userTableData = {
    tableHead: ["name", "username", "role", "status", "Updated At"],
    tableBody: ["name", "username", "role", "status", "updatedAt"],
    Filter: ["master", "distributor", "subdistributor", "store", "player"],
    Status: ["active", "inactive"],
  };

  return (
    <div className="rounded-2xl flex flex-col gap-4">
      <div className=" flex items-center justify-between">
        <h5 className="text-2xl underline dark:text-white font-semibold ml-3">
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

      <div className="flex flex-col gap-4">
        <Dashboard data={data} />
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl dark:bg-Dark_light dark:text-white bg-white flex gap-1 flex-col">
            <h6 className="text-xl">Credits Given</h6>
            <p className="text-base flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-circle-dollar-sign"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
                <path d="M12 18V6" />
              </svg>
              <span>{data.creditsGiven}</span>
            </p>
          </div>
          <div className="p-4 rounded-2xl dark:bg-Dark_light dark:text-white bg-white flex gap-1 flex-col">
            <h6 className="text-xl">Credits Spent</h6>
            <p className="text-base flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-circle-dollar-sign"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
                <path d="M12 18V6" />
              </svg>
              <span>{data.moneySpent}</span>
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl dark:text-white flex flex-col gap-4">
          <h5 className="text-base">Transactions</h5>
          <div className="grid gap-2">
            {data.transactions && data.transactions.length > 0 ? (
              <TableComponent
                pageType="transaction"
                tableData={transactionTableData}
                DashboardFetchedData={data.transactions.slice(0, 5)}
              />
            ) : (
              <p>No transactions found for today.</p>
            )}
          </div>
        </div>

        <div className="rounded-2xl dark:text-white p-4 flex flex-col gap-4">
          <h5 className="text-base">Users Created</h5>
          <div className="grid gap-2">
            {/* {data.users && data.users.length > 0 ? (
              Array.from({ length: Math.min(data.users.length, 5) }).map(
                (_, index) => {
                  const user = data.users[index];
                  return (
                    <div
                      key={user._id}
                      className="bg-gray-200 dark:bg-gray-800 capitalize rounded-md p-2 grid grid-cols-5 gap-2"
                    >
                      <p className="col-span-1">{user.name}</p>
                      <p className="col-span-1">{user.username}</p>
                      <p className="col-span-1">{user.role}</p>
                      <p className="col-span-1">{user.status}</p>
                      <p className="col-span-1">{formatDate(user.createdAt)}</p>
                    </div>
                  );
                }
              )
            ) : (
              <p>No users created today.</p>
            )} */}
            {data.users && data.users.length > 0 ? (
              <TableComponent
                pageType="transaction"
                tableData={userTableData}
                DashboardFetchedData={data.users.slice(0, 5)}
              />
            ) : (
              <p>No users found for today.</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl dark:bg-Dark_light dark:text-white p-4 flex flex-col gap-4">
          <h5 className="text-base">Players Created</h5>
          <div className="grid gap-2">
            {data.players && data.players.length > 0 ? (
              Array.from({ length: Math.min(data.players.length, 5) }).map(
                (_, index) => {
                  const player = data.players[index];
                  return (
                    <div
                      key={player._id}
                      className="bg-gray-200 dark:bg-gray-800 capitalize rounded-md p-2 grid grid-cols-5 gap-2"
                    >
                      <p className="col-span-1">{player.name}</p>
                      <p className="col-span-1">{player.username}</p>
                      <p className="col-span-1">{player.role}</p>
                      <p className="col-span-1">{player.status}</p>
                      <p className="col-span-1">
                        {formatDate(player.createdAt)}
                      </p>
                    </div>
                  );
                }
              )
            ) : (
              <p>No players created today.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
