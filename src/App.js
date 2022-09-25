import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Blog from './components/Blog';
import ResponsiveAppBar from './components/NavigationBar';
import SignIn from './components/SignInPage'
import SignUp from './components/SignUpPage';
import MemberDashboard from './components/MemberDashboard';
import Pricing from './components/PricingPage';
import Dashboard from './components/dashboard-components/SuperAdminDashboard';
import ContactPage from './components/dashboard-components/ContactPage';
import ManageMembers from './components/ManageMembers';
import Messages from './components/Messages'
import AdminPage from './components/admin-components/AdminPage';



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
        <Route path="/pricing" element={<Pricing/>} />
        <Route path="/super-admin-dashboard" element={<Dashboard/>} />
        <Route path="/contact" element={<ContactPage/>} />
        <Route path="/manage-members" element={<ManageMembers/>} />
        <Route path="/messages" element={<Messages/>} />
        <Route path="/admin-dashboard" element={<AdminPage/>} />
      </Routes>
    </div>
  );
}

export default App;
