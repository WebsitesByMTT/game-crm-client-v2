import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FaCircle } from 'react-icons/fa';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MdDeleteOutline, MdEdit } from 'react-icons/md';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { IoIosArrowDown } from "react-icons/io";

const TableComponent = ({ tableData, DashboardFetchedData, rowClick, openModal, deleteTableData, pageType, Filter}) => {
  return (
    <Table>
      <TableHeader className="sticky top-0 bg-[#252525] z-50">
        <TableRow>
          {
            tableData?.tableHead?.map((item) => (
              <TableHead key={item} className="py-5">
                <div className='flex justify-center items-center space-x-2'>
                  <span>{item}</span>
                  {item == 'Role' && <DropdownMenu>
                    <DropdownMenuTrigger>
                      <IoIosArrowDown />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {
                        tableData?.Filter?.map((item) => (
                          <DropdownMenuItem key={item} onClick={()=>Filter(item)} className="capitalize">
                            {item}
                          </DropdownMenuItem>
                        ))

                      }
                    </DropdownMenuContent>
                  </DropdownMenu>}
                </div>

              </TableHead>
            ))
          }
        </TableRow>
      </TableHeader>
      <TableBody>
        {DashboardFetchedData?.map((item, index) => (
          <TableRow className={` ${index%2===0?'bg-[#111828]':''} #1F2937`} key={index}
            onClick={pageType === "transaction" ? () => {
              rowClick(item);
              openModal("Transaction Details");
            } : null}>
            {
              tableData?.tableBody?.map((subitem) => {
                switch (subitem) {
                  case "username":
                    return <TableCell>{item.username}</TableCell>;

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
                          <span className="text-white opacity-50">{item.status}</span>
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
                          {pageType === "game" ? <div
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
                            :
                            (<>
                              <div
                                className="text-[#1b1b1e] flex items-center justify-center text-sm viewgradient px-2 p-1 leading-3 font-[500] rounded-md cursor-pointer"
                                onClick={() => {
                                  rowClick(item);
                                  openModal("Client Details");
                                }}
                              >
                                View
                              </div>
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
                            </>)

                          }
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
                    return (
                      <TableCell>{item.type}</TableCell>
                    )

                  case "amount":
                    return (
                      <TableCell>{item.amount}</TableCell>
                    )

                  case "creditor":
                    return (
                      <TableCell className="hidden md:table-cell">
                        {item.creditor}
                      </TableCell>
                    )

                  case "debtor":
                    return (
                      <TableCell className="hidden md:table-cell">
                        {item.debtor}
                      </TableCell>
                    )

                  case "updatedAt":
                    return (
                      <TableCell className="hidden md:table-cell">
                        {item?.updatedAt?.split("T")[0]}
                      </TableCell>
                    )

                  case "name":
                    return (
                      <TableCell>{item.name}</TableCell>
                    )

                  case "category":
                    return (
                      <TableCell>{item.category}</TableCell>
                    )

                  case "slug":
                    return (
                      <TableCell className="hidden md:table-cell">
                        {item.slug}
                      </TableCell>
                    )
                }
              })
            }

          </TableRow>
        ))}
      </TableBody>
    </Table >
  )
}

export default TableComponent
