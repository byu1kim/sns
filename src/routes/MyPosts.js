import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as cognito from "../Cognito.js";

const MyPosts = () => {
  const [posts, setPosts] = useState();

  useEffect(() => {
    const getMyPosts = async () => {
      const token = await cognito.getAccessToken();

      try {
        const result = await fetch("https://6otj0lkpn2.execute-api.ca-central-1.amazonaws.com/posts", {
          method: "GET",
          headers: {
            Authorization: token,
          },
        }).then((res) => res.json());
        setPosts(result);
      } catch {
        setPosts();
      }
    };
    getMyPosts();
  }, []);

  return (
    <div className="max-w-xl m-auto">
      <h1 className="text-center text-2xl font-bold text-emerald-500 mt-7">My Posts</h1>

      {posts ? (
        posts.map((post, index) => (
          <ul key={index} className="bg-white p-5 m-5 rounded-md shadow-md">
            <li className="flex items-center mb-5">
              <div className="rounded-full bg-gray-300 w-12 h-12"></div>
              <div className="pl-5">
                <div className="text-xs text-gray-500">{post.created && post.created.split("T")[0]}</div>
              </div>
            </li>
            <Link to={`/${post.id}`} post={post}>
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
        <li>Nothing to show</li>
      )}
    </div>
  );
};

export default MyPosts;
