import config from "config";

export function getUnderListForLedgerUrl() {
  return `${config.apiUrl}/get_under_list`;
}

export function createLedgerURL() {
  // return `http://${getCurrentIpaddress()}:${getPortNo()}/create_ledger_master`;
  return `${config.apiUrl}/create_ledger_master`;
}

export function editLedgerURL() {
  // return `http://${getCurrentIpaddress()}:${getPortNo()}/edit_ledger_master`;
  return `${config.apiUrl}/edit_ledger_master`;
}

export function getLedgersURL() {
  return `${config.apiUrl}/get_all_ledgers`;
}

export function deleteledgerUrl() {
  return `${config.apiUrl}/delete_ledger`;
}

export function getLedgersByIdUrl() {
  return `${config.apiUrl}/get_ledgers_by_id`;
}
