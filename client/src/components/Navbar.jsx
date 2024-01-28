import React from "react";
import { MdFastfood } from "react-icons/md";

const Navbar = () => {
  return (
    <div>
      <a className="navbar-brand" href="/">
        <MdFastfood color="#dc3545" size={90} />
        <h1>Food Way</h1>
      </a>
    </div>
  );
};

export default Navbar;
