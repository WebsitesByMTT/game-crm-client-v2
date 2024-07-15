import Subordinate from "@/components/Subordinate";
import { config } from "@/utils/config";
import { getCookie } from "@/utils/cookie";
import React from "react";

const getSubordinates = async (id) => {
  const token = await getCookie();
  try {
    const response = await fetch(`${config.server}/api/users/${id}`, {
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

const page = async ({ params, searchParams }) => {
  const page = searchParams.page;
  const subordinateData = await getSubordinates(params?.subid);
  return (
    <div className="overflow-y-scroll h-[90%]">
      {subordinateData && (
        <Subordinate page={page} subordinateData={subordinateData?.data} />
      )}
    </div>
  );
};

export default page;
