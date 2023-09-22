import React, { useState } from 'react';
import axios from 'axios';
import './css/JoinRoom.css';
import { useNavigate } from 'react-router-dom';

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
    <div>
      <h2>Join a Room</h2>
      <input
        type="text"
        placeholder="Room Code"
        value={roomCode}
        onChange={(e) => setRoomCode(e.target.value)}
      />
      <button onClick={joinRoom}>Join</button>
    </div>
  );
};

export default JoinRoom;
