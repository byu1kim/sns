import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signIn } from "../cognito";
import { AuthContext } from "../Auth/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);

  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signIn({ username, password });
      setUser(user);
      navigate("/profile");
    } catch (e) {
      setError(e.message);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="p-5 flex flex-col mx-auto max-w-xl bg-gray-200">
      <label htmlFor="username">Username</label>
      <input
        type="text"
        name="username"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        required
      />

      <label htmlFor="password">Passsword</label>
      <input
        type="password"
        name="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        required
      />
      <p className="text-red-500">{!!error && error}</p>
      <Link to="/forget">Forgot password?</Link>
      <button type="submit" className="bg-rose-200 w-40 m-3 mx-auto hover:cursor-pointer hover:bg-rose-400">
        Submit
      </button>
    </form>
  );
};

export default Login;
