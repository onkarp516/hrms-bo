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

export default function Step4(props) {
  const location = useLocation();
  const pathArray = location.pathname.split("/"); // Split the path into an array
  const name = pathArray[pathArray.length - 1]; // Get the last element of the array
  // const pathArray = props.location.pathname.split("/"); // Split the path into an array
  // const name = pathArray[pathArray.length - 1]; // Get the last element of the array
  const {
    values,
    handleChange,
    errors,
    setFieldValue,
    addFamilyList,
    familylist,
    removeFamilyList,
    onBlur,
    company_opt,
    branch_opt,
    designation_opt,
    shift_opt,
    weeklyOffOpt,
    managers_opt,
    department_opt,
    wagesOpt
  } = props;

  const navigate = useNavigate();

  return (
    <div
      className="cntnr" style={{ height: "840px" }}

    >
      {/* Your existing content goes here */}
      <div style={{ maxHeight: "810px", overflowX: "hidden" }}>
        {/* <div> */}
        <div>
          {/* Other  Details */}
          <div className="row mt-3">
            <div className="row ">
              <div className="col-lg-2 subText"
              // style={{ width: "1798px", height: "18px", flexShrink: "0" }}
              >
                Other Information
              </div>
              <div className="col-lg-10">
                <hr className="strHr"></hr>
              </div>
            </div>
            <div className="row mt-3 rowLay-employee">
              <div className="col-lg-2">

                {/* <CustomInput
                  label="Company Name"
                  // className={`form-control ${touched.companyCode && errors.companyCode ? 'is-invalid' : ''}`}
                  className={`form-control`}
                  type="text"
                  id="company"

                  placeholder="Enter Company Name"
                  name="company"
                  value={values.company}
                  invalid={errors.company ? true : false}
                  onChange={handleChange}
                  inputError={errors.company}
                  onBlur={onBlur}
                /> */}
                <div class="textOnInput">
                  <CustomSelect
                    label="Company Name"
                    placeholder="Enter Company Name"
                    className={`form-control ${errors.branch
                      ? "is-invalid"
                      : ""
                      }`}
                    id="company"
                    name="company"
                    data={company_opt}
                    value={values.company}
                    onChange={handleChange}
                  />
                </div>

              </div>
              <div className="col-lg-2">
                <div class="textOnInput">
                  <CustomSelect
                    label="Branch"
                    placeholder="Enter Branch"
                    className={`form-control ${errors.branch
                      ? "is-invalid"
                      : ""
                      }`}
                    id="branch"
                    name="branch"
                    data={branch_opt}
                    value={values.branch}
                    onChange={handleChange}
                  />
                </div>

              </div>
              {console.log(values.designation)}
              <div className="col-lg-2">
                <div class="textOnInput">
                  <CustomSelect
                    label="Designation"
                    placeholder="Enter Designation"
                    className={`form-control ${errors.designation
                      ? "is-invalid"
                      : ""
                      }`}
                    id="designation"
                    name="designation"
                    data={designation_opt}
                    value={values.designation}
                    onChange={handleChange}
                  // onBlur={handleBlur}
                  />
                </div>

              </div>

              <div className="col-lg-2">
                <div class="textOnInput">
                  <CustomSelect
                    label="Shift"
                    placeholder="Enter Shift"
                    className={`form-control ${errors.shift
                      ? "is-invalid"
                      : ""
                      }`}
                    id="shift"
                    name="shift"
                    data={shift_opt}
                    value={values.shift}
                    onChange={handleChange}
                  // onBlur={handleBlur}
                  />
                </div>

              </div>

              <div className="col-lg-2">
                <div class="textOnInput">
                  <CustomSelect
                    label="Wage Type"
                    placeholder="Select Wage Type"
                    className={`form-control ${errors.WageType
                      ? "is-invalid"
                      : ""
                      }`}
                    id="WageType"
                    name="WageType"
                    data={wagesOpt}
                    value={values.WageType}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-lg-2">
                <div class="textOnInput">
                  <CustomSelect
                    label="Weekly off day"
                    placeholder="Enter Weekly off day"
                    className={`form-control ${errors.weeklyOffOpt
                      ? "is-invalid"
                      : ""
                      }`}
                    id="weekly"
                    name="weekly"
                    data={weeklyOffOpt}
                    value={values.weekly}
                    onChange={handleChange}
                  // onBlur={handleBlur}
                  />
                </div>

              </div>

            </div>

          </div>

          {/* Other  Details row-2 */}
          <div className="row mt-3 rowLay-employee">

            <div className="row mt-3">
              <div className="col-lg-2">

                <CustomInput
                  label="CTC(Monthly Pay)"
                  className={`form-control ${errors.expectedSalary ? 'is-invalid' : ''}`}
                  type="text"
                  id="expectedSalary"

                  placeholder="Enter CTC(Monthly Pay)"
                  name="expectedSalary"
                  value={values.expectedSalary}
                  invalid={errors.expectedSalary ? true : false}
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
                  inputError={errors.expectedSalary}
                  onBlur={onBlur}
                />

              </div>
              <div className="col-lg-2">
                <CustomDateInputs
                  label="DOJ(Date Of Joining)"
                  className={`form-control ${errors.doj ? 'is-invalid' : ''}`}
                  // className={`form-control`}
                  type="date"
                  id="doj"

                  placeholder="Enter DOJ"
                  name="doj"
                  value={values.doj}
                  invalid={errors.doj ? true : false}
                  onChange={handleChange}
                  inputError={errors.doj}
                  onBlur={onBlur}
                />

              </div>
              
              {/*
              <div className="col-lg-2">

                <CustomInput
                  label="Wages Per Day"
                  // className={`form-control ${touched.companyCode && errors.companyCode ? 'is-invalid' : ''}`}
                  className={`form-control`}
                  type="text"
                  id="WagesPerDay"

                  placeholder="Enter Wages Per Day"
                  name="WagesPerDay"
                  value={values.WagesPerDay}
                  invalid={errors.WagesPerDay ? true : false}
                  onChange={handleChange}
                  inputError={errors.WagesPerDay}
                  onBlur={onBlur}
                />
              </div> */}

              <div className="col-lg-2">

                <CustomInput
                  label="Bank Name"
                  // className={`form-control ${touched.companyCode && errors.companyCode ? 'is-invalid' : ''}`}
                  className={`form-control`}
                  type="text"
                  id="BankName"

                  placeholder="Enter Bank Name"
                  name="BankName"
                  value={values.BankName}
                  invalid={errors.BankName ? true : false}
                  onChange={handleChange}
                  inputError={errors.BankName}
                  onBlur={onBlur}
                />

              </div>

              <div className="col-lg-2">

                <CustomInput
                  label="Branch Name"
                  // className={`form-control ${touched.companyCode && errors.companyCode ? 'is-invalid' : ''}`}
                  className={`form-control`}
                  type="text"
                  id="BranchName"

                  placeholder="Enter Branch Name"
                  name="BranchName"
                  value={values.BranchName}
                  invalid={errors.BranchName ? true : false}
                  onChange={handleChange}
                  inputError={errors.BranchName}
                  onBlur={onBlur}
                />


              </div>

              <div className="col-lg-2">

                <CustomInput
                  label="Account Number"
                  // className={`form-control ${touched.companyCode && errors.companyCode ? 'is-invalid' : ''}`}
                  className={`form-control`}
                  type="text"
                  id="AccountNumber"

                  placeholder="Enter Account Number"
                  name="AccountNumber"
                  value={values.AccountNumber}
                  invalid={errors.AccountNumber ? true : false}
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    // Check if the input is a valid number
                    if (!isNaN(inputValue)) {
                      // Check if the length is less than or equal to 10
                      handleChange(e);
                      // Ignore the input if the length exceeds 10
                    }
                    // Ignore the input if it's not a number
                  }}
                  inputError={errors.AccountNumber}
                  onBlur={onBlur}
                />
              </div>
              <div className="col-lg-2">

                <CustomInput
                  label="IFSC Code"
                  // className={`form-control ${touched.companyCode && errors.companyCode ? 'is-invalid' : ''}`}
                  className={`form-control`}
                  type="text"
                  id="IFSC"

                  placeholder="Enter IFSC"
                  name="IFSC"
                  value={values.IFSC}
                  invalid={errors.IFSC ? true : false}
                  onChange={handleChange}
                  inputError={errors.IFSC}
                  onBlur={onBlur}
                />

              </div>
            </div>

          </div>

          {/* Other  Details row-2 */}
          <div className="row mt-3 rowLay-employee-last-row-step4">

            <div className="row mt-3">

              {/* <div className="col-lg-2">
                <CustomInput
                  label="PF Number"
                  // className={`form-control ${touched.companyCode && errors.companyCode ? 'is-invalid' : ''}`}
                  className={`form-control`}
                  type="text"
                  id="PFNumber"

                  placeholder="Enter PF Number"
                  name="PFNumber"
                  value={values.PFNumber}
                  invalid={errors.PFNumber ? true : false}
                  onChange={handleChange}
                  inputError={errors.PFNumber}
                  onBlur={onBlur}
                />

              </div>

              <div className="col-lg-2">

                <CustomInput
                  label="ESI Number"
                  // className={`form-control ${touched.companyCode && errors.companyCode ? 'is-invalid' : ''}`}
                  className={`form-control`}
                  type="text"
                  id="ESINumber"

                  placeholder="Enter ESI Number"
                  name="ESINumber"
                  value={values.ESINumber}
                  invalid={errors.ESINumber ? true : false}
                  onChange={handleChange}
                  inputError={errors.ESINumber}
                  onBlur={onBlur}
                />

              </div> */}

              <div className="col-lg-2">
                <CustomInput
                  label="PAN Number"
                  // className={`form-control ${touched.companyCode && errors.companyCode ? 'is-invalid' : ''}`}
                  className={`form-control`}
                  type="text"
                  id="PanNumber"

                  placeholder="Enter PAN Number"
                  name="PanNumber"
                  value={values.PanNumber}
                  invalid={errors.PanNumber ? true : false}
                  onChange={handleChange}
                  inputError={errors.PanNumber}
                  onBlur={onBlur}
                />
              </div>
              <div className="col-lg-2">
                <div class="textOnInput">
                  <CustomSelect
                    label="Reporting Manager"
                    placeholder="Select Reporting Manager"
                    className={`form-control ${errors.manager
                      ? "is-invalid"
                      : ""
                      }`}
                    id="manager"
                    name="manager"
                    data={managers_opt}
                    value={values.manager}
                    onChange={handleChange}
                    invalid={errors.manager ? true : false}
                    inputError={errors.manager}
                  />
                </div>
              </div>
              <div className="col-lg-2">
                <div class="textOnInput">
                  <CustomSelect
                    label="Department"
                    placeholder="Select Department"
                    className={`form-control ${errors.departmentId
                      ? "is-invalid"
                      : ""
                      }`}
                    id="departmentId"
                    name="departmentId"
                    data={department_opt}
                    value={values.departmentId}
                    onChange={handleChange}
                    invalid={errors.departmentId ? true : false}
                    inputError={errors.departmentId}
                  />
                </div>
              </div>
              <div className="row mt-5 employee-step5-row">
                <CustomToggleSwitch
                  label="PF"
                  className={`form-control`}
                  // className={`form-control ${touched.empOfGeneration && errors.empOfGeneration ? 'is-invalid' : ''}`}
                  id="employeeHavePf"
                  name="employeeHavePf"
                  checked={values.employeeHavePf}
                  value={values.employeeHavePf}
                  onChange={() => {
                    setFieldValue('employeeHavePf', !values.employeeHavePf)
                    // If turning off the switch, clear the PF amount
                    if (!values.employeeHavePf) {
                      setFieldValue('pfNumber', ''); // or set it to any default value you prefer
                    }
                  }}
                // onBlur={handleBlur}
                />
                {values.employeeHavePf == true ? (
                  <div className="col-lg-2">
                    <div class="textOnInput">
                      <CustomInput
                        label="PF Number"
                        className={`form-control ${errors.pfNumber
                          ? "is-invalid"
                          : ""
                          }`}
                        type="text"
                        id="pfNumber"
                        name="pfNumber"
                        value={values.pfNumber}
                        onChange={handleChange}
                      // onBlur={handleBlur}
                      />
                    </div>
                  </div>

                ) : null}

              </div>

              <div className="row mt-5 employee-step5-row">
                <CustomToggleSwitch
                  label="ESI"
                  className={`form-control`}
                  // className={`form-control ${touched.empOfGeneration && errors.empOfGeneration ? 'is-invalid' : ''}`}
                  id="employeeHaveEsi"
                  name="employeeHaveEsi"
                  checked={values.employeeHaveEsi}
                  value={values.employeeHaveEsi}
                  onChange={() => {
                    setFieldValue('employeeHaveEsi', !values.employeeHaveEsi)
                    // If turning off the switch, clear the PF amount
                    if (!values.employeeHaveEsi) {
                      setFieldValue("esiNumber", '') // or set it to any default value you prefer
                    }
                  }}
                // onBlur={handleBlur}
                />
                {values.employeeHaveEsi == true ? (
                  <div className="col-lg-2">
                    <div class="textOnInput">
                      <CustomInput
                        label="ESI Number"
                        className={`form-control ${errors.esiNumber
                          ? "is-invalid"
                          : ""
                          }`}
                        type="text"
                        id="esiNumber"
                        name="esiNumber"
                        value={values.esiNumber}
                        onChange={handleChange}
                      // onBlur={handleBlur}
                      />
                    </div>
                  </div>

                ) : null}
              </div>
              <div className="row mt-5 employee-step5-row">
                <CustomToggleSwitch
                  label="Professional Tax"
                  className={`form-control`}
                  // className={`form-control ${touched.empOfGeneration && errors.empOfGeneration ? 'is-invalid' : ''}`}
                  id="employeeHaveProfTax"
                  name="employeeHaveProfTax"
                  checked={values.employeeHaveProfTax}
                  value={values.employeeHaveProfTax}
                  onChange={() => setFieldValue('employeeHaveProfTax', !values.employeeHaveProfTax)}
                // onBlur={handleBlur}
                />

              </div>
              <div className="row mt-5 employee-step5-row">
                <CustomToggleSwitch
                  label="Show Salary Sheet"
                  className={`form-control`}
                  // className={`form-control ${touched.empOfGeneration && errors.empOfGeneration ? 'is-invalid' : ''}`}
                  id="showSalarySheet"
                  name="showSalarySheet"
                  checked={values.showSalarySheet}
                  value={values.showSalarySheet}
                  onChange={() => setFieldValue('showSalarySheet', !values.showSalarySheet)}
                // onBlur={handleBlur}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
