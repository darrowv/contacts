import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addContact,
  ContactType,
  removeContact,
  setSelected,
} from "../../redux/contactsSlice";
import styles from "./Contacts.module.scss";
import { motion, AnimatePresence } from "framer-motion";
import { RootState } from "../../redux/store";

type ContactListProps = {
  editingMode: boolean;
};

const ContactList: React.FC<ContactListProps> = ({ editingMode }) => {
  const dispatch = useDispatch();
  const [window, setWindow] = useState(false);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const contacts = useSelector((state: RootState) => state.contacts.items);
  const contact = useSelector(
    (state: RootState) => state.contacts.selectedItem
  );

  const toggleSelectedItem = (item: ContactType) => {
    if (!editingMode) {
      dispatch(setSelected(item));
    } else {
      alert("You have to complete editing");
    }
  };

  const onClickCancel = () => {
    setWindow(!window);
    setName("");
    setNumber("");
    setEmail("");
  };

  const onClickAdd = () => {
    if (
      name &&
      number &&
      email &&
      name.length < 30 &&
      number.length < 25 &&
      email.length < 25
    ) {
      const contact = { name, number, email };
      dispatch(addContact(contact));
      setWindow(!window);
      setName("");
      setNumber("");
      setEmail("");
      setSearchValue("");
    } else {
      alert(
        "There is an empty field or the data is too lengthy. Please, enter correct data."
      );
    }
  };

  const removeItem = (
    number: string,
    event: React.MouseEvent<HTMLSpanElement>
  ) => {
    if (!editingMode) {
      dispatch(removeContact(number));
      event.stopPropagation();
    }
  };

  const filteredContacts = contacts.filter((item: ContactType) =>
    item.name.toUpperCase().includes(searchValue.toUpperCase())
  );

  if (window) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ ease: "easeInOut", duration: 0.3 }}
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
            <button
              className={styles.cancelBtn}
              onClick={() => onClickCancel()}
            >
              <span>cancel</span>
            </button>
            <button className={styles.addBtn} onClick={() => onClickAdd()}>
              <span>add</span>
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={styles.contactList}
    >
      <div className={styles.listTop}>
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className={styles.searchContact}
          type="text"
        />
        <button
          onClick={() => setWindow(!window)}
          className={styles.addContact}
        >
          +
        </button>
      </div>
      <div className={styles.listContent}>
        <AnimatePresence>
          {filteredContacts.map((item: ContactType) => {
            return (
              <motion.div
                initial={{ x: -500 }}
                animate={{ x: 0 }}
                exit={{ x: 500 }}
                transition={{ ease: "easeOut", duration: 0.2 }}
                onClick={() => toggleSelectedItem(item)}
                key={item.number}
                className={styles.contactItem}
                style={
                  item.number === contact?.number
                    ? { backgroundColor: "rgba(150, 190, 215, 0.5)" }
                    : undefined
                }
              >
                <span className={styles.itemName}>{item.name}</span>
                <span
                  onClick={(event) => removeItem(item.number, event)}
                  className={styles.removeContact}
                >
                  ×
                </span>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ContactList;
