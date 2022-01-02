import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import { Posts } from "../shared/posts";

export const Home = (props) => {
  const { all, favorites } = useSelector((state) => state.post);

  const [posts, setPosts] = useState(all);

  useEffect(() => {
    setPosts(
      all.filter((post) => (favorites ? post.favorite === favorites : post))
    );
  }, [all, favorites]);

  return (
    <div style={{ minHeight: "92vh" }}>
      <Posts posts={posts} />
    </div>
  );
};
