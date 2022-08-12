import { Route, Routes, useLocation } from "react-router-dom";
import Contacts from "./pages/Contacts";
import Home from "./pages/Home";
import Login from "./pages/Login";

import { AnimatePresence } from "framer-motion";
import "./app.scss";

const App = () => {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/contacts"
          element={<Contacts />}
        />
      </Routes>
    </AnimatePresence>
  );
};

export default App;
