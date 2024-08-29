import React from "react";

const CustomImgSelection = ({
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
  touched,
  errors,
}) => {
  const isInvalid = touched && errors;
  // console.log("🚀 ~ file: CustomImgSelections.jsx:24 ~ value:", value)

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

        {/* <div className="form-control">
          <label class="btn btn-default btn-file">Browser</label>

          <input type="file" style={{ display: "none" }} />
          <Button className="imgBtn" type="submit">
            upload
          </Button>
        </div> */}

        <input
          type="file"
          className={className}
          //   type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          style={{ display: "none" }}
        />

        {/* <input
         className={className}
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
        /> */}
        <div className="invalid-feedback">{inputError}</div>
      </div>
    </>
  );
};

export default CustomImgSelection;
