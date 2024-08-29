import { SET_USER_PERMISSIONS, GET_USER_PERMISSIONS, SET_USER_DATA } from "@/helpers";

export default (state = [], action) => {
  switch (action.type) {
    case SET_USER_PERMISSIONS:
      return [...action.payload];
    case GET_USER_PERMISSIONS:
      return state;
    default:
      return state;
  }
};
