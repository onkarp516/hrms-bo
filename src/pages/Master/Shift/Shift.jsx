import React, { useEffect, useState } from "react";
import AddBtn from "../../../assets/images/MenuButton.png";
import BackBtn from "../../../assets/images/back.png";
import { useLocation, useNavigate } from "react-router-dom";
import { Col, Row, Table, Form, Modal, Card, Button, } from "react-bootstrap";
import * as Yup from "yup";
import { Formik, ErrorMessage } from "formik";
import edit from "../../../assets/images/edit.png";
import Delete from "../../../assets/images/delete.png";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import CustomInput from "../../../components/CustomInputs";
import CustomToggleSwitchForModal from "../../../components/CustomToggleSwitchForModal";
import CustomTimeInputs from "../../../components/CustomTimeInputs";
import {
    createShift,
    listOfShifts,
    findShift,
    updateShift,
    deleteShift,
} from "@/services/api_functions";
import moment from "moment";
import { isActionExist } from "../../../helpers/constants";
import { WithUserPermission } from "../../../helpers/WithUserPermission";
import ResponseModal from "../../../components/ResponseModal";
import DeleteConfirmationModal from "../../../components/DeleteConfirmationModal";

function Shift(props) {
    const location = useLocation();
    const pathArray = location.pathname.split("/"); // Split the path into an array
    const name = pathArray[pathArray.length - 1]; // Get the last element of the array

    const [showModal, setShowModal] = useState(false); // State to control the modal visibility
    const [showModalEdit, setShowModalEdit] = useState(false); // State to control the modal visibility
    const [shift, setShift] = useState([]);
    const [filteredShift, setFilteredShift] = useState([]);
    const [shiftObject, setShiftObject] = useState([]);

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


    const handleAddNew = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };


    const handleCloseModalEdit = () => {
        setShowModalEdit(false);
    };

    // Placeholder state functions for missing definitions
    const setEditModalShow = (status) => {
        console.log("setEditModalShow: ", status);
    };

    const setcurrentIndex = (index) => {
        console.log("setcurrentIndex: ", index);
    };

    useEffect(() => {
        getShiftList();
    }, []);

    //List API Function
    const getShiftList = () => {
        listOfShifts().then((response) => {
            let res = response.data;
            if (res.responseStatus === 200) {
                setShift(res.response);
                setFilteredShift(res.response);
            }
        })
            .catch((error) => {
                openModal(error, "error");
                setShift([]);
                setFilteredShift([]);
            })
    }

    const handleAddNewEdit = (status, id, rowIndex) => {
        if (status) {
            setcurrentIndex(rowIndex);
            let reqData = { id: id };
            findShift(reqData).then((response) => {
                if (response.data.responseStatus === 200) {
                    setShiftObject(response.data.response);
                    setcurrentIndex(0);
                    setShowModalEdit(status);
                    // showModalEdit(true);
                } else {
                    openModal("Error");
                }
            })
                .catch((error) => {
                    openModal(error, "error");
                })
        } else {
            setEditModalShow(status);
            setcurrentIndex(0);
        }
    }

    //Delete API Function
    const onDelete = (id) => {

        let requestData = {
            id: id,
        }
        deleteShift(requestData).then((response) => {
            if (response.data.responseStatus === 200) {
                openModal(response.data.message, "cnf");
                getShiftList();
            }
            else {
                openModal(response.data.message, "error");
            }
        })
            .catch((error) => {
                openModal(error, "error");
            });
    }

    //totalhours calculation function of shiftstart and shiftend
    const calculateTime = (values, setFieldValue) => {
        // debugger
        let { isNightShift, shiftFrom, shiftTo } = values;
        if (values.shiftFrom != "" && values.shiftTo != "") {
            if (values.isNightShift) {
                var dt1 = new Date("2019-1-8 " + shiftFrom);
                var dt2 = new Date("2019-1-9 " + shiftTo);
            } else {
                var dt1 = new Date("2019-1-8 " + shiftFrom);
                var dt2 = new Date("2019-1-8 " + shiftTo);
            }

            var diff = dt2.getTime() - dt1.getTime();
            var hours = Math.floor(diff / (1000 * 60 * 60));
            diff -= hours * (1000 * 60 * 60);
            var mins = Math.floor(diff / (1000 * 60));
            diff -= mins * (1000 * 60);

            hours = String(hours).padStart(2, "0");

            if (Math.sign(hours) == "-1") {
                mins = String(mins).padStart(2, "0");
                var result = hours + ":" + mins;
                // setFieldValue("isNightShift", isNightShift);
                // setFieldValue("startTime", shiftFrom);
                // setFieldValue("endTime", shiftTo);
                setFieldValue("totalHours", 0);
            } else {
                mins = String(mins).padStart(2, "0");
                var result = hours + ":" + mins;
                setFieldValue("isNightShift", isNightShift);
                setFieldValue("startTime", shiftFrom);
                setFieldValue("endTime", shiftTo);
                setFieldValue("totalHours", result);
            }

        }
    };

    //workinghours calculation function of shiftstart and shiftend (-) lunchstarttime and lunchentime
    const calculateWorkingTime = (values, setFieldValue) => {
        let { isNightShift, lunchFrom, lunchTo, totalhours } = values;

        // Convert totalhours to minutes
        const totalhArray = totalhours.split(":");
        const totalhMinutes = parseInt(totalhArray[0]) * 60 + parseInt(totalhArray[1]);

        if (values.lunchFrom !== "" && values.lunchTo !== "") {
            let startTime, endTime;

            if (values.isNightShift) {
                startTime = new Date("2019-1-8 " + lunchFrom);
                endTime = new Date("2019-1-9 " + lunchTo);
            } else {
                startTime = new Date("2019-1-8 " + lunchFrom);
                endTime = new Date("2019-1-8 " + lunchTo);
            }

            // Compare the two dates and set start and end time accordingly
            if (startTime > endTime) {
                [startTime, endTime] = [endTime, startTime];
            }

            var diff = endTime.getTime() - startTime.getTime();
            var hours = Math.floor(diff / (1000 * 60 * 60));
            diff -= hours * (1000 * 60 * 60);
            var mins = Math.floor(diff / (1000 * 60));
            diff -= mins * (1000 * 60);

            // Deduct totalhours from the result
            var resultMinutes = hours * 60 + mins - totalhMinutes;

            // Calculate hours and remaining minutes
            var resultHours = Math.abs(Math.floor(resultMinutes / 60));
            var resultRemainingMinutes = Math.abs(resultMinutes % 60);

            // Format the result
            var result = resultHours.toString().padStart(2, "0") + ":" + resultRemainingMinutes.toString().padStart(2, "0");

            setFieldValue("isNightShift", isNightShift);
            // setFieldValue("lunchStartTime", lunchFrom);
            // setFieldValue("lunchEndTime", lunchTo);
            setFieldValue("workingHours", result);
        }
    };

    // isDayRadio

    const isDayRadio = (considerationCount) => {
        console.log("considerationCount-->" + considerationCount);
        return considerationCount ? false : true;
        // const foundObject = this.state.CheckList.find(
        //   (item) => item.employeeId === employeeId
        // );

        // if (foundObject) {
        //   console.log("Object found:", foundObject);
        //   return foundObject.attendanceStatus;
        // } else {
        //   console.log("Object not found");
        // }
    };

    function subtractMinutesFromHour(hour, minutesToSubtract, setFieldValue) {
        // debugger
        // Convert hour to minutes
        const [hours, minutes] = hour.split(":");
        const totalMinutes = parseInt(hours, 10) * 60 + parseInt(minutes, 10);

        // Subtract minutes
        const resultMinutes = totalMinutes - minutesToSubtract;

        // Convert result back to hour:minute format
        const resultHour = Math.floor(resultMinutes / 60);
        const resultMinutesRemainder = resultMinutes % 60;

        // Format the result as "HH:mm"
        const formattedHour = resultHour.toString().padStart(2, '0'); // Add leading zero if necessary
        const formattedMinutes = resultMinutesRemainder.toString().padStart(2, '0'); // Always ensure two digits for minutes

        const formattedResult = `${formattedHour}:${formattedMinutes}`;
        setFieldValue("workingHours", formattedResult);
        return formattedResult;
    }

    const priorSet = (val) => {
        let period = "AM";

        // Determine the AM/PM designation
        if (parseInt(val.split(":")[0], 10) >= 12) {
            period = "PM";
        }

        // Convert to 12-hour format
        const formattedTime = new Date(`01/01/2014 ${val}`).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

        const result = `01/01/2014 ${formattedTime} ${period}`;
        console.log('result:', result);

        return new Date(result).getTime();
    }

    // Example usage:
    // const formattedTime = priorSet("22:12");


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
                        {isActionExist("shift", "create", props.userPermissions) && (
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

                <div
                    className=" scrollable-div-page"
                >
                    <Row>
                        <Col className="list-table">
                            <Table className="table-hover">
                                <thead className="list-thead">
                                    <tr>
                                        <th className="table-th text-light">SR NO</th>
                                        <th className="table-th text-light">Shift Name</th>
                                        <th className="table-th text-light">Start Time</th>
                                        <th className="table-th text-light">End Time</th>
                                        <th className="table-th text-light">Is Night Shift</th>
                                        <th className="table-th text-light">Created Date</th>
                                        <th className="table-th text-light">Actions</th>
                                    </tr>
                                </thead>

                                <tbody style={{ maxHeight: "300px", overflowY: "auto" }}
                                >
                                    {filteredShift.length > 0 ? (
                                        filteredShift.map((v, i, record) => (
                                            <tr style={{ backgroundColor: "D9D9D9" }} onDoubleClick={() => handleAddNewEdit(true, v.id, i)} >
                                                <td>{i + 1}</td>
                                                <td>{v.shiftName}</td>
                                                <td>{v.startTime}</td>
                                                <td>{v.endTime}</td>
                                                <td>{v.isNightShift == true ? "YES" : "NO"}</td>
                                                <td>
                                                    {moment(v.createdDate).format("DD-MM-yyyy")}
                                                </td>
                                                <td align="left">
                                                    {isActionExist(
                                                        "shift",
                                                        "delete",
                                                        props.userPermissions
                                                    ) && (
                                                            <img
                                                                src={Delete}
                                                                alt=""
                                                                className="img-delete"
                                                                onClick={() => openModalForDelete(v.id)}
                                                            />
                                                        )}
                                                    {isActionExist(
                                                        "shift",
                                                        "edit",
                                                        props.userPermissions
                                                    ) && (
                                                            <img
                                                                src={edit}
                                                                alt=""
                                                                className="img-edit"
                                                                onClick={() => handleAddNewEdit(true, v.id, i)}
                                                            />
                                                        )}
                                                </td>
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
                </div>
            </div>

            {/* Add Modal */}
            <Modal show={showModal} onHide={handleCloseModal} className="custom-modal" centered>
                <div style={{ height: "690px" }}>
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content modal-height-width " >
                            {/* <Modal.Header className='pb-0' > */}
                            {/*  */}
                            <div className="pagePathLayout-modal-shift row" >
                                <span className="bold shift-modal-header">  <OverlayTrigger style={{}}
                                    placement="right"
                                    overlay={<Tooltip id="tooltip" className="tooltip-back-btn">Back</Tooltip>}
                                >

                                    <img src={BackBtn} alt="" className="modal-header-backbtn" onClick={handleCloseModal} />

                                </OverlayTrigger><span className="modal-header-span">{location.pathname}</span></span>

                            </div>
                            <Formik
                                initialValues={{
                                    shiftName: "",
                                    startTime: "",
                                    endTime: "",
                                    totalHours: "",
                                    graceInPeriod: "",
                                    graceOutPeriod: "",
                                    lunchTime: "",
                                    // lunchStartTime: "",
                                    // lunchEndTime: "",
                                    secondHalfPunchInTime: "",
                                    isNightShift: "",
                                    workingHours: "",
                                    isDayDeduction: "",
                                }}

                                const validationSchema={Yup.object().shape({
                                    shiftName: Yup.string().trim().required(" "),
                                    startTime: Yup.string().trim().required(" "),
                                    endTime: Yup.string().trim().required(" ")
                                        .test(
                                            'endTimeNotGreaterThanStartTime',
                                            'End time must not be less than start time',
                                            function (value) {
                                                // debugger
                                                const startTime = priorSet(this.parent.startTime)
                                                const val = priorSet(value)

                                                const result = startTime < val;
                                                return result
                                            }
                                        ),
                                    graceInPeriod: Yup.string().trim().required(" ")
                                        .test(
                                            'startTimeNotGreaterThanstartTime',
                                            'Grace in time must not be greater than start time',
                                            function (value) {
                                                const startTime = priorSet(this.parent.startTime)
                                                const val = priorSet(value)

                                                const result = startTime < val;
                                                return result
                                            }
                                        ),
                                    graceOutPeriod: Yup.string().trim().required(" ")
                                        .test(
                                            'endTimeNotGreaterThanEndTime',
                                            'Grace out time must not be greater than start time',
                                            function (value) {
                                                const endTime = priorSet(this.parent.endTime)
                                                const val = priorSet(value)

                                                const result = endTime > val;
                                                return result
                                            }
                                        ),
                                    lunchTime: Yup.string().trim().required(" "),
                                    // lunchStartTime: Yup.string().trim().required(" "),
                                    // lunchEndTime: Yup.string().trim().required(" "),
                                    secondHalfPunchInTime: Yup.string().trim().required(" "),
                                })}


                                onSubmit={(values, { setSubmitting, resetForm }) => {
                                    let requestData = {
                                        shiftName: values.shiftName,
                                        startTime: values.startTime,
                                        endTime: values.endTime,
                                        totalHours: values.totalHours,
                                        graceInPeriod: values.graceInPeriod,
                                        graceOutPeriod: values.graceOutPeriod,
                                        lunchTime: values.lunchTime,
                                        // lunchEndTime: values.lunchEndTime,
                                        secondHalfPunchInTime: values.secondHalfPunchInTime,
                                        isNightShift: values.isNightShift,
                                        workingHours: values.workingHours,
                                        considerationCount: values.considerationCount,
                                        isDayDeduction: values.isDayDeduction,
                                        dayValueOfDeduction: values.dayValueOfDeduction,
                                        hourValueOfDeduction: values.hourValueOfDeduction,
                                    }


                                    console.log("i am in", requestData)
                                    createShift(requestData).then((response) => {
                                        if (response.data.responseStatus === 200) {
                                            setSubmitting(false);
                                            resetForm();
                                            openModal(response.data.message, "cnf");
                                            setShowModal(false)
                                            getShiftList();
                                        } else {
                                            setSubmitting(false);
                                            openModal(response.data.message, "error");
                                        }
                                    })
                                        .catch((error) => {
                                            openModal(error, "error");
                                            setSubmitting(false);
                                        })
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
                                        <div className="modal-fields-row1-shift row">


                                            <div className="col-lg-4">
                                                <div class="textOnInput">
                                                    <CustomInput
                                                        className={`form-control ${touched.shiftName && errors.shiftName ? 'is-invalid' : ''}`}
                                                        type="text"
                                                        label="Shift Name"
                                                        id="shiftName"
                                                        shiftName="shiftName"
                                                        value={values.shiftName}

                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        inputError={errors.shiftName}
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-4">
                                                <div class="textOnInput">
                                                    <CustomTimeInputs
                                                        className={`form-control ${touched.startTime && errors.startTime ? 'is-invalid' : ''}`}
                                                        type="time"
                                                        id="startTime"
                                                        label="Start Time"
                                                        name="startTime"
                                                        value={values.startTime}
                                                        onChange={handleChange}
                                                        // onChange={(e) => {
                                                        //     debugger
                                                        //     console.log('e.target.value: ', e.target.value);

                                                        //     // const adjustedValue = values.startTimeVal === '12:01' ? '00:01' : values.startTimeVal.replace(/^12/, '00');
                                                        //     let [hours, minutes] = e.target.value.split(":");

                                                        //     // Replace the first two digits with "00"
                                                        //     let newTime = "00" + hours.substring(2) + ":" + minutes;

                                                        //     console.log(newTime);
                                                        //     setFieldValue("startTimeVal", e.target.value)
                                                        //     setFieldValue("startTime", newTime)
                                                        // }}

                                                        // onChange={(e) => {
                                                        //     debugger
                                                        //     const selectedTime = e.target.value;
                                                        //     const [hours, minutes] = selectedTime.split(":");
                                                        //     let period = "AM";

                                                        //     // Determine the AM/PM designation
                                                        //     if (parseInt(hours, 10) >= 12) {
                                                        //         period = "PM";
                                                        //         // Convert 12-hour time to 24-hour time for consistency
                                                        //         if (hours !== "12") {
                                                        //             hours = (parseInt(hours, 10) - 12).toString().padStart(2, "0");
                                                        //         }
                                                        //     }

                                                        //     // Create a new time string with AM/PM designation
                                                        //     const newTime = `${hours}:${minutes} ${period}`;

                                                        //     console.log(newTime);

                                                        //     setFieldValue("startTimeVal", selectedTime);
                                                        //     setFieldValue("startTime", selectedTime);
                                                        // }}
                                                        onBlur={handleBlur}
                                                        inputError={errors.startTime}
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-4">
                                                <div class="textOnInput">
                                                    <CustomTimeInputs
                                                        className={`form-control ${touched.endTime && errors.endTime ? 'is-invalid' : ''}`}
                                                        type="time"
                                                        id="endTime"
                                                        label="End Time"
                                                        name="endTime"
                                                        value={values.endTime}
                                                        onChange={handleChange}
                                                        onBlur={(e) => {
                                                            console.log('values.endTime: ', values);




                                                            calculateTime(
                                                                {
                                                                    isNightShift: values.isNightShift,
                                                                    shiftFrom: values.startTime,
                                                                    shiftTo: values.endTime,
                                                                },
                                                                setFieldValue
                                                            );
                                                        }}
                                                        inputError={errors.endTime}
                                                    />
                                                </div>
                                            </div>

                                        </div>
                                        <div className="modal-fields-row2-shift row" >

                                            <div className="col-lg-4">
                                                <div class="textOnInput">
                                                    <CustomInput
                                                        className={`form-control ${touched.totalHours && errors.totalHours ? 'is-invalid' : ''}`}
                                                        type="text"
                                                        id="totalHours"
                                                        label="Total Hours"
                                                        name="totalHours"
                                                        value={values.totalHours}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        inputError={errors.totalHours}
                                                        readOnly={true}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div class="textOnInput">
                                                    <CustomTimeInputs
                                                        className={`form-control ${touched.graceInPeriod && errors.graceInPeriod ? 'is-invalid' : ''}`}
                                                        type="time"
                                                        id="graceInPeriod"
                                                        label="Grace In Period"
                                                        name="graceInPeriod"
                                                        value={values.graceInPeriod}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        inputError={errors.graceInPeriod}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div class="textOnInput">
                                                    <CustomTimeInputs
                                                        className={`form-control ${touched.graceOutPeriod && errors.graceOutPeriod ? 'is-invalid' : ''}`}
                                                        type="time"
                                                        id="graceOutPeriod"
                                                        label="Grace Out Period"
                                                        name="graceOutPeriod"
                                                        value={values.graceOutPeriod}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        inputError={errors.graceOutPeriod}
                                                    />
                                                </div>
                                            </div>

                                        </div>

                                        <div className="modal-fields-row3-shift row mt-5">

                                            <div className="col-lg-4">
                                                <div class="textOnInput">
                                                    <CustomInput
                                                        className={`form-control ${touched.lunchTime && errors.lunchTime ? 'is-invalid' : ''}`}
                                                        type="text"
                                                        id="lunchTime"
                                                        label="Lunch Time(In Min)"
                                                        name="lunchTime"
                                                        value={values.lunchTime}
                                                        onChange={handleChange}
                                                        onBlur={() => {
                                                            // var MS_PER_MINUTE = 60000;
                                                            // var myStartDate = new Date(values.totalHours - values.lunchTime * MS_PER_MINUTE);
                                                            // console.log('myStartDate: ', myStartDate);
                                                            subtractMinutesFromHour(values.totalHours, values.lunchTime, setFieldValue);

                                                        }}
                                                        inputError={errors.lunchTime}
                                                    />
                                                </div>
                                            </div>
                                            {/* <div className="col-lg-4">
                                                <div class="textOnInput">
                                                    <CustomTimeInputs
                                                        className={`form-control ${touched.lunchStartTime && errors.lunchStartTime ? 'is-invalid' : ''}`}
                                                        type="time"
                                                        id="lunchStartTime"
                                                        label="Lunch Start Time"
                                                        name="lunchStartTime"
                                                        value={values.lunchStartTime}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        inputError={errors.lunchStartTime}
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-4">
                                                <div class="textOnInput">
                                                    <CustomTimeInputs
                                                        className={`form-control ${touched.lunchEndTime && errors.lunchEndTime ? 'is-invalid' : ''}`}
                                                        type="time"
                                                        id="lunchEndTime"
                                                        label="Lunch End Time"
                                                        name="lunchEndTime"
                                                        value={values.lunchEndTime}
                                                        onChange={handleChange}
                                                        onBlur={(e) => {
                                                            calculateWorkingTime(
                                                                {
                                                                    isNightShift: values.isNightShift,
                                                                    lunchFrom: values.lunchStartTime,
                                                                    lunchTo: values.lunchEndTime,
                                                                    totalhours: values.totalHours,
                                                                },
                                                                setFieldValue
                                                            );
                                                        }}
                                                        inputError={errors.lunchEndTime}
                                                    />
                                                </div>
                                            </div> */}

                                            <div className="col-lg-4">
                                                <div class="textOnInput">
                                                    <CustomTimeInputs
                                                        className={`form-control ${touched.secondHalfPunchInTime && errors.secondHalfPunchInTime ? 'is-invalid' : ''}`}
                                                        type="time"
                                                        id="secondHalfPunchInTime"
                                                        label="Second Half Punch in Time"
                                                        name="secondHalfPunchInTime"
                                                        value={values.secondHalfPunchInTime}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        inputError={errors.secondHalfPunchInTime}
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-4">
                                                <div class="textOnInput">
                                                    <CustomToggleSwitchForModal
                                                        label="Is Night Shift"
                                                        className={`form-control ${touched.isNightShift && errors.isNightShift ? 'is-invalid' : ''}`}
                                                        id="isNightShift"
                                                        name="isNightShift"
                                                        checked={values.isNightShift}
                                                        value={values.isNightShift}
                                                        onChange={() => setFieldValue('isNightShift', !values.isNightShift)}
                                                        onBlur={handleBlur}
                                                    />

                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal-fields-row4-shift row mt-5">



                                            <div className="col-lg-4">
                                                <div class="textOnInput">
                                                    <CustomInput
                                                        className={`form-control ${touched.workingHours && errors.workingHours ? 'is-invalid' : ''}`}
                                                        type="text"
                                                        id="workingHours"
                                                        label="Working Hours"
                                                        name="workingHours"
                                                        value={values.workingHours}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        inputError={errors.workingHours}
                                                        readOnly={true}
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-4">
                                                <div class="textOnInput">
                                                    <CustomInput
                                                        className={`form-control ${touched.considerationCount && errors.considerationCount ? 'is-invalid' : ''}`}
                                                        type="text"
                                                        id="considerationCount"
                                                        label="Permissible Late Count"
                                                        name="considerationCount"
                                                        value={values.considerationCount}
                                                        onChange={(e) => {
                                                            if (e.target.value <= 0) {
                                                                setFieldValue("isDayDeduction", "false");
                                                                setFieldValue("hourValueOfDeduction", "");
                                                                setFieldValue(
                                                                    "dayValueOfDeduction",
                                                                    ""
                                                                );
                                                            }
                                                            setFieldValue("considerationCount", e.target.value)

                                                        }}
                                                        onBlur={handleBlur}
                                                        inputError={errors.considerationCount}
                                                    />
                                                </div>
                                            </div>

                                        </div>
                                        <Row>
                                            <Col md="6">
                                                <Form.Group>
                                                    <Form.Label style={{ marginLeft: "48px", marginTop: "15px" }}>Deduction</Form.Label>
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col md="3">
                                                <Form.Group>
                                                    <Form.Label style={{ marginLeft: "48px" }}>
                                                        Deduction for
                                                        <span className="text-danger">*</span>
                                                    </Form.Label>
                                                    <br />
                                                    <Form.Group className="gender nightshiftlabel" style={{ marginLeft: "48px" }}>
                                                        <Form.Label>
                                                            <input
                                                                name="isDayDeduction"
                                                                type="radio"
                                                                disabled={isDayRadio(values.considerationCount > 0)}
                                                                onChange={(v) => {
                                                                    setFieldValue("isDayDeduction", "true");
                                                                }}
                                                                className="mr-1"
                                                            />
                                                            <span>Day </span>
                                                        </Form.Label>
                                                        <Form.Label className="ml-3" style={{ marginLeft: "10px" }}>
                                                            <input
                                                                name="isDayDeduction"
                                                                type="radio"
                                                                disabled={isDayRadio(values.considerationCount > 0)}
                                                                onChange={(v) => {
                                                                    setFieldValue("isDayDeduction", "false");
                                                                }}
                                                                className="mr-1"
                                                            />
                                                            <span>Min</span>
                                                        </Form.Label>
                                                    </Form.Group>
                                                    <span className="text-danger">
                                                        {errors.isDayDeduction && "Select Option?"}
                                                    </span>
                                                </Form.Group>
                                            </Col>
                                            {console.log(values)}
                                            {values.isDayDeduction == "true" ? (
                                                <Col md="4">
                                                    <Form.Group>
                                                        <Form.Label >
                                                            Deduction for Days
                                                            <span className="text-danger">*</span>
                                                        </Form.Label>
                                                        <br />
                                                        <Form.Group className="gender nightshiftlabel">
                                                            <Row>
                                                                <Form.Label>
                                                                    <input
                                                                        name="dayValueOfDeduction"
                                                                        type="radio"
                                                                        onChange={(v) => {
                                                                            setFieldValue(
                                                                                "dayValueOfDeduction",
                                                                                "quarter"
                                                                            );
                                                                        }}
                                                                        className="mr-1"
                                                                    />
                                                                    <span>Quarter</span>
                                                                </Form.Label>
                                                            </Row>
                                                            <Row>
                                                                <Row>
                                                                    <Form.Label className="ml-3">
                                                                        <input
                                                                            name="dayValueOfDeduction"
                                                                            type="radio"
                                                                            onChange={(v) => {
                                                                                setFieldValue(
                                                                                    "dayValueOfDeduction",
                                                                                    "half"
                                                                                );
                                                                            }}
                                                                            className="mr-1"
                                                                        />
                                                                        <span>Half</span>
                                                                    </Form.Label>
                                                                </Row>
                                                            </Row>
                                                            <Row>
                                                                <Row>
                                                                    <Form.Label className="ml-3">
                                                                        <input
                                                                            name="dayValueOfDeduction"
                                                                            type="radio"
                                                                            onChange={(v) => {
                                                                                setFieldValue(
                                                                                    "dayValueOfDeduction",
                                                                                    "full"
                                                                                );
                                                                            }}
                                                                            className="mr-1"
                                                                        />
                                                                        <span>Full</span>
                                                                    </Form.Label>
                                                                </Row>
                                                            </Row>
                                                        </Form.Group>
                                                        <span className="text-danger">
                                                            {errors.dayValueOfDeduction && "Select Option?"}
                                                        </span>
                                                    </Form.Group>
                                                </Col>
                                            ) : null}
                                            {values.isDayDeduction == "false" ? (
                                                <Row>
                                                    <Col md="12">
                                                        <Form.Group>
                                                            <Form.Label style={{ marginLeft: "48px" }}>Deduction for Min</Form.Label>
                                                            <input style={{ marginLeft: "10px" }}
                                                                type="text"
                                                                placeholder="Enter Late Count"
                                                                name="hourValueOfDeduction"
                                                                onChange={handleChange}
                                                                value={values.hourValueOfDeduction}
                                                                invalid={errors.hourValueOfDeduction ? true : false}
                                                            />
                                                            <span className="text-danger">
                                                                {errors.hourValueOfDeduction}
                                                            </span>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                            ) : null}
                                        </Row>
                                        <Row >
                                            <Col lg="10">
                                            </Col>
                                            <Col lg="2">
                                                <Button
                                                    className="modal-btn-shift"
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
                </div>
            </Modal >

            {/* Edit Modal */}
            < Modal show={showModalEdit} onHide={handleCloseModalEdit} className="custom-modal" centered >
                <div style={{ height: "690px" }}>
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content modal-height-width " >
                            {/* <Modal.Header className='pb-0' > */}
                            {/*  */}
                            <div className="pagePathLayout-modal-shift row">
                                <span className="bold shift-modal-header">  <OverlayTrigger style={{}}
                                    placement="right"
                                    overlay={<Tooltip id="tooltip" className="tooltip-back-btn">Back</Tooltip>}
                                >

                                    <img src={BackBtn} alt="" className="modal-header-backbtn" onClick={handleCloseModalEdit} />

                                </OverlayTrigger><span className="modal-header-span">{location.pathname}</span></span>

                            </div>
                            <Formik
                                initialValues={{
                                    shiftName: shiftObject != null ? shiftObject.shiftName : "",
                                    startTime: shiftObject != null ? shiftObject.startTime : "",
                                    endTime: shiftObject != null ? shiftObject.endTime : "",
                                    totalHours: shiftObject != null ? shiftObject.totalHours : "",
                                    graceInPeriod: shiftObject != null ? shiftObject.graceInPeriod : "",
                                    graceOutPeriod: shiftObject != null ? shiftObject.graceOutPeriod : "",
                                    lunchTime: shiftObject != null ? shiftObject.lunchTime : "",
                                    // lunchStartTime: shiftObject != null ? shiftObject.lunchStartTime : "",
                                    // lunchEndTime: shiftObject != null ? shiftObject.lunchEndTime : "",
                                    secondHalfPunchInTime: shiftObject != null ? shiftObject.secondHalfPunchInTime : "",
                                    isNightShift: shiftObject != null ? shiftObject.isNightShift : "",
                                    workingHours: shiftObject != null ? shiftObject.workingHours : "",
                                    isDayDeduction: shiftObject != null ? shiftObject.isDayDeduction : "",
                                    considerationCount: shiftObject != null ? shiftObject.considerationCount : "",
                                    dayValueOfDeduction: shiftObject != null ? shiftObject.dayValueOfDeduction : "",
                                    hourValueOfDeduction: shiftObject != null ? shiftObject.hourValueOfDeduction : ""
                                }}
                                validationSchema={
                                    Yup.object().shape({
                                        shiftName: Yup.string().trim().required(" "),
                                        startTime: Yup.string().trim().required(" "),
                                        endTime: Yup.string().trim().required(" "),
                                        graceInPeriod: Yup.string().trim().required(" "),
                                        graceOutPeriod: Yup.string().trim().required(" "),
                                        lunchTime: Yup.string().trim().required(" "),
                                        // lunchStartTime: Yup.string().trim().required(" "),
                                        // lunchEndTime: Yup.string().trim().required(" "),
                                        secondHalfPunchInTime: Yup.string().trim().required(" "),
                                    })
                                }
                                onSubmit={(values, { setSubmitting, resetForm }) => {
                                    let requestData = {
                                        id: shiftObject.id,
                                        shiftName: values.shiftName,
                                        startTime: values.startTime,
                                        endTime: values.endTime,
                                        totalHours: values.totalHours,
                                        graceInPeriod: values.graceInPeriod,
                                        graceOutPeriod: values.graceOutPeriod,
                                        lunchTime: values.lunchTime,
                                        // lunchStartTime: values.lunchStartTime,
                                        // lunchEndTime: values.lunchEndTime,
                                        secondHalfPunchInTime: values.secondHalfPunchInTime,
                                        isNightShift: values.isNightShift,
                                        workingHours: values.workingHours,
                                        considerationCount: values.considerationCount,
                                        lunchTime: values.lunchTime,
                                        isDayDeduction: values.isDayDeduction,
                                        dayValueOfDeduction: values.dayValueOfDeduction,
                                        hourValueOfDeduction: values.hourValueOfDeduction
                                    }
                                    updateShift(requestData).then((response) => {
                                        if (response.data.responseStatus === 200) {
                                            openModal(response.data.message, "cnf");
                                            setSubmitting(false);
                                            handleCloseModalEdit();
                                            getShiftList();
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
                                        <div className="modal-fields-row1-shift row">


                                            <div className="col-lg-4">
                                                <div class="textOnInput">
                                                    <CustomInput
                                                        className={`form-control ${touched.shiftName && errors.shiftName ? 'is-invalid' : ''}`}
                                                        type="text"
                                                        label="Shift Name"
                                                        id="shiftName"
                                                        shiftName="shiftName"
                                                        value={values.shiftName}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        inputError={errors.shiftName}
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-4">
                                                <div class="textOnInput">
                                                    <CustomTimeInputs
                                                        className={`form-control ${touched.startTime && errors.startTime ? 'is-invalid' : ''}`}
                                                        type="time"
                                                        id="startTime"
                                                        label="Start Time"
                                                        name="startTime"
                                                        value={values.startTime}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        inputError={errors.startTime}
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-4">
                                                <div class="textOnInput">
                                                    <CustomTimeInputs
                                                        className={`form-control ${touched.endTime && errors.endTime ? 'is-invalid' : ''}`}
                                                        type="time"
                                                        id="endTime"
                                                        label="End Time"
                                                        name="endTime"
                                                        value={values.endTime}
                                                        onChange={handleChange}
                                                        onBlur={(e) => {
                                                            calculateTime(
                                                                {
                                                                    isNightShift: values.isNightShift,
                                                                    shiftFrom: values.startTime,
                                                                    shiftTo: values.endTime,
                                                                },
                                                                setFieldValue
                                                            );
                                                        }}
                                                        inputError={errors.endTime}
                                                    />
                                                </div>
                                            </div>

                                        </div>
                                        <div className="modal-fields-row2-shift row" >

                                            <div className="col-lg-4">
                                                <div class="textOnInput">
                                                    <CustomInput
                                                        className={`form-control ${touched.totalHours && errors.totalHours ? 'is-invalid' : ''}`}
                                                        type="text"
                                                        id="totalHours"
                                                        label="Total Hours"
                                                        name="totalHours"
                                                        value={values.totalHours}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        inputError={errors.totalHours}
                                                        readOnly={true}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div class="textOnInput">
                                                    <CustomTimeInputs
                                                        className={`form-control ${touched.graceInPeriod && errors.graceInPeriod ? 'is-invalid' : ''}`}
                                                        type="time"
                                                        id="graceInPeriod"
                                                        label="Grace In Period"
                                                        name="graceInPeriod"
                                                        value={values.graceInPeriod}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        inputError={errors.graceInPeriod}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div class="textOnInput">
                                                    <CustomTimeInputs
                                                        className={`form-control ${touched.graceOutPeriod && errors.graceOutPeriod ? 'is-invalid' : ''}`}
                                                        type="time"
                                                        id="graceOutPeriod"
                                                        label="Grace Out Period"
                                                        name="graceOutPeriod"
                                                        value={values.graceOutPeriod}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        inputError={errors.graceOutPeriod}
                                                    />
                                                </div>
                                            </div>

                                        </div>

                                        <div className="modal-fields-row3-shift row mt-5">
                                            <div className="col-lg-4">
                                                <div class="textOnInput">
                                                    <CustomInput
                                                        className={`form-control ${touched.lunchTime && errors.lunchTime ? 'is-invalid' : ''}`}
                                                        type="text"
                                                        id="lunchTime"
                                                        label="Lunch Time(In Min)"
                                                        name="lunchTime"
                                                        value={values.lunchTime}
                                                        onChange={handleChange}
                                                        onBlur={() => {
                                                            // var MS_PER_MINUTE = 60000;
                                                            // var myStartDate = new Date(values.totalHours - values.lunchTime * MS_PER_MINUTE);
                                                            // console.log('myStartDate: ', myStartDate);
                                                            subtractMinutesFromHour(values.totalHours, values.lunchTime, setFieldValue);

                                                        }}
                                                        inputError={errors.lunchTime}
                                                    />
                                                </div>
                                            </div>

                                            {/* <div className="col-lg-4">
                                                <div class="textOnInput">
                                                    <CustomTimeInputs
                                                        className={`form-control ${touched.lunchStartTime && errors.lunchStartTime ? 'is-invalid' : ''}`}
                                                        type="time"
                                                        id="lunchStartTime"
                                                        label="Lunch Start Time"
                                                        name="lunchStartTime"
                                                        value={values.lunchStartTime}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        inputError={errors.lunchStartTime}
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-4">
                                                <div class="textOnInput">
                                                    <CustomTimeInputs
                                                        className={`form-control ${touched.lunchEndTime && errors.lunchEndTime ? 'is-invalid' : ''}`}
                                                        type="time"
                                                        id="lunchEndTime"
                                                        label="Lunch End Time"
                                                        name="lunchEndTime"
                                                        value={values.lunchEndTime}
                                                        onChange={handleChange}
                                                        onBlur={(e) => {
                                                            calculateWorkingTime(
                                                                {
                                                                    isNightShift: values.isNightShift,
                                                                    lunchFrom: values.lunchStartTime,
                                                                    lunchTo: values.lunchEndTime,
                                                                    totalhours: values.totalHours,
                                                                },
                                                                setFieldValue
                                                            );
                                                        }}
                                                        inputError={errors.lunchEndTime}
                                                    />
                                                </div>
                                            </div> */}

                                            <div className="col-lg-4">
                                                <div class="textOnInput">
                                                    <CustomTimeInputs
                                                        className={`form-control ${touched.secondHalfPunchInTime && errors.secondHalfPunchInTime ? 'is-invalid' : ''}`}
                                                        type="time"
                                                        id="secondHalfPunchInTime"
                                                        label="Second Half Punch in Time"
                                                        name="secondHalfPunchInTime"
                                                        value={values.secondHalfPunchInTime}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        inputError={errors.secondHalfPunchInTime}
                                                    />
                                                </div>
                                            </div>
                                            <div className=" col-lg-4">
                                                <div class="textOnInput">
                                                <CustomToggleSwitchForModal
                                                    label="Is Night Shift"
                                                    className={`form-control ${touched.isNightShift && errors.isNightShift ? 'is-invalid' : ''}`}
                                                    id="isNightShift"
                                                    name="isNightShift"
                                                    checked={values.isNightShift ? true : false}
                                                    value={values.isNightShift}
                                                    onChange={() => setFieldValue('isNightShift', !values.isNightShift)}
                                                    onBlur={handleBlur}

                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal-fields-row4-shift row mt-5">



                                            <div className="col-lg-4">
                                                <div class="textOnInput ">
                                                    <CustomInput
                                                        className={`form-control ${touched.workingHours && errors.workingHours ? 'is-invalid' : ''}`}
                                                        type="text"
                                                        id="workingHours"
                                                        label="Working Hours"
                                                        name="workingHours"
                                                        value={values.workingHours}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        inputError={errors.workingHours}
                                                        readOnly={true}
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-4">
                                                <div class="textOnInput">
                                                    <CustomInput
                                                        className={`form-control ${touched.considerationCount && errors.considerationCount ? 'is-invalid' : ''}`}
                                                        type="text"
                                                        id="considerationCount"
                                                        label="Permissible Late Count"
                                                        name="considerationCount"
                                                        value={values.considerationCount}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        inputError={errors.considerationCount}
                                                    />
                                                </div>
                                            </div>

                                        </div>
                                        <Row>
                                            <Col md="6">
                                                <Form.Group>
                                                    <Form.Label style={{ marginLeft: "48px", marginTop: "15px" }}>Deduction</Form.Label>
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col md="3">
                                                <Form.Group>
                                                    <Form.Label style={{ marginLeft: "48px" }}>
                                                        Deduction for
                                                        <span className="text-danger">*</span>
                                                    </Form.Label>
                                                    <br />
                                                    <Form.Group className="gender nightshiftlabel" style={{ marginLeft: "48px" }}>
                                                        <Form.Label>
                                                            <input
                                                                name="isDayDeduction"
                                                                type="radio"
                                                                disabled={isDayRadio(values.considerationCount > 0)}
                                                                checked={values.isDayDeduction === true ? true : false}
                                                                onChange={(v) => {
                                                                    setFieldValue("isDayDeduction", true);
                                                                }}
                                                                className="mr-1"
                                                            />
                                                            <span>Day </span>
                                                        </Form.Label>
                                                        <Form.Label className="ml-3" style={{ marginLeft: "10px" }}>
                                                            <input
                                                                name="isDayDeduction"
                                                                type="radio"
                                                                disabled={isDayRadio(values.considerationCount > 0)}
                                                                // value={false}
                                                                checked={values.isDayDeduction === true ? false : true}
                                                                onChange={(v) => {
                                                                    setFieldValue("isDayDeduction", false);
                                                                }}
                                                                className="mr-1"
                                                            />
                                                            <span>Hour</span>
                                                        </Form.Label>
                                                    </Form.Group>
                                                    <span className="text-danger">
                                                        {errors.isDayDeduction && "Select Option?"}
                                                    </span>
                                                </Form.Group>
                                            </Col>
                                            {console.log(values)}
                                            {values.isDayDeduction == true ? (
                                                <Col md="4">
                                                    <Form.Group>
                                                        <Form.Label>
                                                            Deduction for Days
                                                            <span className="text-danger">*</span>
                                                        </Form.Label>
                                                        <br />
                                                        <Form.Group className="gender nightshiftlabel">
                                                            <Row>
                                                                <Form.Label>
                                                                    <input
                                                                        name="dayValueOfDeduction"
                                                                        type="radio"
                                                                        checked={values.dayValueOfDeduction === "quarter"}
                                                                        onChange={(v) => {
                                                                            setFieldValue(
                                                                                "dayValueOfDeduction",
                                                                                "quarter"
                                                                            );
                                                                        }}
                                                                        className="mr-1"
                                                                    />
                                                                    <span>Quarter</span>
                                                                </Form.Label>
                                                            </Row>
                                                            <Row>
                                                                <Row>
                                                                    <Form.Label className="ml-3">
                                                                        <input
                                                                            name="dayValueOfDeduction"
                                                                            type="radio"
                                                                            checked={values.dayValueOfDeduction === "half"}

                                                                            onChange={(v) => {
                                                                                setFieldValue(
                                                                                    "dayValueOfDeduction",
                                                                                    "half"
                                                                                );
                                                                            }}
                                                                            className="mr-1"
                                                                        />
                                                                        <span>Half</span>
                                                                    </Form.Label>
                                                                </Row>
                                                            </Row>
                                                            <Row>
                                                                <Row>
                                                                    <Form.Label className="ml-3">
                                                                        <input
                                                                            name="dayValueOfDeduction"
                                                                            type="radio"
                                                                            checked={values.dayValueOfDeduction === "full"}

                                                                            onChange={(v) => {
                                                                                setFieldValue(
                                                                                    "dayValueOfDeduction",
                                                                                    "full"
                                                                                );
                                                                            }}
                                                                            className="mr-1"
                                                                        />
                                                                        <span>Full</span>
                                                                    </Form.Label>
                                                                </Row>
                                                            </Row>
                                                        </Form.Group>
                                                        <span className="text-danger">
                                                            {errors.dayValueOfDeduction && "Select Option?"}
                                                        </span>
                                                    </Form.Group>
                                                </Col>
                                            ) : null}
                                            {values.isDayDeduction == false ? (
                                                <Row>
                                                    <Col md="12">
                                                        <Form.Group>
                                                            <Form.Label style={{ marginLeft: "48px" }}>Deduction for Hours</Form.Label>
                                                            <input style={{ marginLeft: "10px" }}
                                                                type="text"
                                                                placeholder="Enter Late Count"
                                                                name="hourValueOfDeduction"
                                                                onChange={handleChange}
                                                                value={values.hourValueOfDeduction}
                                                                invalid={errors.hourValueOfDeduction ? true : false}
                                                            />
                                                            <span className="text-danger">
                                                                {errors.hourValueOfDeduction}
                                                            </span>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                            ) : null}
                                        </Row>
                                        <Row >
                                            <Col lg="10">
                                                {/* <Button
                                                    className="modal-btn-cancel mt-3"
                                                // type="submit"
                                                >
                                                    Cancel
                                                </Button> */}
                                            </Col>
                                            <Col lg="2">
                                                <Button
                                                    className="modal-btn-shift"
                                                    type="submit"
                                                >
                                                    Update
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </Modal >

            <DeleteConfirmationModal
                DeleteConfirmationModal={DeleteConfirmation}
                onRequestClose={closeModal}
                onConfirm={() => onDelete(DeleteId)}
                text={`Are you sure you want to Delete ?`}
            />
        </div >
    );
}

export default WithUserPermission(Shift);
