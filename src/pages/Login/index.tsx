import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Login.module.scss";
import { motion } from "framer-motion";

const Login: React.FC = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  return (
    <motion.div
      className={styles.root}
      initial={{ width: 0 }}
      animate={{ width: "100vw" }}
      exit={{ x: window.innerWidth, transition: { duration: 0.5 } }}
    >
      <div className={styles.loginWindow}>
        <h1 className={styles.title}>AUTHORIZATION</h1>
        <div className={styles.emailInput}>
          <p>Login:</p>
          <input
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            type="text"
          />
        </div>
        <div className={styles.passwordInput}>
          <p>Password:</p>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </div>
        <Link to={"/contacts"}>
          <button className={styles.loginButton}>SUBMIT</button>
        </Link>
      </div>
    </motion.div>
  );
};

export default Login;
