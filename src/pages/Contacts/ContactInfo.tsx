import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editContact } from "../../redux/contactsSlice";
import styles from "./Contacts.module.scss";
import { motion } from "framer-motion";
import { RootState } from "../../redux/store";

type ContactInfoProps = {
  getEditingMode: (e: boolean) => void;
};

const ContactInfo: React.FC<ContactInfoProps> = ({ getEditingMode }) => {
  const dispatch = useDispatch();
  const [editButton, setEditButton] = useState(false);
  const [nameField, setNameField] = useState(false);
  const [newName, setNewName] = useState("");
  const [emailField, setEmailField] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [editingMode, setEditingMode] = useState(false);

  const contact = useSelector(
    (state: RootState) => state.contacts.selectedItem
  );

  useEffect(() => {
    getEditingMode(editingMode);
  }, [getEditingMode, editingMode]);

  const toggleEditingMode = () => {
    setEditButton(true);
    setNameField(true);
    setEmailField(true);
    setEditingMode(true);
    if (contact) {
      setNewName(contact.name);
      setNewEmail(contact.email);
    }
  };

  const validEditing =
    newName && newEmail && newName.length < 30 && newEmail.length < 25;

  const confirmEditing = () => {
    if (validEditing) {
      const editedContact = {
        name: newName,
        number: contact?.number,
        email: newEmail,
      };
      dispatch(editContact(editedContact));
      setEditButton(false);
      setNameField(false);
      setEmailField(false);
      setEditingMode(false);
      setNewName("");
      setNewEmail("");
    } else {
      alert(
        "There is an empty field or the data is too lengthy. Please, enter correct data."
      );
    }
  };

  if (!contact) {
    return (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={styles.chooseContact}
        >
          Choose or add contact...
        </motion.p>
    );
  }

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
      />
      <div className={styles.editButton}>
        {editButton ? (
          <span onClick={confirmEditing} className="material-symbols-outlined">
            done
          </span>
        ) : (
          <span
            onClick={toggleEditingMode}
            className="material-symbols-outlined"
          >
            edit
          </span>
        )}
      </div>
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
        <div className={styles.contactName}>
          <h1>Fullname</h1>
          {nameField ? (
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              type="text"
              className={styles.editInput}
            />
          ) : (
            <p>{contact.name}</p>
          )}
        </div>
        <div className={styles.contactNumber}>
          <h1>Number</h1>
          <p>{contact.number}</p>
        </div>
        <div className={styles.contactEmail}>
          <h1>Email</h1>
          {emailField ? (
            <input
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              type="text"
              className={styles.editInput}
            />
          ) : (
            <p>{contact.email}</p>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default ContactInfo;
