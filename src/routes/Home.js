import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as cognito from "../cognito";
import Create from "../components/Create";
import jwtDecode from "jwt-decode";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState();

  let decoded = token ? jwtDecode(token) : "";
  useEffect(() => {
    async function getPosts() {
      const data = await fetch("https://6otj0lkpn2.execute-api.ca-central-1.amazonaws.com/").then((res) => res.json());
      setPosts(data);

      const a = await cognito.getAccessToken();
      setToken(a);
    }
    getPosts();
  }, []);

  return (
    <section className="bg-gray-200 max-w-2xl m-auto">
      {token ? <Create /> : ""}

      <div className="bg-gray-200">
        <div className="text-right text-gray-500 pr-7 pt-5">{posts ? <>Total {posts.length} Posts</> : "aa"}</div>
        {posts
          ? posts.map((post, index) => (
              <ul key={index} className="bg-white p-5 m-5 rounded-md shadow-md">
                <li className="flex items-center mb-5">
                  <div className="rounded-full bg-gray-300 w-12 h-12 p-5"></div>
                  <div className="pl-5 w-full">
                    <div className="font-bold">
                      {post.firstname} {post.lastname}
                    </div>
                    <div className="text-xs text-gray-500">{post.created && post.created.split("T")[0]}</div>
                  </div>
                  <div className="flex-end text-gray-500 pr-2">
                    {post.user_id === decoded.sub ? (
                      <button>
                        <i className="fa-regular fa-trash-can"></i>
                      </button>
                    ) : (
                      ""
                    )}
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
          : "Error!"}
      </div>
    </section>
  );
};

export default Home;
