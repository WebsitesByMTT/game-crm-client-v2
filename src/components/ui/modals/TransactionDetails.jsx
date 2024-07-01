"use client";
import React from "react";

const TransactionDetails = ({ data }) => {
  return (
    <div className="grid grid-cols-2 gap-4 overflow-hidden px-5">
      <p className="text-left font-light">Type :</p>
      <p className="text-left font-extralight text-gray-400">{data.type}</p>
      <p className="text-left font-light">Amount :</p>
      <p className="text-left font-extralight text-gray-400">{data.amount}</p>
      <p className="text-left font-light">Creditor :</p>
      <p className="text-left font-extralight overflow-hidden text-gray-400">
        {data.creditor}
      </p>
      <p className="text-left font-light">Debtor :</p>
      <p className="text-left font-extralight text-gray-400">{data.debtor}</p>
      <p className="text-left font-light">Updated At :</p>
      <p className="text-left font-extralight text-gray-400">
        {data?.updatedAt?.split("T")[0]}
      </p>
    </div>
  );
};

export default TransactionDetails;
