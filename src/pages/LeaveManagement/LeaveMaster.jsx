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
    createLeaveMaster,
    listOfLeaveMasters,
    findLeaveMaster,
    updateLeaveMaster,
    deleteLeaveMaster,
} from "@/services/api_functions";
import moment from "moment";
import CustomSelect from "../../components/CustomSelect";
import { isActionExist } from "../../helpers/constants";
import { WithUserPermission } from "../../helpers/WithUserPermission";
import CustomToggleSwitchForModal from "../../components/CustomToggleSwitchForModal";
import ResponseModal from "../../components/ResponseModal";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";

function LeaveMaster(props) {
    const location = useLocation();
    const pathArray = location.pathname.split("/"); // Split the path into an array
    const name = pathArray[pathArray.length - 1]; // Get the last element of the array

    const [showModal, setShowModal] = useState(false); // State to control the modal visibility
    const [showModalEdit, setShowModalEdit] = useState(false); // State to control the modal visibility
    const [leaveMasterObject, setLeaveMasterObject] = useState("");
    const [leaveMaster, setLeaveMaster] = useState([]);
    const [filteredLeaveMaster, setFilteredLeaveMaster] = useState([]);

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
        getLeaveMasterList();
    }, []);


    //List API Function
    const getLeaveMasterList = () => {
        listOfLeaveMasters()
            .then((response) => {
                let res = response.data;
                if (res.responseStatus === 200) {
                    setLeaveMaster(res.response);
                    setFilteredLeaveMaster(res.response);
                }
            })
            .catch((error) => {
                openModal(error, "error")
                setLeaveMaster([]);
                setFilteredLeaveMaster([]);
            });
    }

    //Before Editing Finding the record by Id
    const handleAddNewEdit = (status, id, rowIndex) => {
        if (status) {
            setcurrentIndex(rowIndex);
            let reqData = { id: id };

            findLeaveMaster(reqData)
                .then((response) => {
                    if (response.data.responseStatus === 200) {
                        // let res = response.data.response
                        // const {
                        //     id,
                        //     name,
                        //     isPaid,
                        //     levelId,
                        // } = res;
                        // let options = {
                        //     id: id,
                        //     name: name,
                        //     isPaid: isPaid,
                        //     leavesAllowed: levelId,
                        // }
                        setLeaveMasterObject(response.data.response);
                        setcurrentIndex(0);
                        setShowModalEdit(status);
                        setShowModalEdit(true);

                    } else {
                        openModal("No Data Found", "error")

                    }
                })
                .catch((error) => {
                    openModal(error, "error")
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
        deleteLeaveMaster(requestData).then((response) => {
            if (response.data.responseStatus === 200) {
                openModal(response.data.message, "cnf")
                getLeaveMasterList();
            }
            else {
                openModal(response.data.message, "error")

            }
        })
            .catch((error) => {
                openModal(error, "error")

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
                        {isActionExist("leave-master", "create", props.userPermissions) && (
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
                                        <th className="table-th text-light">Leave Name</th>
                                        <th className="table-th text-light">Is Paid</th>
                                        <th className="table-th text-light">Leaves Allowed</th>
                                        <th className="table-th text-light">Created Date</th>
                                        <th className="table-th text-light">Actions</th>
                                    </tr>
                                </thead>

                                <tbody style={{ maxHeight: "300px", overflowY: "auto" }}
                                >
                                    {filteredLeaveMaster.length > 0 ? (
                                        filteredLeaveMaster.map((v, i, record) => (
                                            <tr style={{ backgroundColor: "D9D9D9" }} onDoubleClick={() => handleAddNewEdit(true, v.id, i)}  >
                                                <td>{i + 1}</td>
                                                <td>{v.leaveName}</td>
                                                <td>{v.isPaid === true ? "YES" : "NO"}</td>
                                                <td>{v.leavesAllowed}</td>
                                                <td>
                                                    {/* {v.createdDate} */}
                                                    {moment(v.createdDate).format("DD-MM-yyyy")}
                                                </td>
                                                <td align="left">
                                                    {isActionExist(
                                                        "leave-master",
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
                                                        "leave-master",
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
                                name: "",
                                isPaid: "",
                                leavesAllowed: "",

                            }}
                            validationSchema={
                                Yup.object().shape({
                                    name: Yup.string().trim().required(" "),
                                    leavesAllowed: Yup.string().trim().required(" "),
                                })
                            }
                            onSubmit={(values, { setSubmitting, resetForm }) => {
                                let requestData = {
                                    name: values.name,
                                    isPaid: values.isPaid,
                                    leavesAllowed: values.leavesAllowed,
                                };
                                console.log(requestData)
                                createLeaveMaster(requestData)
                                    .then((response) => {
                                        if (response.data.responseStatus === 200) {
                                            setSubmitting(false);
                                            openModal(response.data.message, "cnf")

                                            setShowModal(false)
                                            getLeaveMasterList();
                                        } else {
                                            setSubmitting(false);
                                            openModal(response.data.message, "error")

                                        }
                                    })
                                    .catch((error) => {
                                        openModal(error, "error")
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
                                                {/* <label for="inputText" className="common-input-label">ID</label> */}
                                                <CustomInput
                                                    className={`form-control ${touched.name && errors.name ? 'is-invalid' : ''}`}
                                                    type="text"
                                                    label="LeaveMaster Name"
                                                    id="name"
                                                    name="name"
                                                    value={values.name}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    inputError={errors.name}

                                                />
                                                {/* <div className="invalid-feedback">{errors.id}</div> */}
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div class="textOnInput">
                                                <CustomToggleSwitchForModal
                                                    label="Is Paid"
                                                    className={`form-control ${touched.isPaid && errors.isPaid
                                                        ? "is-invalid"
                                                        : ""
                                                        }`}
                                                    id="isPaid"
                                                    name="isPaid"
                                                    checked={values.isPaid}
                                                    value={values.isPaid}
                                                    onChange={() =>
                                                        setFieldValue(
                                                            "isPaid",
                                                            !values.isPaid
                                                        )
                                                    }
                                                    onBlur={handleBlur}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-4">
                                            <div class="textOnInput">
                                                <CustomInput
                                                    label="Leaves Allowed"
                                                    className={`form-control ${touched.leavesAllowed && errors.leavesAllowed
                                                        ? "is-invalid"
                                                        : ""
                                                        }`}
                                                    id="leavesAllowed"
                                                    name="leavesAllowed"
                                                    value={values.leavesAllowed}
                                                    onChange={(e) => {
                                                        const inputValue = e.target.value;
                                                        // Check if the input is a valid number
                                                        if (!isNaN(inputValue)) {
                                                            // Update the value if it's a number
                                                            handleChange(e);
                                                        }
                                                        // Ignore the input if it's not a number
                                                    }}
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
                                name: leaveMasterObject != null ? leaveMasterObject.name : "",
                                isPaid: leaveMasterObject != null ? leaveMasterObject.isPaid : "",
                                leavesAllowed: leaveMasterObject != null ? leaveMasterObject.leavesAllowed : ""

                            }}
                            validationSchema={
                                Yup.object().shape({
                                    name: Yup.string().trim().required(" "),
                                    leavesAllowed: Yup.string().trim().required(" ")
                                })
                            }
                            onSubmit={(values, { setSubmitting, resetForm }) => {
                                let requestData = {
                                    id: leaveMasterObject.id,
                                    name: values.name,
                                    isPaid: values.isPaid,
                                    leavesAllowed: values.leavesAllowed,
                                };
                                updateLeaveMaster(requestData)
                                    .then((response) => {
                                        if (response.data.responseStatus === 200) {
                                            setSubmitting(false);
                                            handleCloseModalEdit();
                                            openModal(response.data.message, "cnf");

                                            getLeaveMasterList();
                                        } else {
                                            setSubmitting(false);
                                            openModal(response.data.message, "error");

                                        }
                                    })
                                    .catch((error) => {
                                        openModal(error, "error")
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
                                                {/* <label for="inputText" className="common-input-label">ID</label> */}
                                                <CustomInput
                                                    className={`form-control ${touched.name && errors.name ? 'is-invalid' : ''}`}
                                                    type="text"
                                                    label="LeaveMaster Name"
                                                    id="name"
                                                    name="name"
                                                    value={values.name}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    inputError={errors.name}

                                                />
                                                {/* <div className="invalid-feedback">{errors.id}</div> */}
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div class="textOnInput">
                                                <CustomToggleSwitchForModal
                                                    label="Is Paid"
                                                    className={`form-control ${touched.isPaid && errors.isPaid
                                                        ? "is-invalid"
                                                        : ""
                                                        }`}
                                                    id="isPaid"
                                                    name="isPaid"
                                                    checked={values.isPaid}
                                                    value={values.isPaid}
                                                    onChange={() =>
                                                        setFieldValue(
                                                            "isPaid",
                                                            !values.isPaid
                                                        )
                                                    }
                                                    onBlur={handleBlur}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-4">
                                            <div class="textOnInput">
                                                <CustomInput
                                                    label="Leaves Allowed"
                                                    className={`form-control ${touched.leavesAllowed && errors.leavesAllowed
                                                        ? "is-invalid"
                                                        : ""
                                                        }`}
                                                    id="leavesAllowed"
                                                    name="leavesAllowed"
                                                    value={values.leavesAllowed}
                                                    onChange={(e) => {
                                                        const inputValue = e.target.value;
                                                        // Check if the input is a valid number
                                                        if (!isNaN(inputValue)) {
                                                            // Update the value if it's a number
                                                            handleChange(e);
                                                        }
                                                        // Ignore the input if it's not a number
                                                    }}
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

export default WithUserPermission(LeaveMaster);