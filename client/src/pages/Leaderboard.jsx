import React, { useState, useEffect } from "react";
import { Navbar, Sidebar, Loader } from "../components";
import { useNavigate } from "react-router-dom";
import { useLeaderboard } from "../hooks/useLeaderboard";
import { rankings } from "../constants";

const Leaderboard = () => {
  const navigate = useNavigate();
  const { fetchLeaderboard, isLoading, error, users, totalPages } =
    useLeaderboard();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { users, totalPages } = await fetchLeaderboard(
          currentPage,
          usersPerPage
        );
        setUsers(users);
      } catch (err) {
        setError(err.message);
      } finally {
      }
    };
    fetchData();
  }, [currentPage, usersPerPage]);

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  const getRankingTitle = (points) => {
    const ranking = rankings.find(
      (rank) => points >= rank.minPoints && points <= rank.maxPoints
    );
    return ranking ? ranking.title : "Beginner";
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="h-screen bg-background-100 flex flex-col">
      <Navbar />
      <div className="flex-1 flex">
        <Sidebar />
        {isLoading ? (
          <Loader />
        ) : (
          <div className="px-10 py-8 flex-1 flex flex-col justify-between overflow-auto">
            <div>
              <div className="flex justify-between">
                <h1 className="text-4xl text-white mb-4">Leaderboard</h1>
                <div className="mb-6">
                  <label className="input input-bordered flex items-center gap-2">
                    <input
                      type="text"
                      className="grow w-[400px]"
                      placeholder="Search"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="w-4 h-4 opacity-70"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </label>
                </div>
              </div>
              <div className="rounded-lg shadow-md border-2 overflow-hidden">
                <div className="grid grid-cols-[0.5fr_2.5fr_1fr_2fr_0.5fr] text-xl px-8 py-4 gap-4 bg-[#666666] mb-4 text-white font-bold">
                  <div>Rank</div>
                  <div>Coder</div>
                  <div>Points</div>
                  <div>Title</div>
                  <div>Status</div>
                </div>
                {filteredUsers.map((user, index) => (
                  <div
                    key={user._id}
                    className="grid grid-cols-[0.5fr_2.5fr_1fr_2fr_0.5fr] px-8 gap-4 items-center text-lg text-white mb-2 border-b border-gray-700 pb-2 last:border-b-0 last:pb-0"
                  >
                    <div>{indexOfFirstUser + index + 1}</div>
                    <div>{user.username}</div>
                    <div className="bg-green-500 text-white px-3 py-1 rounded-lg">
                      {user.points}
                    </div>
                    <div>{getRankingTitle(user.points)}</div>
                    <div className="border border-green-500 w-fit px-3 py-1 rounded-full text-green-500 flex-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      Active
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 flex justify-center">
              <nav aria-label="Pagination">
                <ul className="flex list-none gap-2">
                  {Array.from({ length: totalPages }, (_, index) => (
                    <li key={index}>
                      <button
                        className={`relative px-4 py-2 rounded-md text-xl transition-all duration-300 ${
                          currentPage === index + 1
                            ? "bg-secondary-100 text-white"
                            : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
                        }`}
                        onClick={() => handlePageChange(index + 1)}
                      >
                        {index + 1}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
