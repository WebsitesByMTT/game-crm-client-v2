"use client";
import Modal from "@/components/ui/Modal";
import { deleteGame, getGames } from "@/utils/action";
import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MdDeleteOutline } from "react-icons/md";
import { IoAddCircleOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import GameDetails from "@/components/ui/modals/GameDetails";
import AddGame from "@/components/ui/modals/AddGame";
import { MdEdit } from "react-icons/md";
import EditGame from "@/components/ui/modals/EditGame";
import Loader from "@/components/ui/Loader";
import { FaCircle } from "react-icons/fa";

const Game = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [rowData, setRowData] = useState();
  const [refresh, setRefresh] = useState(false);
  const [modalType, setModalType] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  let ModalContent;
  switch (modalType) {
    case "Game Details":
      ModalContent = <GameDetails data={rowData} />;
      break;

    case "Add Game":
      ModalContent = (
        <AddGame setOpen={setOpen} setRefresh={setRefresh} refresh={refresh} />
      );
      break;

    case "Edit Game":
      ModalContent = (
        <EditGame
          prevData={rowData}
          id={rowData._id}
          setRefresh={setRefresh}
          setOpen={setOpen}
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

  const fetchGames = async () => {
    setLoading(true);
    try {
      const response = await getGames();
      setData(response.data);
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
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

  useEffect(() => {
    fetchGames();
  }, [refresh]);

  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      value?.toString().toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="h-full w-[95%] mx-auto flex flex-col">
      <div className="w-full flex items-center justify-between my-2 gap-2 text-nowrap">
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
              }}
            />
          </div>
        </div>

        <button
          onClick={() => handleModalOpen("Add Game")}
          className="text-center flex justify-center items-center gap-2 bg-gradient-to-b from-[#C5A5FF] to-[#362356] text-white text-xl rounded-[10px] p-2 font-[300] border-[1px] border-[#847697] hover:shadow-[0_30px_10px_-15px_rgba(0,0,0,0.2)] transition-all duration-200 ease-in-out w-fit"
        >
          <IoAddCircleOutline />
          <span>Add Game</span>
          <div className="text-2xl"></div>
        </button>
      </div>
      <div className="overflow-y-auto">
        <Table className="overflow-y-auto">
          <TableHeader>
            <TableRow>
              <TableHead className="">Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="hidden md:table-cell">Status</TableHead>
              <TableHead className="hidden md:table-cell">Slug</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData?.map((item, index) => (
              <TableRow
                key={index}
                onClick={() => {
                  handleRowClick(item);
                  handleModalOpen("Game Details");
                }}
              >
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell
                  className={
                    item.status === "active"
                      ? "text-[#70ef44] hidden md:table-cell"
                      : "text-[#ef4444] hidden md:table-cell"
                  }
                >
                  <div className="w-full flex gap-2 items-center justify-center">
                    <div className="text-[8px]">
                      <FaCircle />
                    </div>
                    <span className="text-white opacity-50">{item.status}</span>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {item.slug}
                </TableCell>
                <TableCell>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRowClick(item);
                      handleModalOpen("Edit Game");
                    }}
                    className="flex gap-5 text-2xl justify-center relative"
                  >
                    <div className="text-[#1b1b1e] editgradient p-1 rounded-md">
                      <MdEdit />
                    </div>
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
    </div>
  );
};

export default Game;
