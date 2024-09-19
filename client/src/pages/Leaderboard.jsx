import React, { useState, useEffect } from "react";
import { Navbar, Sidebar, Loader, SearchBar } from "../components";
import { useLeaderboard } from "../hooks/useLeaderboard";
import { rankings } from "../constants";
import axios from "axios";
import ProfileCard from "../components/ProfileCard";
import { FaEye, FaCrown, FaMedal, FaAward } from "react-icons/fa";
import { motion } from "framer-motion";

const Leaderboard = () => {
  const { fetchLeaderboard, isLoading, error, users, totalPages } =
    useLeaderboard();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const usersPerPage = 10;
  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { users, totalPages } = await fetchLeaderboard(
          currentPage,
          usersPerPage
        );
        setFilteredUsers(users);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchData();
  }, [currentPage, usersPerPage]);

  useEffect(() => {
    const filtered = searchTerm
      ? users.filter((user) =>
          user.username.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : users;
    setFilteredUsers(filtered);
  }, [users, searchTerm]);

  const getRankingTitle = (points) => {
    const ranking = rankings.find(
      (rank) => points >= rank.minPoints && points <= rank.maxPoints
    );
    return ranking ? ranking.title : "Beginner";
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const onSearch = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/leaderboard/getSearchedUser",
        { searchTerm },
        { headers: { "Content-Type": "application/json" } }
      );
      setFilteredUsers(response.data.users);
      setCurrentPage(1);
    } catch (err) {
      console.error(err);
    }
  };

  const getUser = async (_id) => {
    try {
      const response = await axios.get(`http://localhost:5000/user/${_id}`);
      setSelectedUser(response.data);
    } catch (error) {
      console.error("Error getting user", error);
    }
  };

  const handleCloseProfile = () => {
    setSelectedUser(null);
  };

  const getRankingIcon = (rank) => {
    if (rank === 1) return <FaCrown className="text-yellow-400" />;
    if (rank === 2) return <FaMedal className="text-gray-400" />;
    if (rank === 3) return <FaAward className="text-orange-400" />;
    return null;
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background-100 to-background-200">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8">
          {isLoading ? (
            <Loader />
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 bg-white bg-opacity-10 backdrop-filter backdrop-blur-md rounded-t-2xl shadow-2xl border border-white border-opacity-20 overflow-hidden">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-3xl font-bold text-white">Leaderboard</h2>
                  <SearchBar
                    value={searchTerm}
                    onChange={setSearchTerm}
                    onSearch={onSearch}
                  />
                </div>
                <div className="grid grid-cols-[0.5fr_2fr_1fr_1.5fr_1fr_0.5fr] text-sm font-medium text-gray-400 uppercase tracking-wider">
                  <div>Rank</div>
                  <div>Coder</div>
                  <div>Points</div>
                  <div>Title</div>
                  <div>Status</div>
                  <div>Profile</div>
                </div>
              </div>
              <div className="divide-y divide-gray-700">
                {filteredUsers.map((user, index) => (
                  <motion.div
                    key={user._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={`grid grid-cols-[0.5fr_2fr_1fr_1.5fr_1fr_0.5fr] p-4 items-center hover:bg-gray-700 transition-colors ${
                      currentUser._id === user._id ? "bg-gray-700" : ""
                    }`}
                  >
                    <div className="flex items-center justify-center">
                      {getRankingIcon(
                        index + 1 + (currentPage - 1) * usersPerPage
                      )}
                      <span className="ml-2 font-semibold">
                        {index + 1 + (currentPage - 1) * usersPerPage}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <img
                        src={user.profileImage}
                        alt={user.username}
                        className="h-10 w-10 rounded-full"
                      />
                      <span className="font-medium text-white">
                        {user.username}
                      </span>
                    </div>
                    <div className="font-semibold text-blue-400">
                      {user.points}
                    </div>
                    <div className="font-medium text-yellow-400">
                      {getRankingTitle(user.points)}
                    </div>
                    <div
                      className={`text-sm ${
                        user.status === "Online"
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {user.status}
                    </div>
                    <button
                      onClick={() => getUser(user._id)}
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <FaEye className="h-5 w-5" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
          <div className="mt-6 flex justify-center">
            <nav className="inline-flex rounded-md shadow">
              {Array.from({ length: totalPages }, (_, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-4 py-2 text-sm font-medium ${
                    currentPage === index + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  } ${index === 0 ? "rounded-l-md" : ""} ${
                    index === totalPages - 1 ? "rounded-r-md" : ""
                  }`}
                >
                  {index + 1}
                </motion.button>
              ))}
            </nav>
          </div>
        </main>
      </div>
      {selectedUser && (
        <ProfileCard user={selectedUser} onClose={handleCloseProfile} />
      )}
    </div>
  );
};

export default Leaderboard;
