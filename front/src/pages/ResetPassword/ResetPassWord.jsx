import Container from "../../components/common/Container.jsx";
import FilterBox from "../../components/common/FilterBox.jsx";

import { Box, Button } from "@mui/material";
import { useState } from "react";
import accountApi from "../../api/modules/account.api.js";
import {useNavigate} from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
function FormRow({ title, type, name, options, onChange }) {
    return (
        <div
        style={{
            display: "flex",
            flexFlow: "column nowrap",
            gap: "0.5em",
            width: "20em",
        }}
        >
        {type === "text" && (
            <>
            <span style={{ fontSize: "1em", textTransform: "capitalize" }}>
                {title}
            </span>
            <input
                style={{
                borderRadius: "0.4em",
                border: "0.1em solid black",
                fontSize: "1em",
                width: "20em",
                height: "2.3em",
                paddingLeft: "1em",
                }}
                type={type}
                name={name}
                onChange={onChange}
            ></input>
            </>
        )}
        {type === "select" && (
            <FilterBox
            title={title}
            options={options}
            onOptionChange={onChange}
            ></FilterBox>
        )}
        </div>
    );
    }

function VerifyOTP() {
    const navigate = useNavigate();
    const [isWrongOTP, setIsWrongOTP] = useState(false);
    const [isWrongEmail, setIsWrongEmail] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        otp: "",
    });

    const handleSubmitSendOTP = (event) => {
        event.preventDefault();
        const data = {
        email: formData.email,
        };
        // console.log(formData);
        accountApi.sendOTPVerify(data).then((res) => {
            if (res.success) {
                setIsWrongEmail(false);
                toast.success("OTP sent successfully");
                console.log("Email exist.");
                console.log(res);
            } else {
                setIsWrongEmail(true);
                toast.error("OTP sent failed");
                console.log("Email not exist.");
                console.log(res);
            }

        });
    };
    const handleSubmitVerifyOTP = (event) => {
        event.preventDefault();
        const data = {
        email: formData.email,
        otp: formData.otp,
        };
        //console.log(formData);
        accountApi.verifyOTP(data).then((res) => {
            if (res.success) {
                setIsWrongOTP(false);
                console.log("success" + res);
                navigate("/login");
            } else {
                setIsWrongOTP(true);
                console.log("error" + res);
            }
        });
    }

    const handleChange = (event) => {
        setFormData({
        ...formData,
        [event.target.name]: event.target.value,
        });
    };

    return (
        <>
        <form
        style={{
            display: "flex",
            flexFlow: "column nowrap",
            gap: "1em",
            width: "20em",
        }}
        // onSubmit={handleSubmit}
        >
      
        
        <FormRow
            title = "Your Email"
            type="text"
            name="email"
            onChange={handleChange}
        />
        <Button type="submit" variant="contained" 
            sx={{backgroundColor: "rgb(25, 118, 210)", width: "10em", alignSelf: "center" }}
            onClick={handleSubmitSendOTP}
        >
            Send OTP
        </Button>
        {isWrongEmail && (
            <p style={{ color: "red", fontSize: "0.8em" }}>
                Email is not exist
            </p>
        )}
        
        <FormRow
            title = "Your OTP"
            type="text"
            name="otp"
            onChange={handleChange}
        />
        <Button type="submit" variant="contained" 
            sx={{backgroundColor: "rgb(25, 118, 210)", width: "10em", alignSelf: "center" }}
            onClick={handleSubmitVerifyOTP}
        >
            Verify
        </Button>
        {isWrongOTP && (
            <p style={{ color: "red", fontSize: "0.8em" }}>
                OTP is wrong
            </p>
        )}
        </form>
        <div
        style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
            gap: "1em",
            fontFamily: '"Roboto", sans-serif',
            fontSize:"0.8em",
        
        }}>
            <p>Please check your email to get OTP. </p>
            <p>OTP expires in 1 minute.</p>
            <p>If you verify OPT successfully, you can get a new password in your email.</p>
        </div>
        </>
    );
    }

function ResetPassword() {
    return (
        <div 
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                marginTop:"5em",
                gap: "1em",
                fontFamily: '"Roboto", sans-serif',
            }}
        >
        <Box sx={{ margin: "auto" }}>
            <Container header="Reset Password">
            <Box
                sx={{
                margin: "1em auto",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                gap: "2em",
                fontFamily: '"Roboto", sans-serif',
                }}
            >
                {/* {!isSendedOTP ?( */}
                <VerifyOTP/>
                
            </Box>
            </Container>
        </Box>
        </div>
    );
    }
    export default ResetPassword;