import { SET_USER_PERMISSIONS, GET_USER_PERMISSIONS } from "@/helpers";

export const setUserPermissions = (payload) => {
  return {
    type: SET_USER_PERMISSIONS,
    payload,
  };
};

export const getUserPermissions = () => {
  return {
    type: GET_USER_PERMISSIONS,
  };
};


