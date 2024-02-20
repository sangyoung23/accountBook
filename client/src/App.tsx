import React from "react";
import "App.css";

import { Route, Routes } from "react-router-dom";
import Register from "pages/Register";
import Login from "pages/Login";
import Home from "pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Register />} index />{" "}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;
