import { postsActions } from "../actions";

const initialState = {
  all: [],
  favorites: true,
};

export const postReducer = (state = initialState, action) => {
  const { type, payLoad } = action;

  switch (type) {
    case postsActions.TOGGLE:
      return { ...state, favorites: !state.favorites };

    case postsActions.INITIALIZE:
      return { ...state, all: payLoad.posts };

    case postsActions.CREATE:
      return { ...state, all: [payLoad.post, ...state.all] };

    case postsActions.EDIT:
      return {
        ...state,
        all: state.all.map((post) => {
          if (post.id === payLoad.id) {
            post = { ...post, ...payLoad };
          }
          return post;
        }),
      };

    case postsActions.DELETE:
      return {
        ...state,
        all: state.all.filter((post) => post.id !== payLoad.id),
      };

    default:
      return state;
  }
};
