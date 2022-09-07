import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Blog from './components/Blog';
import ResponsiveAppBar from './components/NavigationBar';
import SignIn from './components/SignInPage'
import SignUp from './components/SignUpPage';
import MemberDashboard from './components/MemberDashboard';



function App() {
  return (
    <div className="App">
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<Blog />} />
        {/* <Route path="/products" element={<Products />} /> */}
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/dashboard" element={<MemberDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
