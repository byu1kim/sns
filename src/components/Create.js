import { useState } from "react";
import * as cognito from "../Cognito";
const Create = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Receive Token from Cognito
    const token = await cognito.getAccessToken();

    // Send data to the Server
    await fetch("https://6otj0lkpn2.execute-api.ca-central-1.amazonaws.com/posts", {
      method: "POST",
      body: JSON.stringify({ title, content }),
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then((res) => res.json());
  };

  return (
    <div className="bg-gray-200 ">
      <form onSubmit={handleSubmit} className="flex flex-col bg-white p-5 m-5 rounded-md shadow-md">
        <label htmlFor="title"></label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
          className="focus: outline-emerald-500 m-1 p-1"
        />

        <label htmlFor="content"></label>
        <textarea
          name="content"
          onChange={(e) => setContent(e.target.value)}
          value={content}
          placeholder="What's up today?"
          required
          className="focus: outline-emerald-500 m-1 p-1 h-32"
        ></textarea>
        <button
          type="submit"
          className="bg-gray-300 text-gray-700 m-2 rounded-lg p-2 hover:bg-emerald-500 hover:text-white"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default Create;
