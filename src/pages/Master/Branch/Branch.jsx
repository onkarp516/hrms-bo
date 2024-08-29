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
  createBranch,
  listOfBranch,
  findBranch,
  updateBranch,
  deleteBranch,
} from "@/services/api_functions";
import { OnlyEnterNumbers } from "@/helpers";
import moment from "moment";
import { } from "../../../services/api_functions/branch.service";
import { WithUserPermission } from "../../../helpers/WithUserPermission";
import { isActionExist } from "../../../helpers/constants";
import ResponseModal from "../../../components/ResponseModal";
import DeleteConfirmationModal from "../../../components/DeleteConfirmationModal";

function Branch(props) {
  console.log("props: ", props);
  const location = useLocation();
  const pathArray = location.pathname.split("/"); // Split the path into an array
  const name = pathArray[pathArray.length - 1]; // Get the last element of the array

  const [showModal, setShowModal] = useState(false); // State to control the modal visibility
  const [showModalEdit, setShowModalEdit] = useState(false); // State to control the modal visibility
  const [branch, setBranch] = useState([]);
  const [filteredBranch, setFilteredBranch] = useState([]);
  const [branchObject, setBranchObject] = useState("");
  const [ResModal, setResModal] = useState(false);
  const [ResText, setResText] = useState(false);
  const [LogoType, setLogoType] = useState("");

  const navigate = useNavigate()
  const [DeleteConfirmation, setDeleteConfirmation] = useState();
  const [DeleteId, setDeleteId] = useState()
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
    // setShowModal(true);
    navigate("/Dashboard/Master/branch-create")
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
    getBranchList();
  }, []);

  //List API Function
  const getBranchList = () => {
    listOfBranch()
      .then((response) => {
        let res = response.data;
        if (res.responseStatus === 200) {
          setBranch(res.response);
          setFilteredBranch(res.response);
        }
      })
      .catch((error) => {
        setBranch([]);
        setFilteredBranch([]);
        openModal(error, "error");
      });
  };

  //Before Editing Finding the record by Id
  const handleAddNewEdit = (status, id, rowIndex) => {
    if (status) {
      setcurrentIndex(rowIndex);
      let reqData = { id: id };
      findBranch(reqData)
        .then((response) => {
          if (response.data.responseStatus === 200) {
            setBranchObject(response.data.response);
            setcurrentIndex(0);
            // setShowModalEdit(status);
            navigate("/Dashboard/Master/branch-edit")
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
    };
    deleteBranch(requestData)
      .then((response) => {
        if (response.data.responseStatus === 200) {
          openModal(response.data.message, "cnf");
          getBranchList();
        } else {
          openModal(response.data.message, "error");
        }
      })
      .catch((error) => {
        openModal(error, "error");
        // handle error
      });
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
            <span className="bold">{location.pathname}</span>
          </div>
          {/* {console.log("userPermissions: ", props)}; */}
          <OverlayTrigger
            placement="left"
            overlay={
              <Tooltip id="tooltip" className="tooltip-add-btn">
                Create
              </Tooltip>
            }
          >
            {/* {isActionExist("branch", "create", props.userPermissions) && ( */}
            <div className="col-lg-1 header-add-btn" onClick={handleAddNew}>
              <img src={AddBtn} alt="" className="btn-add " />
            </div>
            {/* )} */}
          </OverlayTrigger>
        </div>

        <div className="col-lg-12 path-label">
          <span>{name}</span>
        </div>
        <div className="col-lg-12 path-label2">
          <span>Manage All {name} Related Information</span>
        </div>

        <div className=" scrollable-div-page">
          <Row>
            <Col className="list-table">
              <Table className="table-hover">
                <thead className="list-thead">
                  <tr>
                    <th className="table-th text-light">SR NO</th>
                    <th className="table-th text-light">Branch Name</th>
                    <th className="table-th text-light">Branch Code</th>
                    <th className="table-th text-light">Latitude</th>
                    <th className="table-th text-light">Longitude</th>
                    <th className="table-th text-light">Branch Radius</th>
                    <th className="table-th text-light">Created Date</th>
                    <th className="table-th text-light">Actions</th>
                  </tr>
                </thead>

                <tbody style={{ maxHeight: "300px", overflowY: "auto" }}>
                  {filteredBranch.length > 0 ? (
                    filteredBranch.map((v, i, record) => (
                      <tr
                        style={{ backgroundColor: "D9D9D9" }}
                        onDoubleClick={() => {
                          navigate("/Dashboard/Master/branch-edit", {
                            state: {
                              id: v.id,
                            },
                          });
                        }

                        }
                      >
                        <td>{i + 1}</td>
                        <td>{v.branchName}</td>
                        <td>{v.branchCode}</td>
                        <td>{v.branchLat}</td>
                        <td>{v.branchLong}</td>
                        <td>{v.branchRadius}</td>
                        <td>
                          {/* {v.createdDate} */}
                          {moment(v.createdDate).format("DD-MM-yyyy")}
                        </td>
                        <td align="left">
                          {/* {isActionExist(
                            "branch",
                            "delete",
                            props.userPermissions
                          ) && ( */}
                          <img
                            src={Delete}
                            alt=""
                            className="img-delete"
                            onClick={() => openModalForDelete(v.id)}
                          />
                          {/* )}{" "} */}
                          {/* {isActionExist(
                            "branch",
                            "edit",
                            props.userPermissions
                          ) && ( */}
                          <img
                            src={edit}
                            alt=""
                            className="img-edit"
                            onClick={() => {
                              navigate("/Dashboard/Master/branch-edit", {
                                state: {
                                  id: v.id,
                                },
                              });
                            }
                            }
                          />
                          {/* )} */}

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
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        className="custom-modal"
        centered
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content modal-height-width ">
            {/* <Modal.Header className='pb-0' > */}
            {/*  */}
            <div className="pagePathLayout-modal row">
              <span className="bold">
                {" "}
                <OverlayTrigger
                  style={{}}
                  placement="right"
                  overlay={
                    <Tooltip id="tooltip" className="tooltip-back-btn">
                      Back
                    </Tooltip>
                  }
                >
                  <img
                    src={BackBtn}
                    alt=""
                    className="modal-header-backbtn"
                    onClick={handleCloseModal}
                  />
                </OverlayTrigger>
                <span className="modal-header-span">{location.pathname}</span>
              </span>
            </div>
            <Formik
              initialValues={{
                branchName: "",
                branchCode: "",
                branchLat: "",
                branchLong: "",
                branchRadius: "",
              }}
              validationSchema={Yup.object().shape({
                branchName: Yup.string().trim().required(" "),
                branchCode: Yup.string().trim().required(" "),
                branchLat: Yup.string().trim().required(" "),
                branchLong: Yup.string().trim().required(" "),
                branchRadius: Yup.string().trim().required(" "),
              })}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                let requestData = {
                  branchName: values.branchName,
                  branchCode: values.branchCode,
                  branchLat: values.branchLat,
                  branchLong: values.branchLong,
                  branchRadius: values.branchRadius,
                };
                console.log("request Data >>", JSON.stringify(requestData));
                createBranch(requestData)
                  .then((response) => {
                    console.log("response>>", response);
                    if (response.data.responseStatus === 200) {
                      setSubmitting(false);
                      openModal(response.data.message, "cnf");
                      resetForm();
                      setShowModal(false);
                      getBranchList();
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
                        <CustomInput
                          className={`form-control ${touched.branchName && errors.branchName
                            ? "is-invalid"
                            : ""
                            }`}
                          type="text"
                          id="branchName"
                          label="Branch Name"
                          name="branchName"
                          value={values.branchName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div class="textOnInput">
                        <CustomInput
                          className={`form-control ${touched.branchCode && errors.branchCode
                            ? "is-invalid"
                            : ""
                            }`}
                          type="text"
                          id="branchCode"
                          name="branchCode"
                          label="Branch Code"
                          value={values.branchCode}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div class="textOnInput">
                        <CustomInput
                          className={`form-control ${touched.branchLat && errors.branchLat
                            ? "is-invalid"
                            : ""
                            }`}
                          type="number"
                          id="branchLat"
                          name="branchLat"
                          label="Latitude"
                          value={values.branchLat}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="modal-fields-row2 row">
                    <div className="col-lg-4">
                      <div class="textOnInput">
                        <CustomInput
                          className={`form-control ${touched.branchLong && errors.branchLong
                            ? "is-invalid"
                            : ""
                            }`}
                          type="number"
                          id="branchLong"
                          name="branchLong"
                          label="Longitude"
                          value={values.branchLong}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div class="textOnInput">
                        <CustomInput
                          className={`form-control ${touched.branchRadius && errors.branchRadius
                            ? "is-invalid"
                            : ""
                            }`}
                          type="number"
                          id="branchRadius"
                          name="branchRadius"
                          label="Radius"
                          value={values.branchRadius}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                    </div>
                  </div>
                  <Row className="mt-3">
                    <Col lg="10"></Col>
                    <Col lg="2">
                      <Button className="modal-submit-btn" type="submit">
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
      <Modal
        show={showModalEdit}
        onHide={handleCloseModalEdit}
        className="custom-modal"
        centered
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content modal-height-width ">
            {/* <Modal.Header className='pb-0' > */}
            {/*  */}
            <div className="pagePathLayout-modal row">
              <span className="bold">
                {" "}
                <OverlayTrigger
                  style={{}}
                  placement="right"
                  overlay={
                    <Tooltip id="tooltip" className="tooltip-back-btn">
                      Back
                    </Tooltip>
                  } //tooltip-back-btn - to adjust the tooltip according to the button.
                >
                  <img
                    src={BackBtn}
                    alt=""
                    className="modal-header-backbtn"
                    onClick={handleCloseModalEdit}
                  />
                </OverlayTrigger>
                <span className="modal-header-span">{location.pathname}</span>
              </span>
            </div>
            <Formik
              initialValues={{
                branchName: branchObject != null ? branchObject.branchName : "",
                branchCode: branchObject != null ? branchObject.branchCode : "",
                branchLat: branchObject != null ? branchObject.branchLat : "",
                branchLong: branchObject != null ? branchObject.branchLong : "",
                branchRadius:
                  branchObject != null ? branchObject.branchRadius : "",
              }}
              validationSchema={Yup.object().shape({
                branchName: Yup.string().trim().required(" "),
                branchCode: Yup.string().trim().required(" "),
                branchLat: Yup.string().trim().required(" "),
                branchLong: Yup.string().trim().required(" "),
                branchRadius: Yup.string().trim().required(" "),
              })}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                let requestData = {
                  id: branchObject.id,
                  branchName: values.branchName,
                  branchCode: values.branchCode,
                  branchLat: values.branchLat,
                  branchLong: values.branchLong,
                  branchRadius: values.branchRadius,
                };
                console.log("request Data >>", JSON.stringify(requestData));
                updateBranch(requestData)
                  .then((response) => {
                    console.log("response>>", response);
                    if (response.data.responseStatus === 200) {
                      setSubmitting(false);
                      openModal(response.data.message, "cnf");
                      handleCloseModalEdit();
                      getBranchList();
                    } else {
                      setSubmitting(false);
                      openModal(response.data.message, "error");
                      // toast.error("✘ " + response.data.message);
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
                        <CustomInput
                          className={`form-control ${touched.branchName && errors.branchName
                            ? "is-invalid"
                            : ""
                            }`}
                          type="text"
                          id="branchName"
                          label="Branch Name"
                          name="branchName"
                          value={values.branchName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div class="textOnInput">
                        <CustomInput
                          className={`form-control ${touched.branchCode && errors.branchCode
                            ? "is-invalid"
                            : ""
                            }`}
                          type="text"
                          id="branchCode"
                          name="branchCode"
                          label="Branch Code"
                          value={values.branchCode}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div class="textOnInput">
                        <CustomInput
                          className={`form-control ${touched.branchLat && errors.branchLat
                            ? "is-invalid"
                            : ""
                            }`}
                          type="number"
                          id="branchLat"
                          name="branchLat"
                          label="Latitude"
                          value={values.branchLat}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="modal-fields-row2 row">
                    <div className="col-lg-4">
                      <div class="textOnInput">
                        <CustomInput
                          className={`form-control ${touched.branchLong && errors.branchLong
                            ? "is-invalid"
                            : ""
                            }`}
                          type="number"
                          id="branchLong"
                          name="branchLong"
                          label="Longitude"
                          value={values.branchLong}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div class="textOnInput">
                        <CustomInput
                          className={`form-control ${touched.branchRadius && errors.branchRadius
                            ? "is-invalid"
                            : ""
                            }`}
                          type="number"
                          id="branchRadius"
                          name="branchRadius"
                          label="Radius"
                          value={values.branchRadius}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                    </div>
                    <div className="col-lg-4"></div>
                  </div>
                  <Row className="mt-3">
                    <Col lg="10"></Col>
                    <Col lg="2">
                      <Button className="modal-submit-btn" type="submit">
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

export default WithUserPermission(Branch);
