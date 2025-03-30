import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Usa Routes en lugar de Switch
import './App.css';

import HeaderComponent from './components/HeaderComponent';
import MyBookings from './components/MyBookings';
import Home from './components/Home';
import Login from './components/Login';
import AddBooking from './components/AddBooking';

function App() {
  return (
    <div>
      <Router>
        <HeaderComponent />
        <div className="container">
          <Routes> {/* Reemplazo de Switch */}
            <Route path="/mybookings" element={<MyBookings />} /> 
            <Route path="/" element={<Login/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/home" element={<Home/>} /> 
            <Route path="/booking" element={<AddBooking/>} /> 
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
