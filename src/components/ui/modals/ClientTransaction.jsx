"use client";
import {
  TableBody,
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { IoOptions } from "react-icons/io5";
import { IoMdCloseCircle } from "react-icons/io";

const ClientTransactions = ({ data, setOpenTransaction, openTransaction }) => {
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  const handleSearch = (searchTerm) => {
    const filtered = data.filter((item) =>
      Object.values(item).some((value) =>
        value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };

  const handleType = (type) => {
    const filtered = data.filter((item) => item.type === type);
    setFilteredData(filtered);
  };
  useEffect(() => {
    setFilteredData(data);
  },[]);

  return (
    <>
      {openTransaction && (
        <div className="fixed top-0 left-0 h-full w-full bg-[#00000092] backdrop-blur-[2px] z-10 flex items-center justify-center">
          <div className="h-[80%] w-[90%] lg:w-[50%] flex flex-col bg-[#1a1a1a] py-2 px-5 rounded-md">
            <div className="w-full flex items-center justify-between my-2">
              <div className="w-[70%] flex gap-2">
                <div className="w-full mb-3 flex shadow-lg items-center gap-2 text-white  rounded-md  font-extralight bg-[#dfdfdf1d] py-2 px-4 ">
                  <div className="text-lg">
                    <FiSearch />
                  </div>
                  <input
                    name="search"
                    className="focus:outline-none placeholder:text-[#fffbfb7c] text-md bg-transparent w-full"
                    placeholder="Search"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      handleSearch(e.target.value);
                    }}
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <div className="text-white text-3xl  bg-[#c4a5ff36] rounded-md p-2 border-[1px] border-[#847697]">
                      <IoOptions />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() => {
                        handleType("recharge");
                      }}
                    >
                      Recharge
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        handleType("redeem");
                      }}
                    >
                      Redeem
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <button
                className="text-2xl my-auto text-white"
                onClick={() => {
                  setOpenTransaction(false);
                }}
              >
                <IoMdCloseCircle />
              </button>
            </div>
            <div className="overflow-y-auto text-white">
              <Table className="overflow-y-auto">
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Creditor
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Debitor
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData?.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.type}</TableCell>
                      <TableCell>{item.amount}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        {item.creditor}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {item.debtor}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ClientTransactions;
