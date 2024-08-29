// import config from "config";

// export function authLoginURL() {
//   return `${config.apiUrl}/authenticate`;
// }

import config from "config";

export function loginURL() {
  // return `${config.apiUrl}/adminlogin`;
  return `${config.apiUrl}/authenticate`;
}

export function registerURL() {
  return `${config.apiUrl}/register`;
}
