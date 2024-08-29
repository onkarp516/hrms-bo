import {
  get_receipt_invoice_last_records_Url,
  get_sundry_debtors_indirect_incomes_Url,
  get_cashAc_bank_account_details_Url,
  create_receiptUrl,
  get_receipt_list_by_company_Url,
  deleteReceiptURL,
  get_receipt_by_idURL,
  update_receiptUrl,
  get_Payment_listURL,
  delete_payments_by_url,
  getpaymentinvoicelastrecordsUrl,
  getsundrycreditorsindirectexpensesUrl,
  getcreditorspendingbillsUrl,
  create_paymentsUrl,
  get_Payment_by_idURL,
  update_payments_by_url,
  get_contra_list_by_companyUrl,
  create_contraURL,
  get_contra_by_idUrl,
  update_contraUrl,
  delete_contraUrl,
  get_last_record_contraURL,
  get_journal_list_by_companyUrl,
  delete_journalUrl,
  create_journalUrl,
  get_ledger_list_by_companyUrl,
  get_last_record_journalUrl,
  update_journalUrl,
  get_journal_by_idUrl,
  AdvancePaymentsListUrl,
  ApproveAdvancePaymentsUrl,
  RejectAdvancePaymentsUrl,
  deletePaymentUrl,
} from "@/services/api";
import { getHeader } from "@/helpers";
import axios from "axios";
import { fileHeader } from "../../helpers/authheader";

//Receipt
export function getReceiptLastRecords(requestData) {
  return axios({
    url: get_receipt_invoice_last_records_Url(),
    data: requestData,
    method: "GET",
    headers: getHeader(),
  });
}

export function get_contra_list_by_company(requestData) {
  return axios({
    url: get_contra_list_by_companyUrl(),
    data: requestData,
    method: "GET",
    headers: getHeader(),
  });
}

export function getSundryDebtorsIndirectIncome(requestData) {
  return axios({
    url: get_sundry_debtors_indirect_incomes_Url(),
    data: requestData,
    method: "POST",
    headers: fileHeader(),
  });
}

export function getCashACBankAccountDetails(requestData) {
  return axios({
    url: get_cashAc_bank_account_details_Url(),
    data: requestData,
    method: "GET",
    headers: getHeader(),
  });
}

export function create_receipts(requestData) {
  return axios({
    url: create_receiptUrl(),
    data: requestData,
    method: "POST",
    headers: fileHeader(),
  });
}

export function getReceiptListByCompany() {
  return axios({
    url: get_receipt_list_by_company_Url(),
    method: "GET",
    headers: getHeader(),
  });
}

export function deleteReceipt(requestData) {
  return axios({
    url: deleteReceiptURL(),
    data: requestData,
    method: "POST",
    headers: getHeader(),
  });
}

export function get_receipt_by_id(requestData) {
  return axios({
    url: get_receipt_by_idURL(),
    data: requestData,
    method: "POST",
    headers: fileHeader(),
  });
}

export function update_receipt(requestData) {
  return axios({
    url: update_receiptUrl(),
    data: requestData,
    method: "POST",
    headers: getHeader(),
  });
}
//Payment

export function get_Payment_list() {
  return axios({
    url: get_Payment_listURL(),
    method: "GET",
    headers: getHeader(),
  });
}

export function delete_payment(requestData) {
  return axios({
    url: delete_payments_by_url(),
    data: requestData,
    method: "POST",
    headers: getHeader(),
  });
}

export function getpaymentinvoicelastrecords(requestData) {
  return axios({
    url: getpaymentinvoicelastrecordsUrl(),
    data: requestData,
    method: "GET",
    headers: getHeader(),
  });
}

export function getsundrycreditorsindirectexpenses(requestData) {
  return axios({
    url: getsundrycreditorsindirectexpensesUrl(),
    data: requestData,
    method: "GET",
    headers: getHeader(),
  });
}

export function getcreditorspendingbills(requestData) {
  return axios({
    url: getcreditorspendingbillsUrl(),
    data: requestData,
    method: "POST",
    headers: getHeader(),
  });
}

export function create_payments(requestData) {
  return axios({
    url: create_paymentsUrl(),
    data: requestData,
    method: "POST",
    headers: fileHeader(),
  });
}

export function get_Payment_by_id(requestData) {
  return axios({
    url: get_Payment_by_idURL(),
    data: requestData,
    method: "POST",
    headers: getHeader(),
  });
}

export function update_payments(requestData) {
  return axios({
    url: update_payments_by_url(),
    data: requestData,
    method: "POST",
    headers: getHeader(),
  });
}
export function create_contra(values) {
  return axios({
    url: create_contraURL(),
    method: "POST",
    headers: fileHeader(),
    data: values,
  });
}
export function get_contra_by_id(values) {
  return axios({
    url: get_contra_by_idUrl(),
    method: "POST",
    headers: getHeader(),
    data: values,
  });
}
export function update_contra(values) {
  return axios({
    url: update_contraUrl(),
    method: "POST",
    headers: getHeader(),
    data: values,
  });
}
export function delete_contra(values) {
  return axios({
    url: delete_contraUrl(),
    method: "POST",
    headers: getHeader(),
    data: values,
  });
}
export function get_last_record_contra() {
  return axios({
    url: get_last_record_contraURL(),
    method: "GET",
    headers: getHeader(),
  });
}

//Journal

export function get_journal_list_by_company() {
  return axios({
    url: get_journal_list_by_companyUrl(),
    method: "GET",
    headers: getHeader(),
  });
}

export function delete_journal(requestData) {
  return axios({
    url: delete_journalUrl(),
    data: requestData,
    method: "POST",
    headers: getHeader(),
  });
}

export function create_journal(requestData) {
  return axios({
    url: create_journalUrl(),
    data: requestData,
    method: "POST",
    headers: fileHeader(),
  });
}

export function get_ledger_list_by_company() {
  return axios({
    url: get_ledger_list_by_companyUrl(),

    method: "GET",
    headers: getHeader(),
  });
}

export function get_last_record_journal() {
  return axios({
    url: get_last_record_journalUrl(),
    method: "GET",
    headers: getHeader(),
  });
}

export function update_journal(requestData) {
  return axios({
    url: update_journalUrl(),
    data: requestData,
    method: "POST",
    headers: getHeader(),
  });
}

export function get_journal_by_id(requestData) {
  return axios({
    url: get_journal_by_idUrl(),
    data: requestData,
    method: "POST",
    headers: getHeader(),
  });
}

//Advance Payments

export function AdvancePaymentsList(requestData) {
  return axios({
    url: AdvancePaymentsListUrl(),
    data: requestData,
    method: "POST",
    headers: getHeader(),
  });
}

export function ApproveAdvancePayments(requestData) {
  return axios({
    url: ApproveAdvancePaymentsUrl(),
    data: requestData,
    method: "POST",
    headers: getHeader(),
  });
}

export function RejectAdvancePayments(requestData) {
  return axios({
    url: RejectAdvancePaymentsUrl(),
    data: requestData,
    method: "POST",
    headers: getHeader(),
  });
}

export function deletePayment(requestData) {
  return axios({
    url: deletePaymentUrl(),
    data: requestData,
    method: "POST",
    headers: getHeader(),
  });
}