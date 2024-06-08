import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <div className="h-10 w-screen px-10 flex items-center justify-between absolute z-50 lg:h-20 lg:px-20">
      <Link
        to="/"
        className="flex items-center justify-center font-semibold gap-0.5 text-2xl lg:text-3xl"
      >
        <h1 className="text-white">C</h1>
        <img src={Logo} alt="Logo" className="h-9 w-auto" />
        <h1 className="text-white">dePencil</h1>
      </Link>

      <div className="flex justify-center items-center gap-4">
        <Link to="/sign-in">
          <button className="btn btn-outline text-secondary-200 hover:bg-secondary-200">
            <h1 className="text-lg lg:text-xl">Login</h1>
          </button>
        </Link>
        <Link to="/sign-up">
          <button className="btn btn-neutral">
            <h1 className="text-lg lg:text-xl">Register</h1>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
