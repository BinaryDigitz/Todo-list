import React from "react";
import { Home, Navbar, Footer, MyTasks, Profile, Login, ViewTasks, IsLoggedIn } from "./components/exportComp";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AddTask from "./pages/AddTask";

// ADD TASK : /api/tasks/add
// GET TASKS: /api/tasks/list
// GET TASK: /api/tasks/lists/taskId
// SIGN UP : /api/auth/sign-up
// SIGN IN: /api/auth/sign-in

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
          <Route path="/my-task/:taskId" element={<ViewTasks />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/is-logged-in" element={<IsLoggedIn path={'/login'} />} />
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
