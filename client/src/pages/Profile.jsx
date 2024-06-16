import React, { useState, useEffect } from "react";
import moment from "moment";
import { Navbar, Sidebar } from "../components";
import { rankings } from "../constants";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [userTitle, setUserTitle] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      // Calculate user's title based on points
      const userPoints = user.points;
      const titleObj = rankings.find(
        (rank) => userPoints >= rank.minPoints && userPoints <= rank.maxPoints
      );
      if (titleObj) {
        setUserTitle(titleObj.title);
      } else {
        setUserTitle("No Title"); // Default if no matching title found
      }
    }
  }, [user]);

  const getProfileImage = () => {
    if (user && user.profileImage) {
      if (user.profileImage.startsWith("data:image")) {
        return user.profileImage;
      } else {
        return `data:image/jpeg;base64,${user.profileImage}`;
      }
    }
    return "https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg";
  };

  const calculateDuration = (createdAt) => {
    const now = moment();
    const userCreatedAt = moment(createdAt);
    const years = now.diff(userCreatedAt, "years");
    userCreatedAt.add(years, "years");
    const months = now.diff(userCreatedAt, "months");
    userCreatedAt.add(months, "months");
    const days = now.diff(userCreatedAt, "days");

    return `${years > 0 ? `${years} years, ` : ""}${
      months > 0 ? `${months} months, ` : ""
    }${days} days`;
  };

  if (!user) return <p className="text-white">Loading...</p>;

  return (
    <div className="h-screen bg-background-100 flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="max-w-md w-full rounded-lg bg-gray-800 overflow-hidden shadow-xl">
            <div className="h-16 px-6 flex items-center justify-between bg-gray-700">
              <h2 className="text-xl font-bold text-white">User Profile</h2>
              <div className="border border-green-400 text-green-400 px-2 py-1 rounded-full font-bold text-sm">
                Active
              </div>
            </div>
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-32 h-32 mb-4 overflow-hidden rounded-full shadow-lg border-white">
                <img
                  src={getProfileImage()}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-2xl font-bold text-white mb-1">
                {user.name}
              </h2>
              <p className="text-gray-400 text-sm">{user.email}</p>
            </div>

            <div className="flex justify-between mb-4 px-6">
              <div className="flex items-center justify-center mr-2 w-full">
                <div className="text-white text-sm mr-2">Username:</div>
                <div className="text-white px-2 py-1 rounded-md bg-gray-700 w-full text-center">
                  {user.username}
                </div>
              </div>
            </div>

            <div className="px-6 mb-4">
              <div className="flex justify-between border border-gray-700 rounded-md py-3 px-5">
                <div className="flex-1 ml-2">
                  <div className="text-white text-sm mb-1">Joined On</div>
                  <div className="text-white">
                    {moment(user.createdAt).format("MMM D, YYYY")}
                  </div>
                </div>
                <div className="flex-1 relative">
                  <div className="ml-4 text-white">
                    <div className="text-sm mb-1">Member Since</div>
                    <div>{calculateDuration(user.createdAt)}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 mb-4">
              <div className="flex justify-between border border-gray-700 rounded-md py-3 px-5">
                <div className="flex-1 ml-2">
                  <div className="text-white text-sm mb-1">Points</div>
                  <div className="text-white text-lg font-bold">
                    {user.points}
                  </div>
                </div>
                <div className="flex-1 relative">
                  <div className="ml-4 text-white">
                    <div className="text-sm mb-1">Current Title</div>
                    <div className="text-white text-lg font-bold">
                      {userTitle}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
