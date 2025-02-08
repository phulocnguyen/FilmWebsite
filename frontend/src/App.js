import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Login from "./pages/Login/Login.jsx";
import SignUp from "./pages/SignUp/SignUp.jsx";
import HomePage from "./pages/HomePage.jsx";
import AccountDetail from "./pages/AccountDetail.jsx";
import MovieDetail from "./pages/MovieDetails.jsx";
import PersonDetail from "./pages/PersonDetail.jsx";
import Discover from "./pages/Discover.jsx";
import NavBar from "./components/NavBar/NavBar.jsx";
import MovieSearch from "./pages/MediaSearch.jsx";
import ResetPassword from "./pages/ResetPassword/ResetPassWord.jsx";
import Footer from "./components/common/Footer.jsx";
import UpdateProfile from "./pages/UpdateProfile/UpdateProfile.jsx";
import UpdatePassword from "./pages/UpdatePassword/UpdatePassword.jsx";
import AdminPage from "./pages/AdminPage/AdminPage.jsx";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.jsx"
import { Box } from "@mui/material";
import Checkout from "./pages/checkout.jsx";
import VerifyOTP from "./pages/verify-otp.jsx";

function App() {
  const token = localStorage.getItem("token") ? localStorage.getItem("token") : false;
  const user =JSON.parse(localStorage.getItem("user"));;
  const admin = user ? user.admin : false;

  return (
    
    <BrowserRouter>
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <NavBar />
        <Box flex="1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movie/:movieId" element={<MovieDetail />} />
            <Route path="/movie" element={<Discover />} />
            <Route path="/login" element={<Login />}/>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/account/:username" element={<AccountDetail />} />
            <Route path="/person/:personId" element={<PersonDetail />} />
            <Route path="/search" element={<MovieSearch />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/account/:username/update-profile" element={<UpdateProfile />} />
            <Route path="/account/:username/update-password" element={<UpdatePassword />} />
            <Route path="/admin" element={<AdminPage/> } />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/verify-otp" element={<VerifyOTP />} />
          </Routes>
        </Box>
        
        <Footer style={{ marginTop: "auto" }} />
      </Box>
      
    </BrowserRouter>
  );
}

export default App;
