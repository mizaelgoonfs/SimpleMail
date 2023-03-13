import React from "react";

import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/Login/login";
import Message from "./pages/Message/message";
import Messages from "./pages/Messages/messages";
import New from "./pages/New/new";
import Sent from "./pages/Sent/sent";
import Reply from './pages/Reply/reply';
import Forward from './pages/Forward/forward';

const AppLayout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

function App() {

  return (
    <Router>
      <Routes>

        <Route element={<AppLayout />}>
          <Route path="/" element={<Login />} />
          <Route path="/message/:id" element={<Message />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/new" element={<New />} />
          <Route path="/sent" element={<Sent />} />
          <Route path="/reply-message/:id" element={<Reply />} />
          <Route path="/forward-message/:id" element={<Forward />} />
        </Route>
        
      </Routes>
    </Router>

  );
}

export default App;
