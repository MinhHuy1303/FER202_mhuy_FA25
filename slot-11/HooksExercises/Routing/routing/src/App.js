import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/san-pham" element={<Products />} />
        <Route path="/lien-he" element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App;
