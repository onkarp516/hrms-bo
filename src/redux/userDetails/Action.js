import { SET_USERDATA, GET_USERDATA } from "@/helpers";

export const setUserData = (payload) => {
  return {
    type: SET_USERDATA,
    payload,
  };
};

export const getUserData = () => {
  return {
    type: GET_USERDATA,
  };
};
