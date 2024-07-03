import React, { useState, useEffect } from "react";
import moment from "moment";
import { Navbar, Sidebar } from "../components";
import { rankings } from "../constants";
import { motion } from "framer-motion";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [userTitle, setUserTitle] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      const userPoints = user.points;
      const titleObj = rankings.find(
        (rank) => userPoints >= rank.minPoints && userPoints <= rank.maxPoints
      );
      setUserTitle(titleObj ? titleObj.title : "No Title");
    }
  }, [user]);

  const getProfileImage = () => {
    if (user && user.profileImage) {
      return user.profileImage.startsWith("data:image")
        ? user.profileImage
        : `data:image/jpeg;base64,${user.profileImage}`;
    }
    return "https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg";
  };

  const calculateDuration = (createdAt) => {
    const now = moment();
    const userCreatedAt = moment(createdAt);
    const years = now.diff(userCreatedAt, "years");
    userCreatedAt.add(years, "years");
    const months = now.diff(userCreatedAt, "months");
    userCreatedAt.add(months, "months");
    const days = now.diff(userCreatedAt, "days");

    return `${years > 0 ? `${years}y ` : ""}${
      months > 0 ? `${months}m ` : ""
    }${days}d`;
  };

  if (!user) return <p className="text-white">Loading...</p>;

  return (
    <div className="h-screen bg-background-100 flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 25, stiffness: 500 }}
            className="max-w-md w-full rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden shadow-2xl border border-gray-700"
          >
            <div className="h-16 px-6 flex items-center justify-between bg-gray-800 border-b border-gray-700">
              <h2 className="text-xl font-bold text-white">User Profile</h2>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="border border-green-400 text-green-400 px-2 py-1 rounded-full font-bold text-sm"
              >
                Active
              </motion.div>
            </div>
            <div className="flex flex-col items-center text-center p-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  delay: 0.3,
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                }}
                className="w-32 h-32 mb-4 overflow-hidden rounded-full shadow-lg border-2 border-blue-500"
              >
                <img
                  src={getProfileImage()}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-2xl font-bold text-white mb-1"
              >
                {user.name}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-gray-400 text-sm"
              >
                {user.email}
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex justify-between mb-4 px-6"
            >
              <div className="flex items-center justify-center w-full">
                <div className="text-white text-sm mr-2">Username:</div>
                <div className="text-white px-3 py-1 rounded-full bg-blue-600 w-full text-center font-medium">
                  {user.username}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="px-6 mb-4"
            >
              <div className="flex justify-between border border-gray-700 rounded-lg py-3 px-5 bg-gray-800 hover:bg-gray-750 transition-colors">
                <div className="flex-1">
                  <div className="text-gray-400 text-xs mb-1">Joined On</div>
                  <div className="text-white font-medium">
                    {moment(user.createdAt).format("MMM D, YYYY")}
                  </div>
                </div>
                <div className="flex-1 text-right">
                  <div className="text-gray-400 text-xs mb-1">Member For</div>
                  <div className="text-white font-medium">
                    {calculateDuration(user.createdAt)}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="px-6 mb-6"
            >
              <div className="flex justify-between border border-gray-700 rounded-lg py-3 px-5 bg-gray-800 hover:bg-gray-750 transition-colors">
                <div className="flex-1">
                  <div className="text-gray-400 text-xs mb-1">Points</div>
                  <div className="text-white text-lg font-bold">
                    {user.points}
                  </div>
                </div>
                <div className="flex-1 text-right">
                  <div className="text-gray-400 text-xs mb-1">
                    Current Title
                  </div>
                  <div className="text-white text-lg font-bold">
                    {userTitle}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
