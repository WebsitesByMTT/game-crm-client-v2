"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FaCircle } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const TableComponent = ({
  tableData,
  DashboardFetchedData,
  rowClick,
  openModal,
  deleteTableData,
  pageType,
  Filter,
}) => {
  const router = useRouter();
  const [filterCountData, setFilterCountData] = useState({ From: "", To: "" });
  const userData = useSelector((state) => state.user.userData);
  const userId = userData?._id;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilterCountData((prevData) => ({
      ...prevData,
      [name]: Number(value),
    }));
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setFilterCountData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="rounded-md  h-[80vh] w-full mx-auto overflow-y-scroll">
      <Table className="bg-white dark:bg-Dark_light  rounded-2xl overflow-hidden">
        <TableHeader className="sticky text-black dark:text-white bg-white dark:bg-Dark_light text-opacity-70 top-0 ">
          <TableRow>
            {tableData?.tableHead?.map((item) => (
              <TableHead key={item} className="py-5">
                <div className="flex justify-center  items-center space-x-2">
                  <span className="capitalize">
                    {item == "totalRedeemed"
                      ? "redeem"
                      : item == "totalRecharged"
                      ? "Recharge"
                      : item}
                  </span>
                  {item !== "action" &&
                    item !== "username" &&
                    item !== "creditor" &&
                    item !== "debitor" &&
                    item !== "name" &&
                    item !== "category" &&
                    item !== "slug" &&
                    item !== "type" &&
                    item !== "action" && (
                      <DropdownMenu>
                        <DropdownMenuTrigger className="focus:outline-none">
                          <IoIosArrowDown />
                        </DropdownMenuTrigger>

                        <DropdownMenuContent>
                          {(item == "totalRedeemed" ||
                            item == "totalRecharged" ||
                            item == "credits" ||
                            item == "amount" ||
                            item == "Updated At") && (
                            <div className="p-2 space-x-3">
                              <input
                                type={item == "Updated At" ? "date" : "number"}
                                name="From"
                                placeholder="From"
                                onChange={
                                  item != "Updated At"
                                    ? handleInputChange
                                    : handleDateChange
                                }
                                className="outline-none border border-gray-700 bg-black text-white rounded-[.4rem] px-4 py-2"
                              />
                              <input
                                type={item == "Updated At" ? "date" : "number"}
                                name="To"
                                placeholder="To"
                                onChange={
                                  item != "Updated At"
                                    ? handleInputChange
                                    : handleDateChange
                                }
                                className="outline-none border border-gray-700 bg-black text-white rounded-[.4rem] px-4 py-2"
                              />
                              <button
                                onClick={() =>
                                  Filter(
                                    item,
                                    filterCountData,
                                    item == "Updated At"
                                      ? "Calender"
                                      : "Numbers"
                                  )
                                }
                                type="button"
                                class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                              >
                                Search
                              </button>
                            </div>
                          )}
                          {(item === "role" || item === "type"
                            ? tableData?.Filter
                            : item === "status"
                            ? tableData?.Status
                            : null
                          )?.map((subitem) => (
                            <DropdownMenuItem
                              key={subitem}
                              onClick={() => Filter(item, subitem)}
                              className="capitalize"
                            >
                              {subitem}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {DashboardFetchedData?.map((item, index) => (
            <TableRow
              className="text-black dark:text-gray-300"
              key={index}
              onClick={
                pageType === "transaction"
                  ? () => {
                      rowClick(item);
                      openModal("Transaction Details");
                    }
                  : null
              }
            >
              {tableData?.tableBody?.map((subitem) => {
                switch (subitem) {
                  case "username":
                    return (
                      <TableCell
                        onClick={() =>
                          router.push(`/clients/${userId}/${item._id}`)
                        }
                      >
                        {item.username}
                      </TableCell>
                    );

                  case "status":
                    return (
                      <TableCell
                        className={
                          item.status === "active"
                            ? "text-[#70ef44]"
                            : "text-[#ef4444]"
                        }
                      >
                        <div className="w-full flex gap-2 items-center justify-center">
                          <div className="text-[8px]">
                            <FaCircle />
                          </div>
                          <span className="text-black dark:text-gray-300">
                            {item.status}
                          </span>
                        </div>
                      </TableCell>
                    );

                  case "role":
                    return <TableCell>{item.role}</TableCell>;

                  case "totalRedeemed":
                    return (
                      <TableCell className="hidden md:table-cell">
                        {item.totalRedeemed}
                      </TableCell>
                    );

                  case "totalRecharged":
                    return (
                      <TableCell className="hidden md:table-cell">
                        {item?.totalRecharged}
                      </TableCell>
                    );

                  case "credits":
                    return (
                      <TableCell className="hidden md:table-cell">
                        {item.credits}
                      </TableCell>
                    );

                  case "action":
                    return (
                      <TableCell>
                        <div className="flex gap-5 text-2xl justify-center relative">
                          {pageType === "game" ? (
                            <div
                              onClick={(e) => {
                                e.stopPropagation();
                                rowClick(item);
                                openModal("Edit Game");
                              }}
                              className="flex gap-5 text-2xl justify-center relative"
                            >
                              <div className="text-[#1b1b1e] editgradient p-1 rounded-md">
                                <MdEdit />
                              </div>
                            </div>
                          ) : (
                            <>
                              <DropdownMenu>
                                <DropdownMenuTrigger className="text-[#1b1b1e] editgradient p-1 rounded-md">
                                  <BsThreeDotsVertical />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                  <DropdownMenuItem
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      openModal("Change Password");
                                      rowClick(item);
                                    }}
                                  >
                                    Change Password
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      rowClick(item);
                                      openModal("Recharge Client");
                                    }}
                                  >
                                    Recharge Client
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      rowClick(item);
                                      openModal("Redeem Client");
                                    }}
                                  >
                                    Redeem Client
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      rowClick(item);
                                      openModal("Update Status");
                                    }}
                                  >
                                    Update Status
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </>
                          )}
                          <div
                            onClick={(e) => {
                              deleteTableData(item._id, e);
                            }}
                            className="text-[#1b1b1e] deletegradient p-1 rounded-md"
                          >
                            <MdDeleteOutline />
                          </div>
                        </div>
                      </TableCell>
                    );

                  case "type":
                    return <TableCell>{item.type}</TableCell>;

                  case "amount":
                    return <TableCell>{item.amount}</TableCell>;

                  case "creditor":
                    return (
                      <TableCell className="hidden md:table-cell">
                        {item.creditor}
                      </TableCell>
                    );

                  case "debtor":
                    return (
                      <TableCell className="hidden md:table-cell">
                        {item.debtor}
                      </TableCell>
                    );

                  case "updatedAt":
                    return (
                      <TableCell className="hidden md:table-cell">
                        {item?.updatedAt?.split("T")[0]}
                      </TableCell>
                    );

                  case "name":
                    return <TableCell>{item.name}</TableCell>;

                  case "category":
                    return <TableCell>{item.category}</TableCell>;

                  case "slug":
                    return (
                      <TableCell className="hidden md:table-cell">
                        {item.slug}
                      </TableCell>
                    );
                }
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableComponent;
