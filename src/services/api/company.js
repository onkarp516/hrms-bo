import config from "config";

export function listOfCompanyUrl() {
  return `${config.apiUrl}/listOfCompany`;
}

export function createCompanyUrl() {
  return `${config.apiUrl}/createCompany`;
}

export function getAllMasterSystemConfigUrl() {
  return `${config.apiUrl}/get_all_master_system_config`;
}

export function getStateDataUrl() {
  return `${config.apiUrl}/getIndianState`;
}

export function getGstDataUrl() {
  return `${config.apiUrl}/get_gst_type`;
}

export function findCompanyUrl() {
  return `${config.apiUrl}/findCompany`;
}

export function updateCompanyUrl() {
  return `${config.apiUrl}/updateCompany`;
}

export function deleteCompanyUrl() {
  return `${config.apiUrl}/deleteCompany`;
}
