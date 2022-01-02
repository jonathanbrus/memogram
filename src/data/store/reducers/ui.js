import { ui } from "../actions";

const initialState = {
  form: false,
  drawer: false,
};

export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case ui.TOGGLEFORM:
      return { ...state, form: !state.form };

    case ui.TOGGLEDRAWER:
      return { ...state, drawer: !state.drawer };

    default:
      return state;
  }
};
