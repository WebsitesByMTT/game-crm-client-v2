import Clients from "@/components/Clients";
import { getAllClients } from "@/utils/action"
const page = async () => {
  const clientData = await getAllClients();
  return <div>{clientData && <Clients clientData={clientData.data} />}</div>;
};

export default page;
