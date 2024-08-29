import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AddBtn from "../../../assets/images/MenuButton.png";
import BackBtn from "../../../assets/images/back.png";
import edit from "../../../assets/images/edit.png";
import Delete from "../../../assets/images/delete.png";
import {
    Card,
    CardBody,
    CardTitle,
    Button,
    Row,
    Col,
    Spinner,
    Table,
    OverlayTrigger,
    Tooltip,
    Modal,
} from "react-bootstrap";

import moment from "moment";
import { Tab, Tabs } from "react-bootstrap";
// import Step1 from "./Steps/Step1";
// import Step2 from "./Steps/Step2";
// import Step3 from "./Steps/Step3";
// import Step4 from "./Steps/Step4";
// import Step5 from "./Steps/Step5";

import { EMAILREGEXP, MPINREGEXP, SUPPORTED_FORMATS_PDF } from "@/helpers";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import {
    createLevels,
    listOfLevels,
    deleteLevel,
    updateLevel,
    findLevel,
    createDesignation,
    listOfDesignation,
    findDesignation,
    updateDesignation,
    deleteDesignation,
    createDepartment,
    listOfDepartment,
    deleteDepartment,
    updateDepartment,
    findDepartment,
} from "@/services/api_functions";
import { isActionExist } from "../../../helpers/constants";
import ResponseModal from "../../../components/ResponseModal";
import DeleteConfirmationModalLevel from "../../../components/DeleteConfirmationModalLevel";
import DeleteConfirmationModalDesignation from "../../../components/DeleteConfirmationModalDesignation";
import DeleteConfirmationModalDepartment from "../../../components/DeleteConfirmationModalDepartment";
import CustomDateInputs from "../../../components/CustomDateInputs";
import CustomSelect from "../../../components/CustomSelect";
import CustomInput from "../../../components/CustomInputs";
import { WithUserPermission } from "../../../helpers/WithUserPermission";


function AllMaster(props) {
    const location = useLocation();
    const pathArray = location.pathname.split("/"); // Split the path into an array
    const name = pathArray[pathArray.length - 1]; // Get the last element of the array
    const [step, setStep] = useState(1);
    const navigate = useNavigate();


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
        setDeleteConfirmationLevel(false);
        setDeleteConfirmationDesignation(false);
        setDeleteConfirmationDepartment(false);
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
        getLevelList();
        getDesignationList();
        getLevel();
        getDepartmentList();
    }, []);


    //Level All Functions Start

    //Modal for Delete
    const openModalForDeleteLevel = (id) => {
        setDeleteIdLevel(id);
        setDeleteConfirmationLevel(true);
    };

    const [DeleteConfirmationLevel, setDeleteConfirmationLevel] = useState();
    const [DeleteIdLevel, setDeleteIdLevel] = useState();
    const [showModalLevel, setShowModalLevel] = useState(false); // State to control the modal visibility
    const [showModalEditLevel, setShowModalLevelEdit] = useState(false); // State to control the modal visibility
    const [levelObject, setLevelObject] = useState("");
    const [level, setLevel] = useState([]);
    const [filteredLevel, setFilteredLevel] = useState([]);
    const handleAddNewLevel = () => {
        setShowModalLevel(true);
    };

    const handleCloseModalLevel = () => {
        setShowModalLevel(false);
    };


    const handleCloseModalLevelEdit = () => {
        setShowModalLevelEdit(false);
    };

    // Placeholder state functions for missing definitions
    const setEditModalShowLevel = (status) => {
        console.log("setEditModalShowLevel: ", status);
    };

    const setcurrentIndexLevel = (index) => {
        console.log("setcurrentIndexLevel: ", index);
    };

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
    const handleAddNewEditLevel = (status, id, rowIndex) => {
        if (status) {
            setcurrentIndexLevel(rowIndex);
            let reqData = { id: id };

            findLevel(reqData)
                .then((response) => {
                    if (response.data.responseStatus === 200) {
                        setLevelObject(response.data.response);
                        setcurrentIndexLevel(0);
                        setShowModalLevelEdit(status);
                        setShowModalLevelEdit(true);

                    } else {
                        openModal("No Data Found", "error");
                    }
                })
                .catch((error) => {
                    openModal(error, "error");
                });
        } else {
            setEditModalShowLevel(status);
            setcurrentIndexLevel(0);
        }
    };

    //Delete API Function
    const onDeleteLevel = (id) => {
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

    //Level All Functions End

    //Designation All Function Start

    //Modal for Delete
    const openModalForDeleteDesignation = (id) => {
        setDeleteIdDesignation(id);
        setDeleteConfirmationDesignation(true);
    };
    const [DeleteConfirmationDesignation, setDeleteConfirmationDesignation] = useState();
    const [DeleteIdDesignation, setDeleteIdDesignation] = useState();
    const [showModalDesignation, setShowModalDesignation] = useState(false); // State to control the modal visibility
    const [showModalEditDesignation, setShowModalEditDesignation] = useState(false); // State to control the modal visibility
    const [designationObject, setDesignationObject] = useState("");
    const [designation, setDesignation] = useState([]);
    const [filteredDesignation, setFilteredDesignation] = useState([]);
    const [LevelOptData, setLevelOptData] = useState([]);

    const handleAddNewDesignation = () => {
        setShowModalDesignation(true);
    };

    const handleCloseModalDesignation = () => {
        setShowModalDesignation(false);
    };

    const handleCloseModalEditDesignation = () => {
        setShowModalEditDesignation(false);
    };

    // Placeholder state functions for missing definitions
    const setEditModalShowDesignation = (status) => {
        console.log("setEditModalShowDesignation: ", status);
    };

    const setcurrentIndexDesignation = (index) => {
        console.log("setcurrentIndexDesignation: ", index);
    };

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
    const handleAddNewEditDesignation = (status, id, rowIndex) => {
        if (status) {
            setcurrentIndexDesignation(rowIndex);
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
                        setcurrentIndexDesignation(0);
                        setShowModalEditDesignation(status);
                        setShowModalEditDesignation(true);

                    } else {
                        openModal("Data Not Found", "error");
                    }
                })
                .catch((error) => {
                    openModal(error, "error");
                });
        } else {
            setEditModalShowDesignation(status);
            setcurrentIndexDesignation(0);
        }
    };

    //Delete API Function
    const onDeleteDesignation = (id) => {
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

    //Designation All Function End

    //Department All Functions Start

    //Modal for Delete
    const openModalForDeleteDepartment = (id) => {
        setDeleteIdDepartment(id);
        setDeleteConfirmationDepartment(true);
    };

    const [DeleteConfirmationDepartment, setDeleteConfirmationDepartment] = useState();
    const [DeleteIdDepartment, setDeleteIdDepartment] = useState();
    const [showModalDepartment, setShowModalDepartment] = useState(false); // State to control the modal visibility
    const [showModalEditDepartment, setShowModalEditDepartment] = useState(false); // State to control the modal visibility
    const [departmentObject, setDepartmentObject] = useState("");

    const [department, setDepartment] = useState([]);
    const [filteredDepartment, setFilteredDepartment] = useState([]);

    const handleAddNewDepartment = () => {
        setShowModalDepartment(true);
    };

    const handleCloseModalDepartment = () => {
        setShowModalDepartment(false);
    };


    const handleCloseModalEditDepartment = () => {
        setShowModalEditDepartment(false);
    };

    // Placeholder state functions for missing definitions
    const setEditModalShowDepartment = (status) => {
        console.log("setEditModalShowDepartment: ", status);
    };

    const setcurrentIndexDepartment = (index) => {
        console.log("setcurrentIndexDepartment: ", index);
    };

    //List API Function
    const getDepartmentList = () => {
        listOfDepartment()
            .then((response) => {
                let res = response.data;
                if (res.responseStatus === 200) {
                    setDepartment(res.response);
                    setFilteredDepartment(res.response);
                }
            })
            .catch((error) => {
                openModal(error, "error");
                setDepartment([]);
                setFilteredDepartment([]);
            });
    }

    //Before Editing Finding the record by Id
    const handleAddNewEditDepartment = (status, id, rowIndex) => {
        if (status) {
            setcurrentIndexDepartment(rowIndex);
            let reqData = { id: id };

            findDepartment(reqData)
                .then((response) => {
                    if (response.data.responseStatus === 200) {
                        setDepartmentObject(response.data.response);
                        setcurrentIndexDepartment(0);
                        setShowModalEditDepartment(status);
                        // setShowModalEditDepartment(true);

                    } else {
                        openModal("No Data Found", "error");
                    }
                })
                .catch((error) => {
                    openModal(error, "error");
                });
        } else {
            setEditModalShowDepartment(status);
            setcurrentIndexDepartment(0);
        }
    };

    //Delete API Function
    const onDeleteDepartment = (id) => {
        let requestData = {
            id: id,
        }
        deleteDepartment(requestData).then((response) => {
            if (response.data.responseStatus === 200) {
                openModal(response.data.message, "cnf");
                getDepartmentList();
            }
            else {
                openModal(response.data.message, "error");
            }
        })
            .catch((error) => {
                openModal(error, "error");
            });
    }

    //Department All Functions End

    return (
        <div
            className="content-wrapper scrollable-div"
            style={{ position: "fixed", width: "95%" }}
        >
            {/* Reusable Modal */}
            <ResponseModal
                isOpen={ResModal}
                onRequestClose={closeModal}
                onConfirm={() => handleConfirmSubmit()}
                text={`${ResText}`}
                LogoType={`${LogoType}`}
            />

            <DeleteConfirmationModalLevel
                DeleteConfirmationModalLevel={DeleteConfirmationLevel}
                onRequestClose={closeModal}
                onConfirm={() => onDeleteLevel(DeleteIdLevel)}
                text={`Are you sure you want to Delete ?`}
            />
            <DeleteConfirmationModalDesignation
                DeleteConfirmationModalDesignation={DeleteConfirmationDesignation}
                onRequestClose={closeModal}
                onConfirm={() => onDeleteDesignation(DeleteIdDesignation)}
                text={`Are you sure you want to Delete ?`}
            />
            <DeleteConfirmationModalDepartment
                DeleteConfirmationModalDepartment={DeleteConfirmationDepartment}
                onRequestClose={closeModal}
                onConfirm={() => onDeleteDepartment(DeleteIdDepartment)}
                text={`Are you sure you want to Delete ?`}
            />
            <Formik
                enableReinitialize={true}
                // initialValues={init_val}
                // validationSchema={VALIDATION[step]}
                onSubmit={(values, bug) => {
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    setFieldValue,
                    submitForm,
                }) => (
                    <Form className="empcreate-pg" onSubmit={handleSubmit}>
                        <div className="col-lg-12 path-label">
                            <span>{name}</span>
                        </div>
                        <div className="col-lg-12 path-label2">
                            <span>Manage All {name} Related Information</span>
                        </div>

                        <Tabs
                            className="emptab mt-0"
                            id="controlled-tab-example"
                            activeKey={step}
                            onSelect={(k) => {
                                setStep(parseInt(k));
                            }}
                        >
                            <Tab
                                eventKey="1"
                                className="customeTab"
                                title="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Level&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
                            >
                                <div className="scrollable-div-page-tabs">
                                    <div className="pagePathLayout row">
                                        <div className="col-lg-11 header-title">
                                            <span className="bold" >{location.pathname}</span>
                                        </div>
                                        <OverlayTrigger
                                            placement="left"
                                            overlay={<Tooltip id="tooltip" className="tooltip-add-btn">Create</Tooltip>}
                                        >
                                            {isActionExist("level-designation-department", "create", props.userPermissions) && (
                                                <div className="col-lg-1 header-add-btn" onClick={handleAddNewLevel}
                                                >
                                                    <img src={AddBtn} alt="" className="btn-add " />
                                                </div>
                                            )}
                                        </OverlayTrigger>
                                    </div>
                                    <div>
                                        <Row>
                                            <Col className="list-table">
                                                <Table className="table-hover tabs-page-table">
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
                                                                <tr style={{ backgroundColor: "D9D9D9" }} onDoubleClick={() => handleAddNewEditLevel(true, v.id, i)}  >
                                                                    <td>{i + 1}</td>
                                                                    <td>{v.levelName}</td>
                                                                    <td>
                                                                        {moment(v.createdDate).format("DD-MM-yyyy")}
                                                                    </td>
                                                                    <td align="left">
                                                                        {isActionExist(
                                                                            "level-designation-department",
                                                                            "delete",
                                                                            props.userPermissions
                                                                        ) && (
                                                                                <img
                                                                                    src={Delete}
                                                                                    alt=""
                                                                                    className="img-delete"
                                                                                    onClick={() => openModalForDeleteLevel(v.id)}
                                                                                />
                                                                            )}
                                                                        {isActionExist(
                                                                            "level-designation-department",
                                                                            "edit",
                                                                            props.userPermissions
                                                                        ) && (
                                                                                <img
                                                                                    src={edit}
                                                                                    alt=""
                                                                                    className="img-edit"
                                                                                    onClick={() => handleAddNewEditLevel(true, v.id, i)}
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
                            </Tab>
                            <Tab
                                eventKey="2"
                                className="customeTab"
                                title="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Designation&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
                                onClick={() => getLevel()}
                            >
                                <div
                                    className="scrollable-div-page-tabs"
                                >
                                    <div className="pagePathLayout row">
                                        <div className="col-lg-11 header-title">
                                            <span className="bold" >{location.pathname}</span>
                                        </div>
                                        <OverlayTrigger
                                            placement="left"
                                            overlay={<Tooltip id="tooltip" className="tooltip-add-btn">Create</Tooltip>}
                                        >
                                            {isActionExist("level-designation-department", "create", props.userPermissions) && (
                                                <div className="col-lg-1 header-add-btn" onClick={handleAddNewDesignation}  >
                                                    <img src={AddBtn} alt="" className="btn-add " />
                                                </div>
                                            )}
                                        </OverlayTrigger>
                                    </div>
                                    <div>
                                        <Row>
                                            <Col className="list-table">
                                                <Table className="table-hover tabs-page-table">
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
                                                                <tr style={{ backgroundColor: "D9D9D9" }} onDoubleClick={() => handleAddNewEditDesignation(true, v.id, i)}  >
                                                                    <td>{i + 1}</td>
                                                                    <td>{v.designationName}</td>
                                                                    <td>{v.designationCode}</td>
                                                                    <td>{v.designationLevel}</td>
                                                                    <td>
                                                                        {/* {v.createdDate} */}
                                                                        {moment(v.createdDate).format("DD-MM-yyyy")}
                                                                    </td>
                                                                    <td align="left">
                                                                        {isActionExist(
                                                                            "level-designation-department",
                                                                            "delete",
                                                                            props.userPermissions
                                                                        ) && (
                                                                                <img
                                                                                    src={Delete}
                                                                                    alt=""
                                                                                    className="img-delete"
                                                                                    onClick={() => openModalForDeleteDesignation(v.id)}
                                                                                />
                                                                            )}
                                                                        {isActionExist(
                                                                            "level-designation-department",
                                                                            "edit",
                                                                            props.userPermissions
                                                                        ) && (
                                                                                <img
                                                                                    src={edit}
                                                                                    alt=""
                                                                                    className="img-edit"
                                                                                    onClick={() => handleAddNewEditDesignation(true, v.id, i)}
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

                            </Tab>
                            <Tab
                                eventKey="3"
                                className="customeTab"
                                title="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Department&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
                            // onClick={() => getLevel()}
                            >
                                <div
                                    className="scrollable-div-page-tabs"
                                >
                                    <div className="pagePathLayout row">
                                        <div className="col-lg-11 header-title">
                                            <span className="bold" >{location.pathname}</span>
                                        </div>
                                        <OverlayTrigger
                                            placement="left"
                                            overlay={<Tooltip id="tooltip" className="tooltip-add-btn">Create</Tooltip>}
                                        >
                                            {isActionExist("level-designation-department", "create", props.userPermissions) && (
                                                <div className="col-lg-1 header-add-btn" onClick={handleAddNewDepartment}  >
                                                    <img src={AddBtn} alt="" className="btn-add " />
                                                </div>
                                            )}
                                        </OverlayTrigger>
                                    </div>
                                    <div>
                                        <Row>
                                            <Col className="list-table">
                                                <Table className="table-hover tabs-page-table">
                                                    <thead className="list-thead">
                                                        <tr>
                                                            <th className="table-th text-light">SR NO</th>
                                                            <th className="table-th text-light">Department Name</th>
                                                            <th className="table-th text-light">Created Date</th>
                                                            <th className="table-th text-light">Actions</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody style={{ maxHeight: "300px", overflowY: "auto" }}
                                                    >
                                                        {filteredDepartment.length > 0 ? (
                                                            filteredDepartment.map((v, i, record) => (
                                                                <tr style={{ backgroundColor: "D9D9D9" }} onDoubleClick={() => handleAddNewEditDepartment(true, v.id, i)}  >
                                                                    <td>{i + 1}</td>
                                                                    <td>{v.departmentName}</td>
                                                                    <td>
                                                                        {/* {v.createdDate} */}
                                                                        {moment(v.createdDate).format("DD-MM-yyyy")}
                                                                    </td>
                                                                    <td align="left">
                                                                        {isActionExist(
                                                                            "level-designation-department",
                                                                            "delete",
                                                                            props.userPermissions
                                                                        ) && (
                                                                                <img
                                                                                    src={Delete}
                                                                                    alt=""
                                                                                    className="img-delete"
                                                                                    onClick={() => openModalForDeleteDepartment(v.id)}
                                                                                />
                                                                            )}
                                                                        {isActionExist(
                                                                            "level-designation-department",
                                                                            "edit",
                                                                            props.userPermissions
                                                                        ) && (
                                                                                <img
                                                                                    src={edit}
                                                                                    alt=""
                                                                                    className="img-edit"
                                                                                    onClick={() => handleAddNewEditDepartment(true, v.id, i)}
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
                            </Tab>
                        </Tabs>
                    </Form>
                )}
            </Formik>

            {/* Add Modal of Level*/}
            <Modal show={showModalLevel} onHide={handleCloseModalLevel} className="custom-modal" centered>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content modal-height-width " >
                        {/* <Modal.Header className='pb-0' > */}
                        {/*  */}
                        <div className="pagePathLayout-modal row" >
                            <span className="bold">  <OverlayTrigger style={{}}
                                placement="right"
                                overlay={<Tooltip id="tooltip" className="tooltip-back-btn">Back</Tooltip>}
                            >

                                <img src={BackBtn} alt="" className="modal-header-backbtn" onClick={handleCloseModalLevel} />

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
                                            setShowModalLevel(false)
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

            {/* Edit Modal of Level */}
            <Modal show={showModalEditLevel} onHide={handleCloseModalLevelEdit} className="custom-modal" centered>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content modal-height-width " >
                        {/* <Modal.Header className='pb-0' > */}
                        {/*  */}
                        <div className="pagePathLayout-modal row" >

                            <span className="bold">  <OverlayTrigger style={{}}
                                placement="right"
                                overlay={<Tooltip id="tooltip" className="tooltip-back-btn">Back</Tooltip>} //tooltip-back-btn - to adjust the tooltip according to the button.
                            >

                                <img src={BackBtn} alt="" className="modal-header-backbtn" onClick={handleCloseModalLevelEdit} />

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
                                            handleCloseModalLevelEdit();
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

            {/* Add Modal of Designation */}
            <Modal show={showModalDesignation} onHide={handleCloseModalDesignation} className="custom-modal" centered>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content modal-height-width " >
                        {/* <Modal.Header className='pb-0' > */}
                        {/*  */}
                        <div className="pagePathLayout-modal row" >
                            <span className="bold">  <OverlayTrigger style={{}}
                                placement="right"
                                overlay={<Tooltip id="tooltip" className="tooltip-back-btn">Back</Tooltip>}
                            >

                                <img src={BackBtn} alt="" className="modal-header-backbtn" onClick={handleCloseModalDesignation} />

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
                                            setShowModalDesignation(false)
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

            {/* Edit Modal of Designation */}
            <Modal show={showModalEditDesignation} onHide={handleCloseModalEditDesignation} className="custom-modal" centered>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content modal-height-width " >
                        {/* <Modal.Header className='pb-0' > */}
                        {/*  */}
                        <div className="pagePathLayout-modal row" >



                            <span className="bold">  <OverlayTrigger style={{}}
                                placement="right"
                                overlay={<Tooltip id="tooltip" className="tooltip-back-btn">Back</Tooltip>} //tooltip-back-btn - to adjust the tooltip according to the button.
                            >

                                <img src={BackBtn} alt="" className="modal-header-backbtn" onClick={handleCloseModalEditDesignation} />

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
                                            handleCloseModalEditDesignation();
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

            {/* Add Modal of Department */}
            <Modal show={showModalDepartment} onHide={handleCloseModalDepartment} className="custom-modal" centered>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content modal-height-width " >
                        {/* <Modal.Header className='pb-0' > */}
                        {/*  */}
                        <div className="pagePathLayout-modal row" >
                            <span className="bold">  <OverlayTrigger style={{}}
                                placement="right"
                                overlay={<Tooltip id="tooltip" className="tooltip-back-btn">Back</Tooltip>}
                            >

                                <img src={BackBtn} alt="" className="modal-header-backbtn" onClick={handleCloseModalDepartment} />

                            </OverlayTrigger><span className="modal-header-span">{location.pathname}</span></span>

                        </div>
                        <Formik
                            initialValues={{
                                departmentName: "",
                            }}
                            validationSchema={
                                Yup.object().shape({
                                    departmentName: Yup.string().trim().required(" "),
                                })
                            }
                            onSubmit={(values, { setSubmitting, resetForm }) => {
                                let requestData = {
                                    departmentName: values.departmentName,
                                };
                                console.log("request Data >>", JSON.stringify(requestData));
                                createDepartment(requestData)
                                    .then((response) => {
                                        console.log("response>>", response)
                                        if (response.data.responseStatus === 200) {
                                            setSubmitting(false);
                                            resetForm();
                                            openModal(response.data.message, "cnf");
                                            setShowModalDepartment(false)
                                            getDepartmentList();
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
                                                    className={`form-control ${touched.departmentName && errors.departmentName ? 'is-invalid' : ''}`}
                                                    type="text"
                                                    label="Department Name"
                                                    id="departmentName"
                                                    name="departmentName"
                                                    value={values.departmentName}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    inputError={errors.departmentName}
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

            {/* Edit Modal of Department */}
            <Modal show={showModalEditDepartment} onHide={handleCloseModalEditDepartment} className="custom-modal" centered>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content modal-height-width " >
                        {/* <Modal.Header className='pb-0' > */}
                        {/*  */}
                        <div className="pagePathLayout-modal row" >

                            <span className="bold">  <OverlayTrigger style={{}}
                                placement="right"
                                overlay={<Tooltip id="tooltip" className="tooltip-back-btn">Back</Tooltip>} //tooltip-back-btn - to adjust the tooltip according to the button.
                            >

                                <img src={BackBtn} alt="" className="modal-header-backbtn" onClick={handleCloseModalEditDepartment} />

                            </OverlayTrigger><span className="modal-header-span">{location.pathname}</span></span>

                        </div>
                        <Formik
                            initialValues={{
                                departmentName: departmentObject != null ? departmentObject.departmentName : "",
                            }}
                            validationSchema={
                                Yup.object().shape({
                                    departmentName: Yup.string().trim().required(" "),
                                })
                            }
                            onSubmit={(values, { setSubmitting, resetForm }) => {
                                let requestData = {
                                    id: departmentObject.id,
                                    departmentName: values.departmentName,
                                };
                                console.log("request Data >>", JSON.stringify(requestData));
                                updateDepartment(requestData)
                                    .then((response) => {
                                        console.log("response>>", response)
                                        if (response.data.responseStatus === 200) {
                                            setSubmitting(false);
                                            handleCloseModalEditDepartment();
                                            openModal(response.data.message, "cnf");

                                            getDepartmentList();
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
                                                    className={`form-control ${touched.departmentName && errors.departmentName ? 'is-invalid' : ''}`}
                                                    type="text"
                                                    label="Department Name"
                                                    id="departmentName"
                                                    name="departmentName"
                                                    value={values.departmentName}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    inputError={errors.departmentName}
                                                />
                                                {/* <div className="invalid-feedback">{errors.departmentName}</div> */}
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





export default WithUserPermission(AllMaster);
