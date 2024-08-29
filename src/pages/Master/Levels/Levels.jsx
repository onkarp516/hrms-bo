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
import {
    createLevels,
    listOfLevels,
    deleteLevel,
    updateLevel,
    findLevel
} from "@/services/api_functions";
import moment from "moment";
import { isActionExist } from "../../../helpers/constants";
import ResponseModal from "../../../components/ResponseModal";
import DeleteConfirmationModal from "../../../components/DeleteConfirmationModal";
import { WithUserPermission } from "../../../helpers/WithUserPermission";

function Levels(props) {
    const location = useLocation();
    const pathArray = location.pathname.split("/"); // Split the path into an array
    const name = pathArray[pathArray.length - 1]; // Get the last element of the array

    const [showModal, setShowModal] = useState(false); // State to control the modal visibility
    const [showModalEdit, setShowModalEdit] = useState(false); // State to control the modal visibility
    const [levelObject, setLevelObject] = useState("");

    const [level, setLevel] = useState([]);
    const [filteredLevel, setFilteredLevel] = useState([]);

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
        getLevelList();
    }, []);

    //List API Function
    const getLevelList = () => {
        listOfLevels()
            .then((response) => {
                let res = response.data;
                if (res.responseStatus === 200) {
                    setLevel(res.response);
                    setFilteredLevel(res.response);
                }
            })
            .catch((error) => {
                openModal(error, "error");
                setLevel([]);
                setFilteredLevel([]);
            });
    }

    //Before Editing Finding the record by Id
    const handleAddNewEdit = (status, id, rowIndex) => {
        if (status) {
            setcurrentIndex(rowIndex);
            let reqData = { id: id };

            findLevel(reqData)
                .then((response) => {
                    if (response.data.responseStatus === 200) {
                        setLevelObject(response.data.response);
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
            deleteLevel(requestData).then((response) => {
                if (response.data.responseStatus === 200) {
                    openModal(response.data.message, "cnf");
                    getLevelList();
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
                        {isActionExist("level", "create", props.userPermissions) && (
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
                                        <th className="table-th text-light">Level Name</th>
                                        <th className="table-th text-light">Created Date</th>
                                        <th className="table-th text-light">Actions</th>
                                    </tr>
                                </thead>
                                <tbody style={{ maxHeight: "300px", overflowY: "auto" }}
                                >
                                    {filteredLevel.length > 0 ? (
                                        filteredLevel.map((v, i, record) => (
                                            <tr style={{ backgroundColor: "D9D9D9" }} onDoubleClick={() => handleAddNewEdit(true, v.id, i)}  >
                                                <td>{i + 1}</td>
                                                <td>{v.levelName}</td>
                                                <td>
                                                    {/* {v.createdDate} */}
                                                    {moment(v.createdDate).format("DD-MM-yyyy")}
                                                </td>
                                            <td align="right">
                                                    {isActionExist(
                                                        "level",
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
                                                        "level",
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
                                                <td colSpan={4} className="text-center">
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
                                levelName: "",
                            }}
                            validationSchema={
                                Yup.object().shape({
                                    levelName: Yup.string().trim().required(" "),
                                })
                            }
                            onSubmit={(values, { setSubmitting, resetForm }) => {
                                let requestData = {
                                    levelName: values.levelName,
                                };
                                console.log("request Data >>", JSON.stringify(requestData));
                                createLevels(requestData)
                                    .then((response) => {
                                        console.log("response>>", response)
                                        if (response.data.responseStatus === 200) {
                                            setSubmitting(false);
                                            resetForm();
                                            openModal(response.data.message, "cnf");
                                            setShowModal(false)
                                            getLevelList();
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
                                                {/* <label for="inputText" className="common-input-label">Employee ID</label> */}
                                                <CustomInput
                                                    className={`form-control ${touched.levelName && errors.levelName ? 'is-invalid' : ''}`}
                                                    type="text"
                                                    label="Levels"
                                                    id="levelName"
                                                    name="levelName"
                                                    value={values.levelName}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    inputError={errors.levelName}
                                                />
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
                                    <div className="modal-fields-row2 row" >

                                        <div className="col-lg-4">

                                        </div>
                                        <div className="col-lg-4">

                                        </div>
                                        <div className="col-lg-4">

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
                                levelName: levelObject != null ? levelObject.levelName : "",
                            }}
                            validationSchema={
                                Yup.object().shape({
                                    levelName: Yup.string().trim().required(" "),
                                })
                            }
                            onSubmit={(values, { setSubmitting, resetForm }) => {
                                let requestData = {
                                    id: levelObject.id,
                                    levelName: values.levelName,
                                };
                                console.log("request Data >>", JSON.stringify(requestData));
                                updateLevel(requestData)
                                    .then((response) => {
                                        console.log("response>>", response)
                                        if (response.data.responseStatus === 200) {
                                            setSubmitting(false);
                                            handleCloseModalEdit();
                                            openModal(response.data.message, "cnf");

                                            getLevelList();
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
                                <Form noValidate 
                                onSubmit={handleSubmit} 
                                autoComplete="off">
                                    <div className="modal-fields-row1 row">

                                        <div className="col-lg-4">
                                            <div class="textOnInput">
                                                {/* <label for="inputText" className="common-input-label">Employee ID</label> */}
                                                <CustomInput
                                                    className={`form-control ${touched.levelName && errors.levelName ? 'is-invalid' : ''}`}
                                                    type="text"
                                                    label="Level Name"
                                                    id="levelName"
                                                    name="levelName"
                                                    value={values.levelName}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    inputError={errors.levelName}
                                                />
                                                {/* <div className="invalid-feedback">{errors.levelName}</div> */}
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
                                    <div className="modal-fields-row2 row" >

                                        <div className="col-lg-4">

                                        </div>
                                        <div className="col-lg-4">

                                        </div>
                                        <div className="col-lg-4">

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

export default WithUserPermission(Levels);
