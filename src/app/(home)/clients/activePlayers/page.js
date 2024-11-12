import Clients from "@/components/Clients";
import { config } from "@/utils/config";
import { getCookie } from "@/utils/cookie";

const getAllClients = async (page) => {
  const token = await getCookie();
  try {
    const response = await fetch(
      `${config.server}/api/users/allPlayer?page=${page}`,
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

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const page = async ({ searchParams }) => {
  const params = searchParams;
  const clientData = await getAllClients(params.page);

  return (
    <div className="h-full">
      {clientData && (
        <Clients
          currentPage={params.page}
          totalPages={clientData.totalPages}
          clientData={clientData.subordinates}
        />
      )}
    </div>
  );
};

export default page;
