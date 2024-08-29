import React, { useEffect } from "react";
import AddBtn from "../../../../assets/images/MenuButton.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Col, Row, Table, Button, Form as BootForm } from "react-bootstrap";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import CustomInput from "../../../../components/CustomInputs";
import CustomToggleSwitch from "../../../../components/CustomToggleSwitch";
import CustomSelect from "../../../../components/CustomSelect";
import { useState } from "react";
import {
  Table as materialuichatable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import ResponseModal from "../../../../components/ResponseModal";

export default function Step2(props) {
  const location = useLocation();
  const pathArray = location.pathname.split("/"); // Split the path into an array
  const name = pathArray[pathArray.length - 1]; // Get the last element of the array

  // const pathArray = props.location.pathname.split("/"); // Split the path into an array
  // const name = pathArray[pathArray.length - 1]; // Get the last element of the array

  const searchText = [];
  const filteredData = [];
  const {
    values,
    handleChange,
    errors,
    setFieldValue,
    addReferenceList,
    referencelist,
    removeReferenceList,
    onBlur,
  } = props;

  const navigate = useNavigate();
  const [openRow, setOpenRow] = useState(null);
  const [ResModal, setResModal] = useState(false);
  const [ResText, setResText] = useState("");
  const [LogoType, setLogoType] = useState("");
  const [deptList, setdeptList] = useState([]);
  const [Submitting, setSubmitting] = useState([]);

  useEffect(() => {
    // This effect will run whenever resText changes
    if (ResText) {
      // Check if ResText is not empty, and then open the modal
      setResModal(true);
    }
  }, [ResText]);

  // Function to open the modal
  const openModal = (text, logo_type) => {
    // Update the state to set the text
    setLogoType(logo_type);
    setResText(text);
  };

  // Function to close the modal
  const closeModal = () => {
    setResModal(false);
    setResText("")
    // navigate("/Dashboard/Tranx/ledger");
  };

  // Function to handle form submission with confirmation
  const handleConfirmSubmit = () => {
    // handleSubmit();
    closeModal(); // Close the modal after submission
  };

  return (
    <div className="cntnr" style={{ height: "840px" }}>
      {/* Your existing content goes here */}

      {/* Reusable Modal */}
      <ResponseModal
        isOpen={ResModal}
        onRequestClose={closeModal}
        onConfirm={() => handleConfirmSubmit()}
        text={`${ResText}`}
        LogoType={`${LogoType}`}
      />
      <div
        style={{ overflow: "auto", maxHeight: "810px", overflowX: "hidden", scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div>
          {/* Reference Details */}
          <div className="row mt-3">
            <div className="row ">
              <div
                className="col-lg-2 subText"
                // style={{ width: "1798px", height: "18px", flexShrink: "0" }}
              >
                Reference Details
              </div>
              <div className="col-lg-10">
                <hr className="strHr"></hr>
              </div>
            </div>
            <div className="row mt-3 rowLay-employee">
              <div className="col-lg-2">
                <CustomInput
                  label="Name"
                  className={`form-control ${errors.r_name ? "is-invalid" : ""
                    }`}
                  // className={`form-control`}
                  type="text"
                  id="r_name"
                  placeholder="Enter Name"
                  name="r_name"
                  value={values.r_name}
                  invalid={errors.r_name ? true : false}
                  onChange={handleChange}
                  inputError={errors.r_name}
                  onBlur={onBlur}
                />
              </div>
              <div className="col-lg-4">
                <CustomInput
                  label="Address"
                  // className={`form-control ${touched.companyCode && errors.companyCode ? 'is-invalid' : ''}`}
                  className={`form-control`}
                  type="text"
                  id="r_address"
                  placeholder="Enter Address"
                  name="r_address"
                  value={values.r_address}
                  invalid={errors.r_address ? true : false}
                  onChange={handleChange}
                  inputError={errors.r_address}
                  onBlur={onBlur}
                />
              </div>

              <div className="col-lg-2">
                <CustomInput
                  label="Business"
                  // className={`form-control ${touched.companyCode && errors.companyCode ? 'is-invalid' : ''}`}
                  className={`form-control`}
                  type="text"
                  id="r_business"
                  placeholder="Enter eBusiness"
                  name="r_business"
                  value={values.r_business}
                  invalid={errors.r_business ? true : false}
                  onChange={handleChange}
                  inputError={errors.r_business}
                  onBlur={onBlur}
                />
              </div>

              <div className="col-lg-2">
                <CustomInput
                  label="Mobile Number"
                  // className={`form-control ${touched.companyCode && errors.companyCode ? 'is-invalid' : ''}`}
                  className={`form-control`}
                  type="text"
                  id="r_mobileNumber"
                  placeholder="Enter mobile"
                  name="r_mobileNumber"
                  value={values.r_mobileNumber}
                  invalid={errors.r_mobileNumber ? true : false}
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
                  inputError={errors.r_mobileNumber}
                  onBlur={onBlur}
                />
              </div>

              <div className="col-lg-2">
                <Button
                  type="button"
                  className="add_btn"
                  onClick={(e) => {
                    e.preventDefault();
                    if (
                      values.r_name != "NA" && values.r_name != "" &&
                      values.r_address != "NA" && values.r_address != "" &&
                      values.r_business != "NA" && values.r_business != "" &&
                      values.r_mobileNumber != "NA" && values.r_mobileNumber != ""
                    ) {
                      addReferenceList(
                        {
                          r_name: values.r_name,
                          r_address: values.r_address,
                          r_business: values.r_business,
                          r_mobileNumber: values.r_mobileNumber,
                        },
                        setFieldValue
                      );
                    } else {
                      openModal("Please give inputs", "error");
                    }
                  }}
                >
                  Add
                </Button>
              </div>
            </div>
          </div>
          {referencelist.length > 0 && (
            <div className="row mt-3">
              <div className="col-lg-12">
                <TableContainer component={Paper} className="mt-2">
                  <materialuichatable aria-label="simple table">
                    <TableHead className="" style={{ background: "#f9f9f9" }}>
                      <TableRow className="orderdetail-tbl">
                        <TableCell className="p-1">Name</TableCell>
                        <TableCell className="p-1">Address</TableCell>
                        <TableCell className="p-1">Business</TableCell>
                        <TableCell className="p-1">Mobile No.</TableCell>
                        <TableCell className="p-1">Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody
                      className="prescriptiontable"
                      style={{
                        width: "320px",
                        height: "80px",
                        overflow: "auto", scrollbarWidth: "none", msOverflowStyle: "none"
                      }}
                    >
                      {referencelist &&
                        referencelist.map((v, key) => (
                          <TableRow key={key}>
                            <TableCell>{v.name}</TableCell>
                            <TableCell>{v.address}</TableCell>
                            <TableCell>{v.business}</TableCell>
                            <TableCell>{v.mobileNumber}</TableCell>
                            <TableCell>
                              <Button
                                className="mainbtnminus add_btn"
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  removeReferenceList(key);
                                }}
                              >
                                Remove
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </materialuichatable>
                </TableContainer>
              </div>
            </div>
          )}

          {/* Background Verification */}
          {/* <div className="row mt-3">
            <div className="row ">
              <div
                className="col-lg-2 subText"
                // style={{ width: "1798px", height: "18px", flexShrink: "0" }}
              >
                Background Verification
              </div>
              <div className="col-lg-10">
                <hr className="strHr"></hr>
              </div>
            </div>
            <div className="row mt-3  rowLay-employee">
              <CustomToggleSwitch
                label="Emp Of Generation"
                className={`form-control`}
                // className={`form-control ${touched.empOfGeneration && errors.empOfGeneration ? 'is-invalid' : ''}`}
                id="empOfGeneration"
                name="empOfGeneration"
                checked={
                  values.empOfGeneration == true
                    ? values.empOfGeneration
                    : false
                }
                value={values.empOfGeneration}
                onChange={() =>
                  setFieldValue("empOfGeneration", !values.empOfGeneration)
                }
                // onBlur={handleBlur}
              />
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
