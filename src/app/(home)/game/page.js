import GameList from "@/components/GameList";
import { config } from "@/utils/config";
import { getCookie } from "@/utils/cookie";
import { revalidatePath } from "next/cache";

export const getGames = async () => {
  const token = await getCookie();
  try {
    const response = await fetch(`${config.server}/api/games/`, {
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
  } finally {
    revalidatePath("/game");
  }
};

const page = async () => {
  const games = await getGames();
  return (
    <div>
      <GameList games={games.data} />
    </div>
  );
};

export default page;
