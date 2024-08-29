import { SET_LISTDATA, GET_LISTDATA } from "@/helpers";

export default (state = [], action) => {
  switch (action.type) {
    case SET_LISTDATA:
      return [...action.payload];
    case GET_LISTDATA:
      return state;
    default:
      return state;
  }
};
