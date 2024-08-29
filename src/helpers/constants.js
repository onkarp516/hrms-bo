import React from "react";
import { AuthenticationService } from "../services/api_functions";

// import { AuthenticationService } from "@/services/api_function";

// SETTINGS CONSTANTS
export const LOGO_BG = "LOGO_BG";
export const NAVBAR_BG = "NAVBAR_BG";
export const SIDEBAR_BG = "SIDEBAR_BG";
export const THEME = "THEME";
export const DIRECTION = "DIRECTION";
export const SIDEBAR_POSITION = "SIDEBAR_POSITION";
export const HEADER_POSITION = "HEADER_POSITION";
export const LAYOUT = "LAYOUT";
export const SIDEBAR_TYPE = "SIDEBAR_TYPE";
export const SET_USER_PERMISSIONS = "SET_USER_PERMISSIONS";
export const GET_USER_PERMISSIONS = "GET_USER_PERMISSIONS";
export const SET_USER_DATA = "SET_USER_DATA";
export const GET_USER_DATA = "GET_USER_DATA";
export const SET_LISTDATA = "SET_LISTDATA";
export const GET_LISTDATA = "GET_LISTDATA";
export const SET_USERDATA = "SET_USERDATA";
export const GET_USERDATA = "GET_USERDATA";

// Regular Expressions
export const ALPHASPACEREGEXP = /^[a-zA-Z ]+$/;
export const ALPHANUMREGEXP = /^[a-zA-Z0-9]+$/;
export const ALPHANUMSPACEREGEXP = /^[a-zA-Z0-9 ]+$/;
export const MOBILEREGEXP = /^[7689][0-9]{9}$/;
export const MPINREGEXP = /^[0-9]{4}$/;
export const NUMERICREGEXP = /^[0-9]+$/;
export const STRONGPWDREGEXP =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
export const IFSCREGEXP = "^[A-Z]{4}0[A-Z0-9]{6}$";
export const EMAILREGEXP = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/;

// !url regular expression
export const URLREGEXP =
  /^((https?):\/\/)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/;

export const SUPPORTED_FORMATS_IMG = ["image/jpg", "image/jpeg", "image/png"];
export const SUPPORTED_FORMATS_ALL = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "application/pdf",
  "application/msword",
  // "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  // "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  // "application/zip",
];
export const SUPPORTED_FORMATS_PDF = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "application/pdf",
];

export const OnlyEnterNumbers = (e) => {
  var regex = new RegExp("^[0-9]+$");
  var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);

  if (regex.test(str)) {
    return true;
  }
  e.preventDefault();
  return false;
};

export const autoCapitalize = (input) => {
  return input.charAt(0).toUpperCase() + input.slice(1);
};

export const getSelectValue = (opts, val) => {
  return opts.find((o) => o.value === val);
};

export const getValue = (opts, val) => opts.find((o) => o.label === val);

export const isReadAuthorized = (
  parentpermission = null,
  subpermission = null
) => {
  // if (AuthenticationService.currentUserValue.isSuperAdmin == true) {
  //   return true;
  // } else {
  //   if (
  //     AuthenticationService.currentUserValue.user_permission[parentpermission][
  //       subpermission
  //     ] == "read"
  //   ) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
  return true;
};

export const isWriteAuthorized = (
  parentpermission = null,
  subpermission = null
) => {
  // if (AuthenticationService.currentUserValue.isSuperAdmin == true) {
  //   return true;
  // } else {
  //   if (
  //     AuthenticationService.currentUserValue.user_permission[parentpermission][
  //       subpermission
  //     ] == "write"
  //   ) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  return true;
};

export const isSuperuser = () => {
  if (AuthenticationService.currentUserValue.isSuperAdmin == true) {
    return true;
  } else {
    return false;
  }
};

export const genCharArray = (charA, charZ) => {
  var a = [],
    i = charA.charCodeAt(0),
    j = charZ.charCodeAt(0);
  for (; i <= j; ++i) {
    a.push(String.fromCharCode(i));
  }
  return a;
};

export const getEmployeeCharwise = (lst) => {
  // debugger
  let CharArray = genCharArray("A", "Z");
  let res_lst = [];
  CharArray.filter((e) => {
    // console.log(e);
    let char_element = e;
    let char_array = [];
    lst.filter((v) => {
      // console.log(v);
      let firstchar = v.label.charAt(0).toUpperCase();
      // console.log(firstchar);
      if (firstchar == char_element) {
        char_array.push(v);
      }
    });
    // console.log(char_array);
    if (char_array.length > 0) {
      let char_lst_array = { char: char_element, lst: char_array };
      res_lst.push(char_lst_array);
    }
  });

  // console.log(res_lst);
  return res_lst;
};

export function truncateString(fullStr, strLen, separator) {
  //! http://jsfiddle.net/2eUYN/1/
  if (fullStr.length <= strLen) return fullStr;

  separator = separator || "...";

  var sepLen = separator.length,
    charsToShow = strLen - sepLen,
    frontChars = Math.ceil(charsToShow / 2),
    backChars = Math.floor(charsToShow / 2);

  return (
    fullStr.substr(0, frontChars) +
    separator +
    fullStr.substr(fullStr.length - backChars)
  );
}

const numberWithCommasIN = (x, isDecimal = false, noz = 2) => {
  x = x.toString();
  let y = x.split(".");
  x = y[0];
  let lastThree = x.substring(x.length - 3);
  let otherNumbers = x.substring(0, x.length - 3);
  if (otherNumbers != "") lastThree = "," + lastThree;
  let res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
  let arrf = new Array(noz).fill("0");
  let resd = y[1] ? y[1] : arrf.join("");

  return isDecimal == true ? res + "." + resd : res;
};

// console.log(numberWithCommasIN(100000.0, true));

// console.log(numberWithCommasIN(100000.0, true, 3));
// console.log(numberWithCommasIN(100000.0));

export const OnlyAlphabets = (e) => {
  console.log("e", e);
  var regex = new RegExp("^[a-zA-Z_ ]*$");
  var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
  //   if (key === "Backspace" || key === "Delete") {
  //     // $('#GFG_DOWN').html(key + ' is Pressed!');
  // }

  if (regex.test(str)) {
    return true;
  }
  e.preventDefault();
  return false;
};

export function isParentExist(parent_slug, permissions) {
  // console.log("permissions>>>", permissions, parent_slug);
  let res = false;
  // let permissions = JSON.parse(
  //   AuthenticationService.currentUserValue.permissionJson
  // );

  console.log(
    "AuthenticationService.currentUserValue: ",
    AuthenticationService.currentUserValue
  );

  if (
    parent_slug == "companyd" ||
    parent_slug == "company-create" ||
    (parent_slug == "roled" &&
      AuthenticationService.currentUserValue.isSuperAdmin == true)
  ) {
    return true;
  }

  // if (AuthenticationService.currentUserValue.isAdmin == true) {
  //   return true;
  // }
  // console.log(`isParentExist : ${vi.slug} == ${parent_slug}`);
  if (permissions) {
    let userPermissions = permissions;
    userPermissions.map((v) => {
      let parents = v.parent_modules;
      parents.map((vi) => {
        // console.log(`isParentExist : ${vi.slug} == ${parent_slug} : `);
        if (vi.slug == parent_slug) {
          res = true;
          // console.log(res);
        }
      });
    });
  }
  return res;
  // return true;
}

export function isActionExist(module_slug, action_slug, permissions) {
  // if (module_slug == "branch") {
  // }
  let res = false;
  // let permissions = JSON.parse(
  //   authenticationService.currentUserValue.permissionJson
  // );
  // console.log("permissions", permissions);
  console.log(
    "AuthenticationService.currentUserValue==>: ",
    AuthenticationService.currentUserValue
  );
  // console.log("module_slug: ", module_slug);

  if (
    AuthenticationService.currentUserValue.isSuperAdmin == true &&
    (module_slug == "companyd" || module_slug == "roled")
  ) {
    return true;
  }

  // if (AuthenticationService.currentUserValue.isAdmin == true) {
  //   return true;
  // }
  // if (permissions) {
  //   let userPermissions = permissions;
  //   // console.log("model slug,Action slug", module_slug, action_slug);
  //   let obj = userPermissions.find((v) => v.action_mapping_slug == module_slug);
  //   // console.log("userPermissions", userPermissions);
  //   // console.log(obj);
  //   if (obj) {
  //     let actions = obj.actions;
  //     actions.map((vi) => {
  //       if (vi.slug == action_slug) {
  //         res = true;
  //       }
  //     });
  //   }
  // }
  if (permissions) {
    let userPermissions = permissions;
    console.log("userPermission in is action->", userPermissions);
    console.log("model slug,Action slug", module_slug, action_slug);
    let obj = userPermissions.find((v) => v.action_mapping_slug == module_slug);
    // console.log("userPermissions", userPermissions);
    // console.log("obj>>>", obj);
    if (obj) {
      let actions = obj.actions;
      if (action_slug == "view") {
        actions.map((vi) => {
          if (vi.slug != action_slug || vi.slug == "view") {
            res = true;
          }
        });
      } else {
        actions.map((vi) => {
          if (vi.slug == action_slug) {
            res = true;
          }
        });
      }
    }
    // console.log("module_slug, result :", module_slug, res);
  }
  return res;
  // return true;
}

export function isSuperAdminExist(module_slug, action_slug, permissions) {
  // if (module_slug == "branch") {
  // }
  let res = false;
  // let permissions = JSON.parse(
  //   authenticationService.currentUserValue.permissionJson
  // );
  // console.log("permissions", permissions);
  // console.log(
  //   "AuthenticationService.currentUserValue: ",
  //   AuthenticationService.currentUserValue
  // );
  // console.log("module_slug: ", module_slug);

  if (AuthenticationService.currentUserValue.isSuperAdmin == true) {
    return true;
  }
  return res;

  // if (AuthenticationService.currentUserValue.isAdmin == true) {
  //   return true;
  // }
  // if (permissions) {
  //   let userPermissions = permissions;
  //   // console.log("model slug,Action slug", module_slug, action_slug);
  //   let obj = userPermissions.find((v) => v.action_mapping_slug == module_slug);
  //   // console.log("userPermissions", userPermissions);
  //   // console.log(obj);
  //   if (obj) {
  //     let actions = obj.actions;
  //     actions.map((vi) => {
  //       if (vi.slug == action_slug) {
  //         res = true;
  //       }
  //     });
  //   }
  // }
  // if (permissions) {
  //   let userPermissions = permissions;
  //   console.log("userPermission in is action->", userPermissions);
  //   console.log("model slug,Action slug", module_slug, action_slug);
  //   let obj = userPermissions.find((v) => v.action_mapping_slug == module_slug);
  //   // console.log("userPermissions", userPermissions);
  //   // console.log("obj>>>", obj);
  //   if (obj) {
  //     let actions = obj.actions;
  //     if (action_slug == "view") {
  //       actions.map((vi) => {
  //         if (vi.slug != action_slug || vi.slug == "view") {
  //           res = true;
  //         }
  //       });
  //     } else {
  //       actions.map((vi) => {
  //         if (vi.slug == action_slug) {
  //           res = true;
  //         }
  //       });
  //     }
  //   }
  //   // console.log("module_slug, result :", module_slug, res);
  // }
  // return res;
  // return true;
}
