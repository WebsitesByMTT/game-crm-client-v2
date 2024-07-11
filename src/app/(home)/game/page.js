import GameList from "@/components/GameList";
import { getGames, getPlatform } from "@/utils/action";

const page = async () => {
  const platforms= await getPlatform()
  return (
    <div>
      <GameList platforms={platforms}/>
    </div>
  );
};

export default page;
