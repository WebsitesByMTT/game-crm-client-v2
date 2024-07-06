import { HashLoader } from "react-spinners";

const loading = () => {
  return (
    <div className="fixed z-[9999] top-0 left-0 w-full h-screen">
      <div className="bg-black w-full h-screen relative bg-opacity-70 flex items-center justify-center">
        <HashLoader color={"#8C7CFD"} size={100} className="animate-spin" />
      </div>
    </div>
  );
};

export default loading;
