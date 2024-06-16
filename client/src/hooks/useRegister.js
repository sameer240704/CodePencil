import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

export const useRegister = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const register = async (name, username, email, password, profileImage) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:5000/register",
        {
          name,
          username,
          email,
          password,
          profileImage,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const user = response.data;
        localStorage.setItem("user", JSON.stringify(user));
        dispatch({ type: "LOGIN", payload: user });
        setIsLoading(false);
        return { success: true };
      } else {
        setIsLoading(false);
        const errorMessage =
          response.data.message || "Registration failed. Please try again.";
        setError(errorMessage);
        return { success: false, message: errorMessage };
      }
    } catch (err) {
      setIsLoading(false);
      const errorMessage =
        err.response?.data?.message || "An error occurred. Please try again.";
      setError(errorMessage);
      return { success: false, message: errorMessage };
    }
  };

  return { register, isLoading, error };
};
