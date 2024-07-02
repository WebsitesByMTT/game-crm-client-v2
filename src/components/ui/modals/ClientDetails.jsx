"use client";
import { useRouter } from "next/navigation";
import React from "react";

const ClientDetails = ({ data, setOpenTransaction }) => {
  const router = useRouter();
  return (
    <div className="grid grid-cols-2 gap-4 overflow-hidden px-5">
      <p className="text-left font-light">Username :</p>
      <p className="text-left font-extralight text-gray-400">{data.username}</p>
      <p className="text-left font-light">Name :</p>
      <p className="text-left font-extralight text-gray-400">{data.name}</p>
      <p className="text-left font-light">Password :</p>
      <p className="text-left font-extralight overflow-hidden text-gray-400">
        {data.password}
      </p>
      <p className="text-left font-light">Role :</p>
      <p className="text-left font-extralight text-gray-400">{data.role}</p>
      <p className="text-left font-light">Status :</p>
      <p className="text-left font-extralight text-gray-400">{data.status}</p>
      <p className="text-left font-light">Recharge :</p>
      <p className="text-left font-extralight text-gray-400">
        {data.totalRecharged}
      </p>
      <p className="text-left font-light">Redeem :</p>
      <p className="text-left font-extralight text-gray-400">
        {data.totalRedeemed}
      </p>
      <p className="text-left font-light">Credits :</p>
      <p className="text-left font-extralight text-gray-400">{data.credits}</p>
      <p className="text-left font-light">Login times :</p>
      <p className="text-left font-extralight text-gray-400">
        {data.loginTimes}
      </p>
      <p className="text-left font-light">Last Login :</p>
      <p className="text-left font-extralight text-gray-400">
        {data?.lastLogin?.split("T")[0]}
      </p>
      <p className="text-left font-light">Created At :</p>
      <p className="text-left font-extralight text-gray-400">
        {data?.createdAt?.split("T")[0]}
      </p>
      <p className="text-left font-light">Updated At :</p>
      <p className="text-left font-extralight text-gray-400">
        {data?.updatedAt?.split("T")[0]}
      </p>
      <div className="col-span-2 flex justify-center mt-2">
        <button
          onClick={() => setOpenTransaction(true)}
          type="submit"
          className="text-center flex justify-center px-4 items-center gap-2 bg-gradient-to-r from-[#8C7CFD] hover:from-[#BC89F1] hover:to-[#8C7CFD] to-[#BC89F1] mx-auto text-white text-xl rounded-md p-2 font-light hover:shadow-[0_30px_10px_-15px_rgba(0,0,0,0.2)] transition-all duration-200 ease-in-out"
        >
          View Transactions
        </button>
      </div>
    </div>
  );
};

export default ClientDetails;
