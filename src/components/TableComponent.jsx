"use client";
import React, { useEffect, useState } from "react";
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
import LoadingSkeleton from "./ui/skeleton/LoadingSkeleton";

const TableComponent = ({
  tableData,
  DashboardFetchedData,
  rowClick,
  openModal,
  pageType,
  loadingStatus,
  query,
  setQuery,
}) => {
  const router = useRouter();
  const [filterCountData, setFilterCountData] = useState({ From: "", To: "" });
  const [isDropdownOpen, setIsDropdownOpen] = useState({});
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(DashboardFetchedData);
  }, [DashboardFetchedData]);

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

  const toggleDropdown = (item) => {
    setIsDropdownOpen((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  const closeDropdown = (item) => {
    setIsDropdownOpen((prev) => ({
      ...prev,
      [item]: false,
    }));
  };

  const handleSearchClick = (item) => {
    if (item === "Updated At") {
      setQuery({
        ...query,
        ["updatedAt"]: filterCountData,
      });
    } else {
      setQuery({
        ...query,
        [item]: filterCountData,
      });
    }
    closeDropdown(item);
  };

  const PassFilterData = (item, subitem) => {
    setQuery({
      ...query,
      [item]: subitem,
    });
    toggleDropdown(item);
  };

  return (
    <div className="w-full h-full mx-auto overflow-y-scroll">
      <Table className="bg-white dark:bg-Dark_light rounded-md overflow-hidden">
        <TableHeader className="sticky text-black dark:text-white bg-white dark:bg-Dark_light text-opacity-70 top-0 ">
          <TableRow>
            {tableData?.tableHead?.map((item) => (
              <TableHead key={item} className="py-5">
                <div className="flex justify-center items-center space-x-2">
                  <span className="capitalize">
                    {item === "totalRedeemed"
                      ? "redeem"
                      : item === "totalRecharged"
                      ? "Recharge"
                      : item}
                  </span>
                  {item !== "action" &&
                    item !== "username" &&
                    item !== "creditor" &&
                    item !== "debtor" &&
                    item !== "name" &&
                    item !== "category" &&
                    item !== "slug" &&
                    item !== "Type" && (
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          className="focus:outline-none"
                          onClick={() => toggleDropdown(item)}
                        >
                          <IoIosArrowDown />
                        </DropdownMenuTrigger>

                        {isDropdownOpen[item] && (
                          <DropdownMenuContent className="bg-[#F3F4F6] dark:bg-Dark dark:border-gray-700 border-gray-200">
                            {(item === "totalRedeemed" ||
                              item === "totalRecharged" ||
                              item === "credits" ||
                              item === "amount" ||
                              item === "Updated At") && (
                              <div className="p-2 space-x-3">
                                <input
                                  type={
                                    item === "Updated At" ? "date" : "number"
                                  }
                                  name="From"
                                  placeholder="From"
                                  onChange={
                                    item !== "Updated At"
                                      ? handleInputChange
                                      : handleDateChange
                                  }
                                  className="outline-none border dark:border-gray-700 shadow-lg dark:bg-Dark_light text-black dark:text-white rounded-[.4rem] px-4 py-2"
                                />
                                <input
                                  type={
                                    item === "Updated At" ? "date" : "number"
                                  }
                                  name="To"
                                  placeholder="To"
                                  onChange={
                                    item !== "Updated At"
                                      ? handleInputChange
                                      : handleDateChange
                                  }
                                  className="outline-none border shadow-lg dark:border-gray-700 dark:bg-Dark_light  text-black dark:text-white rounded-[.4rem] px-4 py-2"
                                />
                                <button
                                  onClick={() =>
                                    handleSearchClick(
                                      item,
                                      item === "Updated At"
                                        ? "Calender"
                                        : "Numbers"
                                    )
                                  }
                                  type="button"
                                  className="text-white bg-gray-500 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
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
                                onClick={() => PassFilterData(item, subitem)}
                                className="capitalize dark:text-white border-b-gray-300 dark:border-b-gray-500 cursor-pointer text-black"
                              >
                                {subitem}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        )}
                      </DropdownMenu>
                    )}
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.length > 0 ? (
            data.map((item, index) => (
              <TableRow
                className="dark:hover:bg-gray-700 hover:bg-[#64616149] transition-all
              text-black dark:text-gray-300"
                key={index}
              >
                {tableData?.tableBody?.map((subitem) => {
                  switch (subitem) {
                    case "username":
                      return (
                        <TableCell
                          key={subitem}
                          className="cursor-pointer hover:scale-[1.2] transition-all"
                          onClick={() => {
                            router.push(`/clients/${item._id}`);
                          }}
                        >
                          {item.username}
                        </TableCell>
                      );

                    case "status":
                      return (
                        <TableCell
                          key={subitem}
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
                      return <TableCell key={subitem}>{item.role}</TableCell>;

                    case "totalRedeemed":
                      return (
                        <TableCell key={subitem}>
                          {item.totalRedeemed}
                        </TableCell>
                      );

                    case "totalRecharged":
                      return (
                        <TableCell key={subitem}>
                          {item?.totalRecharged}
                        </TableCell>
                      );

                    case "credits":
                      return (
                        <TableCell key={subitem}>{item.credits}</TableCell>
                      );

                    case "action":
                      return (
                        <TableCell key={subitem}>
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
                                  <DropdownMenuTrigger className="text-[#1b1b1e]  editgradient p-1 rounded-md">
                                    <BsThreeDotsVertical />
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent className="bg-[#F3F4F6] dark:bg-Dark dark:border-gray-700 border-gray-200">
                                    <DropdownMenuItem
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        openModal("Change Password");
                                        rowClick(item);
                                      }}
                                      className="text-black dark:text-white dark:border-b-gray-700 border-b-gray-200 cursor-pointer"
                                    >
                                      Change Password
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        rowClick(item);
                                        openModal("Recharge Client");
                                      }}
                                      className="text-black dark:text-white dark:border-b-gray-700 border-b-gray-200  cursor-pointer"
                                    >
                                      Recharge Client
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        rowClick(item);
                                        openModal("Redeem Client");
                                      }}
                                      className="text-black dark:text-white dark:border-b-gray-700 border-b-gray-200  cursor-pointer"
                                    >
                                      Redeem Client
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        rowClick(item);
                                        openModal("Update Status");
                                      }}
                                      className="text-black dark:text-white dark:border-b-gray-700 border-b-gray-200  cursor-pointer"
                                    >
                                      Update Status
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </>
                            )}
                            <div
                              onClick={(e) => {
                                e.stopPropagation();
                                openModal("Delete");
                                rowClick(item);
                              }}
                              className="text-[#1b1b1e] deletegradient p-1 rounded-md"
                            >
                              <MdDeleteOutline />
                            </div>
                          </div>
                        </TableCell>
                      );

                    case "type":
                      return <TableCell key={subitem}>{item.type}</TableCell>;

                    case "amount":
                      return <TableCell key={subitem}>{item.amount}</TableCell>;

                    case "creditor":
                      return (
                        <TableCell key={subitem}>{item.creditor}</TableCell>
                      );

                    case "debtor":
                      return <TableCell key={subitem}>{item.debtor}</TableCell>;

                    case "updatedAt":
                      return (
                        <TableCell key={subitem}>
                          {item?.updatedAt?.split("T")[0]}
                        </TableCell>
                      );

                    case "name":
                      return <TableCell key={subitem}>{item.name}</TableCell>;

                    case "category":
                      return (
                        <TableCell key={subitem}>{item.category}</TableCell>
                      );

                    case "slug":
                      return <TableCell key={subitem}>{item.slug}</TableCell>;
                  }
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={tableData?.tableHead?.length}
                className="space-y-3"
              >
                {loadingStatus ? (
                  <LoadingSkeleton
                    LoadingStyle={"w-full h-[50px] rounded-md"}
                    count={5}
                  />
                ) : (
                  <div className="text-white capitalize">Data Not Found !</div>
                )}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableComponent;
