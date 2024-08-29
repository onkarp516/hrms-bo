import config from "config";

export function createAssociateGroupsUrl() {
  return `${config.apiUrl}/create_associate_groups`;
}

export function getLedgerGroupsUrl() {
  return `${config.apiUrl}/get_associate_groups`;
}

export function findLedgerGroupUrl() {
  return `${config.apiUrl}/get_associate_group`;
}

export function editLedgerGroupsUrl() {
  return `${config.apiUrl}/edit_associate_groups`;
}

export function deleteLedgerGroupUrl() {
  return `${config.apiUrl}/delete_ledger_group`;
}
