import React, { useState, useEffect } from "react";
import { Navbar, Sidebar, Loader, SearchBar } from "../components";
import { useNavigate } from "react-router-dom";
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
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
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
      console.log(response.data);
      setSelectedUser(response.data);
    } catch (error) {
      console.error("Error getting user", error);
    }
  };

  const handleCloseProfile = () => {
    setSelectedUser(null);
  };

  const getRankingIcon = (rank) => {
    if (rank === 1) return <FaCrown className="text-yellow-400 mr-2" />;
    if (rank === 2) return <FaMedal className="text-gray-400 mr-2" />;
    if (rank === 3) return <FaAward className="text-orange-400 mr-2" />;
    return null;
  };

  return (
    <div className="flex flex-col overflow-x-hidden">
      <Navbar />
      <div className="flex-1 flex">
        <Sidebar />
        {isLoading ? (
          <Loader />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="h-screen flex flex-col flex-1 overflow-auto justify-between pb-5 p-8"
          >
            <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-md rounded-2xl shadow-2xl border border-white border-opacity-20 overflow-hidden">
              <div className="flex justify-between items-center px-8 py-4">
                <h2 className="text-3xl font-bold text-white">Leaderboard</h2>
                <SearchBar
                  value={searchTerm}
                  onChange={setSearchTerm}
                  onSearch={onSearch}
                />
              </div>
              <div className="grid grid-cols-[0.5fr_2.5fr_1fr_2fr_1fr_0.5fr] text-xl px-8 py-4 gap-4 bg-white bg-opacity-15 text-white font-bold">
                <div>Rank</div>
                <div>Coder</div>
                <div>Points</div>
                <div>Title</div>
                <div>Status</div>
                <div></div>
              </div>
              {filteredUsers.map((user, index) => (
                <motion.div
                  key={user._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`h-[70px] grid grid-cols-[0.5fr_2.5fr_1fr_2fr_1fr_0.5fr] px-8 gap-4 items-center text-lg text-white border-b border-white border-opacity-10 last:border-b-0 hover:bg-white hover:bg-opacity-15 transition-all duration-300 ${
                    currentUser._id === user._id
                      ? "bg-white bg-opacity-20 hover:bg-opacity-25"
                      : ""
                  }`}
                >
                  <div className="w-10 text-center flex items-center justify-center">
                    {getRankingIcon(
                      index + 1 + (currentPage - 1) * usersPerPage
                    )}
                    {index + 1 + (currentPage - 1) * usersPerPage}
                  </div>
                  <div className="flex items-center gap-5">
                    <img
                      src={user.profileImage}
                      alt={index}
                      className="h-12 w-12 rounded-full border-2 border-white border-opacity-50"
                    />
                    <div className="font-semibold">{user.username}</div>
                  </div>
                  <div className="text-white px-3 py-1 rounded-lg bg-white bg-opacity-20">
                    {user.points}
                  </div>
                  <div className="font-medium text-yellow-300">
                    {getRankingTitle(user.points)}
                  </div>
                  <div
                    className={`border ${
                      user.status === "Online"
                        ? "text-green-400 border-green-400"
                        : "text-red-400 border-red-400"
                    } w-fit px-3 py-1 rounded-full flex items-center bg-opacity-20 backdrop-filter backdrop-blur-sm`}
                  >
                    <div
                      className={`h-2.5 w-2.5 rounded-full ${
                        user.status === "Online" ? "bg-green-400" : "bg-red-400"
                      } me-2`}
                    ></div>
                    {user.status}
                  </div>
                  <div
                    className="text-blue-300 hover:text-blue-100 text-md cursor-pointer ml-3 font-medium transition-colors duration-200"
                    onClick={() => getUser(user._id)}
                  >
                    <FaEye className="h-5 w-5" />
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <nav aria-label="Pagination">
                <ul className="flex list-none gap-2">
                  {Array.from({ length: totalPages }, (_, index) => (
                    <motion.li
                      key={index}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <button
                        className={`relative px-4 py-2 rounded-md text-xl transition-all duration-300 ${
                          currentPage === index + 1
                            ? "bg-white bg-opacity-30 text-white"
                            : "bg-white bg-opacity-10 text-white hover:bg-opacity-20"
                        }`}
                        onClick={() => handlePageChange(index + 1)}
                      >
                        {index + 1}
                      </button>
                    </motion.li>
                  ))}
                </ul>
              </nav>
            </div>
          </motion.div>
        )}
      </div>

      {selectedUser && (
        <ProfileCard user={selectedUser} onClose={handleCloseProfile} />
      )}
    </div>
  );
};

export default Leaderboard;
