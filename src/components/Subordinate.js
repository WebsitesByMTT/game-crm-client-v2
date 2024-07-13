"use client";
import React, { useEffect, useState } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import Clients from "./Clients";
import Transactions from "./Transaction";
import Report from "./Report";
import { useRouter, usePathname } from "next/navigation";
import { getSubordinateTransactions } from "@/utils/action";
import toast from "react-hot-toast";

const Subordinate = ({ subordinateData }) => {
  const router = useRouter();
  const [option, setOption] = useState("report");
  const [transactions, setTransactions] = useState();
  const [count, setCount] = useState(1);
  const pathname = usePathname();

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const response = await getSubordinateTransactions(
          subordinateData._id,
          count
        );
        console.log("sub transactions", response);
        setTransactions(response?.data);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchTransaction();
  });
  const handleClick = () => {
    setOption("transactions");
  };
  useEffect(() => {
    if (option === "transactions" || option === "subordinates")
      router.push(`?page=1`);
  }, [option]);

  useEffect(() => {
    console.log(pathname);
  }, [pathname]);
  return (
    <div>
      <div className="w-[95%] m-auto py-5 flex justify-between">
        <div className="flex gap-3">
          <div
            onClick={() => {
              router.back();
            }}
            className="dark:text-white text-4xl my-auto opacity-40"
          >
            <IoChevronBackOutline />
          </div>
          <div>
            <h1 className="text-3xl text-black font-semibold dark:text-white capitalize">
              {subordinateData.username}
            </h1>
            <p className="text-md font-extralight text-black dark:text-gray-400 capitalize">
              <span>{subordinateData.role}</span>
            </p>
          </div>
        </div>
        <div className="flex gap-5 mt-5 ">
          <button
            onClick={() => {
              setOption("report");
            }}
            className={`px-4 bg-[#7969ed50] rounded-full ${
              option === "report"
                ? "text-white bg-[#8D7CFD]"
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
              className={`px-4 bg-[#7969ed50] rounded-full ${
                option === "subordinates"
                  ? "text-white bg-[#8D7CFD]"
                  : "text-[#f4f2f2ac]"
              } border-[1px] border-[#e3e2eb56] transition-all`}
            >
              Subordinates
            </button>
          )}
          <button
            onClick={handleClick}
            className={`px-4 bg-[#7969ed50] rounded-full ${
              option === "transactions"
                ? "text-white bg-[#8D7CFD]"
                : "text-[#f4f2f2ac]"
            } border-[1px] border-[#e3e2eb56] transition-all`}
          >
            Transactions
          </button>
        </div>
      </div>
      <div className="w-[95%] mx-auto gap-5 ">
        {subordinateData && option === "subordinates" && (
          <Clients clientData={subordinateData?.subordinates} />
        )}
        {transactions && option === "transactions" && (
          <Transactions
            totalPages={transactions?.totalPages}
            transactions={transactions?.transactions}
            currentPage={transactions?.currentPage}
          />
        )}

        {subordinateData && option === "report" && (
          <Report id={subordinateData?._id} />
        )}
      </div>
    </div>
  );
};

export default Subordinate;
