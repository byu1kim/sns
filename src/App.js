import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Navigation.js";
import Home from "./routes/Home.js";
import Profile from "./routes/Profile.js";
import MyPosts from "./routes/MyPosts.js";
import Login from "./authentication/Login.js";
import Signup from "./authentication/Singup.js";
import ConfirmUser from "./authentication/ConfirmUser.js";
import ForgetPassword from "./authentication/ForgetPassword.js";
import ResetPassword from "./authentication/ResetPassword.js";
import PostDetail from "./routes/PostDetail.js";
import Footer from "./components/Footer.js";

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
