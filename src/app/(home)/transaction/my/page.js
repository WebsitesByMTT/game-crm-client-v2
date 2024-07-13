import Transactions from "@/components/Transaction";
import { config } from "@/utils/config";
import { getCookie } from "@/utils/cookie";
import React from "react";

const getTransactions = async (page) => {
  const token = await getCookie();
  try {
    const response = await fetch(
      `${config.server}/api/transactions?page=${page}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Cookie: `userToken=${token}`,
        },
      }
    );

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

const page = async ({ searchParams }) => {
  const params = searchParams;
  const transactions = await getTransactions(params.page);
  return (
    <div>
      {transactions && (
        <Transactions
          currentPage={params.page}
          totalPages={transactions?.data?.totalPages}
          transactions={transactions?.data?.transactions}
        />
      )}
    </div>
  );
};

export default page;
