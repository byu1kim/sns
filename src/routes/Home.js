import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as cognito from "../Cognito";
import Create from "../components/Create";
import Loading from "../components/Loading";
import jwtDecode from "jwt-decode";

const Home = () => {
  const [postings, setPostings] = useState([]);
  const [token, setToken] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  let decoded = token ? jwtDecode(token) : "";

  // Load postings item from server
  useEffect(() => {
    async function getpostings() {
      const data = await fetch("https://6otj0lkpn2.execute-api.ca-central-1.amazonaws.com/").then((res) => res.json());
      setPostings(data);
      setLoading(false);

      const userToken = await cognito.getAccessToken();
      if (userToken) {
        setToken(userToken);
      }
    }
    getpostings();
  }, [token]);

  // Handele deleting posting
  const handleDelete = async (id) => {
    try {
      const del = await fetch(`https://6otj0lkpn2.execute-api.ca-central-1.amazonaws.com/post/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      }).then((res) => res.json());
      if (del) {
        postings.shift();
        setPostings(postings);
      }
    } catch (err) {
      setError(err);
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <section className="bg-gray-200 max-w-2xl m-auto">
      {!!error && error}
      {token ? <Create postings={postings} setPostings={setPostings} /> : ""}

      <div className="bg-gray-200">
        <div className="text-right text-gray-500 pr-7 pt-5">
          {postings ? <>Total {postings.length} postings</> : "aa"}
        </div>
        {!!postings
          ? postings.map((post, index) => (
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
                    {post.user_id === decoded?.sub ? (
                      <button onClick={() => handleDelete(post.id)}>
                        <i className="fa-regular fa-trash-can"></i>
                      </button>
                    ) : (
                      ""
                    )}
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
                    <Link to={`/post/${post.id}`} post={post}>
                      <i className="fa-regular fa-comment pr-2"></i>
                      {post.count} Comment{" "}
                    </Link>
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
