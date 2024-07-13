import Clients from "@/components/Clients";
import { config } from "@/utils/config";
import { getCookie } from "@/utils/cookie";
import { revalidatePath } from "next/cache";

const getAllClients = async (page) => {
  const token = await getCookie();
  try {
    const response = await fetch(
      `${config.server}/api/users/all?page=${page}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Cookie: `userToken=${token}`,
        },
        next: { tags: ["client"] },
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
  } finally {
    revalidatePath(`/clients/all?page=${page}`);
  }
};

const page = async ({ searchParams }) => {
  const params = searchParams;
  const clientData = await getAllClients(params.page);
  return (
    <div>
      {clientData && (
        <Clients
          currentPage={params.page}
          totalPages={clientData.data.totalPages}
          clientData={clientData.data.subordinates}
        />
      )}
    </div>
  );
};

export default page;
