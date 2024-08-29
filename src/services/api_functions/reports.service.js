import { getEmpMonthlyPresentyURL } from "@/services/api";
import { getHeader } from "@/helpers";
import axios from "axios";

export function getEmpMonthlyPresenty(values) {
  return axios({
    url: getEmpMonthlyPresentyURL(),
    method: "POST",
    headers: getHeader(),
    data: values,
  });
}
