// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to File Sharing</h1>
      <Link to="/create-room">Create a Room</Link>
      <Link to="/join-room">Join a Room</Link>
    </div>
  );
};

export default Home;
