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
} from "../../services/api_functions";
import ResponseModal from "../../components/ResponseModal";

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

  const [initVal, setInitVal] = useState("");
  const [Bankaccmodal, setBankaccmodal] = useState(false);
  const [SundryCreditorLst, setSundryCreditorLst] = useState([]);
  const [CashAcbankLst, setCashAcbankLst] = useState([]);
  const [resLst, setresLst] = useState([]);

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
    getAdvancePaymentsList({ yearMonth: "" });
  }, []);

  // List API Function
  const getAdvancePaymentsList = (values) => {
    let resquestdata = {
      yearMonth: values.yearMonth || "",
    };
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


  return (
    <div>
      <ResponseModal
        isOpen={ResModal}
        onRequestClose={closeModal}
        onConfirm={() => handleConfirmSubmit()}
        text={`${ResText}`}
        LogoType={`${LogoType}`}
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
                    <th className="table-th text-light">Leave To</th>
                    <th className="table-th text-light">Total Days</th>
                    <th className="table-th text-light">Leave Status</th>
                    <th className="table-th text-light">Created Dt.</th>
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
                        <td>{v.leaveTo}</td>
                        <td>{v.totalDays}</td>
                        <td>{v.status}</td>
                        <td>{moment(v.created_at).format("DD-MM-yyyy")}</td>
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

    </div>
  );
}

export default WithUserPermission(LeaveReport);
