import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { root } from "./reducers";

// for the redux dev tools
const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const middlewares = [thunk];

export const store = createStore(
  root,
  composeEnhancers(applyMiddleware(...middlewares))
);
