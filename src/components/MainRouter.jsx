import React from 'react'
import {  Route, Routes } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import Signup from './Signup';
const MainRouter = () => {
  return (
    <div className='app'>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign" element={<Signup />} />
      </Routes>
    </div>
  )
}

export default MainRouter