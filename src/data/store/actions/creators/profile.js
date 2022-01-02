import { profile } from "../index";
import { trimName } from "../../utilities/trim_name";

export const setProfile = ({ uid, name, email }) => {
  return (dispatch) =>
    dispatch({
      type: profile.SETPROFILE,
      payLoad: { uid, name: trimName(name), email },
    });
};

export const updateName = ({ name }) => {
  return (dispatch) =>
    dispatch({ type: profile.SETPROFILE, payLoad: { name } });
};
export const updateEmail = ({ email }) => {
  return (dispatch) =>
    dispatch({ type: profile.SETPROFILE, payLoad: { email } });
};
