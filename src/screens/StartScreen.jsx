/**
 * StartScreen
 */

import { Link } from "react-router-dom";
import Logo from "/assets/logo.svg";

const StartScreen = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-y-5 h-screen bg-gray-200">
      <img src={Logo} alt="" className="w-52 h-52" />
      <Link
        to="/game"
        className="rounded-md bg-indigo-600 px-5 py-2.5 text-xl font-semibold text-white shadow-sm hover:bg-indigo-500 hover:animate-bounce"
      >
        Start
      </Link>
    </div>
  );
};

export default StartScreen;
