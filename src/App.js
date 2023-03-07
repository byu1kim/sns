import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./Components/Nav";
import Home from "./Routes/Home";
import Profile from "./Routes/Profile";
import MyPosts from "./Routes/MyPosts";
import Login from "./Auth/Login";
import Signup from "./Auth/Singup";
import ConfirmUser from "./Auth/ConfirmUser";
import ForgetPassword from "./Auth/ForgetPassword";
import ResetPassword from "./Auth/ResetPassword";
import PostDetail from "./Routes/PostDetail.js";
import Footer from "./Components/Footer";

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
