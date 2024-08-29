import {
  get_sundry_debtors_indirect_incomes_URL,
  get_employee_id_by_ledger_id_URL,
  get_salary_data_by_id_URL,
  create_emp_payrollUrl,
  getEmpSalaryslipUrl,
} from "@/services/api";
import { getHeader } from "@/helpers";
import axios from "axios";
import { fileHeader } from "../../helpers/authheader";

export function getSundryDebtorsList(requestData) {
  return axios({
    url: get_sundry_debtors_indirect_incomes_URL(requestData),
    data: requestData,
    method: "GET",
    headers: getHeader(),
  });
}

export function get_employee_id_by_ledger_id(requestData) {
  return axios({
    url: get_employee_id_by_ledger_id_URL(),
    method: "POST",
    headers: fileHeader(),
    data: requestData,
  });
}

export function get_salary_data_by_id(requestData) {
  return axios({
    url: get_salary_data_by_id_URL(),
    method: "POST",
    headers: getHeader(),
    data: requestData,
  });
}

// create_emp_payroll
export function create_emp_payroll(values) {
  return axios({
    url: create_emp_payrollUrl(),
    method: "POST",
    headers: fileHeader(),
    data: values,
  });
}

export function getEmpSalaryslip(values) {
  return axios({
    url: getEmpSalaryslipUrl(),
    method: "POST",
    headers: getHeader(),
    data: values,
  });
}
