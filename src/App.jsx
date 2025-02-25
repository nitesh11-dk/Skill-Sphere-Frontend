import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Componenets/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./Componenets/User/Register.jsx";
import Login from "./Componenets/User/Login";
import Profile from "./Componenets/User/Profile";
import EditUser from "./Componenets/User/EditUser";
import LandingPage from "./Componenets/LandingPage";
import Home from "./Componenets/Home/Home";
import DashBoard from "./Componenets/Home/Dashboard.jsx";
import Skills from "./Componenets/Skills.jsx";
import UserDetails from "./Componenets/Home/UserDetails.jsx";
import RequestedBookings from "./Componenets/Home/RequestedBookings.jsx";
import OfferingBookings from "./Componenets/Home/OfferingBookings.jsx";

import Calendar from "./Componenets/Calendar/Calendar.jsx"
const App = () => {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/select-skills" element={<Skills />} />
        <Route path="/home" element={<Home />}>
          <Route path="/home/dashboard" element={<DashBoard />} />
          <Route path="/home/user/:id" element={<UserDetails />} />
          <Route
            path="/home/requested-bookings"
            element={<RequestedBookings />}
          />
<Route path="/home/schedule-booking" element={<Calendar />} />
          <Route path="/home/offered-bookings" element={<OfferingBookings />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edituser" element={<EditUser />} />
      </Routes>
    </Router>


  );
};

export default App;
