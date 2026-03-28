import React, { useState } from "react";
import loginImage from "../../assets/login.png";
import logo from "../../assets/logos/Group.svg";
import styles from "./login.module.scss";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.SubmitEvent) => {
    e.preventDefault();

    navigate("/users");
  };

  return (
    <div className={styles.page}>
      <div className={styles.logo}>
        <img src={logo} alt="Logo" />
      </div>
      <div className={styles.container}>
        {/* Left side: image */}
        <div className={styles.left}>
          <img src={loginImage} alt="Login" className={styles.loginImage} />
        </div>

        {/* Right side: form */}
        <div className={styles.right}>
          <form className={styles.form} onSubmit={handleLogin}>
            <div className={styles.loginheader}>Welcome!</div>
            <div className={styles.subtitle}>Enter details to login.</div>

            <div className={styles.formcontainer}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />

              <div className={styles.passwordField}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />

                <span
                  className={styles.toggle}
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? "hide" : "show"}
                </span>
              </div>

              <div className={styles.forgot}>Forgot Password?</div>
            </div>

            <button type="submit">Log in</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
