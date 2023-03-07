import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as cognito from "../cognito";
import axios from "axios";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState();
  const [comment, setComment] = useState();

  useEffect(() => {
    async function getPosts() {
      const a = await cognito.getAccessToken();
      setToken(a);

      const data = await fetch("https://6otj0lkpn2.execute-api.ca-central-1.amazonaws.com/").then((res) => res.json());
      setPosts(data);
    }
    getPosts();
  }, []);

  const handleSubmit = async (postId) => {
    try {
      const result = await fetch("https://6otj0lkpn2.execute-api.ca-central-1.amazonaws.com/comments", {
        method: "POST",
        body: JSON.stringify({ content: comment, postId }),
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
    <div>
      This is Homepage
      <div>
        <div className="text-sky-500">{posts ? posts.length : "aa"}</div>
        {posts
          ? posts.map((post) => (
              <ul key={post.post_id}>
                <li>
                  User : {post.firstname} {post.lastname}
                </li>
                <li className="font-bold">
                  <Link to={`/${post.post_id}`} post={post}>
                    Title : {post.title}
                  </Link>
                </li>
                <li>Content : {post.content}</li>
                <li>Create : {post.created}</li>
              </ul>
            ))
          : "Error!"}
      </div>
    </div>
  );
};

export default Home;
