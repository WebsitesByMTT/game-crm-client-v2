"use client";
import { useEffect, useState } from "react";
import { GetClientDataApi, apiDelete } from "../apiConfig/apis";
import { useSelector } from "react-redux";
import { IoMdPersonAdd } from "react-icons/io";
import { MdOutlineEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import toast from "react-hot-toast";
import Modal from "./ui/Modal";
import AddClientModal from "./ui/AddClientModal";

const Dashboard = () => {
  // const tabelstate = useSelector((state) => state.globlestate.TableState);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [openClient, setOpenClient] = useState(false);
  const [rowData, setRowData] = useState();
  const [editing, setEditing] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const handleRowClick = (data) => {
    setRowData(data);
    setOpen(true);
  };

  const handelUserData = async () => {
    try {
      const response = await GetClientDataApi();
      if (response.status === 200) {
        setData(response.data);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleDelete = async (id) => {
    setOpen(false);
    try {
      const response = await apiDelete(id);
      console.log(response);
      if (response.status === 200) {
        setRefresh((prev) => !prev);
        toast.success("user deleted successfully!");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    handelUserData();
  }, [refresh]);

  return (
    <div className="h-full w-full flex flex-col">
      <div className="w-full flex items-center justify-end my-2">
        <button
          onClick={() => setOpenClient(true)}
          className="text-center flex justify-center items-center gap-2 bg-gradient-to-b from-[#C5A5FF] to-[#362356] text-white text-xl rounded-[10px] p-2 font-[300] border-[1px] border-[#847697] hover:shadow-[0_30px_10px_-15px_rgba(0,0,0,0.2)] transition-all duration-200 ease-in-out w-fit"
        >
          <IoMdPersonAdd />
          <span>Add Client</span>
          <div className="text-2xl"></div>
        </button>
      </div>
      <div className="overflow-y-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="">Username</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Redeem</TableHead>
              <TableHead>Recharge</TableHead>
              <TableHead>Last Login</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((item, index) => (
              <TableRow key={index} onClick={() => handleRowClick(item)}>
                <TableCell>{item.username}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>{item.role}</TableCell>
                <TableCell>{item.totalRedeemed}</TableCell>
                <TableCell>{item.totalRecharged}</TableCell>
                <TableCell>{item?.lastLogin?.split("T")[0]}</TableCell>
                <TableCell>
                  <div className="flex gap-5 text-2xl justify-center">
                    <div
                      onClick={() => {
                        setOpen(true);
                        setEditing(true);
                      }}
                      className="text-[#1b1b1e] editgradient p-1 rounded-md"
                    >
                      <MdOutlineEdit />
                    </div>
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(item._id);
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
      </div>
      {rowData && (
        <Modal
          editing={editing}
          data={rowData}
          open={open}
          setOpen={setOpen}
          setEditing={setEditing}
          setRefresh={setRefresh}
        />
      )}
      <AddClientModal
        setRefresh={setRefresh}
        open={openClient}
        setOpen={setOpenClient}
      />
    </div>
  );
};

export default Dashboard;
