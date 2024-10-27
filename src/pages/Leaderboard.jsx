// src/pages/Leaderboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [history, setHistory] = useState([]);

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     const { data } = await axios.get('http://localhost:7000/api/user/v1/get-users');
  //     console.log(data, typeof data)
  //     const usersList = Array.isArray(data) ? data : data.users;
  //     setUsers(data.sort((a, b) => b.points - a.points));
  //   };
  //   fetchUsers();
  // }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get('http://localhost:7000/api/user/v1/get-users');
        console.log(data); // Check the structure of the response
  
        // Access the `users` property if `data` is an object
        const usersList = data.users;
  
        if (Array.isArray(usersList)) {
          setUsers(usersList.sort((a, b) => b.points - a.points));
        } else {
          console.error("Expected an array in data.users, but received:", data);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
  
    fetchUsers();
  }, []);
  
  const fetchHistory = async (id) => {
    const { data } = await axios.post('http://localhost:7000/api/user/v1/your-history', { userId: id });
    setSelectedUser(id);
    setHistory(data);
  };

  return (
    <div className="p-4">
      {users.map(user => (
        <div key={user._id} onClick={() => fetchHistory(user._id)} className="flex justify-between p-2 border-b">
          <span>{user.name}</span>
          <span>{user.points}</span>
        </div>
      ))}

      {selectedUser && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded">
            <h2>History of {selectedUser}</h2>
            {history.map((entry, index) => (
              <p key={index}>{entry}</p>
            ))}
            <button onClick={() => setSelectedUser(null)} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;