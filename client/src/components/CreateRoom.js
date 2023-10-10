import React, { useState } from 'react';
import './css/CreateRoom.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';

const CreateRoom = () => {
  const [roomCode, setRoomCode] = useState('');
  const navigate = useNavigate();

  const createRoom = async () => {
    try {
      // Check if the room code already exists
      const checkResponse = await axios.get(`https://fileroom.onrender.com/api/rooms/check/${roomCode}`);
      
      if (checkResponse.data.exists) {
        // Room code is already taken
        console.log("taken")
        alert('This code is already taken. Please try a different code.');
      } else {
        // Room code is available, create the room
        const response = await axios.post('https://fileroom.onrender.com/api/rooms/create', { roomCode });
        navigate(`/room/${response.data.roomCode}`);
      }
    } catch (error) {
      console.error('Error creating room:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="card">
          <h2>Create a Room</h2>
          <input 
            className='input-code'
            type="text"
            placeholder="Room Code"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
          />
          <button onClick={createRoom}>Create</button>
        </div>
      </div>
    </>
  );
};

export default CreateRoom;
