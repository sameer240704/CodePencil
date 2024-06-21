import React, { useState, useEffect } from "react";
import { Navbar, Sidebar, Loader, SearchBar } from "../components";
import { useNavigate } from "react-router-dom";
import { useLeaderboard } from "../hooks/useLeaderboard";
import { rankings } from "../constants";

const Leaderboard = () => {
  const navigate = useNavigate();
  const { fetchLeaderboard, isLoading, error, users, totalPages } =
    useLeaderboard();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const usersPerPage = 10;
  const currentUser = localStorage.getItem("user");

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

  useEffect(() => {
    const filtered = searchTerm
      ? filteredUsers
      : users.filter((user) =>
          user.username.toLowerCase().includes(searchTerm.toLowerCase())
        );
    setFilteredUsers(filtered);
  }, [users, searchTerm]);

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

  const onSearch = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/leaderboard/getSearchedUser",
        {
          searchTerm,
        },
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

  return (
    <div className="h-screen bg-background-100 flex flex-col">
      <Navbar />
      <div className="flex-1 flex">
        <Sidebar />
        {isLoading ? (
          <Loader />
        ) : (
          <div className=" flex-1 overflow-auto">
            <div className="p-6">
              <div className="flex justify-between">
                <h1 className="text-4xl text-white">Leaderboard</h1>
                <SearchBar
                  value={searchTerm}
                  onChange={setSearchTerm}
                  onSearch={onSearch}
                />
              </div>
              <div className="rounded-lg shadow-md border-2 overflow-hidden">
                <div className="grid grid-cols-[0.5fr_2.5fr_1fr_2fr_0.5fr] text-xl px-8 py-4 gap-4 bg-[#666666] text-white font-bold">
                  <div>Rank</div>
                  <div>Coder</div>
                  <div>Points</div>
                  <div>Title</div>
                  <div>Status</div>
                </div>
                {filteredUsers.map((user, index) => (
                  <div
                    key={user._id}
                    className={`h-[60px] grid grid-cols-[0.5fr_2.5fr_1fr_2fr_0.5fr] px-8 gap-4 items-center text-lg text-white border-b border-gray-700 last:border-b-0 hover:bg-gray-800 hover:cursor-pointer ${
                      currentUser._id === user._id ? "bg-secondary-300" : ""
                    } `}
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
            <div className="mt-5 flex justify-center">
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
