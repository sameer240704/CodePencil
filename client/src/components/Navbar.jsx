import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import useBuddies from "../hooks/useBuddies";
import Logo from "../assets/logo.png";
import { FaUserClock, FaCheck, FaTimes, FaBell } from "react-icons/fa";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const { logout, isLoading, error } = useLogout();
  const navigate = useNavigate();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  const { receivedRequests, acceptFriendRequest, rejectFriendRequest } =
    useBuddies();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleUserLogout = async () => {
    if (user) {
      const result = await logout(user._id);
      if (result.success) {
        setUser(null);
        if (location.pathname === "/") window.location.reload();
        else navigate("/");
      } else {
        console.error(result.message);
      }
    }
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

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
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
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="btn btn-ghost btn-circle relative"
                title="Friend Requests"
              >
                <FaBell className="text-white" size={20} />
                {receivedRequests.length > 0 && (
                  <span className="badge bottom-1 right-1 absolute badge-sm badge-primary indicator-item bg-green-500"></span>
                )}
              </button>
              {showDropdown && (
                <FriendRequestsDropdown
                  receivedRequests={receivedRequests}
                  acceptFriendRequest={acceptFriendRequest}
                  rejectFriendRequest={rejectFriendRequest}
                />
              )}
            </div>
            <Link to="/profile">
              <img
                src={getProfileImage()}
                alt="User Profile"
                className="h-9 w-9 rounded-full"
              />
            </Link>
            <button
              className="btn btn-error"
              onClick={handleUserLogout}
              disabled={isLoading}
            >
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

const FriendRequestsDropdown = ({
  receivedRequests,
  acceptFriendRequest,
  rejectFriendRequest,
}) => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.2 }}
    className="absolute right-0 mt-2 w-80 bg-gray-800 rounded-lg shadow-lg overflow-hidden z-20 border border-gray-700"
  >
    <div className="p-4 bg-gray-900">
      <h3 className="text-white text-lg font-semibold flex items-center">
        <FaUserClock className="mr-2 text-blue-400" />
        Friend Requests
        <span className="ml-auto bg-blue-500 text-xs font-bold px-2 py-1 rounded-full">
          {receivedRequests.length}
        </span>
      </h3>
    </div>
    <div className="max-h-80 overflow-y-auto">
      {receivedRequests.length === 0 ? (
        <p className="text-gray-400 px-4 py-3 text-center italic">No pending requests</p>
      ) : (
        receivedRequests.map((request) => (
          <FriendRequestItem
            key={request._id}
            request={request}
            acceptFriendRequest={acceptFriendRequest}
            rejectFriendRequest={rejectFriendRequest}
          />
        ))
      )}
    </div>
  </motion.div>
);

const FriendRequestItem = ({
  request,
  acceptFriendRequest,
  rejectFriendRequest,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.2 }}
    className="px-4 py-3 hover:bg-gray-700 flex items-center justify-between border-b border-gray-700 last:border-b-0"
  >
    <div className="flex items-center space-x-3">
      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
        {request.from[0].toUpperCase()}
      </div>
      <div className="flex flex-col">
        <span className="text-white font-medium">{request.from}</span>
        <span className="text-gray-400 text-xs">Wants to be your friend</span>
      </div>
    </div>
    <div className="flex space-x-2">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          acceptFriendRequest(request._id);
          toast.success(`Accepted friend request from ${request.from}`);
        }}
        className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full transition-colors duration-200"
        title="Accept"
      >
        <FaCheck size={14} />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          rejectFriendRequest(request._id);
          toast.success(`Rejected friend request from ${request.from}`);
        }}
        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors duration-200"
        title="Reject"
      >
        <FaTimes size={14} />
      </motion.button>
    </div>
  </motion.div>
);

export default Navbar;
