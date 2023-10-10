// src/components/Hscreen.js
import React from 'react';
import { Link } from 'react-router-dom';
import './css/Hscreen.css';
import Navbar from './Navbar';

const Hscreen = () => {
  return (
    <>
    <Navbar></Navbar>
    <div className="container">
      <h1>Welcome to File Sharing</h1>
      <div className="button-card left-card" onClick={() => window.location.href = "/create-room"}>
        Create a Room
      </div>
      <div className="button-card right-card" onClick={() => window.location.href = "/join-room"}>
        Join a Room
      </div>
    </div>
    </>
  );
};

export default Hscreen;
