// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      const { data } = await axios.get('http://localhost:7000/api/user/v1/get-users');
      console.log(data);
      setFriends(response.data.data);
    };
    fetchFriends();
  }, []);

  const increasePoints = async (id) => {
    await axios.patch('http://localhost:7000/api/user/v1/claim-points', { userId: id });
    setFriends((prev) => prev.map(friend => friend._id === id ? { ...friend, points: friend.points + 1 } : friend));
  };

  return (
    <div className="p-4">
      {friends.map(friend => (
        <div key={friend._id} onClick={() => increasePoints(friend._id)} className="flex justify-between p-2 border-b">
          <span>{friend.name}</span>
          <span>{friend.points}</span>
        </div>
      ))}
    </div>
  );
};

export default Home;