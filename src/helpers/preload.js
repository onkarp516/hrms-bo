const loadTabId = () => {
  if (window.sessionStorage.tabId) {
    window.tabId = window.sessionStorage.tabId;
    window.sessionStorage.removeItem("tabId");
  } else {
    window.tabId = Math.floor(Math.random() * 1000000);
  }
  return null;
};

// const checkWindowTabId = () => {
//   let x = 6;
//   if (window.tabId) {
//     // console.log("if window.tabId", window.tabId);
//     x = window.tabId;
//   } else {
//     loadTabId();
//     // console.log("else window.tabId", window.tabId);
//     x = window.tabId;
//   }
//   return x;
// };
export { loadTabId };
