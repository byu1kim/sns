import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as cognito from "../Cognito.js";
import jwtDecode from "jwt-decode";

const MyPosts = () => {
  const [posts, setPosts] = useState();
  const [token, setToken] = useState("");

  useEffect(() => {
    const getMyPosts = async () => {
      let newtoken = await cognito.getAccessToken();
      setToken(newtoken);
      let decoded = token ? jwtDecode(token) : "";

      const userId = decoded?.sub;
      console.log(userId);

      if (token) {
        try {
          const result = await fetch(`https://6otj0lkpn2.execute-api.ca-central-1.amazonaws.com/post`, {
            method: "GET",
            headers: {
              Authorization: token,
            },
          }).then((res) => res.json());

          setPosts(result);
        } catch (err) {
          setPosts();
        }
      }
    };
    getMyPosts();
  }, [token]);

  return (
    <div className="max-w-xl m-auto">
      <h1 className="text-center text-2xl font-bold text-emerald-500 mt-7">My Posts</h1>

      {!!posts ? (
        posts.map((post, index) => (
          <ul key={index} className="bg-white p-5 m-5 rounded-md shadow-md">
            <li className="flex items-center mb-5">
              <div className="rounded-full bg-gray-300 w-12 h-12"></div>
              <div className="pl-5">
                <div className="text-xs text-gray-500">{post.created && post.created.split("T")[0]}</div>
              </div>
            </li>
            <Link to={`/post/${post.id}`} post={post}>
              <li className="font-bold px-2">{post.title}</li>
              <li className="px-2 pb-5">{post.content}</li>
            </Link>
            <hr />
            <li className="flex justify-between pt-5 text-lg text-gray-500">
              <button className="flex justify-center items-center w-full hover:text-emerald-500">
                <i className="fa-regular fa-heart pr-2"></i>Like
              </button>
              <button className="flex justify-center items-center w-full hover:text-emerald-500">
                <i className="fa-regular fa-comment pr-2"></i>
                {post.count} Comment
              </button>
            </li>
          </ul>
        ))
      ) : (
        <li>Loading</li>
      )}
    </div>
  );
};

export default MyPosts;
