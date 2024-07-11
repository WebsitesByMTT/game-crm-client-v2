"use client";
import Modal from "@/components/ui/Modal";
import { deleteGame, getGames } from "@/utils/action";
import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import toast from "react-hot-toast";
import EditGame from "@/components/ui/modals/EditGame";
import DeleteModal from "@/components/ui/modals/DeleteModal";
import TableComponent from "@/components/TableComponent";
import { handleFilter } from "@/utils/Filter";
import Loader from "./ui/Loader";

const GameList = ({ platforms }) => {
  const [data, setData] = useState();
  const [filteredData, setFilteredData] = useState();
  const [open, setOpen] = useState(false);
  const [rowData, setRowData] = useState();
  const [modalType, setModalType] = useState("");
  const [search, setSearch] = useState("");

  const [load, setLoad] = useState(false)
  const [selectplatform, setSelectplatform] = useState('all')
  const handelGamesData = async () => {
    const games = await getGames("milkyway", selectplatform);
    setData(games?.data)
    setFilteredData(games?.data)
  }
  useEffect(() => {
    handelGamesData()
  }, [selectplatform])

  useEffect(() => {
    setData(games);
    setFilteredData(games);
  }, [games]);
  
  const handleDelete = async (id) => {
    try {
      setLoad(true);
      const response = await deleteGame(id);
      toast.success(response.data.message);
      setOpen(false);
      setLoad(false);
    } catch (error) {
      toast.error(error.message);
      setLoad(false);
    }
  };

  let ModalContent;
  switch (modalType) {
    case "Edit Game":
      ModalContent = (
        <EditGame prevData={rowData} id={rowData._id} setOpen={setOpen} />
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

  const handleSearch = (searchTerm) => {
    const filtered = data.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleFilterData = (key, value, Num) => {
    const dataFiltered = handleFilter(data, key, value, Num);
    setFilteredData(dataFiltered);
  };

  const tableData = {
    tableHead: ["name", "category", "Type", "status", "slug", "action"],
    tableBody: ["name", "category", "type", "status", "slug", "action"],
    Status: ["active", "inactive"],
  };

  //Platform Filter
  const handelPlatformChange = (e) => {
    setSelectplatform(e.target.value)
  }

  return (
    <>
      <div className="h-full w-[95%] mx-auto flex flex-col">
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
          <div>
            <select onChange={(e) => handelPlatformChange(e)} className="text-black w-full md:w-auto cursor-pointer dark:text-white bg-[#F3F4F6] dark:bg-Dark_light  px-20 py-2 rounded-md shadow-md  outline-none">
              <option value={'all'}>All</option>
              {
                platforms?.map((item, ind) => (
                  <option value={item.name} className="text-[1rem] cursor-pointer" key={ind}>{item.name}</option>
                ))
              }
            </select>
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
            Filter={handleFilterData}
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
