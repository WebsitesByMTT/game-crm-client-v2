import Transactions from "@/components/Transaction";
import { config } from "@/utils/config";
import { getCookie } from "@/utils/cookie";
import React from "react";

const getTransactions = async () => {
  const token = await getCookie();
  try {
    const response = await fetch(`${config.server}/api/transactions`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: `userToken=${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    const data = await response.json();
    return { data };
  } catch (error) {
    throw error;
  }
};

const page = async () => {
  const transactions = await getTransactions();
  console.log("my", transactions);
  return (
    <div>
      {transactions && <Transactions transactions={transactions?.data} />}
    </div>
  );
};

export default page;
