import { profile } from "../actions";

const initialState = {
  uid: "",
  name: "",
  email: "",
};

export const profileReducer = (state = initialState, action) => {
  const { type, payLoad } = action;

  switch (type) {
    case profile.SETPROFILE:
      return { ...state, ...payLoad };

    case profile.UPDATENAME:
      return { ...state, ...payLoad };

    case profile.UPDATEMAIL:
      return { ...state, ...payLoad };

    default:
      return state;
  }
};
