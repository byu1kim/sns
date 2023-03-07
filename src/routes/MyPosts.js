import { useEffect, useState } from "react";
import * as cognito from "../cognito";

const MyPosts = () => {
  const [posts, setPosts] = useState();

  console.log(posts);
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
        console.log(result);
        setPosts(result);
      } catch {
        setPosts();
      }
    };
    getMyPosts();
  }, []);

  return (
    <div>
      Posts
      <div>
        {posts ? (
          posts.map((post) => (
            <ul key={post.id}>
              <li>Title : {post.title} </li>
              <li>Content : {post.content}</li>
              <li>Create : {post.created}</li>
            </ul>
          ))
        ) : (
          <li>Nothing to show</li>
        )}
      </div>
    </div>
  );
};

export default MyPosts;
