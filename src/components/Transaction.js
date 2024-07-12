"use client";
import React, {useState } from "react";
import TableComponent from "@/components/TableComponent";
import { handleFilter } from "@/utils/Filter";
const Transactions = ({ transactions }) => {
  const [data, setData] = useState(transactions);
  const [filteredData, setFilteredData] = useState(transactions);

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
    <div className="h-full w-[95%] mx-auto flex flex-col">
      {filteredData?.length > 0 ? (
        <div className="pt-[3rem]">
          <TableComponent
            pageType="transaction"
            tableData={tableData}
            DashboardFetchedData={filteredData}
            Filter={handleFilterData}
            loadingStatus={transactions}
          />
        </div>
      ) : (
        <p className="text-center text-black dark:text-white text-2xl mt-10">No Transactions Found! </p>
      )}
    </div>
  );
};

export default Transactions;
