import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        {
          email,
          password,
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
      } else {
        setIsLoading(false);
        setError("Login failed. Please try again.");
      }
    } catch (err) {
      setIsLoading(false);
      setError(
        err.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  return { login, isLoading, error };
};
