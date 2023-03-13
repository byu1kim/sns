import { useState } from "react";

const Comment = ({ token, id, comments, setComments }) => {
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const commentSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await fetch("https://6otj0lkpn2.execute-api.ca-central-1.amazonaws.com/comments", {
        method: "POST",
        body: JSON.stringify({ content: comment, postId: id }),
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }).then((res) => res.json());

      if (result) {
        setComment("");
        setComments([result.rows[0], ...comments]);
      }
    } catch (err) {
      setError(err);
    }
  };
  return (
    <>
      <p>{!!error && error}</p>
      <form className="flex items-center" onSubmit={commentSubmit}>
        <div className="rounded-full bg-gray-300 w-10 h-10 p-5"></div>
        <label htmlFor="comment"></label>
        <input
          type="text"
          name="comment"
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          className="shadow-md border border-gray-200 rounded-lg w-full focus: outline-emerald-500 m-2 p-2"
        />
        <button type="submit" className="bg-gray-300 text-white rounded-lg px-4 py-2 hover:bg-emerald-500">
          Add
        </button>
      </form>
    </>
  );
};

export default Comment;
