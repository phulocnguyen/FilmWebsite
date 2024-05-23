import React, { useEffect, useState } from "react";
import accountApi from "../../api/modules/account.api.js";
import { Link, useParams } from "react-router-dom";
import Container from "../../components/common/Container.jsx";
import { useAuth } from "../../hooks/AuthContext.js";
import { Typography } from "@mui/material";
import { Box, Stack, TextField } from "@mui/material";
import styles from "./updatePassword.css";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Button from "@mui/material/Button";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { ToastContainer, toast } from "react-toastify";
import { IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Input } from "@mui/material";
import { FilledInput } from "@mui/material";
import { useNavigate } from "react-router-dom";

function UpdatePassword() {
  const { username } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [showOldPassword, setShowOldPassword] = React.useState(false);
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const handleClickShowOldPassword = () => setShowOldPassword((prev) => !prev);
  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
  const handleClickShowConfirmNewPassword = () =>
    setShowConfirmNewPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.newPassword !== formData.confirmNewPassword) {
      toast.error("New password and confirm new password do not match");
      return;
    }
    if (formData.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (formData.newPassword === formData.oldPassword) {
      toast.error("New password must be different from old password");
      return;
    }

    const data = {
      oldPassword: formData.oldPassword,
      newPassword: formData.newPassword,
    };
    accountApi.updatePassword(username, data, token).then((res) => {
      console.log(res);
      if (!res.success) {
        console.log("res.message", res.message);
        console.log("update failed");
        toast.error(res.message);
      } else {
        console.log("update success");
        toast.success("Update success");
        navigate("/");
      }
    });
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <Box
        padding="2em"
        display="flex"
        justifyContent="left"
        alignItems="left"
        sx={{ height: "100vh" }}
      >
         <Stack direction="column" spacing={4} width="100%">
          <Container header="Update Password">
            <form onSubmit={handleSubmit}>
              <Stack direction="column" spacing={2} width="100%">
                <Typography variant="h6">Old Password</Typography>
                <FormControl sx={{ m: 1, width: "30%" }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showOldPassword ? "text" : "password"}
                    name="oldPassword"
                    value={formData.oldPassword}
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowOldPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showOldPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
                <Typography variant="h6">New Password</Typography>

                <FormControl sx={{ m: 1, width: "30%" }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showNewPassword ? "text" : "password"}
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowNewPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showNewPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
                <Typography variant="h6">Confirm new password</Typography>
                <FormControl sx={{ m: 1, width: "30%" }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showConfirmNewPassword ? "text" : "password"}
                    name="confirmNewPassword"
                    value={formData.confirmNewPassword}
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowConfirmNewPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showConfirmNewPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{ width: "max-content", backgroundColor: "darkred" }}
                  startIcon={<SendOutlinedIcon />}
                  loadingPosition="start"
                >
                  Update
                </Button>
              </Stack>
            </form>
          </Container>
        </Stack>
      </Box>
      <ToastContainer />
    </>
  );
}

export default UpdatePassword;
