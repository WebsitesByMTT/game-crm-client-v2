"use client";
import { Suspense, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Modal from "@/components/ui/Modal";
import { deleteClient } from "@/utils/action";
import Password from "@/components/ui/modals/Password";
import Recharge from "@/components/ui/modals/Recharge";
import { FiSearch } from "react-icons/fi";
import Redeem from "@/components/ui/modals/Redeem";
import ClientStatus from "@/components/ui/modals/ClientStatus";
import DeleteModal from "@/components/ui/modals/DeleteModal";
import TableComponent from "./TableComponent";
import { handleFilter } from "@/utils/Filter";

const Clients = ({ clientData }) => {
  const [open, setOpen] = useState(false);
  const [rowData, setRowData] = useState();
  const [refresh, setRefresh] = useState(false);
  const [modalType, setModalType] = useState("");
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setData(clientData);
    setFilteredData(clientData);
  }, []);

  useEffect(() => {
    console.log("Here is data : ", data);
    console.log("Filtered ; ", filteredData);
  }, [data]);

  const handleDelete = async (id) => {
    try {
      const response = await deleteClient(id);
      setOpen(false);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  let ModalContent;
  switch (modalType) {
    case "Change Password":
      ModalContent = <Password id={rowData._id} setOpen={setOpen} />;
      break;

    case "Recharge Client":
      ModalContent = <Recharge setOpen={setOpen} id={rowData._id} />;
      break;

    case "Redeem Client":
      ModalContent = <Redeem setOpen={setOpen} id={rowData._id} />;
      break;

    case "Update Status":
      ModalContent = (
        <ClientStatus
          setOpen={setOpen}
          id={rowData._id}
          prevStatus={rowData.status}
        />
      );
      break;

    case "Delete":
      ModalContent = (
        <DeleteModal
          title="user"
          setOpen={setOpen}
          id={rowData._id}
          handleDelete={handleDelete}
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
      <div className="md:w-[50%] pt-5">
        <div className="w-full mb-3 flex bg-white shadow-lg items-center gap-2 text-black dark:text-white dark:bg-Dark_light dark:border-none rounded-md  font-extralight py-4 md:py-2 px-4 ">
          <div className="text-lg">
            <FiSearch />
          </div>
          <input
            name="search"
            className="focus:outline-none  placeholder:text-black dark:placeholder:text-[#fffbfb7c] text-md bg-transparent w-full"
            placeholder="Search by Username"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              handleSearch(e.target.value);
            }}
          />
        </div>
      </div>
        <TableComponent
          tableData={tableData}
          Filter={handleFilterData}
          DashboardFetchedData={filteredData}
          rowClick={handleRowClick}
          openModal={handleModalOpen}
          deleteTableData={handleDelete}
        />
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

export default Clients;
