import { createSlice } from "@reduxjs/toolkit";
import { getContactsFromLS } from "../utils/getContactsFromLS";

export type ContactType = {
  name: string;
  number: string;
  email: string;
};

interface StateType {
  items: ContactType[];
  selectedItem: ContactType | null;
}

const initialState: StateType = {
  items: getContactsFromLS(),
  selectedItem: null,
};

export const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    setContacts(state, action) {
      state.items = action.payload;
    },
    setSelected(state, action) {
      state.selectedItem = action.payload;
    },
    addContact(state, action) {
      const findItem = state.items.find(
        (item: ContactType) => action.payload.number === item.number
      );

      if (!findItem) {
        state.items.unshift({ ...action.payload });
        state.selectedItem = action.payload;
      } else if (findItem) {
        alert("You already have contact with the same number!");
      }
    },
    removeContact(state, action) {
      state.items = state.items.filter(
        (item: ContactType) => item.number !== action.payload
      );

      state.selectedItem = null;
    },
    editContact(state, action) {
      state.items.forEach((item: ContactType) => {
        if (item.number === action.payload.number) {
          item.name = action.payload.name;
          item.email = action.payload.email;
        }
      });

      state.selectedItem = action.payload;
    },
    cleanItems(state) {
      state.items = []
      state.selectedItem = null
    }
  },
});

export const {
  setContacts,
  setSelected,
  addContact,
  removeContact,
  editContact,
  cleanItems
} = contactsSlice.actions;

export default contactsSlice.reducer;
