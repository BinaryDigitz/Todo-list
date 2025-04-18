import { Link, useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import AppContext from "../context/AppContext";

function Navbar() {
  const { logout, user } = useContext(AppContext);
  const navigate = useNavigate();


  return (
    <div className="flex justify-between px-14 gap-2 items-center py-5 min-h-20 text-neutral-800 ">
      <Link className="heading3 text-indigo-500" to="/">
        Todo-list
      </Link>
      {user && (
        <ul className="flex gap-4">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/add-task">Add task</Link>
          </li>
          <li>
            <Link to="/my-task">My tasks</Link>
          </li>
        </ul>
      )}
      {user ? (
        <div className="group relative  cursor-pointer ">
          <p className="bg-black text-white shadow-sm rounded-full size-10 grid place-items-center ">
            {user.name[0].toUpperCase() || 'U'}
          </p>
          <ul className="absolute hidden group-hover:block top-10 left-0 bg-white border border-gray-200 rounded-lg py-3 min-w-24 shadow-sm text-gray-700">
            <li className="hover:bg-slate-100 w-full px-2">Profile</li>
            <li
              onClick={logout}
              className="hover:bg-red-100 w-full mt-1 px-2 text-red-500"
            >
              Log out
            </li>
          </ul>
        </div>
      ) : (
        <div>
          <button
            onClick={() => navigate("/login")}
            className="bg-neutral-800 text-white px-8 py-2 cursor-pointer rounded-sm shadow-sm text-sm hover:bg-neutral-700"
          >
            Sign up / Login
          </button>
        </div>
      )}
    </div>
  );
}

export default Navbar;
