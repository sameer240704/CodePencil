import { useState } from "react";
import axios from "axios";

export const useLeaderboard = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const fetchLeaderboard = async (page, limit) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        "http://localhost:5000/leaderboard/getUsers",
        {
          params: { page, limit },
        }
      );

      if (response.status === 200) {
        const { users, totalPages } = response.data;
        setUsers(users);
        setTotalPages(totalPages);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setError("Failed to fetch leaderboard. Please try again.");
      }
    } catch (err) {
      setIsLoading(false);
      const errorMessage =
        err.response?.data?.message || "An error occurred. Please try again.";
      setError(errorMessage);
    }
  };

  return { fetchLeaderboard, isLoading, error, users, totalPages };
};
