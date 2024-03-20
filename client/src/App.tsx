import React from "react";
import "App.css";

import { Route, Routes } from "react-router-dom";
import Register from "pages/Register";
import Login from "pages/Login";
import Home from "pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} index />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
