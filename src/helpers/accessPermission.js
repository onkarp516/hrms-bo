// function getUserAccessPermission(jsonSysPermission, jsonUserPermission) {
//   //   console.log("Syuste", jsonSysPermission);
//   //   console.log("user", jsonUserPermission);

//   let permissionId = jsonUserPermission.map((v) => v.mapping_id);
//   // console.log("permissionId", permissionId);
//   let finalarr = [];

//   let setPermissionIds = [];

//   jsonSysPermission.map((v) => {
//     // console.log("v", JSON.stringify(v));
//     if (permissionId.includes(parseInt(v.id))) {
//       if (!setPermissionIds.includes(parseInt(v.id))) {
//         setPermissionIds.push(parseInt(v.id));
//       }

//       // console.log("true");
//       // console.log("v ID=->", parseInt(v.id));
//       // console.log("level", JSON.stringify(v.level));
//       let inner_modules =
//         v.level &&
//         v.level.map((vi) => {
//           // console.log('vi',JSON.stringify(vi));

//           if (permissionId.includes(parseInt(vi.id))) {
//             // console.log("innner ",vi.id);
//             let userPermissionObj = jsonUserPermission.find(
//               (uv) => parseInt(uv.mapping_id) == parseInt(vi.id)
//             );
//             // console.log("userPermissionObj",userPermissionObj);

//             let userPermissionActions =
//               userPermissionObj &&
//               userPermissionObj.actions.map((up) => parseInt(up));
//             // console.log("userPermissionActions",userPermissionActions);
//             let action_inner = vi.actions.filter(
//               (vz) =>
//                 userPermissionActions.includes(parseInt(vz)) && parseInt(vz)
//             );
//             // console.log("action_inner",action_inner);
//             if (!setPermissionIds.includes(parseInt(vi.id))) {
//               setPermissionIds.push(parseInt(vi.id));
//             }

//             return {
//               mapping_id: parseInt(vi.id),
//               actions: action_inner,
//             };
//           }
//         });
//       // console.log("inner_modeuls", inner_modules);
//       // setPermissionIds.push(parseInt(v.id));
//       inner_modules = inner_modules.filter((im) => im != null);
//       let obj = {
//         id: parseInt(v.id),
//         name: v.name,
//         modules: inner_modules,
//       };
//       // console.log("obj", JSON.stringify(obj));
//       finalarr.push(obj);
//     }
//   });

//   // console.log("setPermissionIds", JSON.stringify(setPermissionIds));
//   // console.log("finalarr", JSON.stringify(finalarr));

//   let diffPermission = permissionId.filter(
//     (v) => !setPermissionIds.includes(parseInt(v))
//   );

//   // console.log("diffPremission", diffPermission);
//   function findParentObj(id) {
//     // console.log("id =-> ",id);
//     let objRet = "";

//     jsonSysPermission.map((v) => {
//       // console.log("jsonS",v);
//       // console.log("Level=-> ",JSON.stringify(v.level));
//       let actionIds = v.level.map((vi) => parseInt(vi.id));
//       // console.log("actionIDs",actionIds);

//       if (actionIds.includes(parseInt(id))) {
//         objRet = v;
//       }
//     });

//     // console.log("ObjRet",objRet);

//     return objRet;
//   }

//   if (diffPermission.length > 0) {
//     diffPermission.map((v) => {
//       // console.log("v",v);
//       // console.log("findParentObj",findParentObj(v));
//       let parentObj = findParentObj(v);

//       let inner_modules =
//         parentObj.level &&
//         parentObj.level.map((vi) => {
//           // console.log('vi',JSON.stringify(vi));

//           if (permissionId.includes(parseInt(vi.id))) {
//             // console.log("innner ",vi.id);
//             let userPermissionObj = jsonUserPermission.find(
//               (uv) => parseInt(uv.mapping_id) == parseInt(vi.id)
//             );
//             // console.log("userPermissionObj",userPermissionObj);

//             let userPermissionActions =
//               userPermissionObj &&
//               userPermissionObj.actions.map((up) => parseInt(up));
//             // console.log("userPermissionActions",userPermissionActions);
//             let action_inner = vi.actions.filter(
//               (vz) =>
//                 userPermissionActions.includes(parseInt(vz)) && parseInt(vz)
//             );
//             // console.log("action_inner",action_inner);
//             if (!setPermissionIds.includes(parseInt(vi.id))) {
//               setPermissionIds.push(parseInt(vi.id));
//             }

//             return {
//               mapping_id: parseInt(vi.id),
//               actions: action_inner,
//             };
//           }
//         });
//       inner_modules = inner_modules.filter((im) => im != null);
//       let obj = {
//         id: parseInt(parentObj.id),
//         name: parentObj.name,
//         modules: inner_modules,
//       };
//       // console.log("obj",JSON.stringify(obj));
//       finalarr.push(obj);
//     });
//   }
//   return finalarr;
// }

function findParentObjWithChildId(arry, id) {
  let objRet = "";
  arry.map((v) => {
    // console.log("jsonS",v);
    // console.log("Level=-> ",JSON.stringify(v.level));
    let actionIds = v.level.map((vi) => parseInt(vi.id));
    // console.log("actionIDs",actionIds);

    if (actionIds.includes(parseInt(id))) {
      objRet = v;
    }
  });

  // console.log("ObjRet", objRet);

  return objRet;
}

function findParentObjwithId(finalarr, id) {
  let objRet = finalarr.find((v) => parseInt(v.id) === parseInt(id));
  return objRet;
}

function findChildObjwithId(arr, id) {
  let objRet = arr.level.find((v) => parseInt(v.id) === parseInt(id));
  return objRet;
}

function getUserAccessPermission(jsonSysPermission, jsonUserPermission) {
  let finalarr = [];
  // console.log("userPermission", jsonSysPermission, jsonUserPermission);
  jsonUserPermission.map((v) => {
    // console.log("v>>>>>>", v);
    let fObj = findParentObjWithChildId(jsonSysPermission, v.mapping_id);
    // console.log("fObj", JSON.stringify(fObj, undefined, 2));
    if (fObj) {
      let checkIsParentExist = findParentObjwithId(finalarr, fObj.id);
      // console.log("checkIsParentExist",checkIsParentExist);
      if (checkIsParentExist != undefined) {
        let findChildObj = findChildObjwithId(fObj, v.mapping_id);
        //   console.log("findChildObj =-> ", findChildObj);
        if (findChildObj) {
          let existingActions = v.actions.map((vi) => parseInt(vi));
          let childActions = findChildObj.actions.map((vi) => parseInt(vi));
          let finalChildActions = childActions.filter((vi) =>
            existingActions.includes(vi)
          );
          let modules_data = {
            mapping_id: findChildObj.id,
            actions: finalChildActions,
            name: findChildObj.name,
          };
          // console.log("modules_data",modules_data);
          let data = {
            id: fObj.id,
            modules: [...checkIsParentExist.modules, modules_data],
            name: fObj.name,
            value: fObj.id,
            label: fObj.name,
          };
          // console.log("data", data);
          let filterArr = finalarr.filter((vi) => vi.id != fObj.id);
          finalarr = [...filterArr, data];
        }
      } else {
        let findChildObj = findChildObjwithId(fObj, v.mapping_id);
        if (findChildObj) {
          let existingActions = v.actions.map((vi) => parseInt(vi));
          let childActions = findChildObj.actions.map((vi) => parseInt(vi));
          let finalChildActions = childActions.filter((vi) =>
            existingActions.includes(vi)
          );
          let modules_data = {
            mapping_id: findChildObj.id,
            actions: finalChildActions,
            name: findChildObj.name,
          };
          let data = {
            id: fObj.id,
            modules: [modules_data],
            name: fObj.name,
            value: fObj.id,
            label: fObj.name,
          };

          finalarr = [...finalarr, data];
        }

        //   console.log("finalarr", JSON.stringify(finalarr, undefined, 2));
      }
    }
  });
  // console.log("finalarr", finalarr);
  return finalarr;
}

function getCommaSeperatedPermissions(array = []) {
  let mappingId = "";
  for (let j = 0; j < array.length; j++) {
    mappingId = mappingId + array[j].mapping_id;
    if (j < array.length - 1) {
      mappingId = mappingId + ",";
    }
  }
  return mappingId;
}

export { getUserAccessPermission, getCommaSeperatedPermissions };
