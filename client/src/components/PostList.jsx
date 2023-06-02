import React, { useState, useEffect } from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommetnList from "./CommetnList";

function PostList() {
  const [posts, setPosts] = useState({});

  const fetchPosts = async () => {
    // getting data from query service instead of post serrvice
    // const { data } = await axios.get('http://localhost:4000/posts');

    const { data } = await axios.get("http://localhost:4002/posts");
    console.log(data);
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderedPosts = Object.values(posts).map((post) => {
    return (
      <div
        className="card"
        style={{ width: "30%", marginBottom: "20px" }}
        key={post.id}
      >
        <div className="card-body">
          <h3>{post.title}</h3>
          <CommetnList comments={post.comments} />
          <CommentCreate postId={post.id} />
        </div>
      </div>
    );
  });

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderedPosts}
    </div>
  );
}

export default PostList;
