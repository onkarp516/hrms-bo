import React, { useEffect, useState } from "react";
import AddBtn from "../../../assets/images/MenuButton.png";
import BackBtn from "../../../assets/images/back.png";
import { useLocation } from "react-router-dom";
import { Col, Row, Table, Form, Modal, Card, Button } from "react-bootstrap";
import * as Yup from "yup";
import { Formik, ErrorMessage } from "formik";
import edit from "../../../assets/images/edit.png";
import Delete from "../../../assets/images/delete.png";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import CustomInput from "../../../components/CustomInputs";
import CustomToggleSwitch from "../../../components/CustomToggleSwitch";

export default function Shift(props) {
    const location = useLocation();
    const pathArray = location.pathname.split("/"); // Split the path into an array
    const name = pathArray[pathArray.length - 1]; // Get the last element of the array

    const [showModal, setShowModal] = useState(false); // State to control the modal visibility
    const [showModalEdit, setShowModalEdit] = useState(false); // State to control the modal visibility

    useEffect(() => {
        console.log("🚀 ~ file: Shift.jsx:7 ~ useEffect ~ props:", location);
    }, []);

    const handleAddNew = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleAddNewEdit = () => {
        setShowModalEdit(true);
    };

    const handleCloseModalEdit = () => {
        setShowModalEdit(false);
    };

    const searchText = [];
    const filteredData = [];

    const jsonArray = [
        {
            id: 1,
            name: "John",
            percentage: "yes",
            percentageOf: "New York",
            status: "status test",
            action1: Delete,
            action2: edit,
        },
        {
            id: 2,
            name: "Alice",
            percentage: "yes",
            percentageOf: "New York",
            status: "status test",
            action1: Delete,
            action2: edit,
        },
        {
            id: 3,
            name: "Bob",
            percentage: "yes",
            percentageOf: "New York",
            status: "status test",
            action1: Delete,
            action2: edit,
        },


    ];


    console.log(jsonArray);

    return (
        <div>
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
                        <div className="col-lg-1 header-add-btn" onClick={handleAddNew}  >
                            <img src={AddBtn} alt="" className="btn-add " />
                        </div>
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
                                        <th className="table-th text-light">Deduction name</th>
                                        <th className="table-th text-light">Percentage</th>
                                        <th className="table-th text-light">Percentage Of</th>
                                        <th className="table-th text-light">Status</th>
                                        <th className="table-th text-light">Actions</th>
                                    </tr>
                                </thead>

                                <tbody style={{ maxHeight: "300px", overflowY: "auto" }}
                                >
                                    {jsonArray.map((record) => (
                                        <tr
                                            // key={record.id}
                                            style={{ backgroundColor: "#D9D9D9" }}
                                        >
                                            <td>{record.id}</td>
                                            <td>{record.name}</td>
                                            <td>{record.percentage}</td>
                                            <td>{record.percentageOf}</td>
                                            <td>{record.status}</td>


                                            <td align="right">
                                                <img
                                                    src={record.action1}
                                                    alt=""
                                                    className="img-delete"
                                                /> <img
                                                    src={record.action2}
                                                    alt=""
                                                    className="img-edit"
                                                    onClick={handleAddNewEdit}
                                                />
                                            </td>
                                        </tr>
                                    ))}
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
                                id: "",
                                name: "",
                                date: "",
                                salary: "",



                            }}
                            validationSchema={
                                Yup.object().shape({
                                    id: Yup.string().trim().required(" "),
                                    name: Yup.string().trim().required(" "),
                                    date: Yup.string().trim().required(" "),
                                    salary: Yup.string().trim().required(" "),


                                })
                            }
                            onSubmit={(values, { setSubmitting, resetForm }) => {
                                console.log("🚀 ~ file: Shift.jsx:188 ~ Shift ~ values:", values)


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
                                                    className={`form-control ${touched.name && errors.name ? 'is-invalid' : ''}`}
                                                    type="text"
                                                    label="Deduction name"
                                                    id="name"
                                                    name="name"
                                                    value={values.name}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    inputError={errors.employeeId}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-4">
                                            <div class="textOnInput">
                                                <CustomInput
                                                    className={`form-control ${touched.date && errors.date ? 'is-invalid' : ''}`}
                                                    type="text"
                                                    id="date"
                                                    label="Date"
                                                    name="date"
                                                    value={values.date}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    inputError={errors.date}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-4">
                                            <div class="textOnInput">
                                                <CustomInput
                                                    className={`form-control ${touched.salary && errors.salary ? 'is-invalid' : ''}`}
                                                    type="text"
                                                    id="salary"
                                                    label="Salary"
                                                    name="salary"
                                                    value={values.salary}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    inputError={errors.salary}
                                                />
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
                                id: "",
                                name: "",
                                date: "",
                                salary: "",



                            }}
                            validationSchema={
                                Yup.object().shape({
                                    id: Yup.string().trim().required(" "),
                                    name: Yup.string().trim().required(" "),
                                    date: Yup.string().trim().required(" "),
                                    salary: Yup.string().trim().required(" "),


                                })
                            }
                            onSubmit={(values, { setSubmitting, resetForm }) => {
                                console.log("🚀 ~ file: Shift.jsx:188 ~ Shift ~ values:", values)


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
                                                    className={`form-control ${touched.name && errors.name ? 'is-invalid' : ''}`}
                                                    type="text"
                                                    label="Shift name"
                                                    id="name"
                                                    name="name"
                                                    value={values.name}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    inputError={errors.employeeId}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-4">
                                            <div class="textOnInput">
                                                <CustomInput
                                                    className={`form-control ${touched.date && errors.date ? 'is-invalid' : ''}`}
                                                    type="text"
                                                    id="date"
                                                    label="Start Time"
                                                    name="date"
                                                    value={values.date}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    inputError={errors.date}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-4">
                                            <div class="textOnInput">
                                                <CustomInput
                                                    className={`form-control ${touched.salary && errors.salary ? 'is-invalid' : ''}`}
                                                    type="text"
                                                    id="salary"
                                                    label="Lunch Time In"
                                                    name="salary"
                                                    value={values.salary}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    inputError={errors.salary}
                                                />
                                            </div>
                                        </div>

                                    </div>
                                    <div className="modal-fields-row2 row" >

                                        <div className="col-lg-4">
                                            <div class="textOnInput">
                                                <CustomInput
                                                    className={`form-control ${touched.lunchTimeOut && errors.lunchTimeOut ? 'is-invalid' : ''}`}
                                                    type="text"
                                                    id="lunchTimeOut"
                                                    label="Lunch Time Out"
                                                    name="lunchTimeOut"
                                                    value={values.lunchTimeOut}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    inputError={errors.lunchTimeOut}
                                                />
                                            </div>
                                        </div>
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
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div class="textOnInput">
                                                <CustomInput
                                                    className={`form-control ${touched.granceInPeriod && errors.granceInPeriod ? 'is-invalid' : ''}`}
                                                    type="text"
                                                    id="granceInPeriod"
                                                    label="Grace In Period"
                                                    name="granceInPeriod"
                                                    value={values.granceInPeriod}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    inputError={errors.granceInPeriod}
                                                />
                                            </div>
                                        </div>

                                    </div>

                                    <div className="modal-fields-row3 row mt-5">

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
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-4">
                                            <div class="textOnInput">
                                                <CustomInput
                                                    className={`form-control ${touched.endTime && errors.endTime ? 'is-invalid' : ''}`}
                                                    type="text"
                                                    id="endTime"
                                                    label="End Time"
                                                    name="endTime"
                                                    value={values.endTime}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    inputError={errors.endTime}
                                                />
                                            </div>
                                        </div>

                                    </div>
                                    <Row >
                                        <Col lg="10">
                                        </Col>
                                        <Col lg="2">
                                            <Button
                                                className="modal-btn"
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
        </div>
    );
}
