import React, { useEffect, useState } from "react";
import AddBtn from "../../assets/images/MenuButton.png";
import BackBtn from "../../assets/images/back.png";
import { Link, json, useLocation, useNavigate } from "react-router-dom";
import { Col, Row, Table, Form, Modal, Card, Button } from "react-bootstrap";
import * as Yup from "yup";
import { Formik, ErrorMessage } from "formik";
import edit from "../../assets/images/edit.png";
import Delete from "../../assets/images/delete.png";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import CustomInput from "../../components/CustomInputs";
import {
  get_employee_id_by_ledger_id,
  getEmpSalaryslip,
  create_emp_payroll,
} from "@/services/api_functions";
import moment from "moment";
import CustomSelect from "../../components/CustomSelect";
import { isActionExist } from "../../helpers/constants";
import { WithUserPermission } from "../../helpers/WithUserPermission";
import CustomToggleSwitchForModal from "../../components/CustomToggleSwitchForModal";
import CustomDateInputs from "../../components/CustomDateInputs";
import { listOfEmployee } from "../../services/api_functions";
import ResponseModal from "../../components/ResponseModal";

function SalaryProcess(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const pathArray = location.pathname.split("/"); // Split the path into an array
  const name = pathArray[pathArray.length - 1]; // Get the last element of the array
  const [leaveMasterObject, setLeaveMasterObject] = useState("");
  const [leaveMaster, setLeaveMaster] = useState([]);
  const [filteredLeaveMaster, setFilteredLeaveMaster] = useState([]);
  const [employeeIdData, setEmployeeIdData] = useState([]);
  const [salaryProcessData, setSalaryProcessData] = useState([]);
  const [month, setmonth] = useState([]);
  const [filteredSalaryProcess, setFilteredSalaryProcess] = useState([]);
  const [opt, setOpt] = useState([]);
  const [empOpt, setEmpOpt] = useState([]);
  const [manualAttendanceOptData, setManualAttendanceOptData] = useState([]);

  const [ResModal, setResModal] = useState(false);
  const [ResText, setResText] = useState(false);
  const [LogoType, setLogoType] = useState("");
  const [rowId, setrowId] = useState();

  useEffect(() => {
    // This effect will run whenever resText changes
    if (ResText) {
      // Check if ResText is not empty, and then open the modal
      setResModal(true);
    }
  }, [ResText]);

  const openModal = (text, logo_type, id) => {
    // Update the state to set the text
    setLogoType(logo_type);
    setResText(text);
    setrowId(id)
  };


  // Function to close the modal
  const closeModal = () => {
    setResModal(false);
    setResText("");
    // navigate("/Dashboard/Tranx/receipt");
  };

  // Function to handle form submission with confirmation
  const handleConfirmSubmit = () => {
    // handleSubmit();
    // onDelete(rowId)
    closeModal(); // Close the modal after submission
  };
  // ... (other methods)

  const getEmpOptions = () => {
    listOfEmployee()
      .then((response) => {
        let res = response.data;

        if (res.responseStatus === 200) {
          let result = res.response;
          let opt = [
            {
              value: "all",
              label: "All",
            },
          ];

          result.forEach((data) => {
            opt.push({
              value: data.id,
              label: data.employeeName,
            });
          });

          setEmpOpt(opt);
        }
      })
      .catch((error) => {
        openModal(error, "error");
      });
  };

  //get Employee List for selection
  const getEmployeeList = () => {
    listOfEmployee()
      .then((response) => {
        let res = response.data;
        if (res.responseStatus == 200) {
          let options = res.response.map(function (data) {
            return {
              value: data.id,
              label: data.employeeName,
            };
          });
          setManualAttendanceOptData(options);
        }
      })
      .catch((error) => {
        openModal(error, "error");
      });
  };

  //Original useEffect which getting gets called First when Page gets Load.
  useEffect(() => {
    getEmployeeList();
    getEmpOptions();
    // getSalaryProcessDataById();
  }, []);

  //Callback useEffect for getting the Employee ID on Page load and also its data
  // useEffect(() => {
  //   getSalaryProcessList();
  // }, [employeeIdData]);

  //Get
  const getSalaryProcessDataById = () => {
    let formData = new FormData();
    formData.append("ledger_id", 1);
    get_employee_id_by_ledger_id(formData)
      .then((response) => {
        if (response.status == 200) {
          let res = response.data;
          let option = res.employee_id;
          console.log("object", option);
          setEmployeeIdData(option);
        }
      })
      .catch((error) => {
        openModal(error, "error");
      });
  };

  //List API Function
  const getSalaryProcessList = () => {
    let year = new Date().getFullYear();
    let month = new Date().getMonth();
    if (month === 0) {
      month = 12;
      year = year - 1;
    }
    const monthStr = month < 10 ? "0" + month : month;
    const yearMonth = year + "-" + monthStr;
    setmonth(yearMonth);

    let requestData = {
      employeeId: employeeIdData,
      fromMonth: yearMonth, //yearMonth,
    };
    getEmpSalaryslip(requestData)
      .then((response) => {
        let res = response.data;
        if (res.responseStatus === 200) {
          setSalaryProcessData(res.response);
          setFilteredSalaryProcess(res);
          setOpt(res.response.payheadArray);
        }
      })
      .catch((error) => {
        openModal(error, "error");
        setSalaryProcessData([]);
        setFilteredSalaryProcess([]);
      });
  };

  return (
    <div>
      <ResponseModal
        isOpen={ResModal}
        onRequestClose={closeModal}
        onConfirm={() => handleConfirmSubmit()}
        text={`${ResText}`}
        LogoType={`${LogoType}`}
      />
      <div
        className="content-wrapper scrollable-div"
        style={{ position: "fixed", width: "96%" }}
      >
        <div className="pagePathLayout row">
          <div className="col-lg-11 header-title">
            <span className="bold">{location.pathname}</span>
          </div>
        </div>

        <div className="col-lg-12 path-label">
          <span>{name}</span>
        </div>
        <div className="col-lg-12 path-label2">
          <span>Manage All {name} Related Information</span>
        </div>

        <div>
          <Formik
            initialValues={{
              fromMonth: "",
              employeeId: "",
            }}
            validationSchema={Yup.object().shape({
              fromMonth: Yup.string().required(" "),
              employeeId: Yup.string().trim().required(" "),
            })}
            onSubmit={(values, { setSubmitting }) => {

              let requestData = {
                fromMonth: values.fromMonth,
                employeeId: values.employeeId,
              };
              getEmpSalaryslip(requestData)
                .then((response) => {

                  if (response.data.responseStatus === 200) {
                    let res = response.data;
                    // setEmployeeIdData(option);
                    // setSalaryProcessData(option);
                    setSalaryProcessData(res.response);
                    setOpt(res.response.payheadArray);
                  }
                  else {
                    openModal("No Data Found", "error");
                  }
                  // if (result.responseStatus === 200) {
                  //   console.log("200");
                  //   setManualAttendanceObject(result.response);
                  // } else {
                  // }
                })
                .catch((error) => {
                  setSubmitting(false);
                  openModal(error, "error");
                });
            }}
            render={({
              errors,
              status,
              touched,
              isSubmitting,
              handleChange,
              handleSubmit,
              setFieldValue,
              values,
              handleBlur,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Row className="list-heading">
                  <div className="col-lg-2 list-head-fields">
                    <div class="textOnInput">
                      <CustomDateInputs
                        className={`form-control ${
                          errors.fromMonth ? "is-invalid" : ""
                        }`}
                        label="Select Month"
                        type="month"
                        id="fromMonth"
                        name="fromMonth"
                        value={values.fromMonth}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                  </div>

                  <div className="col-lg-2 list-head-fields">
                    <div class="textOnInput">
                      <CustomSelect
                        className={`form-control ${
                          touched.employeeId && errors.employeeId
                            ? "is-invalid"
                            : ""
                        }`}
                        type="text"
                        id="employeeId"
                        name="employeeId"
                        data={empOpt}
                        label="Employee Name"
                        value={values.employeeId}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isSearchable={true}
                      />
                    </div>
                  </div>

                  <div className="col-lg-1">
                    <div class="textOnInput">
                      <Button
                        style={{ marginTop: "30px" }}
                        className="modal-submit-btn"
                        type="submit"
                      >
                        Show
                      </Button>
                    </div>
                  </div>
                </Row>
              </Form>
            )}
          />
        </div>

        <div className="salary-process-block">
          {salaryProcessData && Object.keys(salaryProcessData).length ? (
            <Row style={{ justifyContent: "center" }}>
              <Col md="5" className="">
                <Table hover>
                  <thead className="text-center">
                    <tr>
                      <th colSpan={2}>
                        ID : {salaryProcessData.employeeId}
                        <br />
                        Employee : {salaryProcessData.employeeName}
                        <br />
                        Designation : {salaryProcessData.designation}
                        <br />
                        Mobile No : {salaryProcessData.mobileNo}
                        <br />
                        Address : {salaryProcessData.address}
                      </th>
                    </tr>
                    <tr>
                      <th>
                        Month :{" "}
                        {month != null ? moment(month).format("MMM yyyy") : ""}
                      </th>

                      <th>Net Salary: {salaryProcessData.netPayableAmount}</th>
                    </tr>
                  </thead>
                  <tbody style={{ fontWeight: "500" }} className="view_salary">
                    <tr>
                      <td>Total Days</td>
                      <td style={{ color: "#83b7d1" }}>
                        {salaryProcessData.totalDaysInMonth}
                      </td>
                    </tr>
                    <tr>
                      <td>Monthly Payment</td>
                      <td style={{ color: "#83b7d1" }}>
                        {salaryProcessData.monthlyPay}
                      </td>
                    </tr>

                    <tr>
                      <td>Per Day Wages</td>
                      <td style={{ color: "#83b7d1" }}>
                        {/* {salaryProcessData.perDaySalary} */}
                        {salaryProcessData["perDaySalary"]
                          ? salaryProcessData["perDaySalary"].toFixed(2)
                          : ""}
                      </td>
                    </tr>

                    <tr>
                      <td>Present Days</td>
                      <td style={{ color: "#83b7d1" }}>
                        {salaryProcessData.noDaysPresent}
                      </td>
                    </tr>
                    {opt && opt.length > 0 ? (
                      opt.map((v, i, record) => (
                        <tr>
                          <td>{v.ledgerName}</td>
                          <td style={{ color: "#83b7d1" }}>{v.amount}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td></td>
                      </tr>
                    )}
                    <tr>
                      <td>Over Time</td>
                      <td style={{ color: "#83b7d1" }}>
                        {salaryProcessData.overtimeAmount}
                      </td>
                    </tr>
                    <tr>
                      <td>Gross Total</td>
                      <td style={{ color: "#83b7d1" }}>
                        {/* {salaryProcessData.grossTotal} */}
                        {salaryProcessData["grossTotal"]
                          ? salaryProcessData["grossTotal"].toFixed(2)
                          : ""}
                      </td>
                    </tr>
                    <tr>
                      <td>Total Deduction</td>
                      <td style={{ color: "#83b7d1" }}>
                        {salaryProcessData.totalDeduction}
                      </td>
                    </tr>
                    <tr>
                      <td>Net Amount</td>
                      <td style={{ color: "#83b7d1" }}>
                        {salaryProcessData["neySalary"]
                          ? salaryProcessData["neySalary"].toFixed(2)
                          : ""}
                      </td>
                    </tr>
                    <tr
                      style={{
                        borderBottom: "2px solid #dcdcdc",
                        borderTop: "2px solid #dcdcdc",
                      }}
                    >
                      <td style={{ fontWeight: "bold" }}>Payable Amount</td>
                      <td style={{ color: "#83b7d1" }}>
                        {salaryProcessData.payableAmount}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
          ) : (
            <tr>
              <td colSpan={7} className="text-center">
                No Data Found
              </td>
            </tr>
          )}
          <Row>
            <Col md="12" style={{ textAlign: "end" }}>
            </Col>
          </Row>
          {/* </CardBody> */}
        </div>
      </div>
    </div>
  );
}

export default WithUserPermission(SalaryProcess);
