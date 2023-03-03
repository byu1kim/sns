import { useEffect, useState } from "react";

const Home = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    async function getPosts() {
      const result = await fetch("https://6otj0lkpn2.execute-api.ca-central-1.amazonaws.com/posts").then((res) =>
        res.json()
      );
      console.log(result);
      setPosts(result);
    }
    getPosts();
  }, []);

  return (
    <div>
      This is Homepage
      <div>{!!posts && posts.map((item) => item.content)}</div>
    </div>
  );
};

export default Home;
