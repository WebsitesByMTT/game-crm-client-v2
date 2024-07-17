import GameList from "@/components/GameList";
import { config } from "@/utils/config";
import { getCookie } from "@/utils/cookie";

export const getGames = async (platform, category) => {
  const token = await getCookie();
  try {
    const response = await fetch(
      `${config.server}/api/games?platform=${platform}&category=${category}`,
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
      return { error: error.message };
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

const page = async ({ params }) => {
  const games = await getGames("milkyway", params.platform);

  return (
    <div className="h-full flex items-center justify-center">
      <GameList platforms={params?.platform} games={games} />
    </div>
  );
};

export default page;
