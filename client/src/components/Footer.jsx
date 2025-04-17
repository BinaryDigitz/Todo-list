import React from "react";

function Footer() {
  return (
    <div className="text-center py-2">
      <hr className="w-4/5 mx-auto text-gray-400" />
      <p className="mt-2">Todo-list banigic @ {new Date().getFullYear()}</p>
      <p className="text-sm text-gray-700">All Rights Reserved</p>
    </div>
  );
}

export default Footer;
