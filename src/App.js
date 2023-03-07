import { useEffect, useState, useContext } from "react";
import * as cognito from "./cognito.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./Components/Nav";
import Home from "./Routes/Home";
import Profile from "./Routes/Profile";
import Create from "./Routes/Create";
import MyPosts from "./Routes/MyPosts";
import MyComments from "./Routes/MyComments";
import Login from "./Auth/Login";
import Signup from "./Auth/Singup";
import ConfirmUser from "./Auth/ConfirmUser";
import ForgetPassword from "./Auth/ForgetPassword";
import ResetPassword from "./Auth/ResetPassword";
import PostDetail from "./Routes/PostDetail.js";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/singup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route path="/:id" element={<PostDetail />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create" element={<Create />} />
        <Route path="/myposts" element={<MyPosts />} />
        <Route path="/mycomments" element={<MyComments />} />
        <Route path="/confirm" element={<ConfirmUser />} />
        <Route path="/forget" element={<ForgetPassword />} />
        <Route path="/reset" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
