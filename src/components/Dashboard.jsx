"use client";
import { useEffect, useState } from "react";
import { IoMdPersonAdd } from "react-icons/io";
import toast from "react-hot-toast";
import Modal from "./ui/Modal";
import { deleteClient, getClients, getUserData } from "@/utils/action";
import ClientDetails from "./ui/modals/ClientDetails";
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
import TableComponent from "./TableComponent";
import { handleFilter } from "@/utils/Filter";
import {PieChart,Pie, ResponsiveContainer,Cell} from 'recharts';
import PaymentChart from "./ui/chart/PaymentChart";
import ClientPieChart from "./ui/chart/ClientPieChart";

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
      item.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleFilterData = (key, value, Num) => {
    const dataFiltered = handleFilter(data, key, value, Num);
    setFilteredData(dataFiltered);
  };
 
 
  return (
    <div className="h-full w-full">
      <button className="border p-2" onClick={()=>document.body.classList.toggle('dark')}>
        Switch theme
      </button>
      <div className="w-full m-auto  py-3 px-2 h-[25vh]  flex gap-5 flex-wrap items-center justify-center">
        <div className="h-auto lg:h-[200px] w-[71%] rounded-xl space-x-5 flex justify-between">
          <Card
            name="Recharge"
            icon={<FaHandHoldingDollar />}
            amount={userData?.totalRecharged}
          ></Card>
          <Card
            name="Redeem"
            icon={<GiTwoCoins />}
            amount={userData?.totalRedeemed}
          ></Card>
          <Card
            name="Clients"
            icon={<FaUserTie />}
            amount={userData?.subordinates?.length}
          ></Card>
        </div>
        <div className="h-auto lg:h-[200px] w-[23%] bg-white dark:bg-Dark_light shadow-sm rounded-xl flex flex-col p-2 md:p-4 justify-evenly text-white">
          <div className="flex md:flex-row flex-col md:gap-2 text-2xl font-extralight md:items-center">
            <div className="bg-[#8C7CFD] w-fit p-2 md:p-1 rounded-md">
              <GiTwoCoins />
            </div>
            <span className="dark:text-white text-black font-semibold text-opacity-80 text-[14.5px] md:text-2xl">
              Credits
            </span>
          </div>
          <span className="text-center lg:text-[4.8rem] text-[2rem] dark:text-white text-black ">
            {userData?.credits !== null ? userData?.credits : "\u221E"}
          </span>
        </div>
      </div>
      <div className="rounded-2xl flex space-x-10  h-[60vh]  w-[95%] mx-auto">
        {/* <TableComponent
          tableData={tableData}
          Filter={handleFilterData}
          DashboardFetchedData={filteredData}
          rowClick={handleRowClick}
          openModal={handleModalOpen}
          deleteTableData={handleDelete}
        /> */}
        {/* GRaph */}
        <PaymentChart/>
        {/* pieChart */}
        <ClientPieChart data={data}/> 
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
  const piedata = [{ name: 'Recharge', value: 35 }, { name: 'Reddem', value: 65 }];
  const COLORS = ['#E6EbF1', '#6D81F5 '];

  return (
    <div className="w-full gap-2  md:gap-0 rounded-xl shadow-sm flex bg-white dark:bg-Dark_light flex-col p-2 md:p-4 justify-evenly">
      <div className="flex md:flex-row flex-col md:gap-2 text-2xl font-extralight md:items-center">
        <div className="border-[1px] border-[#847697] min-w-[20px] text-white bg-[#8C7CFD] w-fit p-2 md:p-1 rounded-md">
          {icon}
        </div>
        <span className="dark:text-white text-black font-semibold text-opacity-80 text-[14.5px] md:text-2xl">
          {name}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <span className="lg:text-[4.5rem] text-[2rem] dark:text-white text-black ">
          {amount}
        </span>
        <ResponsiveContainer width="40%" height="100%">
          <PieChart width="100%" height="100%">
            <Pie
              data={piedata}
              innerRadius={25}
              outerRadius={35}
              fill="#8884d8"
              paddingAngle={2}
              dataKey="value"
            >
              {piedata.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
