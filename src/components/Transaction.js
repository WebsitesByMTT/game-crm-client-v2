"use client";
import React, { useEffect, useState } from "react";
import TableComponent from "@/components/TableComponent";
import { handleFilter } from "@/utils/Filter";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { usePathname, useRouter } from "next/navigation";
import { filterAllTransactions, filterMyTransactions } from "@/utils/action";
import toast from "react-hot-toast";
const Transactions = ({ totalPages, transactions, currentPage }) => {
  const [data, setData] = useState(transactions);
  const [filteredData, setFilteredData] = useState(transactions);
  const [count, setCount] = useState(currentPage);
  const [total, setTotal] = useState(totalPages);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [query, setQuery] = useState();
  const router = useRouter();
  const pathame = usePathname();

  useEffect(() => {
    if (!query) {
      setData(transactions);
      setFilteredData(transactions);
    } else {
      debouncedFetchData();
    }
    setCount(parseInt(currentPage));
  }, [transactions, currentPage, query, pathame]);

  const fetchSearchData = async () => {
    try {
      let response;
      if (pathame === `/transaction/my`) {
        setLoadingStatus(true);
        response = await filterMyTransactions(count, query);
        setLoadingStatus(false);
      } else if (pathame === `/transaction/all`) {
        setLoadingStatus(true);
        response = await filterAllTransactions(count, query);
        setLoadingStatus(false);
      }
      if (response?.error) {
        toast.error(response.error);
      }
      console.log(response);
      setFilteredData(response?.transactions);
      setTotal(response?.totalPages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  let timeoutId = null;
  const debouncedFetchData = () => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(async () => {
      fetchSearchData();
    }, 1000);
  };

  const tableData = {
    tableHead: ["type", "amount", "creditor", "debtor", "Updated At"],
    tableBody: ["type", "amount", "creditor", "debtor", "updatedAt"],
    Filter: ["recharge", "redeem"],
  };

  return (
    <div className="h-full w-[95%] mx-auto flex flex-col justify-between py-8">
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
