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
    createBreak,
    listOfBreak,
    deleteBreak,
    updateBreak,
    findBreak
} from "@/services/api_functions";
import moment from "moment";
import { isActionExist } from "../../../helpers/constants";
import { WithUserPermission } from "../../../helpers/WithUserPermission";
import DeleteConfirmationModal from "../../../components/DeleteConfirmationModal";
import ResponseModal from "../../../components/ResponseModal";

function Break(props) {
    const location = useLocation();
    const pathArray = location.pathname.split("/"); // Split the path into an array
    const name = pathArray[pathArray.length - 1]; // Get the last element of the array

    const [showModal, setShowModal] = useState(false); // State to control the modal visibility
    const [showModalEdit, setShowModalEdit] = useState(false); // State to control the modal visibility
    const [breakObject, setBreakObject] = useState("");
    const [break1, setBreak] = useState([]);
    const [filteredBreak, setFilteredBreak] = useState([]);

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
        getBreakList();
    }, []);

    //List API Function
    const getBreakList = () => {
        listOfBreak({ "isOwner": true })
            .then((response) => {
                let res = response.data;
                if (res.responseStatus === 200) {
                    setBreak(res.response);
                    setFilteredBreak(res.response);
                }
            })
            .catch((error) => {
                setBreak([]);
                setFilteredBreak([]);
                openModal(error, "error");
            });
    }

    //Before Editing Finding the record by Id
    const handleAddNewEdit = (status, id, rowIndex) => {
        if (status) {
            setcurrentIndex(rowIndex);
            let reqData = { id: id };

            findBreak(reqData)
                .then((response) => {
                    if (response.data.responseStatus === 200) {
                        setBreakObject(response.data.response);
                        setcurrentIndex(0);
                        setShowModalEdit(status);
                        setShowModalEdit(true);

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
            deleteBreak(requestData).then((response) => {
                if (response.data.responseStatus === 200) {
                    openModal(response.data.message, "cnf");
                    getBreakList();
                }
                else {
                    openModal(response.data.message, "error");
                }
            })
                .catch((error) => {
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
                        {isActionExist("break", "create", props.userPermissions) && (
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
                                        <th className="table-th text-light">Break name</th>
                                        <th className="table-th text-light">From Time</th>
                                        <th className="table-th text-light">To Time</th>
                                        <th className="table-th text-light">Created At</th>
                                        <th className="table-th text-light">Actions</th>
                                    </tr>
                                </thead>

                                <tbody style={{ maxHeight: "300px", overflowY: "auto" }}
                                >
                                    {filteredBreak.length > 0 ? (
                                        filteredBreak.map((v, i, record) => (
                                            <tr style={{ backgroundColor: "D9D9D9" }} onDoubleClick={() => handleAddNewEdit(true, v.id, i)}  >
                                                <td>{i + 1}</td>
                                                <td>{v.breakName}</td>
                                                <td>{v.fromTime}</td>
                                                <td>{v.toTime}</td>
                                                <td>
                                                    {moment(v.createdDate).format("DD-MM-yyyy")}
                                                </td>
                                                <td align="right">
                                                    {isActionExist(
                                                        "break",
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
                                                        "break",
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
                                            <td colSpan={6} className="text-center">
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
                                breakName: "",
                                fromTime: "",
                                toTime: "",
                            }}
                            validationSchema={
                                Yup.object().shape({
                                    breakName: Yup.string().trim().required(" "),
                                    fromTime: Yup.string().trim().required(" "),
                                    toTime: Yup.string().trim().required(" "),
                                })
                            }
                            onSubmit={(values, { setSubmitting, resetForm }) => {
                                let requestData = {
                                    breakName: values.breakName,
                                    fromTime: values.fromTime,
                                    toTime: values.toTime,
                                }
                                createBreak(requestData).then((response) => {
                                    if (response.data.responseStatus === 200) {
                                        setSubmitting(false);
                                        openModal(response.data.message, "cnf");
                                        resetForm();
                                        setShowModal(false)
                                        getBreakList();
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
                                                    className={`form-control ${touched.breakName && errors.breakName ? 'is-invalid' : ''}`}
                                                    type="text"
                                                    label="Break Name"
                                                    id="breakName"
                                                    name="breakName"
                                                    value={values.breakName}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    inputError={errors.breakName}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-4">
                                            <div class="textOnInput">
                                                <CustomTimeInputs
                                                    className={`form-control ${touched.fromTime && errors.fromTime ? 'is-invalid' : ''}`}
                                                    type="time"
                                                    id="fromTime"
                                                    label="From Time"
                                                    name="fromTime"
                                                    value={values.fromTime}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    inputError={errors.fromTime}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-4">
                                            <div class="textOnInput">
                                                <CustomTimeInputs
                                                    className={`form-control ${touched.toTime && errors.toTime ? 'is-invalid' : ''}`}
                                                    type="time"
                                                    id="toTime"
                                                    label="To Time"
                                                    name="toTime"
                                                    value={values.toTime}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    inputError={errors.toTime}
                                                />
                                            </div>
                                        </div>

                                    </div>
                                    <div className="modal-fields-row2 row">


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
                                breakName: breakObject != null ? breakObject.breakName : "",
                                fromTime: breakObject != null ? breakObject.fromTime : "",
                                toTime: breakObject != null ? breakObject.toTime : "",
                            }}
                            validationSchema={
                                Yup.object().shape({
                                    breakName: Yup.string().trim().required(" "),
                                    fromTime: Yup.string().trim().required(" "),
                                    toTime: Yup.string().trim().required(" "),
                                })
                            }
                            onSubmit={(values, { setSubmitting, resetForm }) => {
                                let requestData = {
                                    id: breakObject.id,
                                    breakName: values.breakName,
                                    fromTime: values.fromTime,
                                    toTime: values.toTime,
                                };
                                console.log("request Data >>", JSON.stringify(requestData));
                                updateBreak(requestData)
                                    .then((response) => {
                                        console.log("response>>", response)
                                        if (response.data.responseStatus === 200) {
                                            setSubmitting(false);
                                            handleCloseModalEdit();
                                            openModal(response.data.message, "cnf");
                                            getBreakList();
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
                                                    className={`form-control ${touched.breakName && errors.breakName ? 'is-invalid' : ''}`}
                                                    type="text"
                                                    label="Break Name"
                                                    id="breakName"
                                                    name="breakName"
                                                    value={values.breakName}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    inputError={errors.breakName}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-4">
                                            <div class="textOnInput">
                                                <CustomTimeInputs
                                                    className={`form-control ${touched.fromTime && errors.fromTime ? 'is-invalid' : ''}`}
                                                    type="time"
                                                    id="fromTime"
                                                    label="From Time"
                                                    name="fromTime"
                                                    value={values.fromTime}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    inputError={errors.fromTime}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-4">
                                            <div class="textOnInput">
                                                <CustomTimeInputs
                                                    className={`form-control ${touched.toTime && errors.toTime ? 'is-invalid' : ''}`}
                                                    type="time"
                                                    id="toTime"
                                                    label="To Time"
                                                    name="toTime"
                                                    value={values.toTime}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    inputError={errors.toTime}
                                                />
                                            </div>
                                        </div>

                                    </div>
                                    <div className="modal-fields-row2 row">


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

export default WithUserPermission(Break);