import React from "react";
import { useSelector } from "react-redux";

const WithUserPermission = (WrappedComp) => {
  const WithUserPermissionWrapper = (props) => {
    const userPermissions = useSelector((state) => state.userPermissions);
    const listData = useSelector((state) => state.listData);
    const userDetails = useSelector((state) => state.userDetails);
    // const userData = useSelector((state) => state.userData);

    // return <WrappedComp {...props} userPermissions={userPermissions} userData={userData} />;
    return <WrappedComp {...props} userPermissions={userPermissions} listCompData={listData} userDetails={userDetails} />;
  };

  return WithUserPermissionWrapper;
};

export { WithUserPermission };
