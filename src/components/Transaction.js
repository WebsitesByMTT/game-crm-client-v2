"use client";
import React, { useEffect, useState } from "react";
import TableComponent from "@/components/TableComponent";
import { handleFilter } from "@/utils/Filter";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { useRouter } from "next/navigation";
const Transactions = ({ totalPages, transactions, currentPage }) => {
  const [data, setData] = useState(transactions);
  const [filteredData, setFilteredData] = useState(transactions);
  const [count, setCount] = useState(currentPage);
  const router = useRouter();

  useEffect(() => {
    setData(transactions);
    setFilteredData(transactions);
    setCount(parseInt(currentPage));
  }, [transactions, count]);

  const handleFilterData = (key, value, Num) => {
    const dataFiltered = handleFilter(data, key, value, Num);
    setFilteredData(dataFiltered);
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
          Filter={handleFilterData}
          loadingStatus={transactions}
        />
      </div>
      {totalPages > 1 && (
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
            disabled={count === totalPages}
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
