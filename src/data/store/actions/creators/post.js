import { postsActions } from "../index";
import { postsSerice } from "../../../../services/posts";

export const createPost = ({ uid, title, caption, tags, images }) => {
  return (dispatch) => {
    postsSerice
      .createOne({ uid, title, caption, tags, images })
      .then((post) =>
        dispatch({
          type: postsActions.CREATE,
          payLoad: { post },
        })
      )
      .catch((e) => console.log(e));
  };
};

export const editPost = ({ id, title, caption, images, tags, favorite }) => {
  return (dispatch) => {
    postsSerice
      .updateOne({ id, title, caption, images, tags, favorite: !favorite })
      .then((post) => {
        dispatch({
          type: postsActions.EDIT,
          payLoad: post,
        });
      });
  };
};

export const deletePost = ({ id }) => {
  return (dispatch) => {
    postsSerice.deleteOne({ id }).then(({ id }) =>
      dispatch({
        type: postsActions.DELETE,
        payLoad: { id },
      })
    );
  };
};

export const initialFetch = ({ uid }) => {
  return (dispatch) => {
    postsSerice
      .getAll({ uid })
      .then(({ posts }) =>
        dispatch({ type: postsActions.INITIALIZE, payLoad: { posts } })
      );
  };
};
