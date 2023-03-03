import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as cognito from "../cognito";

const Singup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      setError("Password doesn't match");
    } else {
      try {
        await cognito.signUp({ username, email, password });
        setError("Check your email");
        navigate(`/confirm?username=${username}`);
      } catch (e) {
        setError(e.message);
        console.log(e.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-5 flex flex-col mx-auto max-w-xl bg-gray-200">
      <label htmlFor="username">Name</label>
      <input
        type="text"
        name="username"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        required
      />

      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        required
      />

      <label htmlFor="password">Password</label>
      <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} required />

      <label htmlFor="passwordconfirm">Password confirmation</label>
      <input type="password" name="passwordconfirm" onChange={(e) => setPasswordConfirm(e.target.value)} required />

      <p className="text-red-500">{error}</p>
      <button type="submit" className="bg-rose-200 w-40 m-3 mx-auto hover:cursor-pointer hover:bg-rose-400">
        Submit
      </button>
    </form>
  );
};

export default Singup;
