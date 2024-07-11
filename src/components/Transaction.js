"use client";
import Modal from "@/components/ui/Modal";
import { getTransactions } from "@/utils/action";
import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import TableComponent from "@/components/TableComponent";
import { handleFilter } from "@/utils/Filter";
const Transactions = ({ transactions }) => {
  const [data, setData] = useState(transactions);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(transactions);

  const handleSearch = (searchTerm) => {
    const filtered = data.filter((item) => {
      const creditor = item.creditor.toLowerCase();
      const debtor = item.debtor.toLowerCase();
      const search = searchTerm.toLowerCase();
      return creditor.includes(search) || debtor.includes(search);
    });

    setFilteredData(filtered);
  };

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
          />
        </div>
      ) : (
        <p className="text-center text-black dark:text-white text-2xl mt-10">No Transactions yet! </p>
      )}
    </div>
  );
};

export default Transactions;
