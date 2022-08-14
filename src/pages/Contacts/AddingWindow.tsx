import styles from "./Contacts.module.scss";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { addContact } from "../../redux/contactsSlice";
import { useDispatch } from "react-redux";

type AddingWindowProps = {
  setAddingWindow: (e: boolean) => void;
};

const AddingWindow: React.FC<AddingWindowProps> = ({ setAddingWindow }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");

  const reset = () => {
    setAddingWindow(false);
    setName("");
    setNumber("");
    setEmail("");
  };

  const validContact =
    name &&
    number &&
    email &&
    name.length < 30 &&
    number.length < 25 &&
    email.length < 25;

  const onClickAdd = () => {
    if (validContact) {
      const contact = { name, number, email };
      dispatch(addContact(contact));
      reset();
    } else {
      alert(
        "There is an empty field or the data is too lengthy. Please, enter correct data."
      );
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ rotateY: 90, opacity: 0 }}
        animate={{ rotateY: 0, opacity: 1 }}
        exit={{ rotateY: 90, opacity: 0 }}
        transition={{ ease: "easeInOut", duration: 0.7 }}
        className={styles.addingWindow}
      >
        <h2>New contact</h2>
        <div className={styles.dataDivs}>
          <span>Name:</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
          />
        </div>
        <div className={styles.dataDivs}>
          <span>Number:</span>
          <input
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            type="text"
          />
        </div>
        <div className={styles.dataDivs}>
          <span>Email:</span>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
        </div>
        <div className={styles.windowButtons}>
          <button className={styles.cancelBtn} onClick={() => reset()}>
            <span>cancel</span>
          </button>
          <button className={styles.addBtn} onClick={() => onClickAdd()}>
            <span>add</span>
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AddingWindow;
