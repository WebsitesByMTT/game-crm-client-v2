"use client";
import Modal from "@/components/ui/Modal";
import { deleteGame, demo, getGames } from "@/utils/action";
import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import toast from "react-hot-toast";
import EditGame from "@/components/ui/modals/EditGame";
import DeleteModal from "@/components/ui/modals/DeleteModal";
import TableComponent from "@/components/TableComponent";
import Loader from "./ui/Loader";
import { handleFilter } from "@/utils/Filter";
import GamePayout from "./ui/modals/GamePayout";

const GameList = ({ platforms, games }) => {
  const [data, setData] = useState(games);
  const [filteredData, setFilteredData] = useState();
  const [open, setOpen] = useState(false);
  const [rowData, setRowData] = useState();
  const [modalType, setModalType] = useState("");
  const [search, setSearch] = useState("");
  const [load, setLoad] = useState(false);
  const [query, setQuery] = useState();

  useEffect(() => {
    setData(games);
    setFilteredData(games);
    if (query) {
      handleFilterData(query?.status);
    }
  }, [games, platforms, query]);

  const handleDelete = async (id) => {
    setLoad(true);
    const response = await deleteGame(platforms, id);
    setLoad(false);
    if (response?.error) {
      return toast.error(response.error);
    }
    toast.success(response.data.message);
    setOpen(false);
  };

  let ModalContent;
  switch (modalType) {
    case "Edit Game":
      ModalContent = (
        <EditGame
          prevData={rowData}
          id={rowData._id}
          setOpen={setOpen}
          platform={platforms}
        />
      );
      break;
    case "Manage Payouts":
      ModalContent = (
        <GamePayout
          tagname={rowData?.tagName}
          platform={platforms}
          setOpen={setOpen}
        />
      );
      break;
    case "Delete":
      ModalContent = (
        <DeleteModal
          title="game"
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

  const handleFilterData = (value) => {
    const dataFiltered = handleFilter(data, "status", value);
    setFilteredData(dataFiltered);
  };

  const handleSearch = (searchTerm) => {
    const filtered = data.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const tableData = {
    tableHead: ["name", "category", "Type", "status", "slug", "action"],
    tableBody: ["name", "category", "type", "status", "slug", "action"],
    Status: ["active", "inactive"],
  };

  return (
    <>
      <div className="h-[90%] w-[95%] mx-auto flex flex-col">
        <div className="lg:w-[100%] lg:flex items-center justify-between pt-4">
          <div className="w-full lg:w-[50%]  mb-3 flex shadow-lg items-center gap-2 text-black dark:text-white dark:bg-Dark_light border dark:border-none rounded-md  font-extralight py-4 lg:py-2 px-4">
            <div className="text-lg">
              <FiSearch />
            </div>
            <input
              name="search"
              className="ocus:outline-none outline-none placeholder:text-black dark:placeholder:text-[#fffbfb7c] text-md bg-transparent w-full"
              placeholder="Search By Name"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                handleSearch(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="overflow-y-auto">
          <TableComponent
            pageType="game"
            tableData={tableData}
            rowClick={handleRowClick}
            openModal={handleModalOpen}
            DashboardFetchedData={filteredData}
            deleteTableData={handleDelete}
            loadingStatus={data ? false : true}
            query={query}
            setQuery={setQuery}
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
      </div>
      <Loader show={load} />
    </>
  );
};

export default GameList;
