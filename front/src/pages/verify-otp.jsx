import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";
import accountApi from "../api/modules/account.api"; // Import API module
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setEmail(user.email); 
      console.log('1')// Lấy email từ đối tượng người dùng
    } else {
      toast.error("No user information found, please request OTP again");
      navigate("/request-otp");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('otp:', otp);
      const response = await accountApi.verifyEmailOTP({ email, otp }); 
      console.log('response:', response);
      if (response.success) {
        toast.success("OTP verified successfully", {
          autoClose: 1000,
        });
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        toast.error("Invalid OTP, please try again");
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error("An error occurred, please try again later");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        padding: "2rem",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: "1rem" }}>
        Verify OTP
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: "400px" }}>
        <TextField
          fullWidth
          label="OTP"
          variant="outlined"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          sx={{ marginBottom: "1rem" }}
        />
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Verify
        </Button>
      </form>
      <ToastContainer />
    </Box>
  );
};

export default VerifyOTP;