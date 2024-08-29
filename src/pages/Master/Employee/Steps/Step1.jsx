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
import { Image } from "react-bootstrap";
import {
  Table as materialuichatable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Input,
} from "@material-ui/core";
import { truncateString, getSelectValue } from "@/helpers";
import ResponseModal from "../../../../components/ResponseModal";

export default function Step1(props) {
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
    //Family Details
    addFamilyList,
    familylist,
    removeFamilyList,
    //Education Details
    addEducationList,
    educationlist,
    removeEducationList,
    //Document List
    document_opt,
    //Document Details
    addDocumentList,
    documentlist,
    removeDocumentList,
    removeOldDocument,
    oldDocumentList,
    onBlur,
    genderOpt,
    maritalstatusOpt,
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
          <div className="row mt-2">
            <div
              className="col-lg-2 subText"
              // style={{ width: "1798px", height: "18px", flexShrink: "0" }}
            >
              Personal Information
            </div>
            <div className="col-lg-10">
              <hr className="strHr"></hr>
            </div>
          </div>

          <div className="row mt-3 rowLay-employee">
            <div className="col-lg-2">
              <CustomInput
                label="Firstname"
                className={`form-control ${
                  errors.firstName ? "is-invalid" : ""
                }`}
                type="text"
                id="firstName"
                placeholder="Enter First Name"
                name="firstName"
                value={values.firstName}
                invalid={errors.firstName ? true : false}
                onChange={handleChange}
                inputError={errors.firstName}
                onBlur={onBlur}
              />
            </div>

            <div className="col-lg-2">
              <CustomInput
                label="Middlename"
                className={`form-control ${
                  errors.middleName ? "is-invalid" : ""
                }`}
                type="text"
                id="middleName"
                placeholder="Enter Middle Name"
                name="middleName"
                value={values.middleName}
                invalid={errors.middleName ? true : false}
                onChange={handleChange}
                inputError={errors.middleName}
                onBlur={onBlur}
              />
            </div>

            <div className="col-lg-2">
              <CustomInput
                label="lastname"
                className={`form-control ${
                  errors.lastName ? "is-invalid" : ""
                }`}
                type="text"
                id="lastName"
                placeholder="Enter Last Name"
                name="lastName"
                value={values.lastName}
                invalid={errors.lastName ? true : false}
                onChange={handleChange}
                inputError={errors.lastName}
                onBlur={onBlur}
              />
            </div>
            <div className="col-lg-2">
              <CustomInput
                label="Mobile Number"
                className={`form-control ${
                  errors.mobileNumber ? "is-invalid" : ""
                }`}
                type="number"
                id="mobileNumber"
                placeholder="Mobile Number"
                name="mobileNumber"
                value={values.mobileNumber}
                invalid={errors.mobileNumber ? true : false}
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
                inputError={errors.mobileNumber}
                onBlur={onBlur}
              />
            </div>
            <div className="col-lg-2">
              <CustomDateInputs
                label="DOB"
                className={`form-control ${errors.dob ? "is-invalid" : ""}`}
                type="date"
                id="dob"
                placeholder="dob"
                name="dob"
                value={values.dob}
                invalid={errors.dob ? true : false}
                onChange={handleChange}
                inputError={errors.dob}
                onBlur={onBlur}
              />
            </div>
            <div className="col-lg-2">
              <div class="textOnInput">
                <CustomSelect
                  label="Gender"
                  placeholder="Select Gender"
                  className={`form-control ${
                    errors.gender ? "is-invalid" : ""
                  }`}
                  id="gender"
                  name="gender"
                  data={genderOpt}
                  value={values.gender}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="row mt-4 rowLay-employee">
            <div className="col-lg-2">
              <CustomInput
                label="Height"
                // className={`form-control ${touched.companyCode && errors.companyCode ? 'is-invalid' : ''}`}
                className={`form-control`}
                type="text"
                id="height"
                placeholder="height"
                name="height"
                value={values.height}
                invalid={errors.height ? true : false}
                onChange={handleChange}
                inputError={errors.height}
                onBlur={onBlur}
              />
            </div>

            <div className="col-lg-2">
              <CustomInput
                label="Weight"
                // className={`form-control ${touched.companyCode && errors.companyCode ? 'is-invalid' : ''}`}
                className={`form-control`}
                type="text"
                id="weight"
                placeholder="weight"
                name="weight"
                value={values.weight}
                invalid={errors.weight ? true : false}
                onChange={handleChange}
                inputError={errors.weight}
                onBlur={onBlur}
              />
            </div>

            <div className="col-lg-2">
              <CustomInput
                label="Blood Group"
                // className={`form-control ${touched.companyCode && errors.companyCode ? 'is-invalid' : ''}`}
                className={`form-control`}
                type="text"
                id="bloodGroup"
                placeholder="bloodGroup"
                name="bloodGroup"
                value={values.bloodGroup}
                invalid={errors.bloodGroup ? true : false}
                onChange={handleChange}
                inputError={errors.bloodGroup}
                onBlur={onBlur}
              />
            </div>

            <div className="col-lg-2">
              <div class="textOnInput">
                <CustomSelect
                  label="Marital status"
                  placeholder="Enter Marital status"
                  className={`form-control ${errors.maritalStatus
                    ? "is-invalid"
                    : ""
                    }`}
                  id="maritalStatus"
                  name="maritalStatus"
                  data={maritalstatusOpt}
                  value={values.maritalStatus}
                  onChange={handleChange}
                // onBlur={handleBlur}
                />
              </div>
            </div>

            <div className="col-lg-2">
              <CustomInput
                label="Religion"
                // className={`form-control ${touched.companyCode && errors.companyCode ? 'is-invalid' : ''}`}
                className={`form-control`}
                type="text"
                id="religion"
                placeholder="Religion"
                name="religion"
                value={values.religion}
                invalid={errors.religion ? true : false}
                onChange={handleChange}
                inputError={errors.religion}
                onBlur={onBlur}
              />
            </div>
            <div className="col-lg-2">
              <CustomInput
                label="Cast"
                // className={`form-control ${touched.companyCode && errors.companyCode ? 'is-invalid' : ''}`}
                className={`form-control`}
                type="text"
                id="cast"
                placeholder="Cast"
                name="cast"
                value={values.cast}
                invalid={errors.cast ? true : false}
                onChange={handleChange}
                inputError={errors.cast}
                onBlur={onBlur}
              />
            </div>
          </div>

          <div className="row mt-4 rowLay-employee">
            <div className="col-lg-2">
              <CustomInput
                label="Present Address"
                className={`form-control ${
                  errors.presentAddress ? "is-invalid" : ""
                }`}
                type="text"
                id="presentAddress"
                placeholder="Present Address"
                name="presentAddress"
                value={values.presentAddress}
                invalid={errors.presentAddress ? true : false}
                onChange={handleChange}
                inputError={errors.presentAddress}
                onBlur={onBlur}
              />
            </div>

            <div className="col-lg-2">
              <CustomInput
                label="Permanent Address"
                // className={`form-control ${touched.companyCode && errors.companyCode ? 'is-invalid' : ''}`}
                className={`form-control`}
                type="text"
                id="permanentAddress"
                placeholder="Permanent Address"
                name="permanentAddress"
                value={values.permanentAddress}
                invalid={errors.permanentAddress ? true : false}
                onChange={handleChange}
                inputError={errors.permanentAddress}
                onBlur={onBlur}
              />
            </div>

            <div className="col-lg-2">
              <CustomInput
                label="Correspondance address"
                // className={`form-control ${touched.companyCode && errors.companyCode ? 'is-invalid' : ''}`}
                className={`form-control`}
                type="text"
                id="correspondenceAddress"
                placeholder="Correspondance address"
                name="correspondenceAddress"
                value={values.correspondenceAddress}
                invalid={errors.correspondenceAddress ? true : false}
                onChange={handleChange}
                inputError={errors.correspondenceAddress}
                onBlur={onBlur}
              />
            </div>

            <div className="col-lg-2">
              <CustomInput
                label="Reason for joining"
                // className={`form-control ${touched.companyCode && errors.companyCode ? 'is-invalid' : ''}`}
                className={`form-control`}
                type="text"
                id="reasonToJoin"
                placeholder="Reason for joining"
                name="reasonToJoin"
                value={values.reasonToJoin}
                invalid={errors.reasonToJoin ? true : false}
                onChange={handleChange}
                inputError={errors.reasonToJoin}
                onBlur={onBlur}
              />
            </div>
            <div className="col-lg-2">
              <CustomToggleSwitch
                label="Hobbies"
                // className={`form-control ${touched.name && errors.name ? 'is-invalid' : ''}`}
                className={`form-control`}
                id="hobbies"
                name="hobbies"
                checked={values.hobbies == true ? values.hobbies : false}
                value={values.hobbies}
                onChange={() => setFieldValue("hobbies", !values.hobbies)}
                onBlur={onBlur}
              />
            </div>
          </div>

          {/* Family Details */}
          <div className="row mt-3">
            <div className="row ">
              <div
                className="col-lg-2 subText"
                // style={{ width: "1798px", height: "18px", flexShrink: "0" }}
              >
                Family Details
              </div>
              <div className="col-lg-10">
                <hr className="strHr"></hr>
              </div>
            </div>
            <div className="row mt-3 rowLay-employee">

              <div className="col-lg-3">
                <CustomInput
                  label="Full name"
                  // className={`form-control ${touched.companyCode && errors.companyCode ? 'is-invalid' : ''}`}
                  className={`form-control`}
                  type="text"
                  id="f_fullName"
                  placeholder="Enter full name"
                  name="f_fullName"
                  value={values.f_fullName}
                  invalid={errors.f_fullName ? true : false}
                  onChange={handleChange}
                  inputError={errors.f_fullName}
                  onBlur={onBlur}
                />
              </div>

              <div className="col-lg-2">
                <CustomDateInputs
                  label="DOB"
                  className={`form-control $ errors.companyCode ? 'is-invalid' : ''}`}
                  type="date"
                  id="f_dob"
                  placeholder="Enter DOB"
                  name="f_dob"
                  value={values.f_dob}
                  invalid={errors.f_dob ? true : false}
                  onChange={handleChange}
                  inputError={errors.f_dob}
                  onBlur={onBlur}
                />
              </div>

              <div className="col-lg-2">
                <CustomInput
                  label="Relation"
                  className={`form-control ${errors.f_relation ? "is-invalid" : ""
                    }`}
                  // className={`form-control`}
                  type="text"
                  id="f_relation"
                  placeholder="Enter Relation"
                  name="f_relation"
                  value={values.f_relation}
                  invalid={errors.f_relation ? true : false}
                  onChange={handleChange}
                  inputError={errors.f_relation}
                  onBlur={onBlur}
                />
              </div>

              <div className="col-lg-2">
                <CustomInput
                  label="Education"
                  // className={`form-control ${touched.companyCode && errors.companyCode ? 'is-invalid' : ''}`}
                  className={`form-control`}
                  type="text"
                  id="f_education"
                  placeholder="Enter Eduction"
                  name="f_education"
                  value={values.f_education}
                  invalid={errors.f_education ? true : false}
                  onChange={handleChange}
                  inputError={errors.f_education}
                  onBlur={onBlur}
                />
              </div>
              <div className="col-lg-1">
                <Button
                  type="button"
                  className="add_btn"
                  onClick={(e) => {
                    e.preventDefault();
                    if (
                      values.f_fullName != "NA" && values.f_fullName != "" &&
                      values.f_dob != "NA" && values.f_dob != "" &&
                      values.f_relation != "NA" && values.f_relation != "" &&
                      values.f_education != "NA" && values.f_education != ""
                    ) {
                      addFamilyList(
                        {
                          f_fullName: values.f_fullName,
                          f_relation: values.f_relation,
                          f_dob: values.f_dob,
                          f_education: values.f_education,
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
          {familylist.length > 0 && (
            <div className="row mt-3">
              <div className="col-lg-12">
                <TableContainer component={Paper} className="mt-2">
                  <materialuichatable aria-label="simple table">
                    <TableHead className="" style={{ background: "#f9f9f9" }}>
                      <TableRow className="orderdetail-tbl">
                        <TableCell className="p-1">Name</TableCell>
                        <TableCell className="p-1">Date of Birth</TableCell>
                        <TableCell className="p-1">Relation</TableCell>
                        <TableCell className="p-1">Education</TableCell>
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
                      {familylist &&
                        familylist.map((v, key) => (
                          <TableRow key={key}>
                            <TableCell>{v.fullName}</TableCell>
                            <TableCell>{v.dob}</TableCell>
                            <TableCell>{v.relation}</TableCell>
                            <TableCell>{v.education}</TableCell>
                            <TableCell>
                              <Button
                                className="add_btn"
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  removeFamilyList(key);
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

          {/* Emergency Contact */}
          <div className="row mt-3 inputCheckLabel ">
            <div id="label" className="subText">
              Emergency Contact
            </div>

            {/* <div
              id="check"
            >
              <BootForm.Check
                name="emergencyContact"
                checked={values.emergencyContact}
                onChange={(e) => {
                  setFieldValue("chooseFromFamilyDet", e.target.checked)
                  if (e.target.checked == true) {
                    setFieldValue("relationFromEmerCont", values.relation)
                  } else {
                    setFieldValue("relationFromEmerCont", "")
                  }

                }}
              ></BootForm.Check></div>
            <div
              id="label2"
            >(choose from family details)</div> */}

            <div className="col-lg-10">
              <hr className="strHr"></hr>
            </div>
          </div>

          <div className="row mt-3 rowLay-employee">
            <div className="col-lg-2">
              <CustomInput
                label="Relation"
                className={`form-control ${errors.emergencyRelation ? 'is-invalid' : ''}`}
                // className={`form-control`}
                type="text"
                id="emergencyRelation"
                placeholder="Enter Relation"
                name="emergencyRelation"
                value={values.emergencyRelation}
                invalid={errors.emergencyRelation ? true : false}
                onChange={handleChange}
                inputError={errors.emergencyRelation}
                onBlur={onBlur}
              />
            </div>
            <div className="col-lg-2">
              <CustomInput
                label="Contact Number"
                className={`form-control ${errors.emergencyContact ? 'is-invalid' : ''}`}
                // className={`form-control`}
                type="text"
                id="emergencyContact"
                placeholder="Enter Contact Number"
                name="emergencyContact"
                value={values.emergencyContact}
                invalid={errors.emergencyContact ? true : false}
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
                inputError={errors.emergencyContact}
                onBlur={onBlur}
              />
            </div>
          </div>

          {/* Documents */}

          <div className="row mt-3">
            <div id="label" className="subText">
              Documents
            </div>
            <div className="row mt-4 rowLay-employee">
              {document_opt.length > 0 && (
                <div className="">
                  {/* <h6 className="mt-4">REQUIRED DOCUMENTS : &nbsp;</h6> */}
                  <div>
                    <ul className="documentdet">
                      {document_opt.map((v) => {
                        if (v.required == true) {
                          return <li className="bg-success">{v.label}</li>;
                        }
                      })}
                    </ul>
                  </div>
                </div>
              )}
              <div className="col-lg-2">
                <div class="textOnInput">
                  <CustomSelect
                    label="Document"
                    // className={`form-control ${touched.companyCode && errors.companyCode ? 'is-invalid' : ''}`}
                    className={`form-control`}
                    type="text"
                    id="d_documentId"
                    placeholder="Enter Document"
                    name="d_documentId"
                    value={values.d_documentId}
                    data={document_opt}
                    invalid={errors.d_documentId ? true : false}
                    onChange={handleChange}
                    inputError={errors.d_documentId}
                    onBlur={onBlur}
                  />
                </div>
              </div>
              <div className="col-lg-3">
                <Input
                  type="file"
                  id="d_imagePath"
                  name="d_imagePath"
                  className="custom-file-input"
                  onChange={(e) => {
                    setFieldValue("d_imagePath", e.target.files[0]);
                  }}
                />

                <label className="custom-file-label" htmlFor="d_imagePath">
                  {values.d_imagePath ? "FILE SELECTED" : "Upload Document"}
                </label>
              </div>
              <div className="col-lg-2">
                <Button
                  className="add_btn-doc"
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    if (values.d_documentId != "" && values.d_imagePath != "") {
                      addDocumentList(
                        {
                          // d_documentId:
                          //   document_opt[parseInt(values.d_documentId) - 1],
                          d_documentId: values.d_documentId,
                          d_imagePath: values.d_imagePath,
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
          {oldDocumentList && oldDocumentList.length > 0 && (
            <div className="row mt-3">
              <div className="col-lg-12">
                <h5>Old Documents</h5>
                <TableContainer component={Paper}>
                  <materialuichatable aria-label="simple table">
                    <TableHead className="" style={{ background: "#f9f9f9" }}>
                      <TableRow className="orderdetail-tbl">
                        <TableCell className="p-1">Document Name</TableCell>
                        <TableCell className="p-1">Document</TableCell>
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
                      {oldDocumentList &&
                        oldDocumentList.map((v, key) => (
                          <TableRow key={key}>
                            <TableCell>
                              {v.d_documentId ? v.d_documentId.label : ""}
                            </TableCell>

                            <TableCell>
                              {v.imagePath ? v.imagePath : ""}
                              {/* <Image src={v.imagePath} width="10%" height="10%" /> */}
                            </TableCell>

                            <TableCell>
                              <Button
                                className="add_btn"
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  removeOldDocument(key);
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
          {documentlist.length > 0 && (
            <div className="row mt-3">
              <div className="col-lg-12">
                <TableContainer component={Paper}>
                  <materialuichatable aria-label="simple table">
                    <TableHead
                      className="p-1"
                      style={{ background: "#f9f9f9" }}
                    >
                      <TableRow className="orderdetail-tbl">
                        <TableCell className="p-1">Document Name</TableCell>
                        <TableCell className="p-1">Document</TableCell>
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
                      {documentlist &&
                        documentlist.map((v, key) => (
                          <TableRow key={key}>
                            <TableCell>
                              {/* {JSON.stringify(getSelectValue(document_opt, parseInt(v.d_documentId)))} */}
                              {getSelectValue(document_opt, parseInt(v.d_documentId))?.label}
                              {/* {v.d_documentId ? JSON.stringify(getSelectValue(document_opt, parseInt(v.d_documentId))) : ""} */}
                            </TableCell>

                            <TableCell>
                              {/* {console.log("v", v)} */}
                              {/* {JSON.stringify(v)} */}
                              {v.imagePath instanceof File ? truncateString(v.imagePath.name, 20) : ""}
                              {v.imagePath instanceof String && (
                                <a href={v.imagePath} target="_blank">
                                  Download Document
                                </a>)}
                              {/* {v.imagePath.name != undefined ? (
                                <a href={v.imagePath} target="_blank">
                                  Download Document
                                </a>
                              ) : v.imagePath ? (
                                truncateString(v.imagePath.name, 20)
                              ) : (
                                "-"
                              )} */}
                            </TableCell>

                            <TableCell>
                              <Button
                                className="add_btn"
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  removeDocumentList(key);
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

          {/* Education Details */}
          <div className="row mt-3">
            <div id="label" className="subText">
              Education Details
            </div>
            <div className="row mt-4 rowLay-employee-last-row">
              <div className="col-lg-2">
                <CustomInput
                  label="Instititute Name"
                  // className={`form-control ${touched.companyCode && errors.companyCode ? 'is-invalid' : ''}`}
                  className={`form-control`}
                  type="text"
                  id="e_university"
                  placeholder="Enter Instititute Name"
                  name="e_university"
                  value={values.e_university}
                  invalid={errors.e_university ? true : false}
                  onChange={handleChange}
                  inputError={errors.e_university}
                  onBlur={onBlur}
                />
              </div>
              <div className="col-lg-2">
                <CustomInput
                  label="Qualification"
                  // className={`form-control ${touched.companyCode && errors.companyCode ? 'is-invalid' : ''}`}
                  className={`form-control`}
                  type="text"
                  id="e_qualification"
                  placeholder="Enter Qualification"
                  name="e_qualification"
                  value={values.e_qualification}
                  invalid={errors.e_qualification ? true : false}
                  onChange={handleChange}
                  inputError={errors.e_qualification}
                  onBlur={onBlur}
                />
              </div>
              <div className="col-lg-2">
                <CustomInput
                  label="University Name"
                  // className={`form-control ${touched.companyCode && errors.companyCode ? 'is-invalid' : ''}`}
                  className={`form-control`}
                  type="text"
                  id="e_institutionName"
                  placeholder="Enter University Name"
                  name="e_institutionName"
                  value={values.e_institutionName}
                  invalid={errors.e_institutionName ? true : false}
                  onChange={handleChange}
                  inputError={errors.e_institutionName}
                  onBlur={onBlur}
                />
              </div>
              <div className="col-lg-2">
                <CustomInput
                  label="year"
                  // className={`form-control ${touched.companyCode && errors.companyCode ? 'is-invalid' : ''}`}
                  className={`form-control`}
                  type="text"
                  id="e_year"
                  placeholder="Enter Year"
                  name="e_year"
                  value={values.e_year}
                  invalid={errors.e_year ? true : false}
                  onChange={handleChange}
                  inputError={errors.e_year}
                  onBlur={onBlur}
                />
              </div>
              <div className="col-lg-2">
                <CustomInput
                  label="Grade"
                  // className={`form-control ${touched.companyCode && errors.companyCode ? 'is-invalid' : ''}`}
                  className={`form-control`}
                  type="text"
                  id="e_grade"
                  placeholder="Enter Grade"
                  name="e_grade"
                  value={values.e_grade}
                  invalid={errors.e_grade ? true : false}
                  onChange={handleChange}
                  inputError={errors.e_grade}
                  onBlur={onBlur}
                />
              </div>
              <div className="col-lg-2">
                <CustomInput
                  label="Percentage"
                  // className={`form-control ${touched.companyCode && errors.companyCode ? 'is-invalid' : ''}`}
                  className={`form-control`}
                  type="text"
                  id="e_percentage"
                  placeholder="Enter Percentage"
                  name="e_percentage"
                  value={values.e_percentage}
                  invalid={errors.e_percentage ? true : false}
                  onChange={handleChange}
                  inputError={errors.e_percentage}
                  onBlur={onBlur}
                />
              </div>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-lg-12">
              <div className="col-lg-1">
                <Button
                  type="button"
                  className="add_btn"
                  onClick={(e) => {
                    e.preventDefault();
                    if (
                      values.e_institutionName != "" && values.e_institutionName != "NA" &&
                      values.e_qualification != "" && values.e_qualification != "NA" &&
                      values.e_university != "" && values.e_university != "NA" &&
                      values.e_year != "" && values.e_year != "NA" &&
                      values.e_grade != "" && values.e_grade != "NA" &&
                      values.e_percentage != "" && values.e_percentage != "NA"
                    ) {
                      addEducationList(
                        {
                          e_institutionName: values.e_institutionName,
                          e_qualification: values.e_qualification,
                          e_university: values.e_university,
                          e_year: values.e_year == "NA" ? 0 : values.e_year,
                          e_grade: values.e_grade,
                          e_percentage: values.e_percentage,
                        },
                        setFieldValue
                      );
                    } else {
                      openModal("Please give inputs", "error");
                    }
                  }}
                >
                  Add
                  {/* <i className="mdi mdi-plus"></i> */}
                </Button>
              </div>
              {educationlist.length > 0 && (
                <TableContainer component={Paper} className="mt-2">
                  <materialuichatable aria-label="simple table">
                    <TableHead className="" style={{ background: "#f9f9f9" }}>
                      <TableRow className="orderdetail-tbl">
                        <TableCell className="p-1">Institute Name</TableCell>
                        <TableCell className="p-1">Qualification</TableCell>
                        <TableCell className="p-1">University Name</TableCell>
                        <TableCell className="p-1">Year</TableCell>
                        <TableCell className="p-1">Grade</TableCell>
                        <TableCell className="p-1">Percentage</TableCell>
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
                      {educationlist &&
                        educationlist.map((v, key) => (
                          <TableRow key={key}>
                            <TableCell>{v.institutionName}</TableCell>
                            <TableCell>{v.qualification}</TableCell>
                            <TableCell>{v.university}</TableCell>
                            <TableCell>{v.year}</TableCell>
                            <TableCell>{v.grade}</TableCell>
                            <TableCell>{v.percentage}</TableCell>
                            <TableCell>
                              <Button
                                className="add_btn"
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  removeEducationList(key);
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
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
