import React from "react";
import { Home, Navbar, Footer } from "./components/exportComp";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-red-50">
      <header>
        <Navbar />
      </header>
      <ToastContainer />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
