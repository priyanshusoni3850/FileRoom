import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes
import CreateRoom from './components/CreateRoom';
import JoinRoom from './components/JoinRoom';
import RoomPage from './components/RoomPage';
import HScreen from './components/Hscreen';


function App() {
  return (
    <Router>
      {/* Use Routes here */}
      <Routes>
        <Route path="/" element={<HScreen />} />
        <Route path="/create-room" element={<CreateRoom />} />
        <Route path="/join-room" element={<JoinRoom />} />
        <Route path="/room/:roomCode" element={<RoomPage />} />
      </Routes>
    </Router>
  );
}

export default App;
