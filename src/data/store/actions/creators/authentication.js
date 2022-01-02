import { auth } from "../index";

export const setStatus = ({ status }) => {
  return (dispatch) => dispatch({ type: auth.SETSTATUS, payLoad: { status } });
};
