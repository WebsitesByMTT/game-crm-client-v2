"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Modal from "@/components/ui/Modal";
import { deleteClient } from "@/utils/action";
import ClientDetails from "@/components/ui/modals/ClientDetails";
import Password from "@/components/ui/modals/Password";
import Recharge from "@/components/ui/modals/Recharge";
import { FiSearch } from "react-icons/fi";
import Redeem from "@/components/ui/modals/Redeem";
import ClientStatus from "@/components/ui/modals/ClientStatus";
import ClientTransactions from "@/components/ui/modals/ClientTransaction";
import TableComponent from "./TableComponent";
import { handleFilter } from "@/utils/Filter";

const Clients = ({ clientData }) => {
  const [data, setData] = useState(clientData);
  const [open, setOpen] = useState(false);
  const [rowData, setRowData] = useState();
  const [refresh, setRefresh] = useState(false);
  const [modalType, setModalType] = useState("");
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(clientData);
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
    setData(clientData);
    setFilteredData(clientData);
  }, []);

  const handleSearch = (searchTerm) => {
    const filtered = data.filter((item) =>
      item.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleFilterData = (key, value, Num) => {
    const dataFiltered = handleFilter(data, key, value, Num);
    setFilteredData(dataFiltered);
  };

  const tableData = {
    tableHead: [
      "username",
      "status",
      "role",
      "totalRedeemed",
      "totalRecharged",
      "credits",
      "action",
    ],
    tableBody: [
      "username",
      "status",
      "role",
      "totalRedeemed",
      "totalRecharged",
      "credits",
      "action",
    ],
    Filter: ["master", "distributor", "subdistributor", "store", "player"],
    Status: ["active", "inactive"],
  };

  return (
    <div className="h-full w-[95%] mx-auto flex flex-col">
      <div className="w-[50%] pb-4">
        <div className="w-full flex shadow-lg items-center gap-2 text-white  rounded-md  font-extralight bg-[#dfdfdf1d] py-2 px-4 ">
          <div className="text-lg">
            <FiSearch />
          </div>
          <input
            name="search"
            className="focus:outline-none placeholder:text-[#fffbfb7c] text-md bg-transparent w-full"
            placeholder="Search by Username"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              handleSearch(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="rounded-md h-[80vh] w-full bg-[#252525] mx-auto overflow-y-scroll">
        <TableComponent
          tableData={tableData}
          Filter={handleFilterData}
          DashboardFetchedData={filteredData}
          rowClick={handleRowClick}
          openModal={handleModalOpen}
          deleteTableData={handleDelete}
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
      <ClientTransactions
        data={rowData?.transactions}
        setOpenTransaction={setOpenTransaction}
        openTransaction={openTransaction}
      />
    </div>
  );
};

export default Clients;
