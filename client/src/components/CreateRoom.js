import React, { useState } from 'react';
import './css/CreateRoom.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateRoom = () => {
  const [roomCode, setRoomCode] = useState('');
  const navigate = useNavigate();

  const createRoom = async () => {
    try {
      const response = await axios.post('https://fileroom.onrender.com/api/rooms/create', { roomCode });
      navigate(`/room/${response.data.roomCode}`);
    } catch (error) {
      console.error('Error creating room:', error);
    }
  };

  return (
    <div>
      <h2>Create a Room</h2>
      <input
        type="text"
        placeholder="Room Code"
        value={roomCode}
        onChange={(e) => setRoomCode(e.target.value)}
      />
      <button onClick={createRoom}>Create</button>
    </div>
  );
};

export default CreateRoom;
