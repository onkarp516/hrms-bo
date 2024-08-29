import React, { useEffect, useState, useRef } from "react";
import AddBtn from "../../assets/images/MenuButton.png";
import BackBtn from "../../assets/images/back.png";
import { useLocation, useNavigate } from "react-router-dom";
import { Col, Row, Table, Form, Modal, Card, Button, Tooltip } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import edit from "../../assets/images/edit.png";
import Delete from "../../assets/images/delete.png";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import CustomSelect from "../../components/CustomSelect";
import CustomDateInputs from "../../components/CustomDateInputs";
import { Formik } from "formik";
import * as Yup from "yup";
import { isActionExist } from "../../helpers/constants";
import CustomInput from "../../components/CustomInputs";
import {
  listOfEmployee,
  todayEmployeeAttendance,
  approveAttendance,
  updateAttendance,
  deleteAttendance,
} from "@/services/api_functions";
import { WithUserPermission } from "../../helpers/WithUserPermission";
import ResponseModal from "../../components/ResponseModal";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";


function AttendanceApproval(props) {
  const location = useLocation();
  const pathArray = location.pathname.split("/"); // Split the path into an array
  const name = pathArray[pathArray.length - 1]; // Get the last element of the array
  const [payment, setPayment] = useState([]);
  const [filteredPayment, setFilteredPayment] = useState([]);
  const navigate = useNavigate();
  const [employeeOptData, setEmployeeOptData] = useState([]);

  const [atttendanceOpt, setAttendanceOpt] = useState([
    { value: "approve", label: "Approve", visible: false },
    { value: "pending", label: "Pending", visible: false },
  ]);

  const secureData = JSON.parse(localStorage.getItem("loginUser"));
  const salaryForm = useRef(null);
  const [attDate, setAttDate] = useState("");
  const [intime, setInTime] = useState("");
  const [out, setOut] = useState("");
  const [total, setTotal] = useState("");
  const [lunch, setLunch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [machineOpts, setMachineOpts] = useState([]);
  const [jobOpts, setJobOpts] = useState([]);
  const [workBreakOpts, setWorkBreakOpts] = useState([]);
  const [jobOperationOpts, setjobOperationOpts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [attEditModalShow, setAttEditModalShow] = useState(false);
  const [taskModal, setTaskModalShow] = useState(false);
  const [salaryApprovalModal, setSalaryApprovalModal] = useState(false);
  const [imageShow, setImageShow] = useState(false);
  const [CheckList, setCheckList] = useState([]);

  const [attendanceData, setAttendanceData] = useState([]);
  let [mainData, setMainData] = useState("");
  const [mainInnerData, setMainInnerData] = useState("");
  const [breakData, setBreakData] = useState([]);
  const [breakInnerData, setBreakInnerData] = useState("");
  const [machineInnerData, setMachineInnerData] = useState("");
  const [attendanceInit, setAttenanceInit] = useState({
    attendanceId: "",
    attendanceDate: "",
    employeeName: "",
    checkInTime: "",
    checkOutTime: "",
    totalTime: "",
    employeeWagesType: "",
    wagesHourBasis: 0,
    wagesPcsBasis: 0,
    breakWages: 0,
    netPcsWages: 0,
    wagesPointBasis: 0,
    wagesPerDay: 0,
  });

  const [orgData, setOrgData] = useState([]);
  const [employeeId, setEmployeeId] = useState("");
  const [employeeIdStatus, setEmployeeIdStatus] = useState(false);
  const [attStatus, setAttStatus] = useState("");
  const [empOpts, setEmpOpts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [rowid, setRowId] = useState([]);
  const [employeeWagesType, setEmployeeWagesType] = useState([]);
  const [wagesPerDay, setWagesPerDay] = useState([]);
  const [wagesPerHour, setWagesPerHour] = useState([]);
  const [wagesHourBasis, setWagesHourBasis] = useState([]);
  const [taskInit, setTaskInit] = useState({
    taskId: "",
    taskType: 0,
    employeeName: "",
    startTime: "",
    endTime: "",
    breakName: "",
    workDone: "",
    remark: "",
    workBreakId: "",
    machineId: "",
    jobId: "",
    jobOperationId: "",
    lunchTime: "",
    machineStartCount: "",
    machineEndCount: "",
    totalCount: "",
    actualProduction: "",
    cycleTime: 0,
    pcsRate: 0,
    averagePerShift: 0,
    pointPerJob: 0,
    totalQty: 0,
    reworkQty: 0,
    machineRejectQty: 0,
    doubtfulQty: 0,
    unMachinedQty: 0,
    okQty: 0,
    settingTimeInMin: 0,
  });
  const [openRow, setOpenRow] = useState(null);
  const [deptList, setdeptList] = useState([]);
  const [Submitting, setSubmitting] = useState([]);
  const [yo, setyo] = useState([""]);

  const [ResModal, setResModal] = useState(false);
  const [ResText, setResText] = useState(false);
  const [LogoType, setLogoType] = useState("");
  const [rowId, setrowId] = useState();
  const [DeleteConfirmation, setDeleteConfirmation] = useState();
  const [DeleteId, setDeleteId] = useState()

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

  //Modal for Delete
  const openModalForDelete = (id) => {
    setDeleteId(id);
    setDeleteConfirmation(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setResModal(false);
    setDeleteConfirmation(false);
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



  useEffect(() => { getEmployeeList(); }, []);

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
          setEmployeeOptData(options);
        }
      })
      .catch((error) => {
        openModal(error, "error");
      });
  };

  const getAttendanceData = (values) => {
    setIsLoading(true);
    let reqData = {
      fromDate: values.fromDate,
      employeeId: values.employeeId,
      attStatus: values.attStatus,
      attendanceDate: values.attendanceDate
    };
    todayEmployeeAttendance(reqData)
      .then((response) => {
        setIsLoading(false);
        let res = response.data;
        if (res.responseStatus == 200) {
          setAttendanceData(res.response)
          setOrgData(res.response);
          if (employeeId != "") {
            setEmployeeIdStatus(true);
          }
        } else {
          openModal(res.message + "error");
          setAttendanceData([]);
          setOrgData([]);
        }
        setMainData("");
        setMainInnerData("");
        setBreakInnerData("");
        setMachineInnerData("");
      })
      .catch((error) => {
        openModal(error, "error");
      });
  };

  //Approve Modal
  const handleAddNew = (id, type, day, hour, hourbasis) => {
    setRowId(id);
    setEmployeeWagesType(type);
    setWagesPerDay(day);
    setWagesPerHour(hour);
    setWagesHourBasis(hourbasis);
    setShowModal(true);
  };

  //Approve Modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  //Edit Modal
  const handleAddNewEdit = (id, date, intime, out, total, lunch) => {
    setRowId(id);
    setAttDate(date);
    setInTime(intime);
    setOut(out);
    setTotal(total);
    setLunch(lunch);
    setShowModalEdit(true);
  };

  //Edit Modal
  const handleCloseModalEdit = () => {
    setShowModalEdit(false);
  };

  const handleCheckboxSelection = (
    e,
    id,
    index,
    employeeWagesType,
    wagesPerDay
  ) => {
    const { name, checked } = e.target; // Use "checked" instead of "value" for checkboxes
    if (name === "all") {
      let opt = [];
      attendanceData.map((v) => {
        opt.push({
          ...v,
          attendanceStatus: v.isAttendanceApproved == true ? true : checked,
        });
      });

      setAttendanceData(opt);
    } else {
      const list = [...attendanceData];
      // Update the specific object in the array
      list[index] = {
        ...list[index],
        attendanceStatus: checked,
      };
      setAttendanceData(list);
    }
  };

  //Calculation of Start time and End time = total time 
  const calculateTime = (values, setFieldValue) => {
    let { checkInTime, checkOutTime } = values;

    if (checkInTime !== "" && checkOutTime !== "") {
      var dt1 = new Date(checkInTime);
      var dt2 = new Date(checkOutTime);

      if (!isNaN(dt1.getTime()) && !isNaN(dt2.getTime())) {
        if (dt2 > dt1) {
          var diff = dt2.getTime() - dt1.getTime();
          var hours = Math.floor(diff / (1000 * 60 * 60));
          diff -= hours * (1000 * 60 * 60);
          var mins = Math.floor(diff / (1000 * 60));
          diff -= mins * (1000 * 60);

          hours = String(hours).padStart(2, "0");
          mins = String(mins).padStart(2, "0");
          var result = hours + ":" + mins;

          setFieldValue("checkInTime", checkInTime);
          setFieldValue("checkOutTime", checkOutTime);
          setFieldValue("totalTime", result);
        } else {
          openModal("Checkout time is less than Checkin time", "error");
          setFieldValue("checkOutTime", "");
          setFieldValue("totalTime", "");
        }
      } else {
        openModal("Invalid date/time format", "error");
        setFieldValue("checkOutTime", "");
        setFieldValue("totalTime", "");
      }
    } else {
      setFieldValue("checkOutTime", "");
      setFieldValue("totalTime", "");
    }
  }


  //this function blocks the next coming date and gives option to select todays and previous dates only
  const getFormattedMaxDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  //this function blocks the next coming date and gives option to select todays and previous dates and time only
  const getFormattedMaxDateTime = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const hours = String(today.getHours()).padStart(2, '0');
    const minutes = String(today.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  //Delete API Function
  const onDelete = (id) => {
      let formData = new FormData();
      formData.append("attendanceId", id);
      deleteAttendance(formData).then((response) => {
        if (response.data.responseStatus === 200) {
          openModal(response.data.message, "cnf");
          // getAttendanceData();
        }
        else {
          openModal(response.data.message, "error");
        }
      })
        .catch((error) => {
          openModal(error, "error");
        });
  }

  const validateBooleanData = (data) => {
    if (data && data.length > 0) {
      var filteredData = (data.filter((v) => v.isAttendanceApproved == false || v.isAttendanceApproved == null || v.isAttendanceApproved === undefined))

    }
    return filteredData && filteredData.length > 0 ? false : true;
  };

  const getAll = (values) => {
    let requestData = {
      fromDate: values.fromDate,
      employeeId: values.employeeId,
      attStatus: values.attStatus,
      attendanceDate: values.attendanceDate
    };

    setyo(requestData);
    todayEmployeeAttendance(requestData)
      .then((response) => {
        var result = response.data;

        if (result.responseStatus === 200) {
          setAttendanceData(result.response);
        } else {
          openModal("No Data Found", "error");
        }
      })
      .catch((error) => {
        setSubmitting(false);
        openModal(error + "error");
      });
  }

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

      <DeleteConfirmationModal
        DeleteConfirmationModal={DeleteConfirmation}
        onRequestClose={closeModal}
        onConfirm={() => onDelete(DeleteId)}
        text={`Are you sure you want to Delete ?`}
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
            validateOnBlur={false}
            validateOnChange={false}
            initialValues={{
              fromDate: "",
              employeeId: "",
              attStatus: "",
              attendanceDate: ""
            }}
            validationSchema={Yup.object().shape({
              fromDate: Yup.string().trim().required(" "),
              attendanceDate: Yup.string().trim().required(" "),
              employeeId: Yup.string().required(" "),
            })}
            onSubmit={(values, { setSubmitting }) => {
              getAll(values)
              // let requestData = {
              //   fromDate: values.fromDate,
              //   employeeId: values.employeeId,
              //   attStatus: values.attStatus,
              //   attendanceDate: values.attendanceDate
              // };
              // todayEmployeeAttendance(requestData)
              //   .then((response) => {
              //     var result = response.data;

              //     if (result.responseStatus === 200) {
              //       console.log('200');
              //       setAttendanceData(result.response);
              //     } else {
              //       openModal("No Data Found", "error");
              //     }
              //   })
              //   .catch((error) => {
              //     setSubmitting(false);
              //     openModal(error + "error");
              //   });
            }}
            render={({ errors, status, touched, isSubmitting, handleChange, handleSubmit, setFieldValue, values, handleBlur }) => (
              <Form onSubmit={handleSubmit}>
                <Row className="list-heading">
                  <div className="col-lg-1 list-head-fields" >
                    <div class="textOnInput">
                      ATTENDANCE
                    </div>
                  </div>
                  <div className="col-lg-2 list-head-fields" >
                    <div class="textOnInput">
                      <CustomDateInputs className={`form-control ${errors.fromDate ? 'is-invalid' : ''}`}
                        type="date"
                        id="fromDate"
                        label="From Date"
                        name="fromDate"
                        value={values.fromDate}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        max={getFormattedMaxDate()} // Set the max attribute to block future dates
                      />
                    </div>
                  </div>
                  <div className="col-lg-2 list-head-fields" >
                    <div class="textOnInput">
                      <CustomDateInputs className={`form-control ${errors.attendanceDate ? 'is-invalid' : ''}`}
                        type="date"
                        id="attendanceDate"
                        label="To Date"
                        name="attendanceDate"
                        value={values.attendanceDate}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        max={getFormattedMaxDate()} // Set the max attribute to block future dates
                      />
                    </div>
                  </div>

                  <div className="col-lg-2 list-head-fields" >
                    <div class="textOnInput">
                      <CustomSelect className={`form-control ${errors.employeeId ? 'is-invalid' : ''}`}
                        type="text"
                        id="employeeId"
                        name="employeeId"
                        data={employeeOptData}
                        label="Employee Name"
                        value={values.employeeId}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isSearchable={true}
                      />
                    </div>
                  </div>
                  <div className="col-lg-2 list-head-fields" >
                    <div class="textOnInput">
                      <CustomSelect className={`form-control ${touched.attStatus && errors.attStatus ? 'is-invalid' : ''}`} type="text" id="attStatus"
                        name="attStatus"
                        data={atttendanceOpt}
                        label="Status"
                        value={values.attStatus}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isSearchable={true}
                      />
                    </div>
                  </div>

                  <div className="col-lg-1">
                    <div class="textOnInput">

                      <Button
                        style={{ marginTop: '30px' }}
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
        <div>
          <Formik
            validateOnBlur={false}
            validateOnChange={false}
            initialValues={{
              fromDate: "",
              employeeId: "",
              attStatus: "",
              attendanceDate: "",
              all: "false"
            }}
            // validationSchema={Yup.object().shape({
            //   fromDate: Yup.string().trim().required(" "),
            //   attendanceDate: Yup.string().trim().required(" "),
            //   employeeId: Yup.string().required(" "),
            // })}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              const filteredArray = attendanceData.filter(
                (item) => item.attendanceStatus != false && item.isAttendanceApproved != true
              );
              let formData = new FormData();
              formData.append("list", JSON.stringify(filteredArray));
              approveAttendance(formData)
                .then((response) => {
                  if (response.data.responseStatus === 200) {

                    // setSubmitting(false);
                    resetForm();
                    openModal(response.data.message, "cnf");
                    // setShowModal(false)
                    // getAttendanceData();
                    getAll(yo);
                  } else {
                    setSubmitting(false);
                    openModal(response.data.message, "error");
                  }
                })
                .catch((error) => {
                  openModal(error, "error");
                  setSubmitting(false);
                });

            }}
            render={({ errors, status, touched, isSubmitting, handleChange, handleSubmit, setFieldValue, values, handleBlur }) => (
              <Form onSubmit={handleSubmit}>
                <Row className="list-heading">
                  <div className="col-lg-1 list-head-fields" >
                    <div class="textOnInput">
                      <Form.Label >
                        <input
                          name="all"
                          id="all"
                          type="checkbox"
                          disabled={validateBooleanData(attendanceData)}
                          onChange={(e) => {
                            handleCheckboxSelection(
                              e
                              // v.id,
                              // i,
                              // v.employeeWagesType,
                              // v.wagesPerDay,
                            );
                          }}
                          style={{ marginTop: "25px" }}
                        />
                        <span style={{ marginLeft: "5px", marginBottom: "2px" }}>Select all</span>
                      </Form.Label>
                    </div>
                  </div>


                  <div className="col-lg-1">
                    <div class="textOnInput">

                      <Button
                        style={{ marginTop: '30px' }}
                        className="modal-submit-btn"
                        type="submit"
                        disabled={validateBooleanData(attendanceData)}
                      >
                        Approve
                      </Button>
                    </div>
                  </div>
                </Row>
              </Form>
            )}
          />
        </div>

        <div className=" scrollable-div-page">
          <Row>
            <Col className="list-table">
              <Table className="table-hover">
                <thead className="list-thead">
                  <tr>
                    {/* <th className="table-th text-light"></th> */}
                    <th className="table-th text-light">Select</th>
                    <th className="table-th text-light">Sr No.</th>
                    <th className="table-th text-light">Date</th>
                    <th className="table-th text-light">Employee Name</th>
                    <th className="table-th text-light">In</th>
                    <th className="table-th text-light">Out</th>
                    <th className="table-th text-light">Total Time</th>
                    <th className="table-th text-light">Break Time</th>
                    <th className="table-th text-light">Remark</th>
                    <th className="table-th text-light"></th>
                    <th className="table-th text-light">Actions</th>
                  </tr>
                </thead>

                <tbody style={{ maxHeight: "300px", overflowY: "auto" }}>
                  {attendanceData &&
                    attendanceData.map((v, i) => {
                      return (
                        <>
                          <tr>
                            {/* <td> <FontAwesomeIcon
                              icon={faCheck}
                              className="img-delete"
                            /></td> */}
                            <td>  <input
                              name="attendanceStatus"
                              type="checkbox"
                              checked={v.attendanceStatus}
                              disabled={v.isAttendanceApproved == true ? true : false}
                              onChange={(e) => {
                                handleCheckboxSelection(
                                  e,
                                  v.id,
                                  i,
                                  v.employeeWagesType,
                                  v.wagesPerDay
                                );
                              }}
                              style={{ marginTop: "5px" }}
                            /></td>
                            <td>{i + 1}</td>
                            <td>{v.attendanceDate}</td>
                            <td> {v.employeeName} ({v.designationCode})</td>
                            <td>{v.checkInTime != "" ? (
                              <>
                                {moment(v.checkInTime).format("HH:mm:ss")}
                              </>
                            ) : (
                              ""
                            )}</td>
                            <td> {v.checkOutTime != "" ? (
                              <>
                                {moment(v.checkOutTime).format("HH:mm:ss")}
                              </>
                            ) : (
                              ""
                            )}</td>
                            <td> {v.totalTime != "" ? (
                              <>
                                {moment(v.totalTime).format("HH:mm:ss")}
                              </>
                            ) : (
                              ""
                            )}</td>
                            <td>{v.overtime}</td>
                            <td>{v.remark}</td>
                            <td></td>
                            {/* <td>{v.adminRemark}</td> */}
                    <td>
                              {v.isAttendanceApproved === true ? <td></td> : (
                      <td align="right">
                                {isActionExist("attendance-approval", "create", props.userPermissions) && (
                        <FontAwesomeIcon
                          icon={faCheck}
                          className="img-delete"
                                    onClick={() => handleAddNew(v.id, v.employeeWagesType, v.wagesPerDay, v.wagesPerHour, v.wagesHourBasis)}
                        />
                                )}
                                {isActionExist(
                                  "attendance-approval",
                                  "delete",
                                  props.userPermissions
                                ) && (
                        <img
                          src={Delete}
                          alt=""
                          className="img-delete"
                                      onClick={() => openModalForDelete(v.id)}
                                    />)}{" "}
                                {isActionExist(
                                  "attendance-approval",
                                  "edit",
                                  props.userPermissions
                                ) && ( 
                        <img
                          src={edit}
                          alt=""
                          className="img-edit"
                                      onClick={() => handleAddNewEdit(v.id, v.attendanceDate, v.checkInTime, v.checkOutTime, v.totalTime, v.lunchTimeInMin)}
                                    />)}
                      </td>
                              )}
                    </td>
                  </tr>

                          {/* {v.downtimeData != "" ? (
                            <tr
                              className={`${parseInt(mainData) == parseInt(i) ? "" : " d-none"
                                }`}
                            >
                              <td
                              >
                                <Table
                                  className="table-hover"
                                >
                                  <thead
                                    className="list-thead"
                                  >
                                    <tr>
                                      <th></th>
                                      <th>Break Name</th>
                                      <th>Start Time</th>
                                      <th>End Time</th>
                                      <th>Total Break Time</th>

                                    </tr>
                                  </thead>
                                  <tbody
                                    style={{ maxHeight: "300px", overflowY: "auto" }}
                                  >
                                    {v.downtimeData &&
                                      v.downtimeData.map((vi, ii) => {
                                        {
                                          console.log(vi);
                                        }
                                        return (
                                          <>
                                            <tr>
                                              {vi.breakList[0] != "" ? (
                                                <td style={{ width: "2%" }}>
                                                  <Button
                                                    onClick={(e) => {
                                                      e.preventDefault();
                                                      if (
                                                        parseInt(
                                                          breakInnerData
                                                        ) == parseInt(ii)
                                                      )
                                                        setBreakInnerData("");
                                                      else {
                                                        setBreakInnerData(
                                                          parseInt(ii)
                                                        );
                                                      }
                                                    }}
                                                    className="btn-arrow-style"
                                                  >
                                                    {parseInt(breakInnerData) ==
                                                      parseInt(ii) ? (
                                                      <i
                                                        class="fa fa-caret-down"
                                                        aria-hidden="true"
                                                      ></i>
                                                    ) : (
                                                      <i
                                                        class="fa fa-caret-right"
                                                        aria-hidden="true"
                                                      ></i>
                                                    )}
                                                  </Button>
                                                </td>
                                              ) : (
                                                <td style={{ width: "2%" }}></td>
                                              )}
                                              <td>{vi.breakName}</td>
                                              <td>
                                                {moment(
                                                  vi.breakList[0].startTime
                                                ).format("HH:mm:ss")}
                                              </td>
                                              <td>
                                                {moment(
                                                  vi.breakList[0].endTime
                                                ).format("HH:mm:ss")}
                                              </td>
                                              <td>{vi.actualTime}</td>
                                            </tr>

                                            {vi.breakList != "" ? (
                                              <tr
                                                className={`${parseInt(breakInnerData) ==
                                                  parseInt(ii)
                                                  ? ""
                                                  : " d-none"
                                                  }`}
                                              >
                                                <td
                                                >
                                                  <Table
                                                    className="table-hover"
                                                  >
                                                    <thead
                                                      className="list-thead"
                                                    >
                                                      <tr>
                                                        <th>Start</th>
                                                        <th>End</th>
                                                        <th>Total(MIN)</th>
                                                        <th>Work Done</th>
                                                        <th>Break Wages</th>
                                                        <th>Remark</th>
                                                        <th>End Remark</th>
                                                        <th>Admin Remark</th>
                                                        <th>Action</th>
                                                      </tr>
                                                    </thead>
                                                    <tbody
                                                      style={{ maxHeight: "300px", overflowY: "auto" }}
                                                    >
                                                      {vi.breakList &&
                                                        vi.breakList.map(
                                                          (vii, iii) => {
                                                            return (
                                                              <tr>
                                                                <td>
                                                                  {vii.startTime !=
                                                                    "" ? (
                                                                    <>
                                                                      {moment(
                                                                        vii.startTime
                                                                      ).format(
                                                                        "HH:mm:ss"
                                                                      )}
                                                                    </>
                                                                  ) : (
                                                                    ""
                                                                  )}
                                                                </td>
                                                                <td>
                                                                  {vii.endTime !=
                                                                    "" ? (
                                                                    <>
                                                                      <span
                                                                        style={{
                                                                          fontSize:
                                                                            "12px",
                                                                        }}
                                                                      >
                                                                      </span>
                                                                      {moment(
                                                                        vii.endTime
                                                                      ).format(
                                                                        "HH:mm:ss"
                                                                      )}
                                                                    </>
                                                                  ) : (
                                                                    ""
                                                                  )}
                                                                </td>
                                                                <td>
                                                                  {vii.totalTime}
                                                                </td>
                                                                <td>
                                                                  {vii.workDone}
                                                                </td>
                                                                <td>
                                                                  {vii.breakWages}
                                                                </td>
                                                                <td>
                                                                  {vii.remark}
                                                                </td>
                                                                <td>
                                                                  {vii.endRemark}
                                                                </td>
                                                                <td>
                                                                  {
                                                                    vii.adminRemark
                                                                  }
                                                                </td>
                                                                <td>
                                                                  <img
                                                                    src={Delete}
                                                                    alt=""
                                                                    className="img-delete"
                                                                  // onClick={() => onDelete(v.id)}
                                                                  />{" "}
                                                                  <img
                                                                    src={edit}
                                                                    alt=""
                                                                    className="img-edit"
                                                                  // onClick={(e) => {
                                                                  //   navigate("/Dashboard/Tranx/payment-edit", {
                                                                  //     state: {
                                                                  //       id: v.id,
                                                                  //     },
                                                                  //   });
                                                                  // }}
                                                                  />
                                                                </td>
                                                              </tr>
                                                            );
                                                          }
                                                        )}
                                                    </tbody>
                                                  </Table>
                                                </td>
                                              </tr>
                                            ) : (
                                              ""
                                            )}
                                          </>
                                        );
                                      })}
                                  </tbody>
                                </Table>
                              </td>
                            </tr>
                          ) : (
                            ""
                          )} */}
                        </>
                      );
                    })}
                </tbody>
              </Table>
            </Col>
          </Row>
        </div>
      </div>
      {/* Approve Single Modal */}
      <Modal show={showModal} onHide={handleCloseModal} className="custom-modal" centered>

        <div className="modal-dialog modal-lg">
          <div className="modal-content modal-height-width " style={{ height: "200px" }} >
            {/* <Modal.Header className='pb-0' > */}
            {/*  */}
            <div className="pagePathLayout-modal row" >
              <span className="bold">  <OverlayTrigger style={{}}
                placement="right"
                overlay={<Tooltip id="tooltip" className="tooltip-back-btn">Back</Tooltip>}
              >

                <img src={BackBtn} alt="" className="modal-header-backbtn" onClick={handleCloseModal} />

              </OverlayTrigger><span className="modal-header-span">{location.pathname}</span></span>

            </div>
            <Formik
              initialValues={{
                remark: "",
              }}
              validationSchema={
                Yup.object().shape({
                })
              }
              onSubmit={(values, { setSubmitting, resetForm }) => {
                let formData = new FormData();
                formData.append("attendanceId", rowid);
                formData.append("remark", values.remark);
                formData.append("attendanceDate", new Date());
                formData.append("attendanceStatus", true);
                formData.append("employeeWagesType", employeeWagesType);
                if (employeeWagesType === "day") {
                  formData.append("wagesPerDay", wagesPerDay);
                } else if (employeeWagesType === "hr") {
                  formData.append("wagesPerHour", wagesPerHour);
                  formData.append("wagesHourBasis", wagesHourBasis);
                }
                approveAttendance(formData)
                  .then((response) => {
                    if (response.data.responseStatus === 200) {
                      setSubmitting(false);
                      resetForm();
                      openModal(response.data.message, "cnf");
                      setShowModal(false)
                      getAll(yo);
                    } else {
                      setSubmitting(false);
                      openModal(response.data.message, "error");
                    }
                  })
                  .catch((error) => {
                    openModal(error, "error");
                    setSubmitting(false);
                  });

              }}
            >
              {({
                values,
                errors,
                touched,
                setFieldValue,
                handleChange,
                handleSubmit,
                isSubmitting,
                resetForm,
                handleBlur,
              }) => (
                <Form noValidate onSubmit={handleSubmit} autoComplete="off">
                  <div className="modal-fields-row1 row">

                    <div className="col-lg-6">
                      <div class="textOnInput">
                        {/* <label for="inputText" className="common-input-label">Employee ID</label> */}
                        <CustomInput
                          className={`form-control ${touched.remark && errors.remark ? 'is-invalid' : ''}`}
                          type="text"
                          label="Remark"
                          id="remark"
                          name="remark"
                          value={values.remark}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          inputError={errors.remark}
                        />
                      </div>
                    </div>
                    <Row >
                      <Col lg="10">
                      </Col>
                      <Col lg="2">
                        <Button
                          className="modal-submit-btn-advance-payment"
                          type="submit"
                        >
                          APPROVE
                        </Button>
                      </Col>
                    </Row>
                  </div>

                </Form>
              )}
            </Formik>
          </div>
        </div>
      </Modal>

      {/* Approve Single Modal */}
      <Modal show={showModalEdit} onHide={handleCloseModalEdit} className="custom-modal" centered>

        <div className="modal-dialog modal-lg">
          <div className="modal-content modal-height-width " style={{ height: "315px" }} >
            {/* <Modal.Header className='pb-0' > */}
            {/*  */}
            <div className="pagePathLayout-modal row" >
              <span className="bold">  <OverlayTrigger style={{}}
                placement="right"
                overlay={<Tooltip id="tooltip" className="tooltip-back-btn">Back</Tooltip>}
              >
                <img src={BackBtn} alt="" className="modal-header-backbtn" onClick={handleCloseModalEdit} />
              </OverlayTrigger><span className="modal-header-span">{location.pathname}</span></span>
            </div>
            <Formik
              initialValues={{
                attendanceDate: attDate != null ? attDate : "",
                checkInTime: intime != null ? intime : "",
                checkOutTime: out != null ? out : "",
                totalTime: total != null ? total : "",
                lunchTimeInMin: lunch != null ? lunch : ""
              }}
              validationSchema={
                Yup.object().shape({
                })
              }
              onSubmit={(values, { setSubmitting, resetForm }) => {
                let requestData = {
                  attendanceId: rowid,
                  attendanceDate: values.attendanceDate,
                  checkInTime: moment(values.checkInTime).format(
                    "YYYY-MM-DD HH:mm:ss"
                  ),
                  checkOutTime: moment(values.checkOutTime).format(
                    "YYYY-MM-DD HH:mm:ss"
                  ),
                  totalTime: values.totalTime,
                  lunchTimeInMin: values.lunchTimeInMin
                };
                updateAttendance(requestData)
                  .then((response) => {
                    if (response.data.responseStatus === 200) {
                      // setSubmitting(false);
                      resetForm();
                      openModal(response.data.message, "cnf");
                      setShowModalEdit(false)
                      // getAttendanceData(values);
                    } else {
                      setSubmitting(false);
                      openModal(response.data.message, "error");
                    }
                  })
                  .catch((error) => {
                    openModal(error, "error");
                    setSubmitting(false);
                  });

              }}
            >
              {({
                values,
                errors,
                touched,
                setFieldValue,
                handleChange,
                handleSubmit,
                isSubmitting,
                resetForm,
                handleBlur,
              }) => (
                <Form noValidate onSubmit={handleSubmit} autoComplete="off">
                  <div className="modal-fields-row1 row">
                    <div className="col-lg-4">
                      <div class="textOnInput">
                        <CustomDateInputs className={`form-control ${errors.attendanceDate ? 'is-invalid' : ''}`}
                          type="date"
                          id="attendanceDate"
                          label="Attendance Date"
                          name="attendanceDate"
                          value={values.attendanceDate}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          max={getFormattedMaxDate()} // Set the max attribute to block future dates

                        />
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div class="textOnInput">
                        <CustomDateInputs className={`form-control ${touched.checkInTime && errors.checkInTime ? 'is-invalid' : ''}`}
                          type="datetime-local"
                          id="checkInTime"
                          name="checkInTime"
                          label="Check In"
                          value={values.checkInTime}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          max={getFormattedMaxDateTime()} // Set the max attribute to block future dates
                        />
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div class="textOnInput">
                        <CustomDateInputs className={`form-control ${touched.checkOutTime && errors.checkOutTime ? 'is-invalid' : ''}`}
                          type="datetime-local"
                          id="checkOutTime"
                          name="checkOutTime"
                          label="Check Out"
                          value={values.checkOutTime}
                          onChange={handleChange}
                          onBlur={(e) => {
                            calculateTime(
                              {
                                checkInTime: values.checkInTime,
                                checkOutTime: values.checkOutTime,
                              },
                              setFieldValue
                            );
                          }}
                          max={getFormattedMaxDateTime()} // Set the max attribute to block future dates
                        />
                      </div>
                    </div>
                  </div>
                  <div className="modal-fields-row1 row">
                    <div className="col-lg-4">
                      <div class="textOnInput">
                        <CustomInput className={`form-control ${touched.totalTime && errors.totalTime ? 'is-invalid' : ''}`} type="text" id="totalTime"
                          name="totalTime"
                          label="Total Time"
                          value={values.totalTime}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          readOnly={true}
                        />
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div class="textOnInput">
                        <CustomInput className={`form-control ${touched.lunchTimeInMin && errors.lunchTimeInMin ? 'is-invalid' : ''}`} type="text" id="lunchTimeInMin"
                          name="lunchTimeInMin"
                          label="Lunch Time(Min)"
                          value={values.lunchTimeInMin}
                          onChange={handleChange}
                          onBlur={handleBlur} />
                      </div>
                    </div>
                    <Row >
                      <Col lg="10">
                      </Col>
                      <Col lg="2">
                        <Button
                          className="modal-submit-btn-advance-payment"
                          type="submit"
                        >
                          Update
                        </Button>
                      </Col>
                    </Row>
                  </div>

                </Form>
              )}
            </Formik>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default WithUserPermission(AttendanceApproval);