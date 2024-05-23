import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import accountApi from "../../api/modules/account.api.js";
import { useAuth } from "../../hooks/AuthContext.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function FormLogin({ onLoginSuccess }) {
  // console.log("re-render login");
  const [showMess, setShowMess] = useState(false);
  const navigate = useNavigate();
  const { handleLogin } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      email: formData.email,
      password: formData.password,
    };
    // const username = data.email.substring(0, data.email.indexOf('@'));
    accountApi.login(data).then((res) => {
      console.log(res);
      if (!res.success) {
        setShowMess(true);
      } else {
        localStorage.setItem("token", res.token);
        handleLogin(res.user);

        if (typeof onLoginSuccess === "function") {
          onLoginSuccess();
        } else {
          console.log("not function");
        }

        navigate("/");
        toast.success("Log in successfully");
      }
    });
  };

  const handleChange = (event) => {
    setShowMess(false);
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form className={styles["formGroup"]} onSubmit={handleSubmit}>
      <div className={styles["formInput"]}>
        <span className={styles["headInput"]}>Email</span>
        <input
          type={"email"}
          name={"email"}
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
          name={"password"}
          className={styles["inputData"]}
          placeholder="Enter your password"
          onChange={handleChange}
          required
        ></input>
      </div>
      {showMess && (
        <span className={styles["login-status"]}>
          The e-mail address or password you entered was incorrect.Please try
          again.
        </span>
      )}
      <div className={styles["footerLogin"]}>
        <Link className={styles["forgotPassword"]} to={"/reset-password"}>
          Forgot your password?
        </Link>
        <button type="submit" className={styles["submitLogin"]}>
          Log in
        </button>
        <span className={styles["hasAccount"]}>
          Create a new account
          <Link className={styles["hasAccountLink"]} to={"/signup"}>
            Register
          </Link>
        </span>
      </div>
    </form>
  );
}

const Login = () => (
  <div className={styles["Login"]}>
    <h1 className={styles["headingLogin"]}>Log In</h1>
    <FormLogin />
  </div>
);

export default Login;
