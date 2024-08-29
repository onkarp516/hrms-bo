import React, { useEffect, useState, useRef } from "react";
import BackBtn from "../assets/images/back.png";
import { useLocation, useNavigate } from "react-router-dom";
import { Col, Row, Table, Form, Modal, Card, Button, Tooltip } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import edit from "../assets/images/edit.png";
import Delete from "../assets/images/delete.png";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import CustomSelect from "../components/CustomSelect";
import CustomDateInputs from "../components/CustomDateInputs";
import { Formik } from "formik";
import * as Yup from "yup";
import { isActionExist } from "../helpers/constants";
import CustomInput from "../components/CustomInputs";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  listOfEmployee,
  todayEmployeeAttendance,
  listOfShifts,
  dashboardAttendanceData,
  employeeLeaveData
} from "@/services/api_functions";
import { WithUserPermission } from "../helpers/WithUserPermission";
import images from "../utils/imageLoader";
import ResponseModal from "../components/ResponseModal";


function Dashboard(props) {
  const location = useLocation();
  const pathArray = location.pathname.split("/"); // Split the path into an array
  const name = pathArray[pathArray.length - 1]; // Get the last element of the array
  const navigate = useNavigate();
  const [employeeOptData, setEmployeeOptData] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [shift_opt, setShift_opt] = useState([]);
  const [selectedShiftId, setSelectedShiftId] = useState(null); // State to hold the selected shift ID
  const [dashboardattendancedataObject, setDashboardAttendanceDataObject] = useState("");
  const [employeeleavedataObject, setemployeeLeaveDataObject] = useState("");
  const [attendanceDate, setAttendanceDate] = useState(new Date());
  const [opt, setOpt] = useState([]);

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


  useEffect(() => {
    const getTodayDate = () => {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };
    getShiftOptions();
    getdashboardAttendanceData({ attendanceDate: getTodayDate(), shift: 1 });
    getemployeeLeaveData({ attendanceDate: getTodayDate(), shift: 1 });
  }, []);


  //Function to get Attendance Data of all 
  const getdashboardAttendanceData = (values) => {
    let requestData = {
      attendanceDate: values.attendanceDate !== "" ? moment(values.attendanceDate).format("YYYY-MM-DD") : "",
      shift: values.shift,
    };
    dashboardAttendanceData(requestData)
      .then((response) => {
        var result = response.data;
        if (result.responseStatus === 200) {
          setDashboardAttendanceDataObject(result.response);
        } else {
        // openModal("No Data Found", "error");
        }
      })
      .catch((error) => {
        openModal(error, "error");
        // setSubmitting(false);
        // openModal(error, "error");
      });
  }

  //Function to get Leave Data of all 
  const getemployeeLeaveData = (values) => {
    let requestData = {
      attendanceDate: values.attendanceDate !== "" ? moment(values.attendanceDate).format("YYYY-MM-DD") : "",
      shift: values.shift,
    };
    employeeLeaveData(requestData)
      .then((response) => {
        var result = response.data;
        if (result.responseStatus === 200) {
          setemployeeLeaveDataObject(result.response);
          setOpt(result.response.empOnLeaveArray);
        } else {
          // openModal("No Data Found", "error");
        }
      })
      .catch((error) => {
        openModal(error, "error");
        // setSubmitting(false);
        // openModal(error, "error");
      });
  }

  // Function to fetch shift options
  const getShiftOptions = () => {
    listOfShifts()
      .then((response) => {
        let res = response.data;
        if (res.responseStatus === 200) {
          let options = res.response.map(function (data) {
            return {
              value: data.id,
              label: data.shiftName,
            };
          });
          setShift_opt(options);

          // Set the selected shift ID to the first shift option if available
          if (options.length > 0) {
            setSelectedShiftId(options[0].value);
          }
        }
      })
      .catch((error) => {
        openModal(error, "error");
      });
  };

  //this if for 
  useEffect(() => {
    // Function to fetch dashboard attendance data
    const fetchDashboardAttendanceData = async () => {
      // Call getdashboardAttendanceData with the updated values
      await getdashboardAttendanceData({ attendanceDate, shift: selectedShiftId });
      await getemployeeLeaveData({ attendanceDate, shift: selectedShiftId });
    };
    // Call the function to fetch data when either attendanceDate or selectedShiftId changes
    fetchDashboardAttendanceData();
  }, [attendanceDate, selectedShiftId]);


  return (
    <div>
      {/* Reusable Modal */}
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
        <div>
          <Formik
            validateOnBlur={false}
            validateOnChange={false}
            initialValues={{
              shiftId: "",
              attendanceDate: ""
            }}
            validationSchema={Yup.object().shape({
              attendanceDate: Yup.string().trim().required(" "),
              shiftId: Yup.string().required(" "),
            })}
            onSubmit={(values, { setSubmitting }) => {

              console.log('values.shiftId.value');
              console.log(values);


              let requestData = new FormData();
              requestData.append("shiftId", shift_opt !== "" ? shift_opt.value : "");
              requestData.append(
                "attendanceDate",
                attendanceDate !== "" ? moment(attendanceDate).format("YYYY-MM-DD") : ""
              );
              todayEmployeeAttendance(requestData)
                .then((response) => {
                  var result = response.data;

                  if (result.responseStatus === 200) {
                    console.log('200');
                    setAttendanceData(result.response);
                  } else {
                    openModal(response.data.message, "error");
                  }
                })
                .catch((error) => {
                  setSubmitting(false);
                  openModal(error, "error");
                });
            }}
            render={({ errors, status, touched, isSubmitting, handleChange, handleSubmit, setFieldValue, values, handleBlur }) => (
              <Form onSubmit={handleSubmit}>
                <Row className="list-heading" style={{ height: "70px" }}>
                  <div className="col-lg-1 list-head-fields" >
                    <div class="textOnInput">
                      <img
                        src={images["./calendar.png"]}
                        alt=""
                        className="sidebar-nested-logo-pop-up dashboard-img"
                      />
                    </div>
                  </div>
                  <div className="col-lg-1 list-head-fields" >
                    <div class="textOnInput-dashboard1">
                      Date :
                    </div>
                  </div>
                  <div className="col-lg-2 list-head-fields" >
                    <div class="textOnInput">
                      <DatePicker
                        selected={attendanceDate}
                        // onChange={(date) => setSelectedDate(date)}
                        dateFormat="dd-MM-yyyy"
                        className={`form-control ${errors.fromDate ? 'is-invalid' : ''} textOnInput-dashboard-field1`}
                        maxDate={new Date()} // Set max date to prevent future dates
                        value={attendanceDate}
                        onChange={(date) => {
                          setAttendanceDate(date);
                          // getDashboardFun();
                        }}
                        name="attendanceDate"
                        id="attendanceDate"
                      />
                    </div>
                  </div>
                  <div className="col-lg-1 list-head-fields" >
                    <div class="textOnInput-dashboard2">
                      Shift :
                    </div>
                  </div>

                  <div className="col-lg-2 list-head-fields" >
                    <div class="textOnInput">
                      <CustomSelect
                        // label="Level"
                        className={`form-control ${touched.shiftId && errors.shiftId ? "is-invalid" : ""} textOnInput-dashboard-field2`}
                        id="shiftId"
                        name="shiftId"
                        data={shift_opt}
                        value={selectedShiftId} // Set the default value to the selectedShiftId state
                        onChange={(e) => {
                          setSelectedShiftId(e.target.value); // Update the selectedShiftId state
                          handleChange(e);
                        }}
                        onBlur={handleBlur}
                      />
                    </div>
                  </div>
                  <div className="col-lg-1 list-head-fields" >
                    <div class="textOnInput">

                    </div>
                  </div>
                  {/* <div className="col-lg-1">
                    <div class="textOnInput">


                    </div>
                  </div> */}
                  <div className="col-md-4 dashboard-card-col">
                    <div className="card dashboard-card1">
                      <div className="card-body card-body">
                        <p className="dashboard-card-txt-p">Leave Status  <img
                          src={images["./leave-status.png"]}
                          alt=""
                          className="sidebar-nested-logo-pop-up"
                          style={{ height: "30px", margin: "2px" }}
                        /></p>
                        <Row>
                          <div className="col-lg-6">
                            <div className="col-md-4 dashboard-card-col">
                              <div className="card dashboard-card" style={{ height: "121px" }}>
                                <div className="card-body card-body1">
                                  <p className="dashboard-card-txt">Pending Request : </p>
                                  <span className="card-span" style={{
                                    marginLeft: "162px", fontSize: "43px"
                                  }}>{employeeleavedataObject.pendingCount ? employeeleavedataObject.pendingCount : 0}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="col-md-4 dashboard-card-col">
                              <div className="card dashboard-card" style={{ height: "121px", marginLeft: "45px" }}>
                                <div className="card-body card-body1">
                                  <p className="dashboard-card-txt">Approved Request : </p>
                                  <span className="card-span" style={{
                                    marginLeft: "162px", fontSize: "43px"
                                  }}>{employeeleavedataObject.approvedCount ? employeeleavedataObject.approvedCount : 0}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <p></p>
                          <p className="dashboard-card-txt-p">Employees On Leave : </p>
                        </Row>
                        <Row>
                          {/* <div className="col-lg-12"> */}
                          <div className="col-md-4 dashboard-card-col">
                            <div className="card dashboard-card" style={{ height: "530px", marginLeft: "50px" }}>
                              <div className="card-body card-body1" style={{ width: "480px" }}>
                                <Row>
                                  <div className="col-lg-6">
                                    {opt.length > 0 ? (
                                      opt.map((v, i, record) => (
                                        <p className="dashboard-card-txt-card">{v.name}</p>
                                      ))
                                    ) : (
                                      <p className="dashboard-card-txt-card">No Data Found </p>
                                    )}
                                  </div>
                                  {/* <div className="col-lg-6">
                                    {opt.length > 0 ? (
                                      opt.map((v, i, record) => (
                                        <p className="dashboard-card-txt-card">Approved Request : </p>
                                      ))
                                    ) : (
                                      <p className="dashboard-card-txt-card"></p>
                                    )}
                                  </div> */}
                                </Row>
                              </div>
                            </div>
                          </div>
                          {/* </div> */}

                        </Row>
                      </div>
                    </div>
                  </div>
                </Row>
                {/* Cards */}
                <div className="col-md-8">
                  <Row className="list-heading">
                    <div className="col-md-4 dashboard-card-col">
                      <div className="card dashboard-card">
                        <div className="card-body card-body">
                          <p className="dashboard-card-txt">Total No</p>
                          <p className="dashboard-card-txt1">of Employee :</p>
                          <img
                            src={images["./card-employee.png"]}
                            alt=""
                            className="sidebar-nested-logo-pop-up"
                            style={{ marginTop: "20px", height: "50px" }}
                          />
                          <span className="card-span">{dashboardattendancedataObject.totalEmp ? dashboardattendancedataObject.totalEmp : 0}</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 dashboard-card-col">
                      <div className="card dashboard-card">
                        <div className="card-body card-body">
                          <p className="dashboard-card-txt">Total Present : </p>
                          <img
                            src={images["./card-employee.png"]}
                            alt=""
                            className="sidebar-nested-logo-pop-up"
                            style={{ marginTop: "40px", height: "50px" }}
                          />
                          <span className="card-span">{dashboardattendancedataObject.totalPresent ? dashboardattendancedataObject.totalPresent : 0}</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 dashboard-card-col">
                      <div className="card dashboard-card">
                        <div className="card-body card-body">
                          <p className="dashboard-card-txt">Todays Absent : </p>
                          <img
                            src={images["./card-employee.png"]}
                            alt=""
                            className="sidebar-nested-logo-pop-up"
                            style={{ marginTop: "40px", height: "50px" }}
                          />
                          <span className="card-span">{dashboardattendancedataObject.totalAbsent ? dashboardattendancedataObject.totalAbsent : 0}</span>
                        </div>
                      </div>
                    </div>
                  </Row>
                </div>
              </Form>
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default WithUserPermission(Dashboard);