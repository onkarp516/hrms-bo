import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import Reducers from "./Reducers";

export function configureStore(InitialState) {
  function saveToLocalStorage(state) {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem("redux_state", serializedState);
    } catch (e) {
      console.log(e);
    }
  }
  function loadFromLocalStorage() {
    try {
      const serializedState = localStorage.getItem("redux_state");
      if (serializedState != null) return JSON.parse(serializedState);
    } catch (e) {
      console.log(e);
    }
  }

  const persistState = loadFromLocalStorage();
  // const store = createStore(
  //   Reducers,
  //   persistState,
  //   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  // );
  const Store = createStore(
    Reducers,
    persistState,
    composeWithDevTools(applyMiddleware(thunk))
  );

  Store.subscribe(() => {
    // console.log("subscribe");
    saveToLocalStorage(Store.getState());
  });
  return Store;
}
