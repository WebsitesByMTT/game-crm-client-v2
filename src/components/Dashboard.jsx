"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getUserData } from "@/utils/action";
import { GiTwoCoins } from "react-icons/gi";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { FaUserTie } from "react-icons/fa6";
import ClientTransactions from "./ui/modals/ClientTransaction";
import TableComponent from "./TableComponent";
import { handleFilter } from "@/utils/Filter";
import Loader from "./ui/Loader";

const Dashboard = () => {
  const [userData, setUserData] = useState();
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchUserData = async () => {
    try {
      const response = await getUserData();
      console.log("Response", response.data);
      setUserData(response.data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [refresh]);

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

  //Table Data

  const tableData={
    tableHead:["username","status","role","totalRedeemed","totalRecharged","credits","action"],
    tableBody:["username","status","role","totalRedeemed","totalRecharged","credits","action"],
    Filter:["master","distributor","subdistributor","store","player"],
    Status:["active","inactive"]
  }

  return (
    <div className="h-full w-[95%] mx-auto flex flex-col">
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
              placeholder="Search by Username"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                handleSearch(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="flex gap-5 items-center">
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
      <div className="rounded-2xl h-[420px] w-[97%] bg-[#252525] mx-auto overflow-y-scroll">
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
      <Loader show={loading} />
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
