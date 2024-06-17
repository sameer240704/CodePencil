import React, { useEffect } from "react";
import { Navbar, Sidebar } from "../components";
import { useNavigate } from "react-router-dom";
import { BuddiesTable } from "../components";

const Buddies = () => {
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
          <h1 className="text-3xl text-white">Buddies</h1>
          <div className="mt-5">
            <BuddiesTable title="My Buddies" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Buddies;
