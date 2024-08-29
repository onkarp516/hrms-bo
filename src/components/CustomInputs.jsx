import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const CustomInput = ({
  id,
  label,
  className,
  name,
  type,
  value,
  inputError,
  onChange,
  onBlur,
  placeholder,
  readOnly,
  maxLength,
  touched,
  errors,
}) => {
  const isInvalid = touched && errors;
  // console.log("🚀 ~ file: CustomInputs.jsx:24 ~ value:", value)
  const [eyeStatus, setEyeStatus] = useState(false);
  return (
    <>
      <div class="textOnInput">
        <label
          htmlFor="inputText"
          className="common-input-label"
          style={{
            fontSize: value !== "" ? "12px" : "", // Set your smaller font size for the hover state
            transition: value !== "" ? "font-size 0.3s ease" : "", // Add a transition for smooth size change
          }}
        >
          {label}
        </label>

        <label
          htmlFor="inputText"
          className="common-input-label"
          style={{
            fontSize: value !== "" ? "12px" : "", // Set your smaller font size for the hover state
            transition: value !== "" ? "font-size 0.3s ease" : "", // Add a transition for smooth size change
          }}
        >
          {label}
        </label>
        <div style={{display:"flex"}}>
        <input
          // className={`form-control ${isInvalid ? 'is-invalid' : ''}`}
          // className={`form-control ${touched.employeeId && errors.employeeId ? 'is-invalid' : ''}`}
          className={className}
          type={!eyeStatus ? type : "text"}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          readOnly={readOnly}
            maxLength={maxLength}
          autoComplete="off"
        />
        <div className="my-auto">
          {name == "password" ? 
          (<>
          {eyeStatus ? 
          <FontAwesomeIcon
              icon={faEye}
              style={{ color: "#0070ee", paddingLeft: "5px" }}
              onClick={()=>setEyeStatus(!eyeStatus)}
            />:
            <FontAwesomeIcon
              icon={faEyeSlash}
              style={{ color: "#0070ee", paddingLeft: "5px" }} 
              onClick={()=>setEyeStatus(!eyeStatus)}
            />}</>)
            : <></>}
        </div>
        </div>
        <div className="invalid-feedback">{inputError}</div>
      </div>
    </>
  );
};

export default CustomInput;
