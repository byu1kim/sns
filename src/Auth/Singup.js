import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as cognito from "../cognito";

const Singup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");

  //username, email, first, last, id
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      setError("Password doesn't match");
    } else {
      try {
        // Create Cognito Account
        const user = await cognito.signUp({ username, email, password });
        const userId = user.userSub;

        // Store user data into DB
        const result = await fetch("https://6otj0lkpn2.execute-api.ca-central-1.amazonaws.com/users", {
          method: "POST",
          body: JSON.stringify({ id: userId, firstname, lastname, username, email }),
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => res.json());

        console.log(result);
        setError("Check your email");
        navigate(`/confirm?username=${username}`);
      } catch (e) {
        setError(e.message);
        console.log(e.message);
      }
    }
  };

  return (
    <section className="max-w-xl m-auto">
      <h1 className="text-center text-2xl font-bold text-emerald-500 mt-7">Sing Up</h1>

      <form onSubmit={handleSubmit} className="p-5 flex flex-col">
        <div className="flex flex-col rounded-lg p-1 m-2 shadow-sm border-gray-200 border bg-white">
          <label htmlFor="firstname" className="text-xs pl-1 text-gray-400">
            First Name
          </label>
          <input
            type="text"
            name="firstname"
            value={firstname}
            onChange={(e) => {
              setFirstname(e.target.value);
            }}
            required
            className="rounded-lg p-1 focus: outline-none focus: ring-0"
          />
        </div>

        <div className="flex flex-col rounded-lg p-1 m-2 shadow-sm border-gray-200 border bg-white">
          <label htmlFor="lastname" className="text-xs pl-1 text-gray-400">
            Last Name
          </label>
          <input
            type="text"
            name="lastname"
            value={lastname}
            onChange={(e) => {
              setLastname(e.target.value);
            }}
            required
            className="rounded-lg p-1 focus: outline-none focus: ring-0"
          />
        </div>

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
          <label htmlFor="email" className="text-xs pl-1 text-gray-400">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
            className="rounded-lg p-1 focus: outline-none focus: ring-0"
          />
        </div>

        <div className="flex flex-col rounded-lg p-1 m-2 shadow-sm border-gray-200 border bg-white">
          <label htmlFor="password" className="text-xs pl-1 text-gray-400">
            Password
          </label>
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            required
            className="rounded-lg p-1 focus: outline-none focus: ring-0"
          />
        </div>

        <div className="flex flex-col rounded-lg p-1 m-2 shadow-sm border-gray-200 border bg-white">
          <label htmlFor="passwordconfirm" className="text-xs pl-1 text-gray-400">
            Password confirmation
          </label>
          <input
            type="password"
            name="passwordconfirm"
            onChange={(e) => setPasswordConfirm(e.target.value)}
            required
            className="rounded-lg p-1 focus: outline-none focus: ring-0"
          />
        </div>

        <p className="text-red-500 p-2">{error}</p>
        <button type="submit" className="bg-emerald-500 text-white m-2 rounded-lg p-2 hover:bg-emerald-700">
          Sign Up
        </button>
      </form>
    </section>
  );
};

export default Singup;
