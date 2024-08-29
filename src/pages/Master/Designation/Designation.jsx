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
import {
    createDesignation,
    listOfDesignation,
    findDesignation,
    updateDesignation,
    deleteDesignation,
    listOfLevels,
} from "@/services/api_functions";
import moment from "moment";
import CustomSelect from "../../../components/CustomSelect";
import { isActionExist } from "../../../helpers/constants";
import { WithUserPermission } from "../../../helpers/WithUserPermission";
import ResponseModal from "../../../components/ResponseModal";
import DeleteConfirmationModal from "../../../components/DeleteConfirmationModal";

function Designation(props) {
    const location = useLocation();
    const pathArray = location.pathname.split("/"); // Split the path into an array
    const name = pathArray[pathArray.length - 1]; // Get the last element of the array

    const [showModal, setShowModal] = useState(false); // State to control the modal visibility
    const [showModalEdit, setShowModalEdit] = useState(false); // State to control the modal visibility
    const [designationObject, setDesignationObject] = useState("");
    const [designation, setDesignation] = useState([]);
    const [filteredDesignation, setFilteredDesignation] = useState([]);
    const [LevelOptData, setLevelOptData] = useState([]);

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
        getDesignationList();
        getLevel();
    }, []);

    //get Level List for selection 
    const getLevel = () => {
        listOfLevels()
            .then((response) => {
                let res = response.data;
                if (res.responseStatus == 200) {
                    let options = res.response.map(function (data) {
                        return {
                            value: data.id,
                            label: data.levelName,
                        };
                    });
                    setLevelOptData(options);
                }
            })
            .catch((error) => {
                openModal(error, "error");
            });
    };

    //List API Function
    const getDesignationList = () => {
        listOfDesignation()
            .then((response) => {
                let res = response.data;
                if (res.responseStatus === 200) {
                    setDesignation(res.response);
                    setFilteredDesignation(res.response);
                }
            })
            .catch((error) => {
                setDesignation([]);
                setFilteredDesignation([]);
                openModal(error, "error");
            });
    }

    //Before Editing Finding the record by Id
    const handleAddNewEdit = (status, id, rowIndex) => {
        if (status) {
            setcurrentIndex(rowIndex);
            let reqData = { id: id };

            findDesignation(reqData)
                .then((response) => {
                    if (response.data.responseStatus === 200) {
                        let res = response.data.response
                        const {
                            id,
                            designationName,
                            designationCode,
                            levelId,
                        } = res;
                        let options = {
                            id: id,
                            designationName: designationName,
                            designationCode: designationCode,
                            levelName: levelId,
                        }
                        setDesignationObject(options);
                        setcurrentIndex(0);
                        setShowModalEdit(status);
                        setShowModalEdit(true);

                    } else {
                        openModal("Data Not Found", "error");
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
            deleteDesignation(requestData).then((response) => {
                if (response.data.responseStatus === 200) {
                    openModal(response.data.message, "cnf");
                    getDesignationList();
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
                        {isActionExist("designation", "create", props.userPermissions) && (
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
                                        <th className="table-th text-light">Designation Name</th>
                                        <th className="table-th text-light">Designation Code</th>
                                        <th className="table-th text-light">Designation level</th>
                                        <th className="table-th text-light">Created Date</th>
                                        <th className="table-th text-light">Actions</th>
                                    </tr>
                                </thead>

                                <tbody style={{ maxHeight: "300px", overflowY: "auto" }}
                                >
                                    {filteredDesignation.length > 0 ? (
                                        filteredDesignation.map((v, i, record) => (
                                            <tr style={{ backgroundColor: "D9D9D9" }} onDoubleClick={() => handleAddNewEdit(true, v.id, i)}  >
                                                <td>{i + 1}</td>
                                                <td>{v.designationName}</td>
                                                <td>{v.designationCode}</td>
                                                <td>{v.designationLevel}</td>
                                                <td>
                                                    {/* {v.createdDate} */}
                                                    {moment(v.createdDate).format("DD-MM-yyyy")}
                                                </td>
                                            <td align="right">
                                                    {isActionExist(
                                                        "designation",
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
                                                        "designation",
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
                                designationName: "",
                                designationCode: "",
                                levelName: "",

                            }}
                            validationSchema={
                                Yup.object().shape({
                                    designationName: Yup.string().trim().required(" "),
                                    designationCode: Yup.string().trim().required(" "),
                                    levelName: Yup.string().trim().required(" "),
                                })
                            }
                            onSubmit={(values, { setSubmitting, resetForm }) => {
                                let requestData = {
                                    designationName: values.designationName,
                                    designationCode: values.designationCode,
                                    levelId: values.levelName,
                                };
                                createDesignation(requestData)
                                    .then((response) => {
                                        if (response.data.responseStatus === 200) {
                                            setSubmitting(false);
                                            resetForm();
                                            openModal(response.data.message, "cnf");
                                            setShowModal(false)
                                            getDesignationList();
                                        } else {
                                            setSubmitting(false);
                                            openModal(response.data.message, "error");
                                        }
                                    })
                                    .catch((error) => {
                                        setSubmitting(false);
                                        openModal(error, "error");
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
                                                {/* <label for="inputText" className="common-input-label">ID</label> */}
                                                <CustomInput
                                                    className={`form-control ${touched.designationName && errors.designationName ? 'is-invalid' : ''}`}
                                                    type="text"
                                                    label="Designation Name"
                                                    id="designationName"
                                                    name="designationName"
                                                    value={values.designationName}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    inputError={errors.designationName}

                                                />
                                                {/* <div className="invalid-feedback">{errors.id}</div> */}
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div class="textOnInput">
                                                <CustomInput
                                                    className={`form-control ${touched.designationCode && errors.designationCode ? 'is-invalid' : ''}`}
                                                    type="text"
                                                    label="Designation Code"
                                                    id="designationCode"
                                                    name="designationCode"
                                                    value={values.designationCode}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    inputError={errors.designationCode}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-4">
                                            <div class="textOnInput">
                                                <CustomSelect
                                                    label="Level"
                                                    className={`form-control ${touched.levelName && errors.levelName
                                                        ? "is-invalid"
                                                        : ""
                                                        }`}
                                                    id="levelName"
                                                    name="levelName"
                                                    data={LevelOptData}
                                                    value={values.levelName}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-fields-row2 row" >

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

            {/* Edit Modal */}
            <Modal show={showModalEdit} onHide={handleCloseModalEdit} className="custom-modal" centered>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content modal-height-width " >
                        {/* <Modal.Header className='pb-0' > */}
                        {/*  */}
                        <div className="pagePathLayout-modal row" >



                            <span className="bold">  <OverlayTrigger style={{}}
                                placement="right"
                                overlay={<Tooltip id="tooltip" className="tooltip-back-btn">Back</Tooltip>} //tooltip-back-btn - to adjust the tooltip according to the button.
                            >

                                <img src={BackBtn} alt="" className="modal-header-backbtn" onClick={handleCloseModalEdit} />

                            </OverlayTrigger><span className="modal-header-span">{location.pathname}</span></span>

                        </div>
                        <Formik
                            initialValues={{
                                designationName: designationObject != null ? designationObject.designationName : "",
                                designationCode: designationObject != null ? designationObject.designationCode : "",
                                levelName: designationObject != null ? designationObject.levelName : ""

                            }}
                            validationSchema={
                                Yup.object().shape({
                                    designationName: Yup.string().trim().required(" "),
                                    designationCode: Yup.string().trim().required(" "),
                                    levelName: Yup.string().trim().required(" ")
                                })
                            }
                            onSubmit={(values, { setSubmitting, resetForm }) => {
                                let requestData = {
                                    id: designationObject.id,
                                    designationName: values.designationName,
                                    designationCode: values.designationCode,
                                    levelId: values.levelName,
                                };
                                updateDesignation(requestData)
                                    .then((response) => {
                                        if (response.data.responseStatus === 200) {
                                            setSubmitting(false);
                                            handleCloseModalEdit();
                                            openModal(response.data.message, "cnf");
                                            getDesignationList();
                                        } else {
                                            setSubmitting(false);
                                            openModal(response.data.message, "error");
                                        }
                                    })
                                    .catch((error) => {
                                        setSubmitting(false);
                                        openModal(error, "error");
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
                                                {/* <label for="inputText" className="common-input-label">ID</label> */}
                                                <CustomInput
                                                    className={`form-control ${touched.designationName && errors.designationName ? 'is-invalid' : ''}`}
                                                    type="text"
                                                    label="Designation Name"
                                                    id="designationName"
                                                    name="designationName"
                                                    value={values.designationName}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    inputError={errors.designationName}

                                                />
                                                {/* <div className="invalid-feedback">{errors.id}</div> */}
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div class="textOnInput">
                                                <CustomInput
                                                    className={`form-control ${touched.designationCode && errors.designationCode ? 'is-invalid' : ''}`}
                                                    type="text"
                                                    label="Designation Code"
                                                    id="designationCode"
                                                    name="designationCode"
                                                    value={values.designationCode}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    inputError={errors.designationCode}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-4">
                                            <div class="textOnInput">
                                                <CustomSelect
                                                    label="Level"
                                                    className={`form-control ${touched.levelName && errors.levelName
                                                        ? "is-invalid"
                                                        : ""
                                                        }`}
                                                    id="levelName"
                                                    name="levelName"
                                                    data={LevelOptData}
                                                    value={values.levelName}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-fields-row2 row" >

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
                                    <Row className="mt-3">
                                        <Col lg="10">
                                        </Col>
                                        <Col lg="2">
                                            <Button
                                                className="modal-submit-btn"
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

export default WithUserPermission(Designation);