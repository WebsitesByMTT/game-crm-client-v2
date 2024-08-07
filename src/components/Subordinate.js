"use client";
import React, { useEffect, useState } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import Clients from "./Clients";
import Transactions from "./Transaction";
import Report from "./Report";
import { useRouter, usePathname } from "next/navigation";
import {
  getSubordinateClients,
  getSubordinateTransactions,
} from "@/utils/action";
import toast from "react-hot-toast";
import Loader from "./ui/Loader";

const Subordinate = ({ page, subordinateData }) => {
  const router = useRouter();
  const [option, setOption] = useState("report");
  const [transactions, setTransactions] = useState();
  const [subordinates, setSubordinates] = useState();
  const [currentPage, setCurrentPage] = useState(page);
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  useEffect(() => {
    const fetchdata = async () => {
      if (option === "transactions") {
        setLoading(true);
        const response = await getSubordinateTransactions(
          subordinateData._id,
          currentPage
        );
        setLoading(false);
        if (response?.error) {
          return toast.error(response.error);
        }
        setTransactions(response?.data);
      } else if (option === "subordinates") {
        setLoading(true);
        const response = await getSubordinateClients(
          subordinateData?._id,
          currentPage
        );
         setLoading(false);
        if (response?.error) {
          return toast.error(response.error);
        }
        setSubordinates(response?.data);
      }
    };
    fetchdata();
  }, [currentPage, option]);

  return (
    <div className="min-h-full h-auto ">
      <div className="w-[90%] md:w-[95%] m-auto py-2 flex flex-col md:flex-row justify-between">
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
                router.push(`${pathname}?page=1`);
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
            onClick={() => {
              setOption("transactions");
              router.push(`${pathname}?page=1`);
            }}
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
        {subordinates && option === "subordinates" && (
          <Clients
            totalPages={subordinates?.totalPages}
            currentPage={currentPage}
            clientData={subordinates?.subordinates}
          />
        )}
        {transactions && option === "transactions" && (
          <Transactions
            totalPages={transactions?.totalPages}
            transactions={transactions?.transactions}
            currentPage={currentPage}
          />
        )}
        {subordinateData && option === "report" && (
          <Report id={subordinateData?._id} />
        )}
      </div>
      <Loader show={loading} />
    </div>
  );
};

export default Subordinate;
