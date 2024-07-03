import { useState, useEffect } from "react";
import axios from "axios";

const useBuddies = () => {
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [friends, setFriends] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;

  const fetchRequests = async () => {
    if (!userId) return;

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/buddies/getAllFriendRequestsForUser",
        { userId }
      );
      setReceivedRequests(response.data.receivedRequests);
      setLoading(false);
    } catch (err) {
      setError(
        err.response
          ? err.response.data.message
          : "Error fetching friend requests"
      );
      setLoading(false);
    }
  };

  const fetchAllUsers = async () => {
    if (!userId) return;

    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/allUsers");
      setAllUsers(response.data.users);
      setLoading(false);
    } catch (err) {
      setError(
        err.response ? err.response.data.message : "Error fetching all users"
      );
      setLoading(false);
    }
  };

  const fetchFriends = async () => {
    if (!userId) return;

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/buddies/getFriendsForUser",
        { userId }
      );
      setFriends(response.data.friends);
      setLoading(false);
    } catch (err) {
      setError(
        err.response ? err.response.data.message : "Error fetching friends"
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
    fetchAllUsers();
    fetchFriends();
  }, [userId]);

  const postFriendRequest = async (to) => {
    try {
      await axios.post("http://localhost:5000/buddies/postFriendRequest", {
        from: userId,
        to,
      });
      fetchRequests();
    } catch (err) {
      setError(
        err.response
          ? err.response.data.message
          : "Error sending friend request"
      );
    }
  };

  const acceptFriendRequest = async (requestId) => {
    try {
      await axios.post("http://localhost:5000/buddies/acceptFriendRequest", {
        requestId,
      });
      fetchRequests();
      fetchFriends();
    } catch (err) {
      setError(
        err.response
          ? err.response.data.message
          : "Error accepting friend request"
      );
    }
  };

  const rejectFriendRequest = async (requestId) => {
    try {
      await axios.post("http://localhost:5000/buddies/rejectFriendRequest", {
        requestId,
      });
      fetchRequests();
    } catch (err) {
      setError(
        err.response
          ? err.response.data.message
          : "Error rejecting friend request"
      );
    }
  };

  return {
    receivedRequests,
    friends,
    allUsers,
    postFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
    error,
    loading,
  };
};

export default useBuddies;
