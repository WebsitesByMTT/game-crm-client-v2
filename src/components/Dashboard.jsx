"use client";
import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import { IoMdPersonAdd } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDeleteOutline } from "react-icons/md";
import { IoOptions } from "react-icons/io5";
import { FaCircle } from "react-icons/fa";
import {
  Table,
  TableBody,
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
import toast from "react-hot-toast";
import Modal from "./ui/Modal";
import { deleteClient, getClients, getUserData } from "@/utils/action";
import ClientDetails from "./ui/modals/ClientDetails";
import AddClient from "./ui/modals/AddClient";
import Password from "./ui/modals/Password";
import Recharge from "./ui/modals/Recharge";
import { FiSearch } from "react-icons/fi";
import Redeem from "./ui/modals/Redeem";
import ClientStatus from "./ui/modals/ClientStatus";
import Loader from "@/components/ui/Loader";
import { GiTwoCoins } from "react-icons/gi";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { FaUserTie } from "react-icons/fa6";
import ClientTransactions from "./ui/modals/ClientTransaction";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [userData, setUserData] = useState();
  const [open, setOpen] = useState(false);
  const [rowData, setRowData] = useState();
  const [refresh, setRefresh] = useState(false);
  const [modalType, setModalType] = useState("");
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const [loading, setLoading] = useState(false);
  const [openTransaction, setOpenTransaction] = useState(false);

  let ModalContent;
  switch (modalType) {
    case "Client Details":
      ModalContent = (
        <ClientDetails
          data={rowData}
          setOpenTransaction={setOpenTransaction}
          setRowData={setRowData}
        />
      );
      break;

    case "Add Client":
      ModalContent = (
        <AddClient
          setOpen={setOpen}
          setRefresh={setRefresh}
          refresh={refresh}
          role={userData.role}
        />
      );
      break;

    case "Change Password":
      ModalContent = (
        <Password
          id={rowData._id}
          setRefresh={setRefresh}
          setOpen={setOpen}
          refresh={refresh}
        />
      );
      break;

    case "Recharge Client":
      ModalContent = (
        <Recharge
          setOpen={setOpen}
          setRefresh={setRefresh}
          id={rowData._id}
          refresh={refresh}
        />
      );
      break;

    case "Redeem Client":
      ModalContent = (
        <Redeem
          setOpen={setOpen}
          setRefresh={setRefresh}
          id={rowData._id}
          refresh={refresh}
        />
      );
      break;

    case "Update Status":
      ModalContent = (
        <ClientStatus
          setOpen={setOpen}
          setRefresh={setRefresh}
          id={rowData._id}
          prevStatus={rowData.status}
          refresh={refresh}
        />
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
      setLoading(true);
      const response = await getClients();
      setData(response.data);
      setFilteredData(response.data);
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await getUserData();
      console.log("Response", response.data);
      setUserData(response.data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    try {
      setRefresh((prev) => !prev);
      const response = await deleteClient(id);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchClients();
  }, [refresh]);

  const handleSearch = (searchTerm) => {
    const filtered = data.filter((item) =>
      Object.values(item).some((value) =>
        value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };

  const handleStatus = (status) => {
    const filtered = data.filter((item) => item.status === status);
    setFilteredData(filtered);
  };

  return (
    <div className="h-full w-full flex flex-col">
      <div className="w-full m-auto md:py-5 py-3 px-2 md:px-4 flex gap-5 flex-wrap items-center justify-center">
        <div className="h-auto lg:h-[200px] w-[71%]  bg-[#2a2a2aad] rounded-xl flex justify-between">
          <Card
            name="Recharge"
            icon={<FaHandHoldingDollar />}
            amount={userData?.totalRecharged}
          ></Card>
          <div className="h-[70px] lg:h-[80%] border-[1px] border-[#75757551] m-auto"></div>
          <Card
            name="Redeem"
            icon={<GiTwoCoins />}
            amount={userData?.totalRedeemed}
          ></Card>
          <div className="h-[70px] lg:h-[80%] border-[1px] border-[#75757551] m-auto"></div>
          <Card
            name="Clients"
            icon={<FaUserTie />}
            amount={userData?.subordinates?.length}
          ></Card>
        </div>
        <div className="h-auto lg:h-[200px] w-[23%] bg-[#2a2a2aad] rounded-xl flex flex-col p-2 md:p-4 justify-evenly text-white">
          <div className="flex md:flex-row flex-col md:gap-2 text-2xl font-extralight md:items-center">
            <div className="bg-[#8C7CFD] w-fit p-2 md:p-1 rounded-md">
              <GiTwoCoins />
            </div>
            <span className="text-[#dfdfdf9d] text-[14.5px] md:text-2xl">
              Credits
            </span>
          </div>
          <span className="lg:text-[4.5rem] text-[2.5rem] md:text-center font-semibold text-transparent bg-clip-text bg-gradient-to-bl from-[#bc89f1] from-[24%] via-[#D5CAFF] via-[36%] to-[#8c7cfd] drop-shadow-2xl">
            {userData?.credits !== null ? userData?.credits : "\u221E"}
          </span>
        </div>
      </div>
      <div className="w-full flex items-center justify-between gap-2 my-2">
        <div className="w-[70%]">
          <div className="w-full flex shadow-lg items-center gap-2 text-white  rounded-md  font-extralight bg-[#dfdfdf1d] py-2 px-4 ">
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
        </div>
        <div className="flex gap-5 items-center">
          <DropdownMenu>
            <DropdownMenuTrigger className="text-white text-3xl  bg-[#c4a5ff36] rounded-md p-2 border-[1px] border-[#847697] focus:outline-none">
              <IoOptions />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleStatus("active")}>
                Active
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatus("inactive")}>
                Inactive
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <button
            onClick={() => handleModalOpen("Add Client")}
            className="text-nowrap text-center flex justify-center items-center gap-2 bg-gradient-to-b from-[#C5A5FF] to-[#362356] text-white text-xl rounded-[10px] p-2 font-[300] border-[1px] border-[#847697] hover:shadow-[0_30px_10px_-15px_rgba(0,0,0,0.2)] transition-all duration-200 ease-in-out w-fit"
          >
            <IoMdPersonAdd />
            <span>Add Client</span>
            <div className="text-2xl"></div>
          </button>
        </div>
      </div>
      <div className="overflow-y-auto">
        <Table className="overflow-y-auto">
          <TableHeader>
            <TableRow>
              <TableHead>Username</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="hidden md:table-cell">Redeem</TableHead>
              <TableHead className="hidden md:table-cell">Recharge</TableHead>
              <TableHead className="hidden md:table-cell">Credits</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData?.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.username}</TableCell>
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
      </div>
      <Modal
        open={open}
        setOpen={setOpen}
        modalType={modalType}
        setModalType={setModalType}
      >
        {ModalContent}
      </Modal>
      <Loader show={loading} />
      <ClientTransactions
        data={rowData?.transactions}
        setOpenTransaction={setOpenTransaction}
        openTransaction={openTransaction}
      />
    </div>
  );
};

const Card = ({ name, icon, amount }) => {
  return (
    <div className="w-[30%] gap-2  md:gap-0 rounded-xl flex flex-col p-2 md:p-4 justify-evenly text-white">
      <div className="flex md:flex-row flex-col md:gap-2 text-2xl font-extralight md:items-center">
        <div className="border-[1px] border-[#847697] min-w-[20px] bg-[#8C7CFD] w-fit p-2 md:p-1 rounded-md">
          {icon}
        </div>
        <span className="text-[#dfdfdf9d] text-[14.5px] md:text-2xl">
          {name}
        </span>
      </div>
      <span className="lg:text-[4.5rem] text-[2rem] md:text-center font-semibold text-transparent bg-clip-text bg-gradient-to-bl from-[#bc89f1] from-[24%] via-[#D5CAFF] via-[36%] to-[#8c7cfd] drop-shadow-2xl">
        {amount}
      </span>
    </div>
  );
};

export default Dashboard;
