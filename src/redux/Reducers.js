import { combineReducers } from "redux";
import settings from "./settings/Reducer";
import userPermissions from "./userPermissions/Reducer";
import listData from "./listData/Reducer";
import userDetails from "./userDetails/Reducer";
const Reducers = combineReducers({
  settings,
  userPermissions,
  listData,
  userDetails,
});

export default Reducers;
