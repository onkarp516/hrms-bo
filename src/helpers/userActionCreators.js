// src/actions/userActionCreators.js

// ...
import history from "../history";

export function login(credentials) {
  return function (dispatch) {
    return loginRemotely(credentials).then((response) => {
      // ...
      history.push("/");
    });
  };
}
