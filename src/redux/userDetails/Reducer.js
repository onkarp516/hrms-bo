import { SET_USERDATA, GET_USERDATA } from "@/helpers";

export default (state = [], action) => {
  switch (action.type) {
    case SET_USERDATA:
      return [...action.payload];
    case GET_USERDATA:
      return state;
    default:
      return state;
  }
};
