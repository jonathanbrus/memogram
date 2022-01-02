import { auth } from "../actions";

const initialState = {
  authenticated: false,
};

export const authenticationReducer = (state = initialState, action) => {
  const { type, payLoad } = action;

  switch (type) {
    case auth.SETSTATUS:
      return { ...state, authenticated: payLoad.status };

    default:
      return state;
  }
};
