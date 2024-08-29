import React, { useEffect, useState } from "react";
import AddBtn from "../../assets/images/MenuButton.png";
import BackBtn from "../../assets/images/back.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Col,
  Row,
  Table,
  Tooltip,
  Form,
  Modal,
  Card,
  Button,
} from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import edit from "../../assets/images/edit.png";
import Delete from "../../assets/images/delete.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import {
  AdvancePaymentsList,
  ApproveAdvancePayments,
  RejectAdvancePayments,
  deletePayment,
} from "@/services/api_functions";
import moment from "moment";
import { Formik } from "formik";
import * as Yup from "yup";
// import CustomDateInputs from "../../components/CustomDateInputs";
// import CustomInput from "../../components/CustomInputs";
// import { WithUserPermission } from "/helpers/WithUserPermission";
import CustomDateInputs from "../../components/CustomDateInputs";
import CustomInput from "../../components/CustomInputs";
import { WithUserPermission } from "../../helpers/WithUserPermission";
import {
  employeeLeave,
  updateEmployeeLeaveStatus,
  deleteEmployeeLeave,
} from "../../services/api_functions";
import ResponseModal from "../../components/ResponseModal";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";

function LeaveReport(props) {
  const location = useLocation();
  const pathArray = location.pathname.split("/"); // Split the path into an array
  const name = pathArray[pathArray.length - 1]; // Get the last element of the array
  const [advancePayments, setAdvancePayments] = useState([]);
  const [filteredAdvancePayments, setFilteredAdvancePayments] = useState([]);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false); // State to control the modal visibility
  const [showModalReject, setShowModalReject] = useState(false);
  const [RowId, setRowId] = useState([]);
  const [rowamt, setRowAmt] = useState([]);

  const [Bankaccmodal, setBankaccmodal] = useState(false);
  const [SundryCreditorLst, setSundryCreditorLst] = useState([]);
  const [CashAcbankLst, setCashAcbankLst] = useState([]);
  const [resLst, setresLst] = useState([]);

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

  const handleAddNew = (id, amt) => {
    setRowId(id);
    // setRowAmt(amt);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAddNewReject = (id, amt) => {
    setRowId(id);
    setShowModalReject(true);
  };

  const handleCloseModalReject = () => {
    setShowModalReject(false);
  };

  useEffect(() => {
    getAdvancePaymentsList({ yearMonth: "" });
  }, []);

  // List API Function
  const getAdvancePaymentsList = (values) => {
    let resquestdata = {
      yearMonth: values.yearMonth || "",
    };
    console.log("i am ", resquestdata);
    employeeLeave(resquestdata)
      .then((response) => {
        let res = response.data;
        if (res.responseStatus === 200) {
          setAdvancePayments(res.response);
          setFilteredAdvancePayments(res.response);
        }
      })
      .catch((error) => {
        openModal(error, "error");
        setAdvancePayments([]);
        setFilteredAdvancePayments([]);
      });
  };

  // Delete API Function
  const onDelete = (id) => {
    let requestData = {
      leaveId: id,
    };
    deleteEmployeeLeave(requestData)
      .then((response) => {
        if (response.data.responseStatus === 200) {
          openModal(response.data.message, "cnf");
          getAdvancePaymentsList({ yearMonth: "" });
        } else {
          openModal(response.data.message, "error");
        }
      })
      .catch((error) => {
        openModal(error, "error");
      });
  };

  //this function blocks the next coming date and gives option to select todays and previous dates only
  const getFormattedMaxDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
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
        </div>

        <div className="col-lg-12 path-label">
          <span>{name}</span>
        </div>
        <div className="col-lg-12 path-label2">
          <span>Manage All {name} Related Information</span>
        </div>
        <div>
          <Formik
            validateOnBlur={false}
            validateOnChange={false}
            initialValues={{
              yearMonth: "",
            }}
            validationSchema={Yup.object().shape({
              // taskDate: Yup.string().required("From Date is required"),
              // employeeId: Yup.object().required("Select Employee"),
            })}
            onSubmit={(values, { setSubmitting }) => {
              getAdvancePaymentsList(values);
            }}
            render={({
              errors,
              status,
              touched,
              isSubmitting,
              handleChange,
              handleSubmit,
              setFieldValue,
              values,
              handleBlur,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Row className="list-heading">
                  <div className="col-lg-2 list-head-fields">
                    <div class="textOnInput">
                      <CustomDateInputs
                        className={`form-control ${
                          touched.yearMonth && errors.yearMonth
                            ? "is-invalid"
                            : ""
                        }`}
                        type="month"
                        id="yearMonth"
                        label="Select Month"
                        name="yearMonth"
                        value={values.yearMonth}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        max={getFormattedMaxDate()} // Set the max attribute to block future dates
                      />
                    </div>
                  </div>
                  <div className="col-lg-1">
                    <div class="textOnInput">
                      <Button
                        style={{ marginTop: "30px" }}
                        className="modal-submit-btn"
                        type="submit"
                      >
                        Show
                      </Button>
                    </div>
                  </div>
                </Row>
              </Form>
            )}
          />
        </div>

        <div className=" scrollable-div-page">
          <Row>
            <Col className="list-table">
              <Table className="table-hover">
                <thead className="list-thead">
                  <tr>
                    <th className="table-th text-light">SR NO</th>
                    <th className="table-th text-light">Employee Name</th>
                    <th className="table-th text-light">Designation</th>
                    <th className="table-th text-light">Leave Type</th>
                    <th className="table-th text-light">Applied On</th>
                    <th className="table-th text-light">Leave From</th>
                    <th className="table-th text-light">Total Days</th>
                    {/* <th className="table-th text-light">Payment Dt.</th> */}
                    <th className="table-th text-light">Created Dt.</th>
                    <th className="table-th text-light">Action</th>
                  </tr>
                </thead>

                <tbody style={{ maxHeight: "300px", overflowY: "auto" }}>
                  {filteredAdvancePayments.length > 0 ? (
                    filteredAdvancePayments.map((v, i) => (
                      <tr style={{ backgroundColor: "D9D9D9" }}>
                        <td>{i + 1}</td>
                        <td>{v.empName}</td>
                        <td>{v.designation}</td>
                        <td>{v.leaveType}</td>
                        <td>{v.appliedOn}</td>
                        <td>{v.leaveFrom}</td>
                        <td>{v.totalDays}</td>
                        <td>{moment(v.created_at).format("DD-MM-yyyy")}</td>

                        {/* Conditionally render based on the status */}
                        {v.status === "Approved" && (
                          <td align="left">
                            {/* Show Delete icon only */}
                            <FontAwesomeIcon
                              icon={faXmark}
                              className="img-delete"
                              onClick={() => handleAddNewReject(v.leaveId)}
                            />
                            <img
                              src={Delete}
                              alt=""
                              className="img-delete"
                              onClick={() =>
                                openModalForDelete(
                                  v.leaveId
                                )
                              }
                            />
                          </td>
                        )}

                        {v.status === "Rejected" && (
                          <td align="left">
                            {/* Show Xmark icon and Delete icon */}
                            <FontAwesomeIcon
                              icon={faCheck}
                              className="img-delete"
                              onClick={() => handleAddNew(v.leaveId)}
                            />
                            <img
                              src={Delete}
                              alt=""
                              className="img-delete"
                              onClick={() =>
                                openModalForDelete(
                                  v.leaveId
                                )
                              }
                            />
                          </td>
                        )}

                        {v.status === "Pending" && (
                          <td align="left">
                            {/* Show Check, Xmark, and Delete icons */}
                            <FontAwesomeIcon
                              icon={faCheck}
                              className="img-delete"
                              onClick={() => handleAddNew(v.leaveId)}
                            />
                            <FontAwesomeIcon
                              icon={faXmark}
                              className="img-delete"
                              onClick={() => handleAddNewReject(v.leaveId)}
                            />
                            <img
                              src={Delete}
                              alt=""
                              className="img-delete"
                              onClick={() =>
                                openModalForDelete(
                                  v.leaveId
                                )
                              }
                            />
                          </td>
                        )}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={12} className="text-center">
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
      {/* Approve Modal */}
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        className="custom-modal"
        centered
      >
        <div className="modal-dialog modal-lg">
          <div
            className="modal-content modal-height-width "
            style={{ height: "250px" }}
          >
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
                remark: "",
                // paidAmount: "",
              }}
              // validationSchema={Yup.object().shape({
              //   paidAmount: Yup.string()
              //     .trim()
              //     .required(" ")
              //     .test(
              //       "isValidAmount",
              //       "Entered amount is greater than the Requested amount",
              //       function (value) {
              //         const { paidAmount } = this.parent;
              //         const isValidAmount =
              //           parseInt(paidAmount) > 0 &&
              //           parseInt(paidAmount) <= parseInt(rowamt); // Compare with the actual amount
              //         return isValidAmount;
              //       }
              //     ),
              // })}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                let requestData = {
                  leaveId: RowId,
                  remark: values.remark,
                  leaveStatus: true,
                };
                updateEmployeeLeaveStatus(requestData)
                  .then((response) => {
                    console.log("response>>", response);
                    if (response.data.responseStatus === 200) {
                      setSubmitting(false);
                      // resetForm();
                      openModal(response.data.message, "cnf");
                      setShowModalReject(false);
                      setShowModal(false);

                      getAdvancePaymentsList({ yearMonth: "" });
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
                    <div className="col-lg-6">
                      <div class="textOnInput">
                        {/* <label for="inputText" className="common-input-label">Employee ID</label> */}
                        <CustomInput
                          className={`form-control ${
                            touched.remark && errors.remark ? "is-invalid" : ""
                          }`}
                          type="text"
                          label="Remark"
                          id="remark"
                          name="remark"
                          value={values.remark}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          inputError={errors.remark}
                        />
                      </div>
                    </div>

                    <Row>
                      <Col lg="10"></Col>
                      <Col lg="2">
                        <Button
                          className="modal-submit-btn-advance-payment"
                          type="submit"
                        >
                          APPROVE
                        </Button>
                      </Col>
                    </Row>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </Modal>

      {/* Reject Modal */}
      <Modal
        show={showModalReject}
        onHide={handleCloseModalReject}
        className="custom-modal"
        centered
      >
        <div className="modal-dialog modal-lg">
          <div
            className="modal-content modal-height-width "
            style={{ height: "200px" }}
          >
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
                    onClick={handleCloseModalReject}
                  />
                </OverlayTrigger>
                <span className="modal-header-span">{location.pathname}</span>
              </span>
            </div>
            <Formik
              initialValues={{
                remark: "",
              }}
              validationSchema={Yup.object().shape({})}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                let requestData = {
                  leaveId: RowId,
                  remark: values.remark,
                  leaveStatus: false,
                };
                updateEmployeeLeaveStatus(requestData)
                  .then((response) => {
                    console.log("response>>", response);
                    if (response.data.responseStatus === 200) {
                      setSubmitting(false);
                      resetForm();
                      openModal(response.data.message, "cnf");
                      setShowModalReject(false);
                      setShowModal(false);
                      getAdvancePaymentsList({ yearMonth: "" });
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
                    <div className="col-lg-6">
                      <div class="textOnInput">
                        {/* <label for="inputText" className="common-input-label">Employee ID</label> */}
                        <CustomInput
                          className={`form-control ${
                            touched.remark && errors.remark ? "is-invalid" : ""
                          }`}
                          type="text"
                          label="Remark"
                          id="remark"
                          name="remark"
                          value={values.remark}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          inputError={errors.remark}
                        />
                      </div>
                    </div>
                    <Row>
                      <Col lg="10"></Col>
                      <Col lg="2">
                        <Button
                          className="modal-submit-btn-advance-payment"
                          type="submit"
                        >
                          REJECT
                        </Button>
                      </Col>
                    </Row>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default WithUserPermission(LeaveReport);
