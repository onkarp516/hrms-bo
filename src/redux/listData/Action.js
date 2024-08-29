import { SET_LISTDATA, GET_LISTDATA } from "@/helpers";

export const setListData = (payload) => {
  return {
    type: SET_LISTDATA,
    payload,
  };
};

export const getListData = () => {
  return {
    type: GET_LISTDATA,
  };
};
