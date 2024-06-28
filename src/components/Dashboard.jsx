"use client";
import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import { IoMdPersonAdd } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import toast from "react-hot-toast";
import Modal from "./ui/Modal";
import AddClientModal from "./ui/modals/AddClient";
import { deleteClient, getClients } from "@/utils/action";
import ClientDetails from "./ui/modals/ClientDetails";
import AddClient from "./ui/modals/AddClient";
import Password from "./ui/modals/Password";
import Recharge from "./ui/modals/Recharge";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [rowData, setRowData] = useState();
  const [refresh, setRefresh] = useState(false);
  const [modalType, setModalType] = useState("");
  const [id, setId] = useState(null);

  let ModalContent;
  switch (modalType) {
    case "Client Details":
      ModalContent = <ClientDetails data={rowData} />;
      break;

    case "Add Client":
      ModalContent = <AddClient setOpen={setOpen} setRefresh={setRefresh} />;
      break;

    case "Change Password":
      ModalContent = <Password id={id} />;
      break;

    case "Recharge Client":
      ModalContent = (
        <Recharge setOpen={setOpen} setRefresh={setRefresh} id={id} />
      );
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

  const fetchClients = async () => {
    try {
      const response = await getClients();
      setData(response.data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    try {
      const response = await deleteClient(id);
      console.log(response);
      toast.success(response.data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchClients();
  }, [refresh]);

  return (
    <div className="h-full w-full flex flex-col">
      <div className="w-full flex items-center justify-end my-2">
        <button
          onClick={() => handleModalOpen("Add Client")}
          className="text-center flex justify-center items-center gap-2 bg-gradient-to-b from-[#C5A5FF] to-[#362356] text-white text-xl rounded-[10px] p-2 font-[300] border-[1px] border-[#847697] hover:shadow-[0_30px_10px_-15px_rgba(0,0,0,0.2)] transition-all duration-200 ease-in-out w-fit"
        >
          <IoMdPersonAdd />
          <span>Add Client</span>
          <div className="text-2xl"></div>
        </button>
      </div>
      <div className="overflow-y-auto">
        <Table className="overflow-y-auto">
          <TableHeader>
            <TableRow>
              <TableHead className="">Username</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Redeem</TableHead>
              <TableHead>Recharge</TableHead>
              <TableHead>Credits</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((item, index) => (
              <TableRow
                key={index}
                onClick={() => {
                  handleRowClick(item);
                  handleModalOpen("Client Details");
                }}
              >
                <TableCell>{item.username}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>{item.role}</TableCell>
                <TableCell>{item.totalRedeemed}</TableCell>
                <TableCell>{item.totalRecharged}</TableCell>
                <TableCell>{item.credits}</TableCell>
                <TableCell>
                  <div className="flex gap-5 text-2xl justify-center relative">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="text-[#1b1b1e] editgradient p-1 rounded-md">
                        <BsThreeDotsVertical />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            handleModalOpen("Change Password");
                            setId(item._id);
                          }}
                        >
                          Change Password
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            handleModalOpen("Recharge Client");
                            setId(item._id);
                          }}
                        >
                          Recharge Client
                        </DropdownMenuItem>
                        <DropdownMenuItem>Redeem Client</DropdownMenuItem>
                        <DropdownMenuItem>Update Status</DropdownMenuItem>
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

export default Dashboard;
