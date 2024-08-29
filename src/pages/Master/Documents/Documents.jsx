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
    createDocument,
    listOfDocument,
    findDocument,
    updateDocument,
    deleteDocument,
} from "@/services/api_functions";
import CustomToggleSwitchForModal from "../../../components/CustomToggleSwitchForModal";
import moment from "moment";
import { isActionExist } from "../../../helpers/constants";
import { WithUserPermission } from "../../../helpers/WithUserPermission";
import ResponseModal from "../../../components/ResponseModal";
import DeleteConfirmationModal from "../../../components/DeleteConfirmationModal";

function Documents(props) {
    const location = useLocation();
    const pathArray = location.pathname.split("/"); // Split the path into an array
    const name = pathArray[pathArray.length - 1]; // Get the last element of the array

    const [showModal, setShowModal] = useState(false); // State to control the modal visibility
    const [showModalEdit, setShowModalEdit] = useState(false); // State to control the modal visibility
    const [document, setDocument] = useState([]);
    const [filteredDocument, setFilteredDocument] = useState([]);
    const [documentObject, setDocumentObject] = useState([]);

    const [LogoType, setLogoType] = useState("");
    const [ResText, setResText] = useState("");
    const [initVal, setInitVal] = useState("");
    const [ResModal, setResModal] = useState(false);
    const [Bankaccmodal, setBankaccmodal] = useState(false);
    const [SundryCreditorLst, setSundryCreditorLst] = useState([]);
    const [CashAcbankLst, setCashAcbankLst] = useState([]);
    const [resLst, setresLst] = useState([]);
    const [rowId, setrowId] = useState();
    // const [Rows, setRows] = useState([]);


    // const navigate = useNavigate()
    // ... (other state variables)

    const [rows, setRows] = useState([]);
    const [index, setIndex] = useState(0);
    const [DeleteConfirmation, setDeleteConfirmation] = useState();
    const [DeleteId, setDeleteId] = useState()

    // useEffect(() => {
    //   setReceiptLastRecords();
    //   lstgetsundrydebtors_indirectexpenses();
    //   // lstGetsundryDebtorsIndirectExpenses();
    //   lstgetcashAcbankaccount();
    //   initRows();
    // }, []);

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
        getDocumentList();
    }, []);

    //List API Function
    const getDocumentList = () => {
        listOfDocument().then((response) => {
            let res = response.data;
            if (res.responseStatus === 200) {
                setDocument(res.response);
                setFilteredDocument(res.response);
            }
        })
            .catch((error) => {
                openModal(error, "error");
                setDocument([]);
                setFilteredDocument([]);
            })
    }

    const handleAddNewEdit = (status, id, rowIndex) => {
        if (status) {
            setcurrentIndex(rowIndex);
            let reqData = { id: id };
            findDocument(reqData).then((response) => {
                if (response.data.responseStatus === 200) {
                    setDocumentObject(response.data.response);
                    setcurrentIndex(0);
                    setShowModalEdit(status);
                    // showModalEdit(true);
                } else {
                    openModal("Data Not Found", "error");
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
            deleteDocument(requestData).then((response) => {
                if (response.data.responseStatus === 200) {
                    openModal(response.data.message, "cnf");
                    getDocumentList();
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
                        {isActionExist("document", "create", props.userPermissions) && (
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
                                        <th className="table-th text-light">Document Name</th>
                                        <th className="table-th text-light">Is Required</th>
                                        <th className="table-th text-light">Created Date</th>
                                        <th className="table-th text-light">Actions</th>
                                    </tr>
                                </thead>

                                <tbody style={{ maxHeight: "300px", overflowY: "auto" }}
                                >
                                    {filteredDocument.length > 0 ? (
                                        filteredDocument.map((v, i, record) => (
                                            <tr style={{ backgroundColor: "D9D9D9" }} onDoubleClick={() => handleAddNewEdit(true, v.id, i)} >
                                                <td>{i + 1}</td>
                                                <td>{v.documentName}</td>
                                                <td>{v.isRequired == true ? "YES" : "NO"}</td>
                                                <td>
                                                    {/* {v.createdDate} */}
                                                    {moment(v.createdDate).format("DD-MM-yyyy")}
                                                </td>
                                                <td align="left">
                                                    {isActionExist(
                                                        "document",
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
                                                        "document",
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
                                documentName: "",
                                isRequired: "",
                            }}
                            validationSchema={
                                Yup.object().shape({
                                    documentName: Yup.string().trim().required(" "),
                                    // isRequired: Yup.string().trim().required(" "),
                                })
                            }
                            onSubmit={(values, { setSubmitting, resetForm }) => {
                                let requestData = {
                                    documentName: values.documentName,
                                    isRequired: values.isRequired,
                                }
                                createDocument(requestData).then((response) => {
                                    if (response.data.responseStatus === 200) {
                                        setSubmitting(false);
                                        resetForm();
                                        openModal(response.data.message, "cnf");
                                        setShowModal(false)
                                        getDocumentList();
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
                                                <CustomInput className={`form-control ${touched.documentName && errors.documentName ? 'is-invalid' : ''}`} type="text"
                                                    label="Document Name"
                                                    id="documentName"
                                                    name="documentName"
                                                    value={values.documentName}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur} />
                                            </div>
                                        </div>
                                        <div className="col-lg-8">
                                            <div class="textOnInput" style={{ width: "240px" }}>
                                                <CustomToggleSwitchForModal
                                                    label="Is Required"
                                                    className={`form-control ${touched.isRequired && errors.isRequired
                                                        ? "is-invalid"
                                                        : ""
                                                        }`}
                                                    id="isRequired"
                                                    name="isRequired"
                                                    checked={values.isRequired}
                                                    value={values.isRequired}
                                                    onChange={() =>
                                                        setFieldValue(
                                                            "isRequired",
                                                            !values.isRequired
                                                        )
                                                    }
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
                                documentName: documentObject != null ? documentObject.documentName : "",
                                isRequired: documentObject != null ? documentObject.isRequired : "",
                            }}
                            validationSchema={
                                Yup.object().shape({
                                    documentName: Yup.string().trim().required(" "),
                                })
                            }
                            onSubmit={(values, { setSubmitting, resetForm }) => {
                                let requestData = {
                                    id: documentObject.id,
                                    documentName: values.documentName,
                                    isRequired: values.isRequired,
                                }
                                updateDocument(requestData).then((response) => {
                                    if (response.data.responseStatus === 200) {
                                        setSubmitting(false);
                                        handleCloseModalEdit();
                                        openModal(response.data.message, "cnf");
                                        getDocumentList();
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
                                                <CustomInput className={`form-control ${touched.documentName && errors.documentName ? 'is-invalid' : ''}`} type="text"
                                                    label="Document Name"
                                                    id="documentName"
                                                    name="documentName"
                                                    value={values.documentName}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur} />
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div class="textOnInput" style={{ width: "240px" }}>
                                                <CustomToggleSwitchForModal
                                                    label="Is Required"
                                                    className={`form-control ${touched.isRequired && errors.isRequired
                                                        ? "is-invalid"
                                                        : ""
                                                        }`}
                                                    id="isRequired"
                                                    name="isRequired"
                                                    checked={values.isRequired ? true : false}
                                                    value={values.isRequired}
                                                    onChange={() =>
                                                        setFieldValue(
                                                            "isRequired",
                                                            !values.isRequired
                                                        )
                                                    }
                                                    onBlur={handleBlur}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-4">

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

export default WithUserPermission(Documents);
