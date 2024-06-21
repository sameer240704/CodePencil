import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import Logo from "../assets/logo.png";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const { logout } = useLogout();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleUserLogout = () => {
    logout();
    setUser(null);
    if(location.pathname === "/") 
      window.location.reload();
    else 
      navigate("/");
  };

  const getProfileImage = () => {
    if (user && user.profileImage) {
      if (user.profileImage.startsWith("data:image")) {
        return user.profileImage;
      } else {
        return `data:image/jpeg;base64,${user.profileImage}`;
      }
    }
    return "https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg";
  };

  return (
    <div
      className={`${
        location.pathname !== "/" ? "bg-[#2a2a2a]" : "bg-transparent"
      } h-20 w-screen px-10 flex items-center justify-between z-50 lg:px-16`}
    >
      <Link
        to="/"
        className="flex items-center justify-center font-semibold gap-0.5 text-2xl lg:text-3xl"
      >
        <h1 className="text-white">C</h1>
        <img src={Logo} alt="Logo" className="h-9 w-auto" />
        <h1 className="text-white">dePencil</h1>
      </Link>

      <div className="flex justify-center items-center gap-4">
        {user ? (
          <div className="flex justify-center items-center gap-7">
            <Link to="/profile">
              <img
                src={getProfileImage()}
                alt="User Profile"
                className="h-9 w-9 rounded-full"
              />
            </Link>
            <button className="btn btn-error" onClick={handleUserLogout}>
              <h1 className="uppercase text-sm lg:text-md">Logout</h1>
            </button>
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
