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

export default function Step5(props) {
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
    addFamilyList,
    familylist,
    removeFamilyList,
    onBlur
  } = props;

  const navigate = useNavigate();

  return (
    <div
      className="cntnr" style={{ height: "840px" }}

    >
      {/* Your existing content goes here */}
      <div style={{ overflow: "auto", maxHeight: "810px", overflowX: "hidden", scrollbarWidth: "none", msOverflowStyle: "none" }}>
        <div>
          {/* Background Verification */}
          <div className="row mt-3">
            <div className="row ">
              <div className="col-lg-2 subText"
              // style={{ width: "1798px", height: "18px", flexShrink: "0" }}
              >
                Experience Information
              </div>
              <div className="col-lg-10">
                <hr className="strHr"></hr>
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
                    setFieldValue('employeePf', ''); // or set it to any default value you prefer
                  }
                }}
              // onBlur={handleBlur}
              />
              {values.employeeHavePf == true ? (
                <div className="col-lg-2">
                  <div class="textOnInput">
                    <CustomInput
                      label="PF Amount"
                      className={`form-control ${errors.employeePf
                        ? "is-invalid"
                        : ""
                        }`}
                      type="text"
                      id="employeePf"
                      name="employeePf"
                      value={values.employeePf}
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
                    setFieldValue("employeeEsi", '') // or set it to any default value you prefer
                  }
                }}
              // onBlur={handleBlur}
              />
              {values.employeeHaveEsi == true ? (
                <div className="col-lg-2">
                  <div class="textOnInput">
                    <CustomInput
                      label="ESI Amount"
                      className={`form-control ${errors.employeeEsi
                        ? "is-invalid"
                        : ""
                        }`}
                      type="text"
                      id="employeeEsi"
                      name="employeeEsi"
                      value={values.employeeEsi}
                      onChange={handleChange}
                    // onBlur={handleBlur}
                    />
                  </div>
                </div>

              ) : null}
            </div>

            <div className="row mt-5">
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

            <div className="row mt-5">
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

            {/* <div className="row mt-5">
              <CustomToggleSwitch
                label="Choose Option To Show"
                className={`form-control`}
                // className={`form-control ${touched.empOfGeneration && errors.empOfGeneration ? 'is-invalid' : ''}`}
                id="payrollOptToShow"
                name="payrollOptToShow"
                checked={values.payrollOptToShow}
                value={values.payrollOptToShow}
                onChange={() => setFieldValue('payrollOptToShow', !values.payrollOptToShow)}
              // onBlur={handleBlur}
              />

            </div> */}




          </div>

        </div>
      </div>
    </div>
  );
}
