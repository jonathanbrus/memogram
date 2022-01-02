import React from "react";
import Masonry from "react-masonry-css";

import { Box } from "@mui/material";
import { Post } from "./post";
import classes from "./index.module.css";

//...

export const Posts = ({ posts }) => {
  return (
    <Box sx={{ margin: "1rem" }}>
      {!posts.length ? (
        <Box sx={{ display: "grid", placeItems: "center", minHeight: "78vh" }}>
          Zero Post
        </Box>
      ) : (
        <Masonry
          breakpointCols={breakpoint}
          className={classes.myMasonryGrid}
          columnClassName={classes.myMasonryGridColumn}
        >
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </Masonry>
      )}
    </Box>
  );
};

const breakpoint = {
  default: 2,
  600: 1,
};
