import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./Components/Nav.js";
import Home from "./Routes/Home.js";
import Profile from "./Routes/Profile.js";
import MyPosts from "./Routes/MyPosts.js";
import Login from "./Auth/Login.js";
import Signup from "./Auth/Singup.js";
import ConfirmUser from "./Auth/ConfirmUser.js";
import ForgetPassword from "./Auth/ForgetPassword.js";
import ResetPassword from "./Auth/ResetPassword.js";
import PostDetail from "./Routes/PostDetail.js";
import Footer from "./Components/Footer.js";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/:id" element={<PostDetail />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/myposts" element={<MyPosts />} />
        <Route path="/confirm" element={<ConfirmUser />} />
        <Route path="/forget" element={<ForgetPassword />} />
        <Route path="/reset" element={<ResetPassword />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
