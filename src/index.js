import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// ! App Global Style import
import "@/assets/scss/App.scss";

window.addEventListener("beforeunload", function (e) {
  // console.log("window session storage");
  let x = window.tabId;
  localStorage.removeItem(`${x}-hrms-currentUser`);
  localStorage.removeItem(`${x}-hrms-refreshToken`);
  window.sessionStorage.tabId = window.tabId;
  window.sessionStorage.removeItem("tabId");
  return null;
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
