"use client";
import Modal from "@/components/ui/Modal";
import { getTransactions } from "@/utils/action";
import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import TransactionDetails from "@/components/ui/modals/TransactionDetails";
import TableComponent from "@/components/TableComponent";
const Transactions = ({ transactions }) => {
  console.log("From component", transactions);
  const [data, setData] = useState(transactions);
  const [open, setOpen] = useState(false);
  const [rowData, setRowData] = useState();
  const [modalType, setModalType] = useState("");
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(transactions);

  let ModalContent;
  switch (modalType) {
    case "Transaction Details":
      ModalContent = <TransactionDetails data={rowData} />;
      break;

    default:
      ModalContent = null;
  }

  const handleModalOpen = (type) => {
    setModalType(type);
    setOpen(true);
  };

  const handleRowClick = (data) => {
    setRowData(data);
  };

  const handleSearch = (searchTerm) => {
    const filtered = data.filter((item) =>
      Object.values(item).some((value) =>
        value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };

  useEffect(() => {
    setData(transactions);
    setFilteredData(transactions);
  }, []);

  const tableData = {
    tableHead: ["Type", "Amount", "Creditor", "Debitor", "Updated At"],
    tableBody: ["type", "amount", "creditor", "debtor", "updatedAt"],
  };

  return (
    <div className="h-full w-[95%] mx-auto flex flex-col">
      <div className="w-[50%] pt-5">
        <div className="w-full flex shadow-lg items-center gap-2 text-black dark:text-white dark:bg-Dark_light border dark:border-none rounded-md  font-extralight py-2 px-4 ">
          <div className="text-lg">
            <FiSearch />
          </div>
          <input
            name="search"
            className="focus:outline-none placeholder:text-black dark:placeholder:text-[#fffbfb7c] text-md bg-transparent w-full"
            placeholder="Search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              handleSearch(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="pb-[6rem]">
        <TableComponent
          pageType="transaction"
          tableData={tableData}
          rowClick={handleRowClick}
          openModal={handleModalOpen}
          DashboardFetchedData={filteredData}
        />
      </div>
      <Modal
        open={open}
        setOpen={setOpen}
        modalType={modalType}
        setModalType={setModalType}
      >
        {ModalContent}
      </Modal>
    </div>
  );
};

export default Transactions;
