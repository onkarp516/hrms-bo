import config from "config";

export function createUserWithRolesURL() {
  return `${config.apiUrl}/add_bo_user_with_roles`;
}

export function getUsersListUrl() {
  return `${config.apiUrl}/get_all_users`;
}

export function getUserByIdUrl() {
  return `${config.apiUrl}/get_user_by_id`;
}

export function updateUserUrl() {
  return `${config.apiUrl}/updateUser`;
}

export function deleteUserURL() {
  return `${config.apiUrl}/activate_deactivate_employee`;
}

export function listOfManagersUrl() {
  return `${config.apiUrl}/getReportingManagers`;
}
export function getUserPermissionURL() {
  return `${config.apiUrl}/get_user_permissions`;
}
