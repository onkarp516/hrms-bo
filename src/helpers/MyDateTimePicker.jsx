import React, { useState } from "react";

// import DatePicker, { getYear, getMonth, range } from 'react-datepicker';
import DatePicker from "react-datepicker";
// import getYear from 'date-fns/getYear';
// import getMonth from 'date-fns/getMonth';
import "react-datepicker/dist/react-datepicker.css";
import MaskedTextInput from "react-text-mask";

function MyDateTimePicker(props) {
  return (
    <div>
      <DatePicker
        customInput={
          <MaskedTextInput
            mask={[
              /\d/,
              /\d/,
              "/",
              /\d/,
              /\d/,
              "/",
              /\d/,
              /\d/,
              /\d/,
              /\d/,
              " ",
              /\d/,
              /\d/,
              ":",
              /\d/,
              /\d/,
              ":",
              /\d/,
              /\d/,
            ]}
          />
        }
        {...props}
        //  / showMonthDropdown
        // showYearDropdown
      />
    </div>
  );
}

export { MyDateTimePicker };
