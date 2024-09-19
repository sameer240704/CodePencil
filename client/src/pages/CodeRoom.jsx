import React, { useEffect } from "react";
import { Navbar, Sidebar } from "../components";
import { useNavigate } from "react-router-dom";

const CodeRoom = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/");
    }
  }, []);

  return (
    <div className="flex flex-col overflow-x-hidden bg-gradient-to-br from-background-100 to-background-200">
      <Navbar />
      <div className="flex-1 flex">
        <Sidebar />
        <div className="p-6 flex-1 overflow-auto">
          <h1 className="text-4xl text-white">Code Room</h1>
        </div>
      </div>
    </div>
  );
};

export default CodeRoom;
