import { Link } from "react-router-dom";
import React from "react";

function Navbar() {
  return (
    <div className="flex justify-around gap-2 items-center py-4">
      <Link className="heading3" to="/">
        Todo-list
      </Link>
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
      <div className="group relative  cursor-pointer ">
        <p className="bg-white shadow-sm rounded-full size-10 grid place-items-center ">B</p>
        <ul className="absolute hidden group-hover:block top-10 left-0 bg-white border border-gray-200 rounded-lg py-3 min-w-24 shadow-sm text-gray-700">
          <li className="hover:bg-slate-100 w-full px-2">Profile</li>
          <li className="hover:bg-red-100 w-full mt-1 px-2 text-red-500">Log out</li>
          
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
