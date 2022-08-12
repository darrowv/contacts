import { configureStore } from "@reduxjs/toolkit";
import contacts from "./contactsSlice";

export const store = configureStore({
  reducer: { contacts },
});

export type RootState = ReturnType<typeof store.getState>;
