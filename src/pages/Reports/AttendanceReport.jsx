import React, { useEffect, useState, useRef } from "react";
import AddBtn from "../../assets/images/MenuButton.png";
import BackBtn from "../../assets/images/back.png";
import { useLocation } from "react-router-dom";
import { Col, Row, Table, Form, Modal, Card, Button } from "react-bootstrap";
import * as Yup from "yup";
import { Formik, ErrorMessage } from "formik";
import edit from "../../assets/images/edit.png";
import Delete from "../../assets/images/delete.png";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import CustomInput from "../../components/CustomInputs";
import {
    listOfEmployee,
    getEmpMonthlyPresenty,
} from "@/services/api_functions";

import moment from "moment";
import CustomDateInputs from "../../components/CustomDateInputs";
import CustomSelect from "../../components/CustomSelect";
import { isActionExist } from "../../helpers/constants";
import { WithUserPermission } from "../../helpers/WithUserPermission";
import ResponseModal from "../../components/ResponseModal";

function AttendanceReport(props) {
    const location = useLocation();
    const pathArray = location.pathname.split("/"); // Split the path into an array
    const name = pathArray[pathArray.length - 1]; // Get the last element of the array

    const [AttendanceReport, setManualAttendance] = useState([]);
    const [filteredManualAttendance, setFilteredManualAttendance] = useState([]);
    const [attendanceReportObject, setAttendanceReportObject] = useState("");
    const [manualAttendanceOptData, setManualAttendanceOptData] = useState([]);
    const [empOpt, setEmpOpt] = useState([]);

    const formRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [attendanceData, setAttendanceData] = useState([]);
    const [totalDays, setTotalDays] = useState(0);
    const [days, setDays] = useState([]);
    const [sumofAllEmployeeTotalDays, setSumofAllEmployeeTotalDays] = useState(0);
    const [sumOfAllEmployeePresenty, setSumOfAllEmployeePresenty] = useState(0);
    const [sumOfAllEmployeeAbsenty, setSumOfAllEmployeeAbsenty] = useState(0);
    const [sumOfAllEmployeeLeaves, setSumOfAllEmployeeLeaves] = useState(0);
    const [sumOfAllEmployeeHalfDays, setSumOfAllEmployeeHalfDays] = useState(0);
    const [pDays, setPDays] = useState(0);
    const [pList, setPList] = useState([]);
    const [abList, setAbList] = useState([]);
    const [lList, setLList] = useState([]);
    const [hList, setHList] = useState([]);
    const [tAbAndLeaveList, setTAbAndLeaveList] = useState([]);
    const [absentPercentage, setAbsentPercentage] = useState([]);

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
        getEmployeeList();
        getEmpOptions();
    }, []);

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

    //separate function for Selection of Employee and All for List Filter
    const getEmpOptions = () => {
        listOfEmployee()
            .then((response) => {
                let res = response.data;

                if (res.responseStatus === 200) {
                    let result = res.response;
                    let opt = [
                        {
                            value: 'all',
                            label: 'All',
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
                        <span className="bold" >{location.pathname}</span>
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
                            fromMonth: '',
                            employeeId: '',
                        }}
                        validationSchema={Yup.object().shape({
                            fromMonth: Yup.string().required(' '),
                            employeeId: Yup.string().trim().required(' '),
                        })}
                        onSubmit={(values, { resetForm, setStatus, setSubmitting }) => {
                            setIsLoading(true);
                            setAttendanceData([]);
                            console.log("totalDays :", totalDays);
                            let requestData = {
                                currentMonth: values.fromMonth,
                                employeeId: values.employeeId,
                            };
                            getEmpMonthlyPresenty(requestData)
                                .then((response) => {
                                    var result = response.data;
                                    console.log(result.totalDays);
                                    console.log("result.sumofAllEmployeeTotalDays", result.sumofAllEmployeeTotalDays);
                                    if (result.responseStatus === 200) {
                                        setSubmitting(false);
                                        setAbList([]);
                                        setPList([]);
                                        setLList([]);
                                        setHList([]);
                                        setTAbAndLeaveList([]);
                                        setAbsentPercentage([]);
                                        setDays([]);
                                        for (let i = 0; i <= result.response.absentPercentage; i++) {
                                            setAbsentPercentage((prev) => [...prev, i]);
                                        }
                                        for (let i = 0; i <= result.response.tAbAndLeaveList; i++) {
                                            setTAbAndLeaveList((prev) => [...prev, i]);
                                        }
                                        for (let i = 0; i <= result.response.lList; i++) {
                                            setLList((prev) => [...prev, i]);
                                        }
                                        for (let i = 0; i <= result.response.abList; i++) {
                                            setAbList((prev) => [...prev, i]);
                                        }
                                        for (let i = 0; i <= result.response.hList; i++) {
                                            setHList((prev) => [...prev, i]);
                                        }
                                        for (let i = 1; i <= result.response.totalDays; i++) {
                                            setDays((prev) => [...prev, i]);
                                        }
                                        for (let i = 0; i <= result.response.pList; i++) {
                                            setPList((prev) => [...prev, i]);
                                        }

                                        setAttendanceData(result.response.list);
                                        setTotalDays(result.response.totalDays);
                                        setDays((prev) => [...prev]);
                                        setSumofAllEmployeeTotalDays(result.response.sumofAllEmployeeTotalDays);
                                        setSumOfAllEmployeePresenty(result.response.sumOfAllEmployeePresenty);
                                        setSumOfAllEmployeeAbsenty(result.response.sumOfAllEmployeeAbsenty);
                                        setSumOfAllEmployeeLeaves(result.response.sumOfAllEmployeeLeaves);
                                        setSumOfAllEmployeeHalfDays(result.response.sumOfAllEmployeeHalfDays);
                                        setPDays(result.response.pDays);
                                        setPList(result.response.pList);
                                        setAbList(result.response.abList);
                                        setHList(result.response.hList);
                                        setLList(result.response.lList);
                                        setTAbAndLeaveList(result.response.tAbAndLeaveList);
                                        setAbsentPercentage(result.response.absentPercentage);
                                    } else {
                                        setSubmitting(false);
                                        setIsLoading(false);
                                        setAttendanceData([]);
                                        openModal("No Data Found", "error");
                                    }
                                })
                                .catch((error) => {
                                    setSubmitting(false);
                                    setIsLoading(false);
                                    openModal(error, "error");
                                });
                            setStatus();
                        }}
                        render={({ errors, status, touched, isSubmitting, handleChange, handleSubmit, setFieldValue, values, handleBlur }) => (
                            <Form onSubmit={handleSubmit}>
                                <Row className="list-heading">
                                    <div className="col-lg-2 list-head-fields">
                                        <div class="textOnInput">
                                            <CustomDateInputs
                                                className={`form-control ${errors.fromMonth
                                                    ? "is-invalid"
                                                    : ""
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
                                            <CustomSelect className={`form-control ${touched.employeeId && errors.employeeId ? 'is-invalid' : ''}`} type="text" id="employeeId"
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

                <div
                    className=" scrollable-div-page"
                >
                    {attendanceData && attendanceData.length > 0 && (
                        <Row>
                            <Col
                                //  md="12" className="tbl-style"
                                className="list-table tbl-style"
                            >
                                <div className="attendance-tbl">
                                    <Table
                                        // aria-label="simple table"
                                        // bordered
                                        // size="sm"
                                        // className="main-tbl-style"
                                        className="table-hover "
                                    >
                                        <thead
                                            // style={{ textAlign: "center" }}
                                            className="list-thead"
                                        >
                                            <tr>
                                                <th className="table-th text-light">SR NO</th>
                                                <th className="table-th text-light">Name</th>
                                                <th className="table-th text-light">Total Days</th>
                                                <th className="table-th text-light">Present</th>
                                                <th className="table-th text-light">Absent</th>
                                                <th className="table-th text-light">Leave</th>
                                                <th className="table-th text-light">Half</th>
                                                <th className="table-th text-light">Extra Half</th>
                                                <th className="table-th text-light">Extra Present</th>
                                                {days &&
                                                    days.map((v) => {
                                                        return <th className="table-th text-light">{v}</th>;
                                                    })}
                                            </tr>
                                        </thead>

                                        <tbody style={{ textAlign: "center" }}>
                                            {attendanceData.length > 0 ?
                                                (attendanceData.map((value, key) => {
                                                return (
                                                    <tr key={key}>
                                                        <td>{key + 1}</td>
                                                        <td>{value.employeeName}</td>
                                                        <td>{value.totalDays}</td>
                                                        <td>{value.pDays + value.weeklyOffDays + (value.hDays / 2)}</td>
                                                        <td>{value.aDays}</td>
                                                        <td>{value.lDays}</td>
                                                        <td>{value.hDays}</td>
                                                        <td>{value.extraHalfDays}</td>
                                                        <td>{value.extraDays}</td>
                                                        {days &&
                                                            days.map((v) => {
                                                                v = v - 1;
                                                                return (
                                                                    <td
                                                                        className={`tblalignment  ${value["attendanceStatus" + v] != ""
                                                                            ? value["attendanceStatus" + v] == "A"
                                                                                ? "td-style"
                                                                                : value["attendanceStatus" + v] ==
                                                                                    "L"
                                                                                    ? "td-style2"
                                                                                    : value["attendanceStatus" + v] ==
                                                                                        "P" || value["attendanceStatus" + v] == "EP"
                                                                                        ? "td-style1"
                                                                                        : value["attendanceStatus" + v] ==
                                                                                            "H" || value["attendanceStatus" + v] == "EH" ? "td-style4" : "td-style3"
                                                                            : ""
                                                                            }`}
                                                                    >
                                                                        {value["attendanceStatus" + v]}
                                                                    </td>
                                                                );
                                                            })}
                                                    </tr>
                                                );
                                                })
                                                ) : (

                                                    <tr>
                                                        <td>
                                                            No Data Found
                                                        </td>
                                                    </tr>
                                                )}

                                        </tbody>

                                        {/* {attendanceData.length > 1 ? (
                                            <tfoot>
                                                <tr className="tfoot1">
                                                    <th className="table-th text-light"> </th>
                                                    <th className="table-th text-light">Present</th>
                                                    <th className="table-th text-light">
                                                        {sumofAllEmployeeTotalDays}
                                                    </th>
                                                    <th className="table-th text-light">
                                                        {sumOfAllEmployeePresenty}
                                                    </th>
                                                    <th className="table-th text-light">
                                                        {sumOfAllEmployeeAbsenty}
                                                    </th>
                                                    <th className="table-th text-light">
                                                        {sumOfAllEmployeeLeaves}
                                                    </th>
                                                    <th className="table-th text-light">
                                                        {sumOfAllEmployeeHalfDays}
                                                    </th>
                                                    <th className="table-th text-light">{extraHalfDays}</th>
                                                    <th className="table-th text-light">{extraDays}</th>
                                                    {pList &&
                                                        pList.map((v) => {
                                                            return <th className="table-th text-light">{v}</th>;
                                                        })}
                                                </tr>
                                                <tr className="tfoot2">
                                                    <th className="table-th text-light"> </th>
                                                    <th className="table-th text-light">Half Days</th>
                                                    <th className="table-th text-light"> </th>
                                                    <th className="table-th text-light"> </th>
                                                    <th className="table-th text-light"> </th>
                                                    <th className="table-th text-light"> </th>
                                                    <th className="table-th text-light"> </th>
                                                    <th className="table-th text-light"> </th>
                                                    <th className="table-th text-light"> </th>
                                                    {hList &&
                                                        hList.map((v) => {
                                                            return <th className="table-th text-light">{v}</th>;
                                                        })}
                                                </tr>
                                                <tr className="tfoot2">
                                                    <th className="table-th text-light"> </th>
                                                    <th className="table-th text-light">Absent</th>
                                                    <th className="table-th text-light"> </th>
                                                    <th className="table-th text-light"> </th>
                                                    <th className="table-th text-light"> </th>
                                                    <th className="table-th text-light"> </th>
                                                    <th className="table-th text-light"> </th>
                                                    <th className="table-th text-light"> </th>
                                                    <th className="table-th text-light"> </th>
                                                    {abList &&
                                                        abList.map((v) => {
                                                            return <th className="table-th text-light">{v}</th>;
                                                        })}
                                                </tr>
                                                <tr className="tfoot3">
                                                    <th className="table-th text-light"> </th>
                                                    <th className="table-th text-light">Leave</th>
                                                    <th className="table-th text-light"></th>
                                                    <th className="table-th text-light"></th>
                                                    <th className="table-th text-light"></th>
                                                    <th className="table-th text-light"></th>
                                                    <th className="table-th text-light"></th>
                                                    <th className="table-th text-light"> </th>
                                                    <th className="table-th text-light"> </th>
                                                    {lList &&
                                                        lList.map((v) => {
                                                            return <th className="table-th text-light">{v}</th>;
                                                        })}
                                                </tr>
                                                <tr className="tfoot4">
                                                    <th className="table-th text-light"> </th>
                                                    <th className="table-th text-light">Total Absent & Leave</th>
                                                    <th className="table-th text-light"> </th>
                                                    <th className="table-th text-light"> </th>
                                                    <th className="table-th text-light"> </th>
                                                    <th className="table-th text-light"> </th>
                                                    <th className="table-th text-light"> </th>
                                                    <th className="table-th text-light"> </th>
                                                    <th className="table-th text-light"> </th>
                                                    {tAbAndLeaveList &&
                                                        tAbAndLeaveList.map((v) => {
                                                            return <th className="table-th text-light">{v}</th>;
                                                        })}
                                                </tr>
                                                <tr className="tfoot5">
                                                    <th className="table-th text-light"> </th>
                                                    <th className="table-th text-light">Absent %</th>
                                                    <th className="table-th text-light"> </th>
                                                    <th className="table-th text-light"> </th>
                                                    <th className="table-th text-light"> </th>
                                                    <th className="table-th text-light"> </th>
                                                    <th className="table-th text-light"> </th>
                                                    <th className="table-th text-light"> </th>
                                                    <th className="table-th text-light"> </th>
                                                    {absentPercentage &&
                                                        absentPercentage.map((v) => {
                                                            return <th className="table-th text-light">{v}</th>;
                                                        })}
                                                </tr>
                                            </tfoot>
                                        )} */}
                                    </Table>
                                </div>
                            </Col>
                        </Row>
                    )}
                </div>
            </div>
        </div>

    );
}

export default WithUserPermission(AttendanceReport);