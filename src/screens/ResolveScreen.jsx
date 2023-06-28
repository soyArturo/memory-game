/**
 * ResolveScreen
 */

import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const ResolveScreen = () => {
  const { state } = useLocation();
  return (
    <div className="flex flex-col justify-center items-center gap-y-4 h-screen bg-gray-200">
      <h1 className="text-2xl md:text-3xl">{state.message}</h1>
      <Link
        to="/game"
        className="rounded-md bg-indigo-600 px-5 py-2.5 text-xl font-semibold text-white shadow-sm hover:bg-indigo-500 hover:animate-bounce"
      >
        Play Again
      </Link>
    </div>
  );
};

export default ResolveScreen;
