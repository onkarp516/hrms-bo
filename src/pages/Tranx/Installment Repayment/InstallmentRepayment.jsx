import React, { useEffect, useState } from "react";
import AddBtn from "../../../assets/images/MenuButton.png";
import BackBtn from "../../../assets/images/back.png";
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
import edit from "../../../assets/images/edit.png";
import Delete from "../../../assets/images/delete.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faXmark,
  faArrowRight,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import {
  AdvancePaymentsList,
  ApproveAdvancePayments,
  RejectAdvancePayments,
  deletePayment,
} from "@/services/api_functions";
import moment from "moment";
import { Formik } from "formik";
import * as Yup from "yup";
import CustomDateInputs from "../../../components/CustomDateInputs";
import CustomInput from "../../../components/CustomInputs";
import { WithUserPermission } from "../../../helpers/WithUserPermission";
import {
  createInstallment,
  getInstallmentsList,
  listOfAdvancePaymentWithInstallments,
} from "../../../services/api_functions/installment.service";
import ResponseModal from "../../../components/ResponseModal";
import DeleteConfirmationModal from "../../../components/DeleteConfirmationModal";
// import { FontAwesomeIcon } from "@fortawesome/free-regular-svg-icons/faArrowAltCircleUp";

function InstallmentRepayment(props) {
  const location = useLocation();
  const pathArray = location.pathname.split("/"); // Split the path into an array
  const name = pathArray[pathArray.length - 1]; // Get the last element of the array
  const [advancePayments, setAdvancePayments] = useState([]);
  const [filteredAdvancePayments, setFilteredAdvancePayments] = useState([]);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false); // State to control the modal visibility
  const [showModalReject, setShowModalReject] = useState(false);
  const [rowid, setRowId] = useState([]);
  const [rowamt, setRowAmt] = useState([]);
  const [InstallmentData, setInstallmentData] = useState([]);
  const [Expand, setExpand] = useState();
  const [MainData, setMainData] = useState();


  const [initVal, setInitVal] = useState("");
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
    setRowAmt(amt);
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
    getAdvancePaymentsList({ fromDate: "", toDate: "" });
  }, []);

  // List API Function
  const getAdvancePaymentsList = (values) => {
    let resquestdata = {
      fromDate: values.fromDate || "",
      toDate: values.toDate || "",
    };
    console.log("i am ", resquestdata);
    listOfAdvancePaymentWithInstallments(resquestdata)
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

  //   useEffect(() => {
  //     if (InstallmentData.hasOwnProperty("id")) {
  //       setShowModal(true);
  //     }
  //   }, [InstallmentData]);

  // List API Function
  const getAdvancePaymentsListData = (value) => {
    console.log("value: ", value);
    // let resquestdata = {
    //   advance_payment_id: value.id,
    //   //   amount: value.requestAmount,
    // };

    setInstallmentData(value);
    setShowModal(true);

    // console.log("i am ", resquestdata);
    // getInstallmentsList(resquestdata)
    //   .then((response) => {
    //     let res = response.data;
    //     if (res.responseStatus === 200) {
    //       console.log("res.response: ", res.response);
    //       setInstallmentData(res.response);
    //       //   setAdvancePayments(res.response);
    //       //   setFilteredAdvancePayments(res.response);
    //     }
    //   })
    //   .catch((error) => {
    //     // setAdvancePayments([]);
    //     // setFilteredAdvancePayments([]);
    //   });
  };

  // Delete API Function
  const onDelete = (id) => {
      let requestData = {
        paymentId: parseInt(id),
      };
      deletePayment(requestData)
        .then((response) => {
          if (response.data.responseStatus === 200) {
            openModal(response.data.message, "cnf");
            getAdvancePaymentsList({ fromDate: "", toDate: "" });
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

  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1;
    let day = currentDate.getDate();

    // Add leading zero if month or day is less than 10
    if (month < 10) {
      month = '0' + month;
    }
    if (day < 10) {
      day = '0' + day;
    }

    return `${year}-${month}-${day}`;
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
              fromDate: "",
              toDate: "",
            }}
            validationSchema={Yup.object().shape({
              fromDate: Yup.string().required(" "),
              toDate: Yup.string().required(" "),
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
                        className={`form-control ${touched.fromDate && errors.fromDate
                            ? "is-invalid"
                            : ""
                          }`}
                        type="date"
                        id="fromDate"
                        label="From Date"
                        name="fromDate"
                        value={values.fromDate}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        max={getFormattedMaxDate()} // Set the max attribute to block future dates
                      />
                      <span className="text-danger">
                        {errors.fromDate}
                      </span>
                    </div>
                  </div>
                  <div className="col-lg-2 list-head-fields">
                    <div class="textOnInput">
                      <CustomDateInputs
                        className={`form-control ${touched.toDate && errors.toDate ? "is-invalid" : ""
                          }`}
                        type="date"
                        id="toDate"
                        label="To Date"
                        name="toDate"
                        value={values.toDate}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        max={getFormattedMaxDate()} // Set the max attribute to block future dates
                      />
                      <span className="text-danger">
                        {errors.toDate}
                      </span>
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
                    <th className="table-th text-light"></th>
                    <th className="table-th text-light">SR NO</th>
                    <th className="table-th text-light">Employee Name</th>
                    <th className="table-th text-light">Amount</th>
                    <th className="table-th text-light">Date Of Request</th>
                    <th className="table-th text-light">Approved By</th>
                    <th className="table-th text-light">Approved Amount</th>
                    <th className="table-th text-light">Installment Amount</th>
                    <th className="table-th text-light">No Of Installments</th>
                    <th className="table-th text-light">Payment Status</th>
                    {/* <th className="table-th text-light">Payment Dt.</th> */}
                    <th className="table-th text-light">Created Dt.</th>
                    <th className="table-th text-light">Action</th>
                  </tr>
                </thead>

                <tbody style={{ maxHeight: "300px", overflowY: "auto" }}>
                  {filteredAdvancePayments.length > 0 ? (
                    filteredAdvancePayments.map((v, i) => (
                      <>
                        {console.log('v: ', v)}
                        <tr
                          style={{ backgroundColor: "D9D9D9" }}
                          // onDoubleClick={() => getAdvancePaymentsListData(v)}
                        >
                          {v.installmentData && v.installmentData.length > 0 ? (
                            <td style={{ width: "2%" }}>
                              <div
                                onClick={(e) => {
                                  // setShowModal(false);

                                  e.preventDefault();
                                  if (parseInt(MainData) == parseInt(i))
                                    setMainData("");
                                  else {
                                    setMainData(i);
                                    // setMainInnerData("");
                                    // setBreakInnerData("");
                                  }
                                  setShowModal(false);
                                }}
                                className="btn-arrow-style"
                              >
                                {parseInt(MainData) == parseInt(i) ? (
                                  <FontAwesomeIcon
                                    icon={faArrowDown}
                                    // className="img-delete"
                                    // onClick={() => handleAddNewReject(v.id)}
                                  />
                                ) : (
                                  <FontAwesomeIcon
                                    icon={faArrowRight}
                                      // className="img-delete"
                                      // onClick={() => handleAddNewReject(v.id)}
                                  />
                                )}
                              </div>
                            </td>
                          ) : (
                            <td>{""}</td>
                          )}
                          <td>{i + 1}</td>
                          <td>{v.employeeName}</td>
                          <td>{v.requestAmount}</td>
                          <td>{v.dateOfRequest}</td>
                          <td>{v.approvedBy}</td>
                          <td>{v.paidAmount}</td>
                          <td>{v.installmentAmount}</td>
                          <td>{v.noOfInstallments}</td>
                          <td>{v.paymentStatus}</td>
                          <td>{moment(v.created_at).format("DD-MM-yyyy")}</td>
                          {v.isPaymentCompleted != "Completed" ? (
                            <td align="left">
                            <FontAwesomeIcon
                              icon={faCheck}
                              className="img-delete"
                              onClick={() =>
                                // handleAddNew(v.id, v.requestAmount)
                                getAdvancePaymentsListData(v)
                              }
                            />
                          </td>
                          ) : <td></td>}
                          {/* {v.paymentStatus === "APPROVEDd" ||
                          v.paymentStatus === "REJECTEDd" ? (
                            <td></td>
                          ) : (
                            <td align="right">
                              <FontAwesomeIcon
                                icon={faCheck}
                                className="img-delete"
                                onClick={() =>
                                  handleAddNew(v.id, v.requestAmount)
                                }
                              />
                              <FontAwesomeIcon
                                icon={faXmark}
                                className="img-delete"
                                onClick={() => handleAddNewReject(v.id)}
                              />
                              <img
                                src={Delete}
                                alt=""
                                className="img-delete"
                                onClick={() => openModalForDelete(v.id)}
                              />
                            </td>
                          )} */}
                        </tr>

                        {v.installmentData != "" ? (
                          <tr>
                            <td
                              colSpan={24}
                              className="bg-white inner-tbl-td"
                              // style={{ padding: "0px" }}
                            >
                              <Table
                                bordered
                                responsive
                                size="sm"
                                className={`${parseInt(MainData) == parseInt(i)
                                    ? "mb-0"
                                    : "mb-0 d-none"
                                  }`}
                              >
                                <thead
                                  style={{
                                    background: "#FBF3D0",
                                  }}
                                  className="datastyle-head"
                                >
                                  <tr className="text-center">
                                    <th>Due Date</th>
                                    <th>Pain Amount</th>
                                    <th>Status</th>
                                  </tr>
                                </thead>
                                <tbody
                                  style={{
                                    background: "#FEFCF3",
                                    textAlign: "center",
                                  }}
                                >
                                  {v.installmentData &&
                                    v.installmentData.map((vi, ii) => {
                                      {
                                        console.log(vi);
                                      }
                                      return (
                                        <tr>
                                          <td>{vi.due_date}</td>
                                          <td>{vi.amount}</td>
                                          <td>{vi.status}</td>
                                        </tr>
                                      );
                                    })}
                                </tbody>
                              </Table>
                            </td>
                          </tr>
                        ) : (
                          ""
                        )}
                      </>
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
              enableReinitialize={true}
              initialValues={{
                installmentAmount:
                  InstallmentData && InstallmentData.hasOwnProperty("id")
                    ? InstallmentData.amount
                    : "",
                approvedDate: InstallmentData && InstallmentData.hasOwnProperty("id")
                  ? InstallmentData.approvedDate
                  : ""
              }}
              validationSchema={Yup.object().shape({
                approvedDate: Yup.string()
                  .trim()
                  .required(" "),
              //   validationSchema={Yup.object().shape({
              //     paidAmount: Yup.string()
              //       .trim()
              //       .required(" ")
              //       .test(
              //         "isValidAmount",
              //         "Entered amount is greater than the Requested amount",
              //         function (value) {
              //           const { paidAmount } = this.parent;
              //           const isValidAmount =
              //             parseInt(paidAmount) > 0 &&
              //             parseInt(paidAmount) <= parseInt(rowamt); // Compare with the actual amount
              //           return isValidAmount;
              //         }
              //       ),
              //   })}
              })}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                console.log('values: ', values);
                // return false

                let requestData = {
                  advance_payment_id: InstallmentData.id,
                  amount: parseInt(InstallmentData.installmentAmount),
                  approvedDate: values.approvedDate,
                };

                createInstallment(requestData)
                  .then((response) => {
                    console.log("response>>", response);
                    if (response.data.responseStatus === 200) {
                      setSubmitting(false);
                      resetForm();
                      openModal(response.data.message, "cnf");
                      setShowModal(false);
                      getAdvancePaymentsList({ fromDate: "", toDate: "" });
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
                          className={`form-control ${touched.installmentAmount &&
                            errors.installmentAmount
                              ? "is-invalid"
                              : ""
                          }`}
                          type="text"
                          label="Installment Amount"
                          id="installmentAmount"
                          name="installmentAmount"
                          readOnly={true}
                          value={InstallmentData.installmentAmount}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          inputError={errors.installmentAmount}
                        />
                      </div>
                    </div>

                    <div className="col-lg-6">

                      <div class="textOnInput">
                        {/* <label for="inputText" className="common-input-label">Employee ID</label> */}
                        <CustomDateInputs
                          label="Approved Date"
                          className={`form-control ${touched.approvedDate && errors.approvedDate
                            ? "is-invalid"
                            : ""
                            }`}
                          type="date"
                          id="approvedDate" 
                          placeholder="approvedDate"
                          name="approvedDate"
                          dateFormat="dd/MM/yyyy"
                          value={values.approvedDate}
                          // invalid={errors.approvedDate ? true : false}
                          onChange={handleChange}
                          min={getCurrentDate()} // Set the minimum date
                        // inputError={errors.approvedDate}
                        // onBlur={onBlur}
                          // max={getFormattedMinDate()} // Set the max attribute to block future dates
                        />

                      </div>
                      <span className="text-danger">
                        {errors.approvedDate}
                      </span>

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
                  paymentId: rowid,
                  remark: values.remark,
                };
                RejectAdvancePayments(requestData)
                  .then((response) => {
                    console.log("response>>", response);
                    if (response.data.responseStatus === 200) {
                      setSubmitting(false);
                      resetForm();
                      openModal(response.data.message, "cnf");
                      setShowModalReject(false);
                      getAdvancePaymentsList({ fromDate: "", toDate: "" });
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
                          className={`form-control ${touched.remark && errors.remark ? "is-invalid" : ""
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

export default WithUserPermission(InstallmentRepayment);
