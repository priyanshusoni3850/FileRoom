// src/components/JoinRoom.js
import React, { useState } from 'react';
import axios from 'axios';
import './css/JoinRoom.css';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const JoinRoom = () => {
  const [roomCode, setRoomCode] = useState('');
  const navigate = useNavigate();

  const joinRoom = async () => {
    try {
      await axios.get(`https://fileroom.onrender.com/api/rooms/${roomCode}`);
      navigate(`/room/${roomCode}`);
    } catch (error) {
      console.error('Error joining room:', error);
    }
  };

  return (
    <>
    <Navbar/>
    <div className="container">
      <div className="card">
        <h2>Join a Room</h2>
        <input
          type="text"
          placeholder="Room Code"
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value)}
        />
        <button className="join-button" onClick={joinRoom}>
          Join
        </button>
      </div>
    </div>
    </>
  );
};

export default JoinRoom;
