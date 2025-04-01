import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Usa Routes en lugar de Switch
import './App.css';

import HeaderComponent from './components/HeaderComponent';
import MyBookings from './components/MyBookings';
import Home from './components/Home';
import AHome from './components/AHome';
import Login from './components/Login';
import AddBooking from './components/AddBooking';
import UsersManager from './components/UsersManager';
import LaboratoriesManager from './components/LaboratoriesManager';

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
            <Route path="/Ahome" element={<AHome/>} /> 
            <Route path="/booking" element={<AddBooking/>} /> 
            <Route path="/usersManager" element={<UsersManager/>} /> 
            <Route path="/laboratoriesManager" element={<LaboratoriesManager/>} /> 
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
