"use client";
import React, { useState } from "react";
import Dashboard from "./Dashboard";
import Clients from "./Clients";
import Transactions from "./Transaction";
import Report from "./Report";

const Subordinate = ({ subordinateData }) => {
  const [option, setOption] = useState("report");
  return (
    <div>
      <div className="w-[94%] pt-3 m-auto">
        <h1 className="text-2xl text-black dark:text-gray-400 capitalize">
          {subordinateData.username}
        </h1>
        <p className="text-md text-black dark:text-gray-400 capitalize">
          <span>{subordinateData.role}</span>
        </p>
      </div>
      <div className="flex h-fit w-[93%] mx-auto gap-5 mt-5 ">
        <button
          onClick={() => {
            setOption("report");
          }}
          className={`px-4 py-2 bg-[#7969ed50] rounded-md ${
            option === "report"
              ? "text-white bg-[#8d7cfd32]"
              : "text-[#f4f2f2ac]"
          } border-[1px] border-[#e3e2eb56]`}
        >
          Report
        </button>
        {subordinateData?.role !== "player" && (
          <button
            onClick={() => {
              setOption("subordinates");
            }}
            className={`px-4 py-2 bg-[#7969ed50] rounded-md ${
              option === "subordinates"
                ? "text-white bg-[#8D7CFD]"
                : "text-[#f4f2f2ac]"
            } border-[1px] border-[#e3e2eb56] transition-all`}
          >
            Subordinates
          </button>
        )}
        <button
          onClick={() => {
            setOption("transactions");
          }}
          className={`px-4 py-2 bg-[#7969ed50] rounded-md ${
            option === "transactions"
              ? "text-white bg-[#8D7CFD]"
              : "text-[#f4f2f2ac]"
          } border-[1px] border-[#e3e2eb56] transition-all`}
        >
          Transactions
        </button>
      </div>
      <div className="w-[95%] mx-auto gap-5 ">
        {subordinateData && option === "subordinates" && (
          <Clients clientData={subordinateData?.subordinates} />
        )}
        {subordinateData && option === "transactions" && (
          <Transactions transactions={subordinateData?.transactions} />
        )}

        {subordinateData && option === "report" && (
          <Report id={subordinateData?._id} />
        )}
      </div>
    </div>
  );
};

export default Subordinate;
