import { useEffect, useState } from "react";
import ContactInfo from "./ContactInfo";
import ContactList from "./ContactList";
import styles from "./Contacts.module.scss";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { cleanItems } from "../../redux/contactsSlice";
import { RootState } from "../../redux/store";

const Contacts = () => {
  const dispatch = useDispatch();
  const [editingMode, setEditingMode] = useState(false);

  const contacts = useSelector((state: RootState) => state.contacts.items);

  useEffect(() => {
    const json = JSON.stringify(contacts);
    localStorage.setItem("contacts", json);
  }, [contacts]);

  const getEditingMode = (mode: boolean) => {
    setEditingMode(mode);
  };

  const onClickClear = () => {
    const result = window.confirm(
      "All contacts will be lost. Are you sure?"
    );
    if (result) {
      localStorage.clear();
      dispatch(cleanItems());
    }
  };

  return (
    <motion.div
      className={styles.root}
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { duration: 0.5 } }}
    >
      <div className={styles.container}>
        <ContactList editingMode={editingMode} />
        <ContactInfo getEditingMode={getEditingMode} />
      </div>
        <button onClick={onClickClear} className={styles.logoutBtn}>
          clear data
        </button>
    </motion.div>
  );
};

export default Contacts;
