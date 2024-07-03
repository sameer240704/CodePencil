import { useAuthContext } from "./useAuthContext";
import axios from "axios";
import { useState } from "react";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const logout = async (_id) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:5000/logout",
        { _id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        localStorage.removeItem("user");
        dispatch({ type: "LOGOUT" });
        setIsLoading(false);
        return { success: true };
      } else {
        setIsLoading(false);
        setError("Logout failed. Please try again.");
        return { success: false, message: "Logout failed. Please try again." };
      }
    } catch (err) {
      setIsLoading(false);
      const errorMessage =
        err.response?.message || "An error occurred. Please try again.";
      setError(errorMessage);
      return { success: false, message: errorMessage };
    }
  };

  return { logout, isLoading, error };
};
