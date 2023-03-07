import { useState } from "react";
import * as cognito from "../Cognito.js";

function ConfirmUser() {
  const queryParams = new URLSearchParams(window.location.search);
  const query = queryParams.get("username");

  const [username, setUsername] = useState(query ? query : "");
  const [code, setCode] = useState("");

  const handleSubmit = async () => {
    await cognito.confirmUser({ username, code });
  };

  return (
    <form onSubmit={handleSubmit} className="p-5 flex flex-col mx-auto max-w-xl bg-gray-200">
      <label htmlFor="username">username</label>
      <input
        type="text"
        name="username"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        required
      />

      <label htmlFor="code">code</label>
      <input
        type="text"
        name="code"
        value={code}
        onChange={(e) => {
          setCode(e.target.value);
        }}
        required
      />
      <button type="submit" className="bg-rose-200 w-40 m-3 mx-auto hover:cursor-pointer hover:bg-rose-400">
        Submit
      </button>
    </form>
  );
}

export default ConfirmUser;
