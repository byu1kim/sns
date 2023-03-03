import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../cognito";

const ForgetPassword = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword({ username });
      navigate("/reset");
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

      <p className="text-red-500">{!!error && error}</p>
      <button type="submit" className="bg-rose-200 w-40 m-3 mx-auto hover:cursor-pointer hover:bg-rose-400">
        Send Code
      </button>
    </form>
  );
};

export default ForgetPassword;
