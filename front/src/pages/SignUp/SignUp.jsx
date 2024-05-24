import styles from "./SignUp.module.css";
import accountApi from "../../api/modules/account.api.js";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function FormSignup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    gender: null,
  });
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.password.length < 6) {
      setMessage("Password must be at least 6 characters");
      setShowMessage(true);
    } else if (formData.password !== formData.confirmPassword) {
      setMessage("Password and confirm password are not the same");
      setShowMessage(true);
    }else if(formData.gender === null){
      setMessage("Please choose gender");
      setShowMessage(true);

    }
     else {
      const data = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        name: formData.name,
        gender: formData.gender,
      };
      accountApi.signUp(data).then((res) => {
        if (!res.success) {
          if(!res.email){
            setMessage("Email is existed");
            setShowMessage(true);
          }
          else if(!res.username){
            setMessage("Username is existed");
            setShowMessage(true);
          }
        } else {
          accountApi.sendOTPVerify({ email: formData.email })
          .then((res) => {
            if (res.success === true) {
              toast.success("A verification code has been sent to your email");
              const user = { email: formData.email };
              localStorage.setItem("user", JSON.stringify(user));
              navigate("/verify-otp");
            } else {
              toast.error("An error occurred");
            }
          })
          .catch((error) => {
            toast.error(`An error occurred: ${error.message}`);
          });
            }
          }); 
        }
      };

  const handleChange = (event) => {
    setShowMessage(false);
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form className={styles["formGroup"]} onSubmit={handleSubmit}>
      <div className={styles["formInput"]}>
        <span className={styles["headInput"]}>Username</span>
        <input
          type={"username"}
          name="username"
          className={styles["inputData"]}
          placeholder="Enter your username"
          onChange={handleChange}
          required
        ></input>
      </div>
      <div className={styles["formInput"]}>
        <span className={styles["headInput"]}>Display name</span>
        <input
          type={"text"}
          name="name"
          className={styles["inputData"]}
          placeholder="Enter your display name"
          onChange={handleChange}
          required
        ></input>
      </div>
      <div className={styles["formInput"]}>
        <span className={styles["headInput"]}>Email</span>
        <input
          type={"email"}
          name="email"
          className={styles["inputData"]}
          placeholder="Enter your email"
          onChange={handleChange}
          required
        ></input>
      </div>
      <div className={styles["formInput"]}>
        <span className={styles["headInput"]}>Password</span>
        <input
          type={"password"}
          name="password"
          className={styles["inputData"]}
          placeholder="Enter your password"
          onChange={handleChange}
          required
        ></input>
      </div>
      <div className={styles["formInput"]}>
        <span className={styles["headInput"]}>Confirm password</span>
        <input
          type={"password"}
          name="confirmPassword"
          className={styles["inputData"]}
          placeholder="Confirm your password"
          onChange={handleChange}
          required
        ></input>
      </div>

      <div className={styles["inputGender"]}>
        <span className={styles["headInputGender"]}>Gender</span>
        <div className={styles["radioInputGender"]}>
          <input
            className={styles.radioInput}
            id="radioInputMale"
            name="gender"
            type="radio"
            onChange={handleChange}
            value="male"
          ></input>
          <label className={styles["radio-label"]}>Male</label>
        </div>
        <div className={styles["radioInputGender"]}>
          <input
            className={styles.radioInput}
            id="radioInputFemale"
            name="gender"
            type="radio"
            onChange={handleChange}
            value="female"
          ></input>
          <label className={styles["radio-label"]}>Female</label>
        </div>
        <div className={styles["radioInputGender"]}>
          <input
            className={styles.radioInput}
            id="radioInputDiff"
            name="gender"
            type="radio"
            onChange={handleChange}
            value="other"
          ></input>
          <label className={styles["radio-label"]}>Other</label>
        </div>
      </div>
      {showMessage && <div className={styles["warning"]}>{message}</div>}
      <button type="submit" className={styles["submitSignUp"]}>
        Register
      </button>
      <span className={styles["hasAccount"]}>
        {`Already had an account?`}
        <Link className={styles["hasAccountLink"]} to={"/login"}>
          Sign In
        </Link>
      </span>
    </form>
  );
}
function SignUp() {
  return (
    <div className={styles["SignUp"]}>
      <h1 className={styles["headingSignUp"]}>Register</h1>
      <FormSignup />
    </div>
  );
}

export default SignUp;
