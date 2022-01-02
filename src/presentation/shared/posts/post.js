import React from "react";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import {
  editPost,
  deletePost,
} from "../../../data/store/actions/creators/post";

import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
} from "@mui/material";

import {
  MoreHorizRounded,
  FavoriteBorderRounded,
  FavoriteRounded,
} from "@mui/icons-material";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

export const Post = (props) => {
  const { id, images, title, favorite, tags, caption, created } = props.post;

  const { name } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const [toggle, setToggle] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <Card
      sx={{
        backgroundColor: "#262626",
        border: "1px solid #4e4e4e",
        borderRadius: "0.5rem",
      }}
    >
      <CardHeader
        title={name}
        titleTypographyProps={{ variant: "h5", color: "white" }}
        sx={{ paddingBottom: "0px" }}
        action={
          <>
            <IconButton
              onClick={() => {
                dispatch(
                  editPost({ id, images, title, favorite, tags, caption })
                );
              }}
              sx={{ color: "red" }}
            >
              {favorite ? <FavoriteRounded /> : <FavoriteBorderRounded />}
            </IconButton>
            <IconButton onClick={handleClick} sx={{ color: "white" }}>
              <MoreHorizRounded />
            </IconButton>
          </>
        }
      />
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
      >
        <MenuItem onClick={() => {}}>Edit</MenuItem>
        <MenuItem onClick={() => setToggle((prev) => !prev)}>Delete</MenuItem>
      </Menu>
      <Confirmation
        open={toggle}
        handleClose={() => setToggle((prev) => !prev)}
        handleConfirm={() => {
          dispatch(deletePost({ id }));
          setToggle((prev) => !prev);
        }}
      />
      <Carousel
        infiniteLoop
        showIndicators={false}
        showStatus={false}
        swipeable={true}
        showThumbs={false}
      >
        {images.map((image, i) => (
          <CardMedia
            key={i}
            component="img"
            src={image}
            style={{ marginTop: "1rem" }}
          />
        ))}
      </Carousel>
      <CardContent style={{ padding: "0.5rem 1rem" }}>
        <Typography variant="h5" color="white">
          {title}
        </Typography>
        <Typography component="p" sx={{ color: "white", fontSize: "1rem" }}>
          {caption}
        </Typography>
        {tags.length > 0 && (
          <Typography sx={{ color: "gray", fontSize: "0.9rem" }}>
            #{tags.join(" #")}
          </Typography>
        )}
        <Typography sx={{ color: "gray", fontSize: "0.8rem" }}>
          {moment(created).fromNow()}
        </Typography>
      </CardContent>
    </Card>
  );
};

const Confirmation = ({ open, handleClose, handleConfirm }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Are you sure to delete this memeory?</DialogTitle>
      <DialogActions>
        <Button onClick={handleClose}>Disagree</Button>
        <Button onClick={handleConfirm} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};
