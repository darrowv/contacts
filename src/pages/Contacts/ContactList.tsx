
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ContactType,
  removeContact,
  setSelected,
} from "../../redux/contactsSlice";
import styles from "./Contacts.module.scss";
//@ts-ignore
import debounce from 'lodash.debounce';
import { motion, AnimatePresence } from "framer-motion";
import { RootState } from "../../redux/store";
import AddingWindow from "./AddingWindow";


type ContactListProps = {
  editingMode: boolean;
};

const ContactList: React.FC<ContactListProps> = ({ editingMode }) => {
  const dispatch = useDispatch();
  const [addingWindow, setAddingWindow] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const contacts = useSelector((state: RootState) => state.contacts.items);
  const contact = useSelector(
    (state: RootState) => state.contacts.selectedItem
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
  }

  //debouncing our search request
  const debouncedResults = useMemo(() => debounce(handleChange, 300), []);
  useEffect(() => () => debouncedResults.cancel() );

  //filtering array of contacts in order to enable search feature
  const filteredContacts = contacts.filter((item: ContactType) =>
    item.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const toggleSelectedItem = (item: ContactType) => {
    if (!editingMode) {
      dispatch(setSelected(item));
    } else {
      alert("You have to complete editing");
    }
  };

  const onClickRemove = (
    number: string,
    event: React.MouseEvent<HTMLSpanElement>
  ) => {
    if (!editingMode) {
      dispatch(removeContact(number));
      event.stopPropagation();
    }
  };

  if (addingWindow) {
    return <AddingWindow setAddingWindow={setAddingWindow} />;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ rotateY: 90, opacity: 0 }}
        animate={{ rotateY: 0, opacity: 1 }}
        exit={{ rotateY: 90, opacity: 0 }}
        transition={{ ease: "easeInOut", duration: 0.7 }}
        className={styles.contactList}
      >
        <div className={styles.listTop}>
          <input
            onChange={debouncedResults}
            className={styles.searchContact}
            type="text"
          />
          <button
            onClick={() => setAddingWindow(true)}
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
                  initial={{ x: 300 }}
                  animate={{ x: 0 }}
                  exit={{ x: -300, opacity: 0 }}
                  transition={{ ease: "easeInOut", duration: 0.3 }}
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
                    onClick={(event) => onClickRemove(item.number, event)}
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
    </AnimatePresence>
  );
};

export default ContactList;
