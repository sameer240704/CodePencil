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
    <div className="h-screen bg-background-100 flex flex-col">
      <Navbar />
      <div className="flex-1 flex">
        <Sidebar />
        <div className="p-6 flex-1 overflow-auto">
          <h1 className="text-3xl text-white">CodeRoom</h1>
        </div>
      </div>
    </div>
  );
};

export default CodeRoom;
