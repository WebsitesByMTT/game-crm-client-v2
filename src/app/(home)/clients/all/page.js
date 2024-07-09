import Clients from "@/components/Clients";
import { getAllClients } from "@/utils/action";

// const getAllClients = async () => {
//   const token = await getCookie();
//   try {
//     const response = await fetch(`${config.server}/api/users/all`, {
//       method: "GET",
//       credentials: "include",
//       headers: {
//         "Content-Type": "application/json",
//         Cookie: `userToken=${token}`,
//       },
//     });
//     if (!response.ok) {
//       const error = await response.json();
//       throw new Error(error.message);
//     }
//     const data = await response.json();
//     return { data };
//   } catch (error) {
//     throw error;
//   }
// };

const page = async () => {
  const clientData = await getAllClients();
  console.log("All clients", clientData.data.length);
  return <div>{clientData && <Clients clientData={clientData.data} />}</div>;
};

export default page;
