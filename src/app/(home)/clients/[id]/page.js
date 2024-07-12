import Clients from "@/components/Clients";
import { config } from "@/utils/config";
import { getCookie } from "@/utils/cookie";

const getMyClients = async (id) => {
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

const page = async ({ params }) => {
  const clientData = await getMyClients(params.id);
  return (
    <div>
      {clientData && <Clients clientData={clientData?.data?.subordinates} />}
    </div>
  );
};

export default page;
