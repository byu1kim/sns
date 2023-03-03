import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../cognito";

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

      <label htmlFor="code">Code</label>
      <input
        type="code"
        name="code"
        value={code}
        onChange={(e) => {
          setCode(e.target.value);
        }}
        required
      />

      <label htmlFor="password">New Password</label>
      <input
        type="password"
        name="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        required
      />

      <label htmlFor="passwordconfirm">Confirm Password</label>
      <input
        type="password"
        name="passwordconfirm"
        value={passwordConfirm}
        onChange={(e) => {
          setPasswordConfirm(e.target.value);
        }}
        required
      />

      <p className="text-red-500">{!!error && error}</p>
      <button type="submit" className="bg-rose-200 w-40 m-3 mx-auto hover:cursor-pointer hover:bg-rose-400">
        Reset Password
      </button>
    </form>
  );
};

export default ResetPassword;
