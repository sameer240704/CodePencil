import React, { useState, useEffect } from "react";
import moment from "moment";
import { rankings } from "../constants";
import { motion, AnimatePresence } from "framer-motion";

const ProfileCard = ({ user, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const getRankingTitle = (points) => {
    const ranking = rankings.find(
      (rank) => points >= rank.minPoints && points <= rank.maxPoints
    );
    return ranking ? ranking.title : "Beginner";
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

  if (!user) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, rotateY: 90 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            exit={{ scale: 0.8, opacity: 0, rotateY: -90 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="max-w-md w-full rounded-2xl bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 overflow-hidden shadow-2xl border border-indigo-500"
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="h-16 px-6 flex items-center justify-between bg-opacity-50 bg-black border-b border-indigo-500"
            >
              <h2 className="text-xl font-bold text-white">User Profile</h2>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="text-white hover:text-indigo-300 transition-colors"
                onClick={() => {
                  setIsVisible(false);
                  setTimeout(onClose, 300);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </motion.button>
            </motion.div>
            <div className="flex flex-col items-center text-center p-6">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="w-32 h-32 mb-4 overflow-hidden rounded-full shadow-lg border-2 border-indigo-500"
              >
                <img
                  src={user.profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, type: "spring" }}
                className="text-2xl font-bold text-white mb-1"
              >
                {user.name}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="text-indigo-300 text-sm"
              >
                {user.email}
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, type: "spring" }}
              className="flex justify-between mb-4 px-6"
            >
              <div className="flex items-center justify-center w-full">
                <div className="text-white text-sm mr-2">Username:</div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="text-white px-3 py-1 rounded-full bg-indigo-600 w-full text-center font-medium"
                >
                  {user.username}
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, type: "spring" }}
              className="px-6 mb-4"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex justify-between border border-indigo-700 rounded-lg py-3 px-5 bg-opacity-50 bg-black hover:bg-opacity-70 transition-all"
              >
                <div className="flex-1">
                  <div className="text-indigo-300 text-xs mb-1">Joined On</div>
                  <div className="text-white font-medium">
                    {moment(user.createdAt).format("MMM D, YYYY")}
                  </div>
                </div>
                <div className="flex-1 text-right">
                  <div className="text-indigo-300 text-xs mb-1">Member For</div>
                  <div className="text-white font-medium">
                    {calculateDuration(user.createdAt)}
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, type: "spring" }}
              className="px-6 mb-6"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex justify-between border border-indigo-700 rounded-lg py-3 px-5 bg-opacity-50 bg-black hover:bg-opacity-70 transition-all"
              >
                <div className="flex-1">
                  <div className="text-indigo-300 text-xs mb-1">Points</div>
                  <div className="text-white text-lg font-bold">
                    {user.points}
                  </div>
                </div>
                <div className="flex-1 text-right">
                  <div className="text-indigo-300 text-xs mb-1">
                    Current Title
                  </div>
                  <div className="text-white text-lg font-bold">
                    {getRankingTitle(user.points)}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProfileCard;
