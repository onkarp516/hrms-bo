import config from "config";

//Journal

export function get_journal_list_by_companyUrl() {
  return `${config.apiUrl}/get_journal_list_by_company`;
}

export function delete_journalUrl() {
  return `${config.apiUrl}/delete_journal`;
}

export function create_journalUrl() {
  return `${config.apiUrl}/create_journal`;
}

export function get_ledger_list_by_companyUrl() {
  return `${config.apiUrl}/get_ledger_list_by_company`;
}

export function get_last_record_journalUrl() {
  return `${config.apiUrl}/get_last_record_journal`;
}

export function update_journalUrl() {
  return `${config.apiUrl}/update_journal`;
}

export function get_journal_by_idUrl() {
  return `${config.apiUrl}/get_journal_by_id`;
}

//Receipt
export function get_receipt_invoice_last_records_Url() {
  return `${config.apiUrl}/get_receipt_invoice_last_records`;
}

export function get_sundry_debtors_indirect_incomes_Url() {
  return `${config.apiUrl}/get_sundry_debtors_indirect_incomes`;
}

export function get_cashAc_bank_account_details_Url() {
  return `${config.apiUrl}/get_cashAc_bank_account_details`;
}

export function create_receiptUrl() {
  return `${config.apiUrl}/create_receipt`;
}

export function get_receipt_list_by_company_Url() {
  return `${config.apiUrl}/get_receipt_list_by_company`;
}

export function deleteReceiptURL() {
  return `${config.apiUrl}/delete_receipt`;
}

export function get_receipt_by_idURL() {
  return `${config.apiUrl}/get_receipt_by_id`;
}

export function update_receiptUrl() {
  return `${config.apiUrl}/update_receipt`;
}
//Payment

// export function DTPaymentListURL(){
//   return `${config.apiUrl}/DTPaymentList`;
// }
export function get_Payment_listURL() {
  return `${config.apiUrl}/get_payment_list_by_company`;
}

export function delete_payments_by_url() {
  return `${config.apiUrl}/delete_payment`;
}

export function getpaymentinvoicelastrecordsUrl() {
  return `${config.apiUrl}/get_payment_invoice_last_records`;
}

export function getsundrycreditorsindirectexpensesUrl() {
  return `${config.apiUrl}/get_sundry_creditors_indirect_expenses`;
}

export function getcreditorspendingbillsUrl() {
  return `${config.apiUrl}/get_creditors_pending_bills`;
}

export function create_paymentsUrl() {
  return `${config.apiUrl}/create_payments`;
}

export function get_Payment_by_idURL() {
  return `${config.apiUrl}/get_payments_by_id`;
}

export function update_payments_by_url() {
  return `${config.apiUrl}/update_payments`;
}

//Contra
export function get_contra_list_by_companyUrl() {
  return `${config.apiUrl}/get_contra_list_by_company`;
}
export function create_contraURL() {
  return `${config.apiUrl}/create_contra`;
}
export function get_last_record_contraURL() {
  return `${config.apiUrl}/get_last_record_contra`;
}
export function get_contra_by_idUrl() {
  return `${config.apiUrl}/get_contra_by_id`;
}
export function delete_contraUrl() {
  return `${config.apiUrl}/delete_contra`;
}
export function update_contraUrl() {
  return `${config.apiUrl}/update_contra`;
}

//Advance Payments

export function AdvancePaymentsListUrl() {
  return `${config.apiUrl}/advancePaymentList`;
}
export function ApproveAdvancePaymentsUrl() {
  return `${config.apiUrl}/approveAdvancePayment`;
}
export function RejectAdvancePaymentsUrl() {
  return `${config.apiUrl}/rejectAdvancePayment`;
}
export function deletePaymentUrl() {
  return `${config.apiUrl}/deletePayment`;
}

