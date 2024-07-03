import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserPlus,
  FaCheck,
  FaTimes,
  FaUserFriends,
  FaUserClock,
} from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi2";
import { Navbar, Sidebar, Loader } from "../components";
import useBuddies from "../hooks/useBuddies";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

const Buddies = () => {
  const navigate = useNavigate();
  const {
    receivedRequests,
    friends,
    allUsers,
    postFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
    error,
    loading,
  } = useBuddies();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const currentUser = JSON.parse(localStorage.getItem("user"));

  const filteredUsers = allUsers.filter(
    (user) =>
      user._id !== currentUser._id &&
      !friends.some((friend) => friend._id === user._id)
  );

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-background-100 to-background-200">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 p-8 overflow-hidden flex flex-col">
          {loading ? (
            <Loader />
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 overflow-hidden auto-rows-fr"
            >
              <FriendsSection friends={friends} />
              <AddNewFriendSection
                filteredUsers={filteredUsers}
                postFriendRequest={postFriendRequest}
              />
              <PendingRequestsSection
                receivedRequests={receivedRequests}
                acceptFriendRequest={acceptFriendRequest}
                rejectFriendRequest={rejectFriendRequest}
              />
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
};

const FriendsSection = ({ friends }) => (
  <motion.div
    initial={{ y: 10, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.25 }}
    className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-6 rounded-2xl shadow-2xl flex flex-col h-full overflow-hidden border border-white border-opacity-30"
  >
    <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
      <FaUserFriends className="mr-3 text-blue-400" />
      My Friends
      <HiOutlineSparkles className="ml-2 text-yellow-400 animate-pulse" />
    </h2>
    <div className="overflow-y-auto flex-1 fancy-scrollbar pr-2">
      {friends.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="text-gray-300 flex items-center justify-center h-full text-lg italic"
        >
          <p>No friends yet. Start connecting!</p>
        </motion.div>
      ) : (
        <motion.div className="space-y-4">
          {friends.map((friend, index) => (
            <FriendCard key={friend._id} friend={friend} index={index} />
          ))}
        </motion.div>
      )}
    </div>
  </motion.div>
);

const FriendCard = ({ friend, index }) => (
  <motion.div
    initial={{ x: -10, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.25, delay: index * 0.1 }}
    className="bg-white bg-opacity-15 backdrop-filter backdrop-blur-md p-4 rounded-xl flex items-center space-x-4 transform transition-all duration-300 hover:bg-opacity-25 hover:scale-105 border border-white border-opacity-20"
  >
    <img
      src={friend.profileImage}
      alt="Profile Image"
      className="w-12 h-12 rounded-full border-2 border-blue-400"
    />
    <span className="text-white font-semibold text-xl">{friend.username}</span>
  </motion.div>
);

const AddNewFriendSection = ({ filteredUsers, postFriendRequest }) => (
  <motion.div
    initial={{ y: 10, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.25 }}
    className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-6 rounded-2xl shadow-2xl flex flex-col h-full overflow-hidden border border-white border-opacity-30"
  >
    <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
      <FaUserPlus className="mr-3 text-green-400" />
      Add New Friend
    </h2>
    <div className="overflow-y-auto flex-1 fancy-scrollbar pr-2">
      {filteredUsers.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="text-gray-300 flex items-center justify-center h-full text-lg italic"
        >
          <p>No users available at the moment</p>
        </motion.div>
      ) : (
        <motion.div className="space-y-4">
          {filteredUsers.map((user, index) => (
            <UserCard
              key={user._id}
              user={user}
              postFriendRequest={postFriendRequest}
              index={index}
            />
          ))}
        </motion.div>
      )}
    </div>
  </motion.div>
);

const UserCard = ({ user, postFriendRequest, index }) => (
  <motion.div
    initial={{ x: 10, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.25, delay: index * 0.1 }}
    className="bg-white bg-opacity-15 backdrop-filter backdrop-blur-md p-4 rounded-xl flex items-center justify-between transform transition-all duration-300 hover:bg-opacity-25 hover:scale-105 border border-white border-opacity-20"
  >
    <div className="flex items-center space-x-4">
      <img
        src={user.profileImage}
        className="w-12 h-12 rounded-full border-2 border-green-400"
        alt={user.username}
      />
      <span className="text-white font-semibold text-lg">{user.username}</span>
    </div>
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => {
        postFriendRequest(user._id);
        toast.success(`Friend request sent to ${user.username}`);
      }}
      className="bg-green-500 bg-opacity-80 hover:bg-opacity-100 text-white p-3 rounded-full transition-all duration-300 shadow-lg"
      title="Send Friend Request"
    >
      <FaUserPlus size={18} />
    </motion.button>
  </motion.div>
);

const PendingRequestsSection = ({
  receivedRequests,
  acceptFriendRequest,
  rejectFriendRequest,
}) => (
  <motion.div
    initial={{ y: 10, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.25 }}
    className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-6 rounded-2xl shadow-2xl flex flex-col h-full overflow-hidden border border-white border-opacity-30 md:col-span-2"
  >
    <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
      <FaUserClock className="mr-3 text-yellow-400" />
      Pending Requests
    </h2>
    <div className="overflow-y-auto flex-1 fancy-scrollbar pr-2">
      {receivedRequests.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="text-gray-300 flex items-center justify-center h-full text-lg italic"
        >
          <p>No pending requests at the moment</p>
        </motion.div>
      ) : (
        <motion.div className="space-y-4">
          {receivedRequests.map((request, index) => (
            <RequestCard
              key={request._id}
              request={request}
              acceptFriendRequest={acceptFriendRequest}
              rejectFriendRequest={rejectFriendRequest}
              index={index}
            />
          ))}
        </motion.div>
      )}
    </div>
  </motion.div>
);

const RequestCard = ({
  request,
  acceptFriendRequest,
  rejectFriendRequest,
  index,
}) => (
  <motion.div
    initial={{ x: -10, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.25, delay: index * 0.1 }}
    className="bg-white bg-opacity-15 backdrop-filter backdrop-blur-md p-4 rounded-xl flex items-center justify-between transform transition-all duration-300 hover:bg-opacity-25 hover:scale-105 border border-white border-opacity-20"
  >
    <div className="flex items-center space-x-4">
      <div className="w-12 h-12 bg-yellow-500 bg-opacity-70 rounded-full flex items-center justify-center text-white font-bold text-xl border-2 border-yellow-400">
        {request.from[0].toUpperCase()}
      </div>
      <span className="text-white font-semibold text-lg">{request.from}</span>
    </div>
    <div className="flex space-x-3">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          acceptFriendRequest(request._id);
          toast.success(`Accepted friend request from ${request.from}`);
        }}
        className="bg-green-500 bg-opacity-80 hover:bg-opacity-100 text-white p-3 rounded-full transition-all duration-300 shadow-lg"
        title="Accept"
      >
        <FaCheck size={18} />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          rejectFriendRequest(request._id);
          toast.success(`Rejected friend request from ${request.from}`);
        }}
        className="bg-red-500 bg-opacity-80 hover:bg-opacity-100 text-white p-3 rounded-full transition-all duration-300 shadow-lg"
        title="Reject"
      >
        <FaTimes size={18} />
      </motion.button>
    </div>
  </motion.div>
);

export default Buddies;
