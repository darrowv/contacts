import React from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.scss";
import { motion } from "framer-motion";

const Home: React.FC = () => {
  return (
    <motion.div
      className={styles.root}
      initial={{ width: 0 }}
      animate={{ width: "100vw" }}
      exit={{ x: window.innerWidth, transition: { duration: 0.5 } }}
    >
      <Link to={"/login"}>
        <button>LOGIN</button>
      </Link>
    </motion.div>
  );
};

export default Home;
