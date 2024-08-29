import React from 'react';

const CustomDateInputs = ({
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
    max,
    min,
}) => {
    const isInvalid = touched && errors;
    // console.log("🚀 ~ file: CustomDateInputss.jsx:24 ~ value:", value)

    return (
        <>
            <div class="textOnInput">

                <label
                    htmlFor="inputText"
                    className="common-input-label"
                    style={{
                        fontSize: value !== '' ? '12px' : '', // Set your smaller font size for the hover state
                        transition: value !== '' ? 'font-size 0.3s ease' : '', // Add a transition for smooth size change
                    }}
                >
                    {label}
                </label>

                <input
                    // className={`form-control ${isInvalid ? 'is-invalid' : ''}`}
                    // className={`form-control ${touched.employeeId && errors.employeeId ? 'is-invalid' : ''}`} 
                    className={className}
                    type={type}
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder={placeholder}
                    max={max}
                    min={min}
                />
                <div className="invalid-feedback">{inputError}</div>
            </div>
        </>
    );
};

export default CustomDateInputs;
