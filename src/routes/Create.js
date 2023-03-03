import { useState } from "react";
import * as cognito from "../cognito";
const Create = () => {
  const [content, setContent] = useState("");
  const token = cognito.getAccessToken();
  const userId = "111";
  const newData = "oho";

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(content);

    const result = await fetch("https://6otj0lkpn2.execute-api.ca-central-1.amazonaws.com/posts", {
      method: "POST",
      body: JSON.stringify({ content }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    console.log(result);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
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
