import React, { useEffect, useState } from "react";
import accountApi from "../../api/modules/account.api.js";
import { Link, useParams } from "react-router-dom";
import Container from "../../components/common/Container.jsx";
import { useAuth } from "../../hooks/AuthContext.js";
import { Typography } from "@mui/material";
import { Box, Stack, TextField } from "@mui/material";
import styles from "./updateProfile.css";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Button from "@mui/material/Button";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function UpdateProfile() {
  const { username } = useParams();
  const token = localStorage.getItem("token");
  const [formData, setFormData] = useState({ name: "", gender: "" });
  const navigate = useNavigate();

  // Hàm xử lý khi người dùng ấn nút Update
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      name: formData.name,
      gender: formData.gender,
    };
    accountApi.updateProfile(username, data, token).then((res) => {
      console.log(res);
      if (!res.success) {
        console.log("update failed");
        toast.error("Update failed");
      } else {
        console.log("update success");
        toast.success("Update success");
        navigate("/account/" + username);
      }
    });
  };

  // Lấy thông tin tài khoản từ API khi component được render
  useEffect(() => {
    const getInfo = async (username) => {
      try {
        const accountInfo = await accountApi.getInfo(username);
        console.log("Account info:", accountInfo);
        if (accountInfo) {
          setFormData((prevData) => ({
            ...prevData,
            name: accountInfo.name,
            gender: accountInfo.gender,
          }));
        } else {
          console.error("Account info is null");
        }
      } catch (error) {
        console.error("Error fetching account:", error);
      }
    };
    getInfo(username);
  }, [username]);

  // Hàm xử lý khi có sự thay đổi trong TextField hoặc Select
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
          <Container header="Update Profile">
            <form className={styles["formGroup"]} onSubmit={handleSubmit}>
              <Stack direction="column" spacing={2}>
                <Typography variant="h6">Display name</Typography>
                <TextField
                  sx={{ height: "5em",
                      width: "30%"
                   }}
                  className="review-text"
                  id="outlined-basic"
                  name="name"
                  variant="outlined"
                  value={formData.name}
                  onChange={handleChange}
                  multiline
                  rows={1}
                />
                <Typography variant="h6">Gender</Typography>
                <Select
                  sx={{ height: "4em", width: "30%" }}
                  name="gender"
                  value={formData.gender}
                  label="Gender"
                  onChange={handleChange}
                >
                  <MenuItem value={"Female"}>Female</MenuItem>
                  <MenuItem value={"Male"}>Male</MenuItem>
                  <MenuItem value={"Non-binary"}>Non-binary</MenuItem>
                </Select>

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

export default UpdateProfile;
