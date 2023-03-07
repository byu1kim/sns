import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../Cognito";

const ResetPassword = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      setError("Password does not match!");
    } else {
      try {
        await resetPassword({ username, code, newPassword: password });
        navigate("/login");
      } catch (e) {
        setError(e.message);
      }
    }
  };

  return (
    <section className="max-w-xl m-auto">
      <h1 className="text-center text-2xl font-bold text-emerald-500 mt-7">Reset Password</h1>

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

        <div className="flex flex-col rounded-lg p-1 m-2 shadow-sm border-gray-200 border bg-white">
          <label htmlFor="code" className="text-xs pl-1 text-gray-400">
            Code
          </label>
          <input
            type="code"
            name="code"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
            }}
            required
            className="rounded-lg p-1 focus: outline-none focus: ring-0"
          />
        </div>

        <div className="flex flex-col rounded-lg p-1 m-2 shadow-sm border-gray-200 border bg-white">
          <label htmlFor="password" className="text-xs pl-1 text-gray-400">
            New Password
          </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
            className="rounded-lg p-1 focus: outline-none focus: ring-0"
          />
        </div>

        <div className="flex flex-col rounded-lg p-1 m-2 shadow-sm border-gray-200 border bg-white">
          <label htmlFor="passwordconfirm" className="text-xs pl-1 text-gray-400">
            Confirm Password
          </label>
          <input
            type="password"
            name="passwordconfirm"
            value={passwordConfirm}
            onChange={(e) => {
              setPasswordConfirm(e.target.value);
            }}
            required
            className="rounded-lg p-1 focus: outline-none focus: ring-0"
          />
        </div>

        <p className="text-red-500">{!!error && error}</p>
        <button type="submit" className="bg-emerald-500 text-white m-2 rounded-lg p-2 hover:bg-emerald-700">
          Reset Password
        </button>
      </form>
    </section>
  );
};

export default ResetPassword;
