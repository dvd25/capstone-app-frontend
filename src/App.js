import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Blog from './components/Blog/Blog';
import ResponsiveAppBar from './components/NavigationBar';
import SignIn from './components/SignIn'




function App() {
  return (
    <div className="App">
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<Blog />} />
        {/* <Route path="/products" element={<Products />} /> */}
        <Route path="/signIn" element={<SignIn />} />
        {/* <Route path="/register" element={<SignUp />} />
        <Route path="dashboard" element={<Dashboard />} /> */}
      </Routes>
    </div>
  );
}

export default App;
