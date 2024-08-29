import React from 'react';
import { isValid, format } from 'date-fns';

const CustomTimeInputs = ({
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
    errors
}) => {
    const isInvalid = touched && errors;

    let formattedValue = value;
    if (value && isValid(new Date(value))) {
        formattedValue = format(new Date(value), 'hh:mm a');
    }

    return (
        <>
            <div className="textOnInput">

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
                    className={className}
                    type={type}
                    id={id}
                    name={name}
                    value={formattedValue}
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder={placeholder}
                />
                <div className="invalid-feedback">{inputError}</div>
            </div>
        </>
    );
};

export default CustomTimeInputs;
