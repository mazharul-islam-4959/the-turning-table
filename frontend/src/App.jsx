import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Chatbot from "./components/chatbot/chatbot"; // ✅ THIS chatbot
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import Navbar from "./components/Navbar/Navbar";
import ReviewTemplate from "./components/Review/ReviewTemplate";
import Cart from "./pages/Cart/Cart";
import Home from "./pages/Home/Home";
import MyOrders from "./pages/MyOrders/MyOrders";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Verify from "./pages/Verify/Verify";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [search, setSearch] = useState("");
  
  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}

      <div className="app">
        <Navbar
          setShowLogin={setShowLogin}
          search={search}
          setSearch={setSearch}
        />

        <Routes>
          <Route path="/" element={<Home search={search} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/Verify" element={<Verify />} />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/reviews" element={<ReviewTemplate />} />
        </Routes>
      </div>
      <Chatbot />
      <Footer />
    </>
  );
};

export default App;
