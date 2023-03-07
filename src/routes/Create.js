import { useState } from "react";
import * as cognito from "../cognito";
const Create = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const userId = "111";
  const newData = "oho";

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(title, content);

    const token = await cognito.getAccessToken();
    console.log(token);
    const result = await fetch("https://6otj0lkpn2.execute-api.ca-central-1.amazonaws.com/posts", {
      method: "POST",
      body: JSON.stringify({ title, content }),
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then((res) => res.json());
    console.log(result);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title" />
        <input
          type="text"
          className="border-blue-500 border-2"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="content" />
        <textarea
          className="border-blue-400 border-2"
          name="content"
          onChange={(e) => setContent(e.target.value)}
          value={content}
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Create;
