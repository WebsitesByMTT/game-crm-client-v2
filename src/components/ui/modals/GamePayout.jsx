import {
  addPayout,
  deletePayout,
  fetchPayoutversion,
  setPayoutActive,
} from "@/utils/action";
import React, { useEffect, useRef, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdOutlineCloudDone, MdOutlineDriveFolderUpload } from "react-icons/md";
import toast from "react-hot-toast";
import Modal from "../Modal";
import Delete from "./DeleteModal";
import { FaCircle } from "react-icons/fa6";
import LoadingSkeleton from "../skeleton/LoadingSkeleton";
import Loader from "../Loader";

const GamePayout = ({ tagname, platform, setOpen }) => {
  const [payoutData, setPayoutData] = useState();
  const [payout, setPayout] = useState();
  const [submodalOpen, setSubmodalOpen] = useState(false);
  const [rowData, setRowData] = useState();
  const [modalType, setModalType] = useState("");
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    setPayout(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (payout == null) {
      return toast.error("Payout is required");
    }
    const data = new FormData();
    data.append("tagName", tagname);
    data.append("platform", platform);
    data.append("payoutFile", payout);
    setLoad(true);
    const response = await addPayout(data);
    setLoad(false);
    if (response?.error) {
      return toast.error(response.error);
    }
    fileInputRef.current.value = null;
    setPayout(null);
    toast.success(response.message);
  };

  const handleDelete = async () => {
    setLoad(true);
    const response = await deletePayout(tagname, rowData);
    setLoad(false);
    if (response?.error) {
      return toast.error(response.error);
    }
    toast.success(response.message);
    setSubmodalOpen(false);
  };

  const handleActive = async (version) => {
    setLoad(true);
    const response = await setPayoutActive(tagname, version, platform);
    setLoad(false);
    if (response?.error) {
      return toast.error(response.error);
    }
    toast.success(response.message);
  };

  const fetchPayoutData = async (tagname, platform) => {
    setLoading(true);
    const response = await fetchPayoutversion(tagname, platform);
    setLoading(false);
    if (response?.error) {
      return toast.error(response.error);
    }
    setPayoutData(response);
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  }

  useEffect(() => {
    fetchPayoutData(tagname, platform);
  }, [tagname, payoutData]);

  return (
    <div className="flex flex-col gap-4">
      <form
        onSubmit={handleSubmit}
        className="w-full items-center flex flex-col justify-center gap-4"
      >
        <label
          for="file-upload"
          className={`border-[2px] border-[#2826265f] text-[#2826265f] hover:border-black hover:text-black  dark:border-[#dfdfdf4a] dark:text-[#dfdfdf4a] dark:hover:text-white transition-all duration-150 dark:hover:border-white rounded-xl w-full text-center py-8 cursor-pointer font-light flex justify-center ${
            payout && "!text-white border-white"
          }`}
        >
          {payout ? (
            <span className="flex">
              <span className="my-auto mr-2 text-2xl">
                <MdOutlineCloudDone />
              </span>
              file Uploaded
            </span>
          ) : (
            <span className="flex">
              <span className="my-auto mr-2 text-2xl">
                <MdOutlineDriveFolderUpload />
              </span>
              Upload a version
            </span>
          )}
        </label>
        <input
          name="payoutFile"
          id="file-upload"
          accept=".json"
          type="file"
          className="hidden"
          onChange={handleChange}
          ref={fileInputRef}
        />
        {payout && (
          <button className="px-6 py-2 editgradient !text-black ">
            Submit
          </button>
        )}
      </form>
      <div className="flex flex-col gap-2">
        <h4 className="text-xl font-md py-2">Payouts Versions: </h4>
        <div className="max-h-[200px] min-h-[200px] overflow-auto flex flex-col gap-2">
          {payoutData ? (
            payoutData?.length > 0 &&
            payoutData?.map((item, index) => (
              <div
                key={index}
                className="flex w-full justify-between px-4 py-1 text-md bg-gray-300 dark:bg-[#5d535324] rounded-md"
              >
                <div className="flex flex-col">
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-[8px] ${
                        item.isActive === true
                          ? "text-[#70ef44]"
                          : "text-[#ef4444]"
                      }`}
                    >
                      <FaCircle />
                    </span>
                    <div>
                      <p>{item.name}</p>
                      <p className="text-[#1914148e] dark:text-[#cfc6c686] text-[12px]">
                        {formatDate(item.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
                {item.isActive === false && (
                  <DropdownMenu>
                    <DropdownMenuTrigger className="dark:text-[#fff] p-1 rounded-md">
                      <BsThreeDotsVertical />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-[#F3F4F6] z-[100] dark:bg-Dark dark:border-gray-700 border-gray-200">
                      <DropdownMenuItem
                        onClick={() => handleActive(item.name)}
                        className="text-black dark:text-white dark:border-b-gray-700 border-b-gray-200 cursor-pointer"
                      >
                        Set Active
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          setSubmodalOpen(true);
                          setModalType("Delete");
                          setRowData(item.name);
                        }}
                        className="text-black dark:text-white dark:border-b-gray-700 border-b-gray-200  cursor-pointer"
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            ))
          ) : (
            <LoadingSkeleton
              LoadingStyle={"w-[95%] m-auto rounded-md h-[2.2rem]"}
              count={4}
            ></LoadingSkeleton>
          )}
        </div>
      </div>
      <Modal
        open={submodalOpen}
        setOpen={setSubmodalOpen}
        modalType={modalType}
        setModalType={setModalType}
      >
        <Delete
          title="payout"
          setOpen={setSubmodalOpen}
          id={rowData}
          handleDelete={handleDelete}
        />
      </Modal>
      <Loader show={load} />
    </div>
  );
};

export default GamePayout;
