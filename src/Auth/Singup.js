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
        //navigate(`/confirm?username=${username}`);
      } catch (e) {
        setError(e.message);
        console.log(e.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-5 flex flex-col mx-auto max-w-xl bg-gray-200">
      <label htmlFor="firstname">First Name</label>
      <input
        type="text"
        name="firstname"
        value={firstname}
        onChange={(e) => {
          setFirstname(e.target.value);
        }}
        required
      />

      <label htmlFor="lastname">Last Name</label>
      <input
        type="text"
        name="lastname"
        value={lastname}
        onChange={(e) => {
          setLastname(e.target.value);
        }}
        required
      />

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
