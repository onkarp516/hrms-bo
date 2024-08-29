import config from "config";

export function getMasterActionsUrl() {
  return `${config.apiUrl}/get_master_actions`;
}

export function getSystemsAllPermissionsUrl() {
  return `${config.apiUrl}/get_systems_all_permissions`;
}

export function createUserRolesURL() {
  return `${config.apiUrl}/register_role`;
}

export function DTRolesUrl() {
  return `${config.apiUrl}/get_all_roles`;
}

export function getRolePermissionsForEditUrl() {
  return `${config.apiUrl}/get_role_by_id_for_edit`;
}

export function updateRoleUrl() {
  return `${config.apiUrl}/update_role`;
}

export function getRolePermissionsURL() {
  return `${config.apiUrl}/get_role_by_id`;
}

export function deleteRoleURL() {
  return `${config.apiUrl}/remove_role`;
}