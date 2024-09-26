"use client";
import React, { useEffect, useState } from "react";
import TableComponent from "@/components/TableComponent";
import { handleFilter } from "@/utils/Filter";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { usePathname, useRouter } from "next/navigation";
import { filterAllTransactions, filterMyTransactions } from "@/utils/action";
import toast from "react-hot-toast";
import { TfiReload } from "react-icons/tfi";
import { FiSearch } from "react-icons/fi";
const Transactions = ({ totalPages, transactions, currentPage }) => {
  const [data, setData] = useState(transactions);
  const [filteredData, setFilteredData] = useState(transactions);
  const [count, setCount] = useState(currentPage);
  const [total, setTotal] = useState(totalPages);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [query, setQuery] = useState();
  const router = useRouter();
  const pathame = usePathname();
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!search && !query) {
      setData(transactions);
      setFilteredData(transactions);
    } else {
      debouncedFetchData(search);
    }
    setCount(parseInt(currentPage));
  }, [transactions, currentPage, query, pathame]);

  const fetchSearchData = async (username) => {
    try {
      let response;
      if (pathame === `/transaction/my`) {
        setLoadingStatus(true);
        response = await filterMyTransactions(username, count, query);
        setLoadingStatus(false);
      } else if (pathame === `/transaction/all`) {
        setLoadingStatus(true);
        response = await filterAllTransactions(username, count, query);
        setLoadingStatus(false);
      }
      if (response?.error) {
        toast.error(response.error);
      }
      setFilteredData(response?.transactions);
      setTotal(response?.totalPages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  let timeoutId = null;
  const debouncedFetchData = (username) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(async () => {
      fetchSearchData(username);
    }, 1000);
  };

  const tableData = {
    tableHead: ["type", "amount", "creditor", "debtor", "Updated At"],
    tableBody: ["type", "amount", "creditor", "debtor", "updatedAt"],
    Filter: ["recharge", "redeem"],
  };

  return (
    <div className="h-full w-[95%] mx-auto flex flex-col justify-between py-8">
      <div className={`md:w-[50%] flex items-center space-x-4 pt-5 h-fit`}>
        <>
          <div className="w-full mb-3 flex bg-white shadow-lg items-center gap-2 text-black dark:text-white dark:bg-Dark_light dark:border-none rounded-md  font-extralight py-4 md:py-2 px-4 ">
            <div className="text-lg">
              <FiSearch />
            </div>
            <input
              name="search"
              className="focus:outline-none  placeholder:text-black dark:placeholder:text-[#fffbfb7c] text-md bg-transparent w-full"
              placeholder="Search by Username"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                debouncedFetchData(e.target.value);
              }}
            />
          </div>
          <div
            className="text-Dark_light dark:text-white pb-3"
            onClick={() => {
              setFilteredData(transactions);
              setSearch("");
              setQuery({});
              setTotal(totalPages);
            }}
          >
            <TfiReload
              className="hover:text-gray-500 cursor-pointer"
              size={30}
            />
          </div>
        </>
      </div>
      <div className="h-[90%]">
        <TableComponent
          pageType="transaction"
          tableData={tableData}
          DashboardFetchedData={filteredData}
          loadingStatus={loadingStatus}
          query={query}
          setQuery={setQuery}
        />
      </div>
      {total > 1 && (
        <div className="h-fit mt-4 flex items-center justify-end gap-3 dark:text-white text-xl">
          <button
            disabled={count === 1}
            onClick={() => {
              setCount(count - 1);
              router.back();
            }}
            className="bg-[#9b95951d] p-2 rounded-md disabled:opacity-30"
          >
            <IoChevronBack />
          </button>
          <p>{count}</p>
          <button
            disabled={count === total}
            onClick={() => {
              setCount(count + 1);
              router.push(`?page=${count + 1}`);
            }}
            className="bg-[#9b95951d] p-2 rounded-md disabled:opacity-30"
          >
            <IoChevronForward />
          </button>
        </div>
      )}
    </div>
  );
};

export default Transactions;
