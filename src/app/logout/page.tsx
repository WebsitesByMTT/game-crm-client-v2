import DeleteToken from "@/components/DeleteToken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Logout = async () => {
  async function deleteToken() {
    "use server";
      cookies().delete("token");
      cookies().delete("userToken");
      redirect("/login");
  }

  return <DeleteToken deleteToken={deleteToken} />;
};

export default Logout;