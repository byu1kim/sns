import { useParams } from "react-router-dom";

const PostDetail = ({ post }) => {
  let { id } = useParams();
  console.log(id);
  return (
    <div className="">
      PostDetail Page
      {post ? post.map((i) => i.title) : ""}
      {/* add detail page, move to detail page with post id */}
      {/* {token ? (
                  <form onSubmit={handleSubmit}>
                    <input type="text" className="border-2 border-sky-500" />
                    <button className="bg-pink-300">Comment</button>
                  </form>
                ) : (
                  "Loading"
                )} */}
    </div>
  );
};

export default PostDetail;
