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
import CustomDateInputs from "../../../components/CustomDateInputs";
import CustomInput from "../../../components/CustomInputs";
import { WithUserPermission } from "../../../helpers/WithUserPermission";
import ResponseModal from "../../../components/ResponseModal";
import DeleteConfirmationModal from "../../../components/DeleteConfirmationModal";

function AdvancePayments(props) {
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
  const [isInstallment, setIsInstallment] = useState([]);
  const [numberOfInstallment, setnumberOfInstallment] = useState([]);
  const [initVal, setInitVal] = useState("");
  const [Bankaccmodal, setBankaccmodal] = useState(false);
  const [SundryCreditorLst, setSundryCreditorLst] = useState([]);
  const [CashAcbankLst, setCashAcbankLst] = useState([]);
  const [resLst, setresLst] = useState([]);
  // const [RowId, setRowId] = useState();
  // const [Rows, setRows] = useState([]);

  // const navigate = useNavigate()
  // ... (other state variables)

  const [rows, setRows] = useState([]);
  const [index, setIndex] = useState(0);

  // useEffect(() => {
  //   setReceiptLastRecords();
  //   lstgetsundrydebtors_indirectexpenses();
  //   // lstGetsundryDebtorsIndirectExpenses();
  //   lstgetcashAcbankaccount();
  //   initRows();
  // }, []);

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

  const handleAddNew = (id, amt, isInstallment, noi) => {
    setRowId(id);
    setRowAmt(amt);
    setIsInstallment(isInstallment);
    setnumberOfInstallment(noi)
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
    if (values.fromDate > values.toDate) {
      openModal("✘ From Date should not be greater than current date", "error");
      return false;
    }
    let resquestdata = {
      fromDate: values.fromDate || "",
      toDate: values.toDate || "",
    };
    console.log("i am ", resquestdata);
    AdvancePaymentsList(resquestdata)
      .then((response) => {
        let res = response.data;
        if (res.responseStatus === 200) {
          setAdvancePayments(res.response);
          setFilteredAdvancePayments(res.response);

        }
      })
      .catch((error) => {
        setAdvancePayments([]);
        setFilteredAdvancePayments([]);
        openModal(error, "error");
      });
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
              fromDate: Yup.string().required("From Date is required"),
              toDate: Yup.string().required("To Date is required"),
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
                          touched.fromDate && errors.fromDate
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
                    </div>
                  </div>
                  <div className="col-lg-2 list-head-fields">
                    <div class="textOnInput">
                      <CustomDateInputs
                        className={`form-control ${
                          touched.toDate && errors.toDate ? "is-invalid" : ""
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
                    <th className="table-th text-light">Request Amount</th>
                    <th className="table-th text-light">Date Of Request</th>
                    <th className="table-th text-light">Approved By</th>
                    <th className="table-th text-light">Approved Amount</th>
                    <th className="table-th text-light">Payment Status</th>
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
                        <td>{v.employeeName}</td>
                        <td>{v.requestAmount}</td>
                        <td>{v.dateOfRequest}</td>
                        <td>{v.approvedBy}</td>
                        <td>{v.paidAmount}</td>
                        <td>{v.paymentStatus}</td>
                        <td>{moment(v.created_at).format("DD-MM-yyyy")}</td>
                        {v.paymentStatus === "APPROVED" ||
                        v.paymentStatus === "REJECTED" ? (
                          <td></td>
                        ) : (
                            <td align="left">
                            <FontAwesomeIcon
                              icon={faCheck}
                              className="img-delete"
                              onClick={() =>
                                handleAddNew(v.id, v.requestAmount, v.isInstallment, v.noOfInstallments)
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
                // paidAmount: rowamt != null ? rowamt.paidAmount : "",
                paidAmount: rowamt,
                noOfInstallment: numberOfInstallment,
              }}
              validationSchema={Yup.object().shape({
                paidAmount: Yup.string()
                  .trim()
                  .required(" ")
                  .test(
                    "isValidAmount",
                    "Entered amount is greater than the Requested amount",
                    function (value) {
                      const { paidAmount } = this.parent;
                      const isValidAmount =
                        parseInt(paidAmount) > 0 &&
                        parseInt(paidAmount) <= parseInt(rowamt); // Compare with the actual amount
                      return isValidAmount;
                    }
                  ),
                noOfInstallment: Yup.string()
                  .trim()
                  .required(" ")
                  .test(
                    "isValidAmount2",
                    "Entered Number is greater than the Actual Number",
                    function (value) {
                      const { noOfInstallment } = this.parent;
                      const isValidAmount2 =
                        parseInt(noOfInstallment) > 0 &&
                        parseInt(noOfInstallment) <= parseInt(numberOfInstallment); // Compare with the actual amount
                      return isValidAmount2;
                    }
                  ),
              })}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                console.log("values: ", values);

                let requestData = {
                  paymentId: rowid,
                  remark: values.remark,
                  paidAmount: parseInt(values.paidAmount),
                  noOfInstallments: parseInt(values.noOfInstallment),
                };
                ApproveAdvancePayments(requestData)
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
                    <div className="col-lg-3">
                      <div class="textOnInput">
                        {/* <label for="inputText" className="common-input-label">Employee ID</label> */}
                        <CustomInput
                          className={`form-control ${
                            touched.paidAmount && errors.paidAmount
                              ? "is-invalid"
                              : ""
                          }`}
                          type="text"
                          label="Amount"
                          id="paidAmount"
                          name="paidAmount"
                          value={values.paidAmount}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          inputError={errors.paidAmount}
                        />
                        <span className="text-danger">{errors.paidAmount}</span>
                      </div>
                    </div>
                    {isInstallment === true ? (
                    <div className="col-lg-3">
                      <div class="textOnInput">
                        {/* <label for="inputText" className="common-input-label">Employee ID</label> */}
                        <CustomInput
                          className={`form-control ${
                            touched.noOfInstallment && errors.noOfInstallment
                              ? "is-invalid"
                              : ""
                          }`}
                          type="text"
                          label="No Of Installments"
                          id="noOfInstallment"
                          name="noOfInstallment"
                          value={values.noOfInstallment}
                            onChange={(e) => {
                              const inputValue = e.target.value;
                              // Check if the input is a valid number
                              if (!isNaN(inputValue)) {
                                // Check if the length is less than or equal to 10
                                if (inputValue.length <= 10) {
                                  // Update the value if it's a number and within the limit
                                  handleChange(e);
                                }
                                // Ignore the input if the length exceeds 10
                              }
                              // Ignore the input if it's not a number
                            }}
                          onBlur={handleBlur}
                          inputError={errors.noOfInstallment}
                        />
                          <span className="text-danger">{errors.noOfInstallment}</span>
                      </div>
                    </div>
                    ) : null}
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
              // validationSchema={Yup.object().shape({})}
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

export default WithUserPermission(AdvancePayments);
