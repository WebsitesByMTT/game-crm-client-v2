"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Modal from "@/components/ui/Modal";
import {
  deleteClient,
  searchAllByUsername,
  searchByUsername,
} from "@/utils/action";
import Password from "@/components/ui/modals/Password";
import Recharge from "@/components/ui/modals/Recharge";
import { FiSearch } from "react-icons/fi";
import Redeem from "@/components/ui/modals/Redeem";
import ClientStatus from "@/components/ui/modals/ClientStatus";
import DeleteModal from "@/components/ui/modals/DeleteModal";
import TableComponent from "./TableComponent";
import { TfiReload } from "react-icons/tfi";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { usePathname, useRouter } from "next/navigation";

const Clients = ({ currentPage, totalPages, clientData }) => {
  const [open, setOpen] = useState(false);
  const [rowData, setRowData] = useState();
  const [modalType, setModalType] = useState("");
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [search, setSearch] = useState();
  const [data, setData] = useState(clientData);
  const [filteredData, setFilteredData] = useState(clientData);
  const [count, setCount] = useState(currentPage);
  const [total, setTotal] = useState(totalPages);
  const router = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState();

  useEffect(() => {
    if (!search && !query) {
      setData(clientData);
      setFilteredData(clientData);
    } else {
      debouncedFetchData(search);
    }
    setCount(parseInt(currentPage));
  }, [clientData, currentPage, query, pathname]);

  const fetchSearchData = async (username) => {
    try {
      let response;
      if (pathname === `/clients/my`) {
        setLoadingStatus(true);
        response = await searchByUsername(username, count, query);
        console.log(response);
        setLoadingStatus(false);
      } else if (pathname === `/clients/all`) {
        setLoadingStatus(true);
        response = await searchAllByUsername(username, count, query);
        console.log(response);
        setLoadingStatus(false);
      }
      if (response?.error) {
        toast.error(response.error);
      }
      setFilteredData(response?.subordinates);
      setTotal(response?.totalPages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  let timeoutId = null;
  const debouncedFetchData = (username) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(async () => {
      fetchSearchData(username);
    }, 1000);
  };

  const handleDelete = async (id) => {
    const response = await deleteClient(id);
    if (response?.error) {
      toast.error(response.error);
    }
    setOpen(false);
    toast.success(response.data.message);
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
    <div className="h-full relative w-[95%] mx-auto flex flex-col">
      <div className={`md:w-[50%] flex items-center space-x-4 pt-5 h-fit`}>
        <>
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
                debouncedFetchData(e.target.value);
              }}
            />
          </div>
          <div
            className="text-Dark_light dark:text-white pb-3"
            onClick={() => {
              setFilteredData(clientData);
              setSearch("");
              setQuery({});
              setTotal(totalPages);
            }}
          >
            <TfiReload
              className="hover:text-gray-500 cursor-pointer"
              size={30}
            />
          </div>
        </>
      </div>
      <div className="h-[80%]">
        <TableComponent
          tableData={tableData}
          DashboardFetchedData={filteredData}
          rowClick={handleRowClick}
          openModal={handleModalOpen}
          deleteTableData={handleDelete}
          loadingStatus={loadingStatus}
          query={query}
          setQuery={setQuery}
        />
      </div>
      {total > 1 && (
        <div className="h-fit mt-4 flex items-center justify-end gap-3 dark:text-white text-xl">
          <button
            disabled={count === 1}
            onClick={() => {
              setCount(count - 1);
              router.back();
            }}
            className="bg-[#9b95951d] p-2 rounded-md disabled:opacity-30"
          >
            <IoChevronBack />
          </button>
          <p>{count}</p>
          <button
            disabled={count === total}
            onClick={() => {
              setCount(count + 1);
              router.push(`?page=${count + 1}`);
            }}
            className="bg-[#9b95951d] p-2 rounded-md disabled:opacity-30"
          >
            <IoChevronForward />
          </button>
        </div>
      )}
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
