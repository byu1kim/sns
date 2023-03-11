import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as cognito from "../Cognito.js";
import jwtDecode from "jwt-decode";
import AddComment from "../components/AddComment";

const PostDetail = () => {
  const [post, setPost] = useState();
  const [token, setToken] = useState();
  const [comments, setComments] = useState([]);
  const [error, setError] = useState("");

  let { id } = useParams();
  let decoded = token ? jwtDecode(token) : "";

  // Loading both posting and comments
  useEffect(() => {
    async function getPosts() {
      const a = await cognito.getAccessToken();
      if (a) {
        setToken(a);
      }

      Promise.all([
        fetch(`https://6otj0lkpn2.execute-api.ca-central-1.amazonaws.com/post/${id}`),
        fetch(`https://6otj0lkpn2.execute-api.ca-central-1.amazonaws.com/comments/${id}`),
      ])
        .then(([resPost, resComments]) => Promise.all([resPost.json(), resComments.json()]))
        .then(([dataPost, dataComments]) => {
          setPost(dataPost);
          setComments(dataComments);
        });
    }
    getPosts();
  }, [comments, id, token]);

  const handleCommentDelete = async (commentId) => {
    console.log(commentId);
    try {
      const del = await fetch(`https://6otj0lkpn2.execute-api.ca-central-1.amazonaws.com/comments/${commentId}`, {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      }).then((res) => res.json());

      if (del) {
        comments.shift();
        setComments(comments);
      }
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div className="bg-gray-200 m-auto max-w-2xl">
      {!!error && error}
      {!!post ? (
        <ul className="bg-white p-5 m-5 rounded-md shadow-md">
          <li className="flex items-center mb-5">
            <div className="rounded-full bg-gray-300 w-12 h-12"></div>
            <div className="pl-5">
              <div className="font-bold">
                {post.firstname} {post.lastname}
              </div>
              <div className="text-xs text-gray-500">{post.created?.split("T")[0]}</div>
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
                        <button onClick={() => handleCommentDelete(item.cid)}>
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
            <AddComment token={token} id={id} comments={comments} setComments={setComments} />
          </li>
        </ul>
      ) : (
        "Loading"
      )}
    </div>
  );
};

export default PostDetail;
