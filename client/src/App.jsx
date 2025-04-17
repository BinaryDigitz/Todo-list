import React from "react";
import { Home, Navbar, Footer, MyTasks, Profile, Login } from "./components/exportComp";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AddTask from "./pages/AddTask";

function App() {
  return (
    <div className="bg-gradient-to-b from-red-50 to-purple-100 ">
      <header>
        <Navbar />
      </header>
      <ToastContainer />
      <main className="min-h-[100vh] px-14">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-task" element={<AddTask/>} />
          <Route path="/my-task" element={<MyTasks />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
