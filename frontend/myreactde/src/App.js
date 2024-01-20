// App.js
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Header from './components/Header';
import Profile from './components/Profile';
import useToken from './components/useToken';
import Register from './components/Register';

function App() {
  const { token, removeToken, setToken } = useToken();

  return (
    <div className="vh-100 gradient-custom">
      <div className="container">
        <h1 className="page-header text-center">AI/ML INTERN ASSIGNMENT</h1>

        <Router>
          <Header token={removeToken} />
          <Routes>
            <Route path="/profile" element={<Profile token={token} setToken={setToken} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Login setToken={setToken} />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
