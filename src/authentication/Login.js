import { useState, useContext } from "react";
import { useNavigate, Link, redirect } from "react-router-dom";
import * as cognito from "../Cognito.js";
import { AuthContext } from "./AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);

  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginUser = await cognito.signIn({ username, password });
      setUser(loginUser);
      navigate("/profile");
    } catch (e) {
      setError(e.message);
    }
  };
  return (
    <section className="max-w-xl m-auto">
      <h1 className="text-center text-2xl font-bold text-emerald-500 mt-7">Log In</h1>
      <form onSubmit={handleSubmit} className="p-5 flex flex-col">
        <div className="flex flex-col rounded-lg p-1 m-2 shadow-sm border-gray-200 border bg-white">
          <label htmlFor="username" className="text-xs pl-1 text-gray-400">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            required
            className="rounded-lg p-1 focus: outline-none focus: ring-0"
          />
        </div>
        <div className="flex flex-col p-1 rounded-lg m-2 shadow-sm border-gray-200 border bg-white">
          <label htmlFor="password" className="text-xs pl-1 text-gray-400">
            Passsword
          </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
            className="rounded-lg p-1 focus: outline-none , focus: ring-0 "
          />
        </div>
        <p className="text-red-500">{!!error && error}</p>
        <div className="text-center mb-5 text-gray-500">
          Forgot your password?{" "}
          <Link to="/forget" className="text-emerald-500 font-bold hover:text-emerald-700">
            Click Here
          </Link>
        </div>
        <div className="text-center mb-5 text-gray-500">
          Reset your password?{" "}
          <Link to="/reset" className="text-emerald-500 font-bold hover:text-emerald-700">
            Click Here
          </Link>
        </div>
        <button type="submit" className="bg-emerald-500 text-white m-2 rounded-lg p-2 hover:bg-emerald-700">
          Log In
        </button>
        <div className="text-center mb-5 text-gray-500">
          Don't have an account?{" "}
          <Link to="/signup" className="text-emerald-500 font-bold hover:text-emerald-700">
            Sign up
          </Link>
        </div>
      </form>
    </section>
  );
};

export default Login;
