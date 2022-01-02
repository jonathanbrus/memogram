import React, { useState } from "react";
import { useSelector } from "react-redux";

import { SearchRounded } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";

// import { LoadingScreen } from "../../components/LoadingScreen/LoadingScreen";
import { Posts } from "../shared/posts";

export const Search = (props) => {
  const { all, favorites } = useSelector((state) => state.post);
  const [search, setSearch] = useState("");
  const [result, setResult] = useState(all);

  const onSearch = () => {
    if (search.length === 0) return setResult(all);

    let posts = all.filter((post) => post.tags.includes(search.toLowerCase()));

    setResult(posts);
  };

  return (
    <div style={{ minHeight: "92vh" }}>
      <Box sx={BoxStyle}>
        <input
          style={inputStyle}
          type="text"
          placeholder="Search by tags"
          onKeyPress={(e) => e.key === "Enter" && onSearch()}
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <IconButton
          onClick={onSearch}
          size="large"
          sx={{ color: "white", backgroundColor: "#147edf" }}
        >
          <SearchRounded />
        </IconButton>
      </Box>
      <Posts
        posts={result.filter((post) =>
          favorites ? post.favorite === favorites : post
        )}
      />
    </div>
  );
};

const BoxStyle = {
  height: "3rem",
  width: "90%",
  maxWidth: "400px",
  margin: "2rem auto",
  display: "flex",
  justifyContent: "center",
};

const inputStyle = {
  flex: 1,
  marginRight: "0.5rem",
  padding: "0.5rem 1rem",
  color: "white",
  backgroundColor: "black",
  border: "none",
  borderRadius: "2.5rem",
  outline: "none",
  boxShadow: "0px 0px 5px #6b6b6b",
};
