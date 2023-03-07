import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as cognito from "../Cognito.js";
import jwtDecode from "jwt-decode";

const PostDetail = () => {
  const [post, setPost] = useState();
  const [token, setToken] = useState();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  let { id } = useParams();
  let decoded = token ? jwtDecode(token) : "";
  useEffect(() => {
    async function getPosts() {
      const a = await cognito.getAccessToken();
      setToken(a);

      Promise.all([
        fetch(`https://6otj0lkpn2.execute-api.ca-central-1.amazonaws.com/${id}`),
        fetch(`https://6otj0lkpn2.execute-api.ca-central-1.amazonaws.com/comments/${id}`),
      ])
        .then(([resPost, resComments]) => Promise.all([resPost.json(), resComments.json()]))
        .then(([dataPost, dataComments]) => {
          setPost(dataPost);
          setComments(dataComments);
        });
    }
    getPosts();
  }, []);

  const handleSubmit = async (e) => {
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
      console.log(result);
      //setPosts(result);
    } catch {
      //setPosts();
    }
  };
  return (
    <div className="bg-gray-200 m-auto max-w-2xl">
      {!!post ? (
        <ul className="bg-white p-5 m-5 rounded-md shadow-md">
          <li className="flex items-center mb-5">
            <div className="rounded-full bg-gray-300 w-12 h-12"></div>
            <div className="pl-5">
              <div className="font-bold">
                {post.firstname} {post.lastname}
              </div>
              <div className="text-xs text-gray-500">{post.created.split("T")[0]}</div>
            </div>
          </li>

          <li className="font-bold px-2">{post.title}</li>
          <li className="px-2 pb-5">{post.content}</li>

          <hr />
          <li className="flex justify-between py-4 text-lg text-gray-500">
            <button className="flex justify-center items-center w-full hover:text-emerald-500">
              <i className="fa-regular fa-heart pr-2"></i>Like
            </button>
            <button className="flex justify-center items-center w-full hover:text-emerald-500">
              <i className="fa-regular fa-comment pr-2"></i>
              {comments && comments.length} Comment
            </button>
          </li>
          <hr />
          <li>
            {comments
              ? comments.map((item, index) => (
                  <ul key={index} className="flex py-3 text-sm">
                    <li className="rounded-full bg-gray-300 w-12 h-12 mr-2"></li>

                    <li className="bg-gray-200 rounded-lg px-3 py-1">
                      <div className="font-bold">
                        {item.firstname} {item.lastname}
                      </div>
                      <div>{item.content}</div>
                      <div className="text-xs">{item.created.split("T")[0]}</div>
                      {post.user_id === decoded.sub ? (
                        <button>
                          <i className="fa-regular fa-trash-can"></i>
                        </button>
                      ) : (
                        ""
                      )}
                    </li>
                  </ul>
                ))
              : ""}
          </li>

          <li className="pt-2">
            <form className="flex items-center" onSubmit={handleSubmit}>
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
                Leave
              </button>
            </form>
          </li>
        </ul>
      ) : (
        "Loading"
      )}
    </div>
  );
};

export default PostDetail;
