import React, { useState } from "react";

// import DatePicker, { getYear, getMonth, range } from 'react-datepicker';
import DatePicker from "react-datepicker";
// import getYear from 'date-fns/getYear';
// import getMonth from 'date-fns/getMonth';
import "react-datepicker/dist/react-datepicker.css";
import MaskedTextInput from "react-text-mask";

import InputMask from "react-input-mask";

function MyDatePicker(props) {
  // const [startDate, setStartDate] = useState(new Date());
  // const years = range(1990, getYear(new Date()) + 1, 1);
  // const months = [
  //   'January',
  //   'February',
  //   'March',
  //   'April',
  //   'May',
  //   'June',
  //   'July',
  //   'August',
  //   'September',
  //   'October',
  //   'November',
  //   'December',
  // ];
  return (
    <div>
      <DatePicker
        customInput={
          <MaskedTextInput
            mask={[/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]}
          />
        }
        {...props}
        //  / showMonthDropdown
        // showYearDropdown
      />

      {/* <DatePicker
        renderCustomHeader={({
          date,
          changeYear,
          changeMonth,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div
            style={{
              margin: 10,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
              {'<'}
            </button>
            <select
              value={getYear(date)}
              onChange={({ target: { value } }) => changeYear(value)}
            >
              {years.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <select
              value={months[getMonth(date)]}
              onChange={({ target: { value } }) =>
                changeMonth(months.indexOf(value))
              }
            >
              {months.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
              {'>'}
            </button>
          </div>
        )}
        selected={startDate}
        onChange={(date) => setStartDate(date)}
      /> */}
    </div>
  );
}

function MyTextDatePicker(props) {
  let mask = "dD/mM/YYYY";
  let formatChars = {
    Y: "[0-9]",
    d: "[0-3]",
    D: "[0-9]",
    m: "[0-1]",
    M: "[1-9]",
  };

  let beforeMaskedValueChange = (newState, oldState, userInput) => {
    let { value } = newState;

    let dateParts = value.split("/");
    // console.warn({ dateParts });
    let dayPart = dateParts[0];
    let monthPart = dateParts[1];

    // Conditional mask for the 2nd digit of day based on the first digit
    if (dayPart.startsWith("3"))
      formatChars["D"] = "[0-1]"; // To block 39, 32, etc.
    else if (dayPart.startsWith("0"))
      formatChars["D"] = "[1-9]"; // To block 00.
    else formatChars["D"] = "[0-9]"; // To allow 05, 15, 25  etc.

    // Conditional mask for the 2nd digit of month based on the first digit
    if (monthPart != null && monthPart.startsWith("1"))
      formatChars["M"] = "[0-2]"; // To block 15, 16, etc.
    else formatChars["M"] = "[1-9]"; // To allow 05, 06  etc - but blocking 00.

    return { value, selection: newState.selection };
  };
  return (
    <InputMask
      inputRef={props.innerRef}
      mask={mask}
      // maskChar=" "
      value={props.value}
      onChange={props.onChange}
      formatChars={formatChars}
      beforeMaskedValueChange={beforeMaskedValueChange}
      {...props}
    ></InputMask>
  );
}

export { MyDatePicker, MyTextDatePicker };
