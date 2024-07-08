"use client";
import Modal from "@/components/ui/Modal";
import { deleteGame, getGames } from "@/utils/action";
import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import toast from "react-hot-toast";
import GameDetails from "@/components/ui/modals/GameDetails";
import EditGame from "@/components/ui/modals/EditGame";
import Loader from "@/components/ui/Loader";
import TableComponent from "@/components/TableComponent";

const GameList = ({ games }) => {
  const [data, setData] = useState(games);
  const [filteredData, setFilteredData] = useState(games);
  const [open, setOpen] = useState(false);
  const [rowData, setRowData] = useState();
  const [modalType, setModalType] = useState("");
  const [search, setSearch] = useState("");
  const optionList = [];

  let ModalContent;
  switch (modalType) {
    case "Game Details":
      ModalContent = <GameDetails data={rowData} />;
      break;

    case "Edit Game":
      ModalContent = (
        <EditGame
          prevData={rowData}
          id={rowData._id}
          setOpen={setOpen}
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
      const response = await deleteGame(id);
      toast.success(response.data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.message);
    }
  };


  const tableData = {
    tableHead: ["name", "category", "type", "status", "slug", "action"],
    tableBody: ["name", "category", "type", "status", "slug", "action"],
    Status: ["active", "inactive"]
  };

  return (
    <div className="h-full w-[95%] mx-auto flex flex-col">
      <div className="w-[50%] pt-4">
        <div className="w-full flex shadow-lg items-center gap-2 text-black dark:text-white dark:bg-Dark_light border dark:border-none rounded-md  font-extralight py-2 px-4">
          <div className="text-lg">
            <FiSearch />
          </div>
          <input
            name="search"
            className="ocus:outline-none placeholder:text-black dark:placeholder:text-[#fffbfb7c] text-md bg-transparent w-full"
            placeholder="Search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
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
  );
};

export default GameList;
