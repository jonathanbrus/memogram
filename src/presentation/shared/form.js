import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { ui } from "../../data/store/actions";
// import { toBase64 } from "../../data/store/utilities/toBase64";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  IconButton,
  TextField,
} from "@mui/material";
import { SaveRounded, CancelRounded, CloseRounded } from "@mui/icons-material";

import { createPost } from "../../data/store/actions/creators/post";

export const Form = (props) => {
  const user = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const closeForm = () => dispatch({ type: ui.TOGGLEFORM });
  const dispatchCreatePost = ({ title, caption, tags, images }) =>
    dispatch(createPost({ uid: user.uid, title, caption, tags, images }));

  const { selectedPost, UpdatePost } = props;
  const [formData, setFormData] = useState(initialState);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const tagsHandler = (e) => {
    let tags = e.target.value.split("#").filter((tag) => tag.length !== 0);
    setFormData({ ...formData, tags: tags });
  };

  const imagesInputRef = useRef(null);
  const imageInputHandler = async (e) => {
    const imagesRefs = [...e.target.files];

    // console.log(imagesRefs);
    // let images = [];

    // for (let i = 0; i < imagesRefs.length; i++) {
    //   console.log(imagesRefs[i].name);
    //   const base64String = await toBase64(imagesRefs[i]);
    //   images.push(base64String);
    // }
    setFormData({ ...formData, images: imagesRefs });
  };

  const savePost = () => {
    if (selectedPost) {
      UpdatePost(selectedPost._id, formData);
    } else {
      dispatchCreatePost({
        title: formData.title,
        caption: formData.caption,
        tags: formData.tags,
        images: formData.images,
      });
    }
    closeForm();
  };

  useEffect(() => {
    if (selectedPost) {
      setFormData(selectedPost);
    }
  }, [selectedPost]);

  return (
    <Card sx={cardStyle}>
      <CardHeader
        action={
          <IconButton onClick={closeForm} sx={{ color: "white" }}>
            <CloseRounded />
          </IconButton>
        }
        title="Create New Memory"
        titleTypographyProps={{ color: "white" }}
      />
      <CardContent sx={cardContentStyle}>
        <TextField
          onChange={(e) => onChangeHandler(e)}
          value={formData.title}
          label="Title"
          name="title"
          variant="filled"
          sx={textFieldStyle}
          required
        />
        <TextField
          onChange={(e) => onChangeHandler(e)}
          value={formData.caption}
          label="Caption"
          name="caption"
          variant="filled"
          sx={textFieldStyle}
          maxRows={4}
          multiline
          required
        />
        <TextField
          onChange={tagsHandler}
          label="Tags"
          name="tags"
          variant="filled"
          sx={textFieldStyle}
          multiline
        />
        <input
          onChange={imageInputHandler}
          ref={imagesInputRef}
          name="images"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          multiple
        />
        <Button onClick={() => imagesInputRef.current.click()}>
          Select Images
        </Button>
      </CardContent>
      {}
      <CardActions sx={{ justifyContent: "space-between" }}>
        <Button onClick={savePost} endIcon={<SaveRounded />} color="primary">
          Save
        </Button>
        <Button onClick={closeForm} endIcon={<CancelRounded />} color="error">
          Cancel
        </Button>
      </CardActions>
    </Card>
  );
};

const initialState = {
  title: "",
  caption: "",
  tags: [],
  images: [],
};

const cardStyle = {
  width: { xs: "auto", sm: "400px" },
  position: "fixed",
  top: { xs: "0%", sm: "5rem" },
  left: { xs: "0%", sm: "auto" },
  right: { xs: "0%", sm: "1rem" },
  height: { xs: "100vh", sm: "max-content" },
  zIndex: 5,
  backgroundColor: "#262626",
  border: "1px solid #4e4e4e",
};

const cardContentStyle = {
  paddingTop: "0px",
  paddingBottom: "0px",
  display: "flex",
  flexDirection: "column",
};

const textFieldStyle = { backgroundColor: "white", marginBottom: "1rem" };

// const mapStateToProps = (state) => {
//   return {
//     // User: state.auth.Auth,
//     // AllPosts: state.selectedPost,
//     // selectedPost: state.Posts.selectedPost,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     // setPost: () => dispatch({ type: actionTypes.SELECTEDPOST, payLoad: null }),
//     // UpdatePost: (id, post) => dispatch(UpdatePost(id, post)),
//     // CreatePost: (post) => dispatch(CreatePost(post)),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Form);
