import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../Cognito.js";

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
    <section className="max-w-xl m-auto">
      <h1 className="text-center text-2xl font-bold text-emerald-500 mt-7">Forgot Password</h1>
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

        <p className="text-red-500">{!!error && error}</p>
        <button type="submit" className="bg-emerald-500 text-white m-2 rounded-lg p-2 hover:bg-emerald-700">
          Send Code
        </button>
      </form>
    </section>
  );
};

export default ForgetPassword;
