import React from "react";

const CustomSelect = ({
  id,
  label,
  className,
  name,
  type,
  value,
  data,
  inputError,
  onChange,
  onBlur,
  placeholder,
  touched,
  disabled,
  errors,
  isSearchable,
}) => {
  const isInvalid = touched && errors;
  // console.log("🚀 ~ file: CustomSelects.jsx:24 ~ value:", value)

  return (
    <>
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

      {/* <label
                htmlFor="inputText"
                className="common-input-label"

            >
                {`Company Type`}
            </label> */}
      <select
        className={className}
        //  style={{
        //   width:"200px"
        //  }}
        type="text"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        isSearchable={isSearchable}
        disabled={disabled}
      >
        <option>Select</option>

        {data &&
          data.map((item, key) => {
            return <option value={item.value}>{item.label}</option>;
          })}
      </select>
      <div className="invalid-feedback">{inputError}</div>
    </>
  );
};

export default CustomSelect;
