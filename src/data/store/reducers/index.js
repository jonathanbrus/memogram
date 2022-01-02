import { combineReducers } from "redux";

import { authenticationReducer } from "./authentication";
import { profileReducer } from "./profile";
import { postReducer } from "./post";
import { uiReducer } from "./ui";

export const root = combineReducers({
  authentication: authenticationReducer,
  profile: profileReducer,
  post: postReducer,
  ui: uiReducer,
});
