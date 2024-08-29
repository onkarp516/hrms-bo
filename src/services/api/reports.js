import config from "config";

export function getEmpMonthlyPresentyURL() {
  return `${config.apiUrl}/getEmpMonthlyPresenty`;
}
