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
import { MdDeleteOutline } from 'react-icons/md';
import { BsThreeDotsVertical } from 'react-icons/bs';

const TableComponent = ({ tableData, DashboardFetchedData }) => {
  return (
    <Table className="overflow-y-auto">
      <TableHeader>
        <TableRow>
          {
            tableData?.tableHead?.map((item) => (
              <TableHead>{item}</TableHead>
            ))
          }
        </TableRow>
      </TableHeader>
      <TableBody>
        {DashboardFetchedData?.map((item, index) => (
          <TableRow key={index}>
            {
              tableData?.tableBody?.map((subitem) => (
                subitem === "username" ?
                  <TableCell>{item.username}</TableCell>
                  : null
              ))
            }

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
            <TableCell>{item.role}</TableCell>
            <TableCell className="hidden md:table-cell">
              {item.totalRedeemed}
            </TableCell>
            <TableCell className="hidden md:table-cell">
              {item?.totalRecharged}
            </TableCell>
            <TableCell className="hidden md:table-cell">
              {item.credits}
            </TableCell>
            <TableCell>
              <div className="flex gap-5 text-2xl justify-center relative">
                <div
                  className="text-[#1b1b1e] flex items-center justify-center text-sm viewgradient px-2 p-1 leading-3 font-[500] rounded-md cursor-pointer"
                  onClick={() => {
                    handleRowClick(item);
                    handleModalOpen("Client Details");
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
                        handleModalOpen("Change Password");
                        handleRowClick(item);
                      }}
                    >
                      Change Password
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRowClick(item);
                        handleModalOpen("Recharge Client");
                      }}
                    >
                      Recharge Client
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRowClick(item);
                        handleModalOpen("Redeem Client");
                      }}
                    >
                      Redeem Client
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRowClick(item);
                        handleModalOpen("Update Status");
                      }}
                    >
                      Update Status
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <div
                  onClick={(e) => {
                    handleDelete(item._id, e);
                  }}
                  className="text-[#1b1b1e] deletegradient p-1 rounded-md"
                >
                  <MdDeleteOutline />
                </div>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default TableComponent
