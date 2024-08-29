import React, { useEffect, useState } from "react";
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
    manualAttendance,
    listOfEmployee,
    ManualAttendanceReport,
} from "@/services/api_functions";
import {
    OnlyEnterNumbers,
} from "@/helpers";
import moment from "moment";
import CustomDateInputs from "../../components/CustomDateInputs";
import CustomSelect from "../../components/CustomSelect";
import { isActionExist } from "../../helpers/constants";
import { WithUserPermission } from "../../helpers/WithUserPermission";
import ResponseModal from "../../components/ResponseModal";

function ManualAttendance(props) {
    console.log(props)
    const location = useLocation();
    const pathArray = location.pathname.split("/"); // Split the path into an array
    const name = pathArray[pathArray.length - 1]; // Get the last element of the array

    const [showModal, setShowModal] = useState(false); // State to control the modal visibility
    const [showModalEdit, setShowModalEdit] = useState(false); // State to control the modal visibility
    const [ManualAttendance, setManualAttendance] = useState([]);
    const [filteredManualAttendance, setFilteredManualAttendance] = useState([]);
    const [manualattendanceObject, setManualAttendanceObject] = useState("");
    const [manualAttendanceOptData, setManualAttendanceOptData] = useState([]);
    const [empOpt, setEmpOpt] = useState([]);
    const [openRow, setOpenRow] = useState(null);
    const [deptList, setdeptList] = useState([]);
    const [Submitting, setSubmitting] = useState([]);
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

    const handleAddNew = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };


    const handleCloseModalEdit = () => {
        setShowModalEdit(false);
    };

    useEffect(() => {
        getEmployeeList();
        getEmpOptions();
        getManualAttendanceReport({ fromMonth: "", employeeId: "all" });
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

    //Calculation of Start time and End time = total time 
    const calculateTime = (values, setFieldValue) => {
        console.log({ values });
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

    const getManualAttendanceReport = (values) => {
        let requestData = {
            fromMonth: values.fromMonth,
            employeeId: values.employeeId,
        };
        ManualAttendanceReport(requestData)
            .then((response) => {
                var result = response.data;
                if (result.responseStatus === 200) {
                    setManualAttendanceObject(result.response);
                } else {
                    openModal("No Data Found", "error");
                }
            })
            .catch((error) => {
                setSubmitting(false);
                openModal(error, "error");
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
            <div
                className="content-wrapper scrollable-div"
                style={{ position: "fixed", width: "96%" }}
            >
                <div className="pagePathLayout row">
                    <div className="col-lg-11 header-title">
                        <span className="bold" >{location.pathname}</span>
                    </div>
                    <OverlayTrigger
                        placement="left"
                        overlay={<Tooltip id="tooltip" className="tooltip-add-btn">Create</Tooltip>}
                    >
                        {isActionExist("manual-attendance", "create", props.userPermissions) && (
                            <div className="col-lg-1 header-add-btn" onClick={handleAddNew}  >
                                <img src={AddBtn} alt="" className="btn-add " />
                            </div>
                        )}
                    </OverlayTrigger>
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
                        onSubmit={(values, { setSubmitting }) => {
                            getManualAttendanceReport(values)
                            // let requestData = {
                            //     fromMonth: values.fromMonth,
                            //     employeeId: values.employeeId,
                            // };
                            // ManualAttendanceReport(requestData)
                            //     .then((response) => {
                            //         var result = response.data;
                            //         if (result.responseStatus === 200) {
                            //             setManualAttendanceObject(result.response);
                            //         } else {
                            //             openModal("No Data Found", "error");
                            //         }
                            //     })
                            //     .catch((error) => {
                            //         setSubmitting(false);
                            //         openModal(error, "error");
                            //     });
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
                    <Row>
                        <Col className="list-table">
                            <Table className="table-hover">
                                <thead className="list-thead">
                                    <tr>
                                        <th className="table-th text-light">SR NO</th>
                                        <th className="table-th text-light">Employee Name</th>
                                        <th className="table-th text-light">Attendance Date</th>
                                        <th className="table-th text-light">Check In</th>
                                        <th className="table-th text-light">Check Out</th>
                                        <th className="table-th text-light">Created Date</th>
                                    </tr>
                                </thead>

                                <tbody style={{ maxHeight: "300px", overflowY: "auto" }}
                                >
                                    {manualattendanceObject.length > 0 ? (
                                        manualattendanceObject.map((v, i, record) => (
                                            <tr style={{ backgroundColor: "D9D9D9" }} >
                                                <td>{i + 1}</td>
                                                <td>{v.employeeName}</td>
                                                <td>{moment(v.attendanceDate).format("DD-MM-yyyy")}</td>
                                                <td>{moment(v.checkInTime).format("HH:mm:ss")}</td>
                                                <td>{moment(v.checkOutTime).format("HH:mm:ss")}</td>
                                                <td>{v.actualWorkingHoursInMinutes}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={8} className="text-center">
                                                No Data Found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </div >
            </div >

            {/* Add Modal */}
            <Modal Modal show={showModal} onHide={handleCloseModal} className="custom-modal" centered >
                <div className="modal-dialog modal-lg">
                    <div className="modal-content modal-height-width " >
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
                                employeeId: "",
                                attendanceDate: "",
                                checkInTime: "",
                                checkOutTime: "",
                                totalTime: "",
                                lunchTimeInMin: 0,
                            }}
                            validationSchema={
                                Yup.object().shape({
                                    employeeId: Yup.string().trim().required(" "),
                                    attendanceDate: Yup.string().trim().required(" "),
                                    checkInTime: Yup.string().trim().required(" "),
                                    checkOutTime: Yup.string().trim().required(" "),
                                    totalTime: Yup.string().trim().required(" "),
                                    lunchTimeInMin: Yup.string().trim().required(" "),
                                })
                            }
                            onSubmit={(values, { setSubmitting, resetForm, setFieldValue }) => {
                                let requestData = {
                                    employeeId: parseInt(values.employeeId),
                                    attendanceDate: moment(values.attendanceDate).format("YYYY-MM-DD"),
                                    checkInTime: moment(values.checkInTime).format(
                                        "YYYY-MM-DD HH:mm:ss"
                                    ),
                                    checkOutTime: "",
                                    totalTime: values.totalTime,
                                    adminRemark: "",
                                };
                                requestData["lunchTimeInMin"] = values.lunchTimeInMin;

                                if (values.checkOutTime != "" && values.checkOutTime != null) {

                                    requestData["checkOutTime"] = moment(
                                        values.checkOutTime
                                    ).format("YYYY-MM-DD HH:mm:ss");
                                }

                                if (
                                    values.checkOutTime != "" &&
                                    values.checkOutTime != null &&
                                    values.checkInTime > values.checkOutTime
                                ) {
                                    // setIsLoading(false);
                                    openModal("Checkout time is less than Checkin time", "error");
                                    setFieldValue("checkOutTime", "");
                                } else {
                                    console.log("request Data >>i am", JSON.stringify(requestData));
                                    manualAttendance(requestData)
                                        .then((response) => {
                                            console.log("response>>", response)
                                            if (response.data.responseStatus === 200) {
                                                setSubmitting(false);
                                                resetForm();
                                                openModal(response.data.message, "cnf");
                                                setShowModal(false)
                                                getManualAttendanceReport({ fromMonth: "", employeeId: "all" });
                                            } else {
                                                setSubmitting(false);
                                                openModal(response.data.message, "error");
                                            }
                                        })
                                        .catch((error) => {
                                            openModal(error, "error");
                                            setSubmitting(false);
                                        });
                                }
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
                                                <CustomSelect className={`form-control ${touched.employeeId && errors.employeeId ? 'is-invalid' : ''}`} type="text" id="employeeId"
                                                    name="employeeId"
                                                    data={manualAttendanceOptData}
                                                    label="Employee Name"
                                                    value={values.employeeId}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur} />
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div class="textOnInput">
                                                <CustomDateInputs className={`form-control ${touched.attendanceDate && errors.attendanceDate ? 'is-invalid' : ''}`}
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

                                    </div>
                                    <div className="modal-fields-row2 row" >
                                        <div className="col-lg-4">
                                            <div className="textOnInput">
                                                <CustomDateInputs
                                                    className={`form-control ${touched.checkOutTime && errors.checkOutTime ? 'is-invalid' : ''}`}
                                                    type="datetime-local"
                                                    id="checkOutTime"
                                                    name="checkOutTime"
                                                    label="Check Out"
                                                    value={values.checkOutTime}
                                                    onChange={(e) => {
                                                        // Extract the time part from the selected checkout datetime
                                                        const selectedTime = e.target.value.split('T')[1];
                                                        // Extract the date part from the check-in datetime
                                                        const checkInDate = values.checkInTime.split('T')[0];
                                                        // Combine the date part of check-in with the selected time for checkout
                                                        const checkOutDateTime = `${checkInDate}T${selectedTime}`;
                                                        // Update the state with the new checkout datetime
                                                        handleChange({
                                                            target: {
                                                                id: 'checkOutTime',
                                                                value: checkOutDateTime,
                                                            }
                                                        });
                                                        // You might want to call the onBlur function here if necessary
                                                    }}
                                                    onBlur={(e) => {
                                                        calculateTime(
                                                            {
                                                                checkInTime: values.checkInTime,
                                                                checkOutTime: values.checkOutTime,
                                                            },
                                                            setFieldValue
                                                        );
                                                    }}
                                                    min={values.checkInTime.split('T')[0]} // Set the minimum date to the selected check-in date
                                                    max={values.checkInTime.split('T')[0]} // Set the maximum date to the selected check-in date
                                                />
                                            </div>
                                        </div>


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

                                    </div>
                                    <Row className="mt-3">
                                        <Col lg="10">
                                        </Col>
                                        <Col lg="2">
                                            <Button
                                                className="modal-submit-btn"
                                                type="submit"
                                            >
                                                Submit
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </Modal>
        </div >
    );
}

export default WithUserPermission(ManualAttendance);