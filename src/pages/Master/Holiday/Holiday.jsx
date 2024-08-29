import React, { useEffect, useState } from "react";
import AddBtn from "../../../assets/images/MenuButton.png";
import BackBtn from "../../../assets/images/back.png";
import { useLocation, useNavigate } from "react-router-dom";
import { Col, Row, Table, Form, Modal, Card, Button } from "react-bootstrap";
import * as Yup from "yup";
import { Formik, ErrorMessage } from "formik";
import edit from "../../../assets/images/edit.png";
import Delete from "../../../assets/images/delete.png";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import CustomInput from "../../../components/CustomInputs";
import CustomToggleSwitch from "../../../components/CustomToggleSwitch";
import CustomTimeInputs from "../../../components/CustomTimeInputs";
import {
    createHoliday,
    listOfHoliday,
    deleteHoliday,
    updateHoliday,
    findHoliday,
} from "@/services/api_functions";
import moment from "moment";
import { isActionExist } from "../../../helpers/constants";
import { WithUserPermission } from "../../../helpers/WithUserPermission";
import DeleteConfirmationModal from "../../../components/DeleteConfirmationModal";
import ResponseModal from "../../../components/ResponseModal";
import CustomDateInputs from "../../../components/CustomDateInputs";

function Holiday(props) {
    const location = useLocation();
    const pathArray = location.pathname.split("/"); // Split the path into an array
    const name = pathArray[pathArray.length - 1]; // Get the last element of the array

    const [showModal, setShowModal] = useState(false); // State to control the modal visibility
    const [showModalEdit, setShowModalEdit] = useState(false); // State to control the modal visibility
    const [holidayObject, setHolidayObject] = useState("");
    const [holiday, setHoliday] = useState([]);
    const [filteredHoliday, setFilteredHoliday] = useState([]);
    const [totalCount, setTotalCount] = useState(0);

    const [DeleteConfirmation, setDeleteConfirmation] = useState();
    const [DeleteId, setDeleteId] = useState()


    const [ResModal, setResModal] = useState(false);
    const [ResText, setResText] = useState(false);
    const [LogoType, setLogoType] = useState("");
    const [rowId, setrowId] = useState();

    const navigate = useNavigate()
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
        getHolidayList();
    }, []);

    //List API Function
    const getHolidayList = () => {
        listOfHoliday({ "isOwner": true })
            .then((response) => {
                let res = response.data;
                if (res.responseStatus === 200) {
                    setHoliday(res.response);
                    setFilteredHoliday(res.response);
                }
            })
            .catch((error) => {
                setHoliday([]);
                setFilteredHoliday([]);
                openModal(error, "error");
            });
    }

    //Before Editing Finding the record by Id
    const handleAddNewEdit = (status, id, rowIndex) => {
        if (status) {
            setcurrentIndex(rowIndex);
            let reqData = { id: id };

            findHoliday(reqData)
                .then((response) => {
                    if (response.data.responseStatus === 200) {
                        setHolidayObject(response.data.response);
                        setcurrentIndex(0);
                        setShowModalEdit(status);
                        // setShowModalEdit(true);

                    } else {
                        openModal("No Data Found", "error");
                    }
                })
                .catch((error) => {
                    openModal(error, "error");
                });
        } else {
            setEditModalShow(status);
            setcurrentIndex(0);
        }
    };

    //Delete API Function
    const onDelete = (id) => {

        let requestData = {
            id: id,
        }
        deleteHoliday(requestData).then((response) => {
            if (response.data.responseStatus === 200) {
                openModal(response.data.message, "cnf");
                getHolidayList();
            }
            else {
                openModal(response.data.message, "error");
            }
        })
            .catch((error) => {
                openModal(error, "error");
            });
    }

    const calculateTotalCount = (values, setFieldValue) => {
        const { fromDate, toDate } = values; // Destructure fromDate and toDate from values
        const fromDateObj = new Date(fromDate);
        const toDateObj = new Date(toDate);
        const differenceInTime = toDateObj.getTime() - fromDateObj.getTime();
        const differenceInDays = differenceInTime / (1000 * 3600 * 24);
        const totalCount = differenceInDays + 1; // Adding 1 to include both fromDate and toDate

        // Update the value of totalDays in the form
        setFieldValue("totalDays", totalCount);
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
                        <span className="bold" >{location.pathname}</span>
                    </div>
                    <OverlayTrigger
                        placement="left"
                        overlay={<Tooltip id="tooltip" className="tooltip-add-btn">Create</Tooltip>}
                    >
                        {isActionExist("holiday", "create", props.userPermissions) && (
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
                                        <th className="table-th text-light">Holiday name</th>
                                        <th className="table-th text-light">From</th>
                                        <th className="table-th text-light">To</th>
                                        <th className="table-th text-light">Total Days</th>
                                        <th className="table-th text-light">Holiday Type</th>
                                        <th className="table-th text-light">Holiday Description</th>
                                        <th className="table-th text-light">Actions</th>
                                    </tr>
                                </thead>

                                <tbody style={{ maxHeight: "300px", overflowY: "auto" }}
                                >
                                    {filteredHoliday.length > 0 ? (
                                        filteredHoliday.map((v, i, record) => (
                                            <tr style={{ backgroundColor: "D9D9D9" }} onDoubleClick={() => handleAddNewEdit(true, v.id, i)}  >
                                                <td>{i + 1}</td>
                                                <td>{v.holidayName}</td>
                                                <td>{moment(v.fromDate).format("DD-MM-yyyy")}</td>
                                                <td>{moment(v.toDate).format("DD-MM-yyyy")}</td>
                                                <td>{v.totalDays}</td>
                                                <td>{v.holidayType === true ? "PUBLIC" : "PRIVATE"}</td>
                                                <td>{v.holidayDescription}</td>
                                                <td align="left">
                                                    {isActionExist(
                                                        "holiday",
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
                                                        "holiday",
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
                                holidayName: "",
                                fromDate: "",
                                toDate: "",
                                totalDays: "",
                                holidayType: "",
                                holidayDescription: "",
                            }}
                            validationSchema={
                                Yup.object().shape({
                                    holidayName: Yup.string().trim().required(" "),
                                    fromDate: Yup.string().trim().required(" "),
                                    toDate: Yup.string().trim().required(" "),
                                    holidayType: Yup.string().trim().required(" "),
                                })
                            }
                            onSubmit={(values, { setSubmitting, resetForm }) => {
                                let requestData = {
                                    holidayName: values.holidayName,
                                    fromDate: values.fromDate,
                                    toDate: values.toDate,
                                    totalDays: parseInt(values.totalDays),
                                    holidayType: values.holidayType,
                                    holidayDescription: values.holidayDescription,
                                }
                                createHoliday(requestData).then((response) => {
                                    if (response.data.responseStatus === 200) {
                                        setSubmitting(false);
                                        openModal(response.data.message, "cnf");
                                        resetForm();
                                        // setShowModal(false)
                                        getHolidayList();
                                    } else {
                                        setSubmitting(false);
                                        openModal(response.data.message, "error");
                                    }
                                })
                                    .catch((error) => {
                                        setSubmitting(false);
                                        openModal(error, "error");
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
                                    <div className="modal-fields-row1 row">


                                        <div className="col-lg-4">
                                            <div class="textOnInput">
                                                <CustomInput
                                                    className={`form-control ${touched.holidayName && errors.holidayName ? 'is-invalid' : ''}`}
                                                    type="text"
                                                    label="Holiday Name"
                                                    id="holidayName"
                                                    name="holidayName"
                                                    value={values.holidayName}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    inputError={errors.holidayName}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-4">
                                            <div class="textOnInput">
                                                <CustomDateInputs
                                                    className={`form-control ${touched.fromDate && errors.fromDate ? 'is-invalid' : ''}`}
                                                    type="date"
                                                    id="fromDate"
                                                    label="From Date"
                                                    name="fromDate"
                                                    value={values.fromDate}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    inputError={errors.fromDate}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-4">
                                            <div class="textOnInput">
                                                <CustomDateInputs
                                                    className={`form-control ${touched.toDate && errors.toDate ? 'is-invalid' : ''}`}
                                                    type="date"
                                                    id="toDate"
                                                    label="To Date"
                                                    name="toDate"
                                                    value={values.toDate}
                                                    onChange={handleChange}
                                                    onBlur={(e) => {
                                                        calculateTotalCount(
                                                            {
                                                                fromDate: values.fromDate,
                                                                toDate: values.toDate,
                                                            },
                                                            setFieldValue
                                                        )
                                                    }}
                                                    inputError={errors.toDate}
                                                />
                                            </div>
                                        </div>

                                    </div>
                                    <div className="modal-fields-row2 row">
                                        <div className="col-lg-4">
                                            <div class="textOnInput">
                                                <CustomInput
                                                    className={`form-control ${touched.totalDays && errors.totalDays ? 'is-invalid' : ''}`}
                                                    type="text"
                                                    label="Total Days"
                                                    id="totalDays"
                                                    name="totalDays"
                                                    value={values.totalDays}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    inputError={errors.totalDays}
                                                    readOnly={true}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-4" style={{ marginTop: "18px" }}>
                                            <div class="textOnInput">
                                                <Form.Group>
                                                    <Form.Group className="gender nightshiftlabel" style={{ marginLeft: "48px" }}>
                                                        <Form.Label>
                                                            <input
                                                                name="holidayType"
                                                                type="radio"
                                                                id="holidayType"
                                                                // disabled={isDayRadio(values.considerationCount > 0)}
                                                                onChange={(v) => {
                                                                    setFieldValue("holidayType", true);
                                                                }}
                                                                className="mr-1"
                                                            />
                                                            <span style={{ margin: "2px" }}>Public </span>
                                                        </Form.Label>
                                                        <Form.Label className="ml-3" style={{ marginLeft: "120px" }}>
                                                            <input
                                                                name="holidayType"
                                                                type="radio"
                                                                id="holidayType"
                                                                // disabled={isDayRadio(values.considerationCount > 0)}
                                                                onChange={(v) => {
                                                                    setFieldValue("holidayType", false);
                                                                }}
                                                                className="mr-1"
                                                            />
                                                            <span style={{ margin: "2px" }}>Private</span>
                                                        </Form.Label>
                                                    </Form.Group>
                                                    <span className="text-danger">
                                                        {errors.isDayDeduction && "Select Option?"}
                                                    </span>
                                                </Form.Group>
                                            </div>
                                        </div>

                                        <div className="col-lg-4">
                                            <div class="textOnInput">
                                                <CustomInput
                                                    className={`form-control ${touched.holidayDescription && errors.holidayDescription ? 'is-invalid' : ''}`}
                                                    type="text"
                                                    id="holidayDescription"
                                                    label="Description"
                                                    name="holidayDescription"
                                                    value={values.holidayDescription}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    inputError={errors.holidayDescription}
                                                />
                                            </div>
                                        </div>

                                    </div>
                                    <div className="modal-fields-row3 row">


                                        <div className="col-lg-4">
                                            <div class="textOnInput">

                                            </div>
                                        </div>

                                        <div className="col-lg-4">
                                            <div class="textOnInput">

                                            </div>
                                        </div>

                                        <div className="col-lg-4">
                                            <div class="textOnInput">

                                            </div>
                                        </div>

                                    </div>
                                    <div className="modal-fields-row4 row">


                                        <div className="col-lg-4">
                                            <div class="textOnInput">

                                            </div>
                                        </div>

                                        <div className="col-lg-4">
                                            <div class="textOnInput">

                                            </div>
                                        </div>

                                        <div className="col-lg-4">
                                            <div class="textOnInput">

                                            </div>
                                        </div>

                                    </div>

                                    <Row >
                                        <Col lg="10">
                                        </Col>
                                        <Col lg="2">
                                            <Button
                                                className="modal-btn mt-3"
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

            {/* Edit Modal */}
            <Modal show={showModalEdit} onHide={handleCloseModalEdit} className="custom-modal" centered>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content modal-height-width " >
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
                                holidayName: holidayObject != null ? holidayObject.holidayName : "",
                                fromDate: holidayObject != null ? holidayObject.fromDate : "",
                                toDate: holidayObject != null ? holidayObject.toDate : "",
                                totalDays: holidayObject != null ? holidayObject.totalDays : "",
                                holidayType: holidayObject != null ? holidayObject.holidayType : "",
                                holidayDescription: holidayObject != null ? holidayObject.holidayDescription : "",
                            }}
                            validationSchema={
                                Yup.object().shape({
                                    holidayName: Yup.string().trim().required(" "),
                                    fromDate: Yup.string().trim().required(" "),
                                    toDate: Yup.string().trim().required(" "),
                                    holidayType: Yup.string().trim().required(" "),
                                })
                            }
                            onSubmit={(values, { setSubmitting, resetForm }) => {
                                let requestData = {
                                    id: holidayObject.id,
                                    holidayName: values.holidayName,
                                    fromDate: values.fromDate,
                                    toDate: values.toDate,
                                    totalDays: parseInt(values.totalDays),
                                    holidayType: values.holidayType,
                                    holidayDescription: values.holidayDescription,
                                };
                                console.log("request Data >>", JSON.stringify(requestData));
                                updateHoliday(requestData)
                                    .then((response) => {
                                        console.log("response>>", response)
                                        if (response.data.responseStatus === 200) {
                                            setSubmitting(false);
                                            handleCloseModalEdit();
                                            openModal(response.data.message, "cnf");
                                            getHolidayList();
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
                                                <CustomInput
                                                    className={`form-control ${touched.holidayName && errors.holidayName ? 'is-invalid' : ''}`}
                                                    type="text"
                                                    label="Holiday Name"
                                                    id="holidayName"
                                                    name="holidayName"
                                                    value={values.holidayName}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    inputError={errors.holidayName}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div class="textOnInput">
                                                <CustomDateInputs
                                                    className={`form-control ${touched.fromDate && errors.fromDate ? 'is-invalid' : ''}`}
                                                    type="date"
                                                    id="fromDate"
                                                    label="From Date"
                                                    name="fromDate"
                                                    value={values.fromDate}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    inputError={errors.fromDate}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div class="textOnInput">
                                                <CustomDateInputs
                                                    className={`form-control ${touched.toDate && errors.toDate ? 'is-invalid' : ''}`}
                                                    type="date"
                                                    id="toDate"
                                                    label="To Date"
                                                    name="toDate"
                                                    value={values.toDate}
                                                    onChange={handleChange}
                                                    onBlur={(e) => {
                                                        calculateTotalCount(
                                                            {
                                                                fromDate: values.fromDate,
                                                                toDate: values.toDate,
                                                            },
                                                            setFieldValue
                                                        )
                                                    }}
                                                    inputError={errors.toDate}
                                                />
                                            </div>
                                        </div>

                                    </div>
                                    <div className="modal-fields-row2 row">
                                        <div className="col-lg-4">
                                            <div class="textOnInput">
                                                <CustomInput
                                                    className={`form-control ${touched.totalDays && errors.totalDays ? 'is-invalid' : ''}`}
                                                    type="text"
                                                    label="Total Days"
                                                    id="totalDays"
                                                    name="totalDays"
                                                    value={values.totalDays}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    inputError={errors.totalDays}
                                                    readOnly={true}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-4" style={{ marginTop: "18px" }}>
                                            <div class="textOnInput">
                                                <Form.Group>
                                                    <Form.Group className="gender nightshiftlabel" style={{ marginLeft: "48px" }}>
                                                        <Form.Label>
                                                            <input
                                                                name="holidayType"
                                                                type="radio"
                                                                id="holidayType"
                                                                checked={values.holidayType === true ? true : false}
                                                                // disabled={isDayRadio(values.considerationCount > 0)}
                                                                onChange={(v) => {
                                                                    setFieldValue("holidayType", true);
                                                                }}
                                                                className="mr-1"
                                                            />
                                                            <span style={{ margin: "2px" }}>Public </span>
                                                        </Form.Label>
                                                        <Form.Label className="ml-3" style={{ marginLeft: "120px" }}>
                                                            <input
                                                                name="holidayType"
                                                                type="radio"
                                                                id="holidayType"
                                                                checked={values.holidayType === true ? false : true}
                                                                // disabled={isDayRadio(values.considerationCount > 0)}
                                                                onChange={(v) => {
                                                                    setFieldValue("holidayType", false);
                                                                }}
                                                                className="mr-1"
                                                            />
                                                            <span style={{ margin: "2px" }}>Private</span>
                                                        </Form.Label>
                                                    </Form.Group>
                                                    <span className="text-danger">
                                                        {errors.isDayDeduction && "Select Option?"}
                                                    </span>
                                                </Form.Group>
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div class="textOnInput">
                                                <CustomInput
                                                    className={`form-control ${touched.holidayDescription && errors.holidayDescription ? 'is-invalid' : ''}`}
                                                    type="text"
                                                    id="holidayDescription"
                                                    label="Description"
                                                    name="holidayDescription"
                                                    value={values.holidayDescription}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    inputError={errors.holidayDescription}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-fields-row3 row">
                                        <div className="col-lg-4">
                                            <div class="textOnInput">
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div class="textOnInput">
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div class="textOnInput">
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-fields-row4 row">
                                        <div className="col-lg-4">
                                            <div class="textOnInput">
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div class="textOnInput">
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div class="textOnInput">
                                            </div>
                                        </div>
                                    </div>
                                    <Row >
                                        <Col lg="10">
                                        </Col>
                                        <Col lg="2">
                                            <Button
                                                className="modal-btn mt-3"
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
            </Modal>




        </div>
    );
}

export default WithUserPermission(Holiday);