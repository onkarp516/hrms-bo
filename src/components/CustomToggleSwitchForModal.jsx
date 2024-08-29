import React from 'react';
import { Col, Row, Table, Button, Form as BootForm } from "react-bootstrap";

const CustomToggleSwitchForModal = ({
    id,
    label,
    className,
    name,
    type,
    value,
    checked,

    inputError,
    onChange,
    onBlur,
    placeholder,
    touched,
    errors
}) => {
    const isInvalid = touched && errors;
    // console.log("🚀 ~ file: CustomToggleSwitchForModals.jsx:24 ~ value:", value)

    return (
        <div className="row">
            <div
                style={{
                    flex: "0 0 auto",
                    // width: "10.666667%",
                    width: "56.6667%",
                    color: "#4D798B",
                    fontSize: " 14px",
                    fontStyle: " normal",
                    fontSeight: " 500",
                    lineSeight: " normal",
                }}
            >
                {label}
            </div >
            <div
                style={{
                    flex: "0 0 auto",
                    width: "10.666667%",
                    color: "#4D798B",
                    fontSize: " 14px",
                    fontStyle: " normal",
                    fontSeight: " 500",
                    lineSeight: " normal",
                }}
            >
                <BootForm.Check // prettier-ignore
                    type="switch"
                    id={id}
                    checked={checked}
                    onChange={onChange}  // Attach the onChange function here
                />
            </div>
            <div className="invalid-feedback">{inputError}</div>

        </div>
    );
};

export default CustomToggleSwitchForModal;
