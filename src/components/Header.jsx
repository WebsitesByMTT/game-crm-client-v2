import { PiUserCircleThin } from "react-icons/pi";

const Header = ({ userData }) => {
  console.log("from Header", userData);
  return (
    <div className="w-full flex flex-col bg-white shadow-sm">
      <div className="w-[95%] mx-auto flex justify-between items-center py-4">
        <div>
          <div className="text-black text-[1.8rem] leading-tight font-semibold">
            Dashboard
          </div>
          <span className="text-black text-opacity-75">Game CRM</span>
        </div>
        <div className="text-xl justify-center text-black p-2 rounded-md flex items-center gap-3">
          <div className="text-[3rem] text-[#7c8ffd]">
            <PiUserCircleThin />
          </div>
          <div>
            <p className="capitalize leading-7">{userData?.username}</p>
            <p className="capitalize leading-4 text-[14px]  opacity-85">
              {userData?.role}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
