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
import CustomDateInputs from "../../../../components/CustomDateInputs";
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

export default function Step3(props) {
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
    addExperienceList,
    removeExperienceList,
    experiencelist,
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
          {/* Background Verification */}
          <div className="row mt-3">
            <div className="row ">
              <div
                className="col-lg-2 subText"
                // style={{ width: "1798px", height: "18px", flexShrink: "0" }}
              >
                Experience Information
              </div>
              <div className="col-lg-10">
                <hr className="strHr"></hr>
              </div>
            </div>
            <div className="row mt-3 rowLay-employee-step3">
              <CustomToggleSwitch
                label="Have any experience"
                className={`form-control`}
                // className={`form-control ${touched.isExperienceEmployee && errors.isExperienceEmployee ? 'is-invalid' : ''}`}
                id="isExperienceEmployee"
                name="isExperienceEmployee"
                checked={values.isExperienceEmployee == true ? values : false}
                value={values.isExperienceEmployee}
                onChange={() =>
                  setFieldValue(
                    "isExperienceEmployee",
                    !values.isExperienceEmployee
                  )
                }
                // onBlur={handleBlur}
              />
              {values.isExperienceEmployee == true ? (
                <div className="col-lg-2">
                  <div class="textOnInput">
                    <CustomInput
                      label="Company Name"
                      className={`form-control ${
                        errors.experience_companyName ? "is-invalid" : ""
                      }`}
                      type="text"
                      id="experience_companyName"
                      name="experience_companyName"
                      value={values.experience_companyName}
                      onChange={handleChange}
                      // onBlur={handleBlur}
                    />
                  </div>
                </div>
              ) : null}
              {values.isExperienceEmployee == true ? (
                <div className="col-lg-2">
                  <div class="textOnInput">
                    <CustomDateInputs
                      label="From Month Year"
                      className={`form-control ${
                        errors.experience_fromMonthYear ? "is-invalid" : ""
                      }`}
                      type="month"
                      id="experience_fromMonthYear"
                      name="experience_fromMonthYear"
                      value={values.experience_fromMonthYear}
                      onChange={handleChange}
                      // onBlur={handleBlur}
                    />
                  </div>
                </div>
              ) : null}
              {values.isExperienceEmployee == true ? (
                <div className="col-lg-2">
                  <div class="textOnInput">
                    <CustomDateInputs
                      label="To Month Year"
                      className={`form-control ${
                        errors.experience_toMonthYear ? "is-invalid" : ""
                      }`}
                      type="month"
                      id="experience_toMonthYear"
                      name="experience_toMonthYear"
                      value={values.experience_toMonthYear}
                      onChange={handleChange}
                      // onBlur={handleBlur}
                    />
                  </div>
                </div>
              ) : null}
              {values.isExperienceEmployee == true ? (
                <div className="col-lg-2">
                  <div class="textOnInput">
                    <CustomInput
                      label="Designation Name"
                      className={`form-control ${
                        errors.experience_designationName ? "is-invalid" : ""
                      }`}
                      type="text"
                      id="experience_designationName"
                      name="experience_designationName"
                      value={values.experience_designationName}
                      onChange={handleChange}
                      // onBlur={handleBlur}
                    />
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          <div className="row mt-3">
            <div className="row mt-3 rowLay-employee-step3">
              {values.isExperienceEmployee == true ? (
                <div className="col-lg-2">
                  <div class="textOnInput">
                    <CustomInput
                      label="Last Drawn Salary"
                      className={`form-control ${
                        errors.experience_lastDrawnSalary ? "is-invalid" : ""
                      }`}
                      type="text"
                      id="experience_lastDrawnSalary"
                      name="experience_lastDrawnSalary"
                      value={values.experience_lastDrawnSalary}
                      onChange={handleChange}
                      // onBlur={handleBlur}
                    />
                  </div>
                </div>
              ) : null}
              {values.isExperienceEmployee == true ? (
                <div className="col-lg-2">
                  <div class="textOnInput">
                    <CustomInput
                      label="Reason to Resign"
                      className={`form-control ${
                        errors.experience_reasonToResign ? "is-invalid" : ""
                      }`}
                      type="text"
                      id="experience_reasonToResign"
                      name="experience_reasonToResign"
                      value={values.experience_reasonToResign}
                      onChange={handleChange}
                      // onBlur={handleBlur}
                    />
                  </div>
                </div>
              ) : null}
              {values.isExperienceEmployee == true ? (
                <div className="col-lg-2">
                  <Button
                    type="button"
                    className="add_btn"
                    onClick={(e) => {
                      e.preventDefault();
                      if (
                        values.experience_companyName != "" &&
                        values.experience_fromMonthYear != "" &&
                        values.experience_toMonthYear != "" &&
                        values.experience_designationName != "" &&
                        values.experience_lastDrawnSalary != "" &&
                        values.experience_reasonToResign != ""
                      ) {
                        addExperienceList(
                          {
                            experience_companyName:
                              values.experience_companyName,
                            experience_fromMonthYear:
                              values.experience_fromMonthYear,
                            experience_toMonthYear:
                              values.experience_toMonthYear,
                            experience_designationName:
                              values.experience_designationName,
                            experience_lastDrawnSalary:
                              values.experience_lastDrawnSalary,
                            experience_reasonToResign:
                              values.experience_reasonToResign,
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
              ) : null}
            </div>
          </div>
          {experiencelist.length > 0 && (
            <div className="row mt-3">
              <div className="row mt-3 rowLay-employee-step3-table">
                <TableContainer component={Paper} className="mt-2">
                  <materialuichatable aria-label="simple table">
                    <TableHead className="" style={{ background: "#f9f9f9" }}>
                      <TableRow className="orderdetail-tbl">
                        <TableCell className="p-1">Company Name</TableCell>
                        <TableCell className="p-1">From Month Year</TableCell>
                        <TableCell className="p-1">To Month Year</TableCell>
                        <TableCell className="p-1">Designation Name</TableCell>
                        <TableCell className="p-1">
                          Last Drawan Salary
                        </TableCell>
                        <TableCell className="p-1">Reason to Resign</TableCell>
                        <TableCell className="p-1">Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody
                      style={{
                        width: "320px",
                        height: "80px",
                        overflow: "auto", scrollbarWidth: "none", msOverflowStyle: "none"
                      }}
                    >
                      {experiencelist &&
                        experiencelist.map((v, key) => (
                          <TableRow key={key}>
                            <TableCell>{v.companyName}</TableCell>
                            <TableCell>{v.fromMonthYear}</TableCell>
                            <TableCell>{v.toMonthYear}</TableCell>
                            <TableCell>{v.designationName}</TableCell>
                            <TableCell>{v.lastDrawnSalary}</TableCell>
                            <TableCell>{v.reasonToResign}</TableCell>
                            <TableCell>
                              <Button
                                className="add_btn"
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  removeExperienceList(key);
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
        </div>
      </div>
    </div>
  );
}
