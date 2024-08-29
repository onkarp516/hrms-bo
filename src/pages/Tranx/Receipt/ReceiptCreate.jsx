import React, { useState, useEffect } from "react";
import moment from "moment";
import AddBtn from "../../../assets/images/MenuButton.png";
import { WithUserPermission } from "../../../helpers/WithUserPermission";
import {
  Col,
  Card,
  CardBody,
  CardTitle,
  FormGroup,
  Row,
  Table,
  Tooltip,
  Button,
  OverlayTrigger,
} from "react-bootstrap";
import Select from "react-select";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  create_receipts,
  getCashACBankAccountDetails,
  getReceiptLastRecords,
  getSundryDebtorsIndirectIncome,
} from "../../../services/api_functions";
import { getSelectValue, isActionExist } from "../../../helpers/constants";
import CustomInput from "../../../components/CustomInputs";
import { Link, useNavigate } from "react-router-dom";
import CustomDateInputs from "../../../components/CustomDateInputs";
import ResponseModal from "../../../components/ResponseModal";

const ClearIndicatorStyles = (base, state) => ({
  ...base,
  cursor: "pointer",
  color: state.isFocused ? "blue" : "black",
});

const typeOpts = [
  { label: "Dr", value: "dr", type: "dr" },
  { label: "Cr", value: "cr", type: "cr" },
];

const ReceiptCreate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [invoice_data, setInvoiceData] = useState("");
  const [amtledgershow, setAmtLedgerShow] = useState(false);
  const [onaccountmodal, setOnAccountModal] = useState(false);
  const [LogoType, setLogoType] = useState("");
  const [ResText, setResText] = useState("");
  const [initVal, setInitVal] = useState("");
  const [ResModal, setResModal] = useState(false);
  const [Bankaccmodal, setBankaccmodal] = useState(false);
  const [SundryCreditorLst, setSundryCreditorLst] = useState([]);
  const [CashAcbankLst, setCashAcbankLst] = useState([]);
  const [resLst, setresLst] = useState([]);
  // const [Rows, setRows] = useState([]);


  const navigate = useNavigate()
  // ... (other state variables)

  const [rows, setRows] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setReceiptLastRecords();
    lstgetsundrydebtors_indirectexpenses();
    // lstGetsundryDebtorsIndirectExpenses();
    lstgetcashAcbankaccount();
    initRows();
  }, []);

  useEffect(() => {
    // This effect will run whenever resText changes
    if (ResText) {
      // Check if ResText is not empty, and then open the modal
      setResModal(true);
    }
  }, [ResText]);

  const openModal = (text, logo_type) => {
    // Update the state to set the text
    setLogoType(logo_type);
    setResText(text);
  };

  // Function to close the modal
  const closeModal = () => {
    setResModal(false);
    navigate("/Dashboard/Tranx/receipt");
  };

  // Function to handle form submission with confirmation
  const handleConfirmSubmit = () => {
    // handleSubmit();
    closeModal(); // Close the modal after submission
  };
  // ... (other methods)

  const handleChangeArrayElement = (element, value, index) => {
    let debitBal = 0;
    let creditBal = 0;
    console.log({ element, value, index });
    console.log("rows>>>>", rows);
    let debitamt = 0;
    let creditamt = 0;
    let frows = rows.map((v, i) => {
      if (v["type"]["value"] === "cr") {
        debitamt = parseFloat(debitamt) + parseFloat(v["paid_amt"]);
        if (v["paid_amt"] !== "")
          debitBal = debitBal + parseFloat(v["paid_amt"]);
      } else if (v["type"]["value"] === "dr") {
        if (v["credit"] !== "" && !isNaN(v["credit"]))
          creditBal = creditBal + parseFloat(v["credit"]);
      }
      if (i === index) {
        if (element === "debit") {
          v["paid_amt"] = value;
          console.log("Dr value", value);
        } else if (element === "credit") {
          v["paid_amt"] = value;
          console.log("cr value", value);
        }
        v[element] = value;
        return v;
      } else {
        return v;
      }
    });

    console.log("debitBal, creditBal ", { debitBal, creditBal });
    let lastCrBal = debitBal - creditBal;
    console.log("lastCrBal ", lastCrBal);

    console.log("frows", { frows });

    if (element === "perticulars") {
      let obj = frows.find((v, i) => i === index);

      if (obj.type.value === "cr") {
        // FetchPendingBills(obj.perticulars.id, obj.perticulars.type, obj.perticulars.balancing_method);
      } else if (obj.type.value === "dr") {
        console.log("obj", obj);
        frows = rows.map((vi, ii) => {
          if (ii === index) {
            vi["credit"] = lastCrBal;
            console.log("vi", vi);
          }
          return vi;
        });
        if (obj.perticulars.type === "others") {
        } else if (obj.perticulars.type === "bank_account") {
          setBankaccmodal(true);
        }
      }
    }
    console.log("frows", { frows });

    setRows(frows);
    setIndex(index);
  };


  const getTotalDebitAmt = () => {
    // let { rows } = this.state;
    let debitamt = 0;
    rows.map((v) => {
      if (v.type.value == "cr") {
        debitamt = parseFloat(debitamt) + parseFloat(v["paid_amt"]);
      }
    });
    return isNaN(debitamt) ? 0 : debitamt;
  };



  const getTotalCreditAmt = () => {
    // let { rows } = this.state;
    // console.log("Total Credit ", rows);
    let creditamt = 0;
    rows.map((v) => {
      if (v.type.value == "dr") {
        creditamt = parseFloat(creditamt) + parseFloat(v["credit"]);
      }
    });
    return isNaN(creditamt) ? 0 : creditamt;
  };

  const initRows = () => {
    let newRows = [];
    for (let i = 0; i < 10; i++) {
      let innerRow = {
        type: "",
        perticulars: "",
        paid_amt: "",
        bank_payment_type: "",
        bank_payment_no: "",
        debit: "",
        credit: "",
        narration: "",
      };
      if (i === 0) {
        innerRow["type"] = getSelectValue(typeOpts, "cr");
      }
      newRows.push(innerRow);
    }
    setRows(newRows);
  };

  const setElementValue = (element, index) => {
    let elementCheck = rows.find((v, i) => i === index);
    return elementCheck ? elementCheck[element] : "";
  };

  const getElementObject = (index) => {
    let elementCheck = rows.find((v, i) => i === index);
    return elementCheck ? elementCheck : "";
  };

  const handleClearPayment = (index) => {
    const newRows = [...rows];
    let data = {
      paid_amt: "",
      perticulars: "",
      credit: "",
      debit: "",
      bank_payment_type: "",
      bank_payment_no: "",
    };
    newRows[index] = data;
    setRows(newRows);
  };

  const setReceiptLastRecords = () => {
    getReceiptLastRecords()
      .then((response) => {
        let res = response.data;
        if (res.responseStatus === 200) {
          const newInitVal = { ...initVal };
          newInitVal["receipt_sr_no"] = res.receipt_sr_no;
          newInitVal["receipt_code"] = res.receipt_code;
          setInitVal(newInitVal);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const lstgetsundrydebtors_indirectexpenses = () => {
    getSundryDebtorsIndirectIncome()
      .then((response) => {
        console.log("response", response);
        let res = response.data ? response.data : [];
        let resLst = [];

        if (res.responseStatus == 200) {
          if (res.list.length > 0) {
            res.list.map((v) => {
              let innerrow = {
                id: v.id,
                //ledger_id: v.ledger_id,
                type: v.type,
                ledger_name: v.ledger_name,
                balancing_method: v.balancing_method,
                value: v.id,
                label: v.ledger_name,
              };
              resLst.push(innerrow);
            });
          }
          // this.setState({ sundryCreditorLst: resLst });
          setSundryCreditorLst(resLst)
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const lstgetcashAcbankaccount = () => {
    getCashACBankAccountDetails()
      .then((response) => {
        let res = response.data ? response.data : [];
        let resLst = [];

        if (res.responseStatus == 200) {
          if (res.list.length > 0) {
            res.list.map((v) => {
              let innerrow = {
                id: v.id,
                type: v.type,
                value: v.id,
                label: v.name,
                billids: [],
              };
              resLst.push(innerrow);
            });
          }
          // this.setState({ cashAcbankLst: resLst });
          setCashAcbankLst(resLst)
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };


  const getCurrentOpt = (index) => {
    let currentObj = rows.find((v, i) => i === index);

    if (currentObj.type.value === "cr") {
      return SundryCreditorLst;
    } else if (currentObj.type.value === "dr") {
      return CashAcbankLst;
    }

    return [];
  };


  // ... (remaining code)

  return (
    <div>
      <div
        className="content-wrapper scrollable-div"
        style={{ position: "fixed", width: "96%" }}
      >
        <ResponseModal
          isOpen={ResModal}
          onRequestClose={closeModal}
          onConfirm={() => handleConfirmSubmit()}
          text={`${ResText}`}
          LogoType={`${LogoType}`}
        />
        <div className="pagePathLayout row">
          <div className="col-lg-11 header-title">
            {/* <span className="bold">{location.pathname}</span> */}
          </div>
          {/* <OverlayTrigger
            placement="left"
            overlay={
              <Tooltip id="tooltip" className="tooltip-add-btn">
                Create
              </Tooltip>
            }
          > */}
          {/* {isActionExist(
              "journal",
              "create",
              props.userPermissions
            ) && (
                <div className="col-lg-1 header-add-btn">
                  <Link to="/Dashboard/Tranx/journal-create">
                    <img src={AddBtn} alt="" className="btn-add " />
                  </Link>
                </div>
              )} */}
          {/* </OverlayTrigger> */}
        </div>

        <div className="col-lg-12 path-label">
          {/* <span>{name}</span> */}
        </div>
        <div className="col-lg-12 path-label2">
          {/* <span>Manage All {name} Related Information</span> */}
        </div>

        <div className="scrollable-div-page">
          <div>
            <Formik
              validateOnBlur={false}
              validateOnChange={false}
              initialValues={initVal}
              enableReinitialize={true}
              validationSchema={Yup.object().shape({
                receipt_sr_no: Yup.string()
                  .trim()
                  .required("Receipt no is required"),
                receipt_code: Yup.string()
                  .trim()
                  .required("Receipt code is required"),
                transaction_dt: Yup.string().required(
                  "Transaction date is required"
                ),
                // sundryindirectid: Yup.string().required().value,
              })}
              onSubmit={(values, { resetForm, setStatus, setSubmitting }) => {
                console.log("i am in", values);
                // setState({
                //   isLoading: true,
                // });
                setIsLoading(true)
                setStatus();
                if (
                  getTotalDebitAmt() == getTotalCreditAmt() &&
                  getTotalCreditAmt() > 0 &&
                  getTotalDebitAmt() > 0
                ) {
                  let data;
                  console.log("values--------", values);
                  let requestData = new FormData();
                  // setState({
                  //   invoice_data: values,
                  // });
                  setInitVal(values)

                  let filterRow = rows.filter((v) => {
                    if (v.bank_payment_type != "") {
                      v.bank_payment_type = v.bank_payment_type.value;
                    }
                    return v;
                  });
                  // if (creditamt == debitamt) {
                  let frow = filterRow.filter((v) => v.type != "");
                  let formData = new FormData();

                  console.log("frow >>>>>>>>>>>>>>>>>>>>>>>>", { frow });
                  frow = frow.map((v, i) => {
                    if (
                      v.perticulars &&
                      v.perticulars.balancing_method == "bill-by-bill"
                    ) {
                      let billRow = [];
                      v.perticulars &&
                        v.perticulars.billids &&
                        v.perticulars.billids.map((vi, ii) => {
                          if ("paid_amt" in vi && vi["paid_amt"] > 0) {
                            billRow.push(vi);
                            // return vi;
                          } else if (
                            "credit_paid_amt" in vi &&
                            vi["credit_paid_amt"] > 0
                          ) {
                            // return vi;
                            billRow.push({
                              invoice_id: vi.credit_note_id,
                              amount: vi.Total_amt,

                              invoice_date: moment(
                                vi.credit_note_date
                              ).format("YYYY-MM-DD"),
                              invoice_no: vi.credit_note_no,
                              source: vi.source,
                              paid_amt: vi.credit_paid_amt,
                              remaining_amt: vi.credit_remaining_amt,
                            });
                          } else if (
                            "debit_paid_amt" in vi &&
                            vi["debit_paid_amt"] > 0
                          ) {
                            // return vi;
                            billRow.push({
                              invoice_id: vi.debit_note_id,
                              amount: vi.Total_amt,

                              invoice_date: moment(vi.debit_note_date).format(
                                "YYYY-MM-DD"
                              ),
                              invoice_no: vi.debit_note_no,
                              source: vi.source,
                              paid_amt: vi.debit_paid_amt,
                              remaining_amt: vi.debit_remaining_amt,
                            });
                          }
                        });

                      console.log("billRow", JSON.stringify(billRow));
                      let perObj = {
                        id: v.perticulars.id,
                        type: v.perticulars.type,
                        ledger_name: v.perticulars.ledger_name,
                        balancing_method: v.perticulars.balancing_method,
                        billids: billRow,
                      };
                      return {
                        type: v.type,
                        paid_amt: v.paid_amt,
                        perticulars: perObj,
                      };
                    } else if (
                      v.perticulars &&
                      v.perticulars.balancing_method == "on-account"
                    ) {
                      let perObj = {
                        id: v.perticulars.id,
                        type: v.perticulars.type,
                        ledger_name: v.perticulars.ledger_name,
                        balancing_method: v.perticulars.balancing_method,
                      };
                      return {
                        type: v.type.value,
                        paid_amt: v.paid_amt,
                        perticulars: perObj,
                      };
                    } else {
                      let perObj = {
                        id: v.perticulars.id,
                        type: v.perticulars.type,
                        ledger_name: v.perticulars.label,
                      };
                      return {
                        type: v.type.value,
                        paid_amt: v.credit,
                        bank_payment_type: v.bank_payment_type,
                        bank_payment_no: v.bank_payment_no,
                        perticulars: perObj,
                      };
                    }
                  });
                  console.log("frow ---------", frow);

                  var filtered = frow.filter(function (el) {
                    return el != null;
                  });
                  formData.append("row", JSON.stringify(frow));
                  console.log("Data row ", JSON.stringify(frow));
                  // formData.append('rows', JSON.stringify(frow));
                  console.log("rows", rows);
                  formData.append(
                    "transaction_dt",
                    moment().format("yyyy-MM-DD")
                  );
                  console.log(
                    "custName Name",
                    values.ledger_name && values.ledger_name != ""
                      ? values.ledger_name
                      : null
                  );
                  formData.append("custName", values.ledger_name);
                  formData.append("receipt_sr_no", values.receipt_sr_no);
                  formData.append("receipt_code", values.receipt_code);
                  let total_amt = getTotalDebitAmt();
                  formData.append("total_amt", total_amt);

                  if (values.narration != null) {
                    formData.append("narration", values.narration);
                  }
                  // console.log(formData);
                  for (var pair of formData.entries()) {
                    console.log(pair[0] + ", " + pair[1]);
                  }

                  create_receipts(formData)
                    .then((response) => {
                      let res = response.data;
                      if (res.responseStatus == 200) {
                        // ("✔" + res.message);
                        openModal("✔" + res.message, "cnf");

                        setSubmitting(false);
                        resetForm();
                        initRows();
                        // props.history.push("/receipt");
                      } else {
                        setSubmitting(false);
                        if (response.responseStatus == 409) {
                          // toast.error("✘ Please Select Ledger First");
                        } else {
                          // toast.error("✘ Please Select Ledger First");
                        }
                      }
                    })
                    .catch((error) => {
                      console.log("error", error);
                    });
                } else {
                }
              }}
              render={({
                errors,
                status,
                touched,
                isSubmitting,
                handleChange,
                handleSubmit,
                setFieldValue,
                values,
              }) => (
                <Form onSubmit={handleSubmit}>
                  <div className="journalStyle mx-2">
                    <Row>
                      <Col md="2">
                        {console.log('values: ', values)}

                        <FormGroup>
                          {/* <label for="exampleDatetime">
                          Voucher Sr. No. :
                        </label> */}
                          {/* <CustomInput
                          type="text"
                          name="receipt_sr_no"
                          id="receipt_sr_no"
                          onChange={handleChange}
                          value={values.receipt_sr_no}
                          // isValid={
                          //   touched.receipt_sr_no && !errors.receipt_sr_no
                          // }
                          // isInvalid={!!errors.receipt_sr_no}
                          readOnly={true}
                        /> */}
                          <CustomInput
                            label="Voucher Sr No"
                            className={`form-control ${touched.receipt_sr_no && errors.receipt_sr_no
                              ? "is-invalid"
                              : ""
                              }`}
                            type="text"
                            onChange={handleChange}
                            placeholder="Voucher No"
                            name="receipt_sr_no"
                            id="receipt_sr_no"
                            value={values.receipt_sr_no}
                          // invalid={errors.mobile ? true : false}
                          // onChange={handleChange}
                          // inputError={errors.mobile}
                          // onBlur={onBlur}
                          />
                          <span className="text-danger">
                            {errors.receipt_sr_no}
                          </span>
                        </FormGroup>
                      </Col>
                      <Col md="2">
                        <FormGroup>
                          {/* <label for="exampleDatetime">
                          Voucher Sr. No. :
                        </label> */}
                          {/* <CustomInput
                          type="text"
                          name="receipt_sr_no"
                          id="receipt_sr_no"
                          onChange={handleChange}
                          value={values.receipt_sr_no}
                          // isValid={
                          //   touched.receipt_sr_no && !errors.receipt_sr_no
                          // }
                          // isInvalid={!!errors.receipt_sr_no}
                          readOnly={true}
                        /> */}
                          <CustomInput
                            label="Voucher No"
                            className={`form-control ${touched.receipt_code && errors.receipt_code
                              ? "is-invalid"
                              : ""
                              }`}
                            type="text"
                            onChange={handleChange}
                            placeholder="Voucher No"
                            name="receipt_code"
                            id="receipt_code"
                            value={values.receipt_code}
                          // invalid={errors.mobile ? true : false}
                          // onChange={handleChange}
                          // inputError={errors.mobile}
                          // onBlur={onBlur}
                          />
                          <span className="text-danger">
                            {errors.receipt_code}
                          </span>
                        </FormGroup>
                      </Col>
                      <Col md="2">
                        <FormGroup>
                          {/* <label for="exampleDatetime">Voucher No.:</label> */}
                          {/* <CustomInput
                          type="text"
                          readOnly={true}
                          placeholder="1234"
                          value={values.receipt_code}
                          className="tnx-pur-inv-text-box mb-0"
                        /> */}
                          <CustomDateInputs
                            label="Transaction Date"
                            className={`form-control ${touched.transaction_dt && errors.transaction_dt
                              ? "is-invalid"
                              : ""
                              }`}
                            type="date"
                            id="transaction_dt"
                            placeholder="transaction_dt"
                            name="transaction_dt"
                            dateFormat="dd/MM/yyyy"
                            value={values.transaction_dt}
                            // invalid={errors.transaction_dt ? true : false}
                            onChange={handleChange}
                          // inputError={errors.transaction_dt}
                          // onBlur={onBlur}
                          />

                          <span className="text-danger">
                            {errors.transaction_dt}
                          </span>
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <div
                    className="journalTblStyle"
                  // style={{ maxHeight: "67vh", height: "67vh" }}
                  >
                    <Table size="sm" className="tbl-font mt-2 mb-2">
                      <thead>
                        <tr>
                          <th style={{ width: "10%", textAlign: "center" }}>
                            Type
                          </th>
                          <th style={{ width: "70%", textAlign: "center" }}>
                            Particulars
                          </th>
                          <th style={{ width: "10%", textAlign: "center" }}>
                            Credit &nbsp;
                          </th>
                          <th
                            style={{ width: "10%", textAlign: "center" }}
                            className="pl-4"
                          >
                            Debit &nbsp;
                          </th>
                        </tr>
                      </thead>

                      <tbody style={{ borderTop: "2px solid transparent" }}>
                        {rows.length > 0 &&
                          rows.map((vi, ii) => {
                            return (
                              <tr className="entryrow">
                                <td
                                  style={{
                                    width: "10%",
                                  }}
                                >
                                  <FormGroup>
                                    <Select
                                      //isClearable={true}
                                      // required
                                      onChange={(v) => {
                                        handleChangeArrayElement(
                                          "type",
                                          v,
                                          ii
                                        );
                                      }}
                                      value={setElementValue("type", ii)}
                                      placeholder="select type"
                                      options={typeOpts}
                                    ></Select>
                                  </FormGroup>
                                </td>

                                <td
                                  style={{
                                    width: "70%",
                                    background: "#f5f5f5",
                                  }}
                                >
                                  <FormGroup>
                                    <Select
                                      className="selectTo"
                                      components={{
                                        DropdownIndicator: () => null,
                                        IndicatorSeparator: () => null,
                                      }}
                                      placeholder=""
                                      //isClearable
                                      options={getCurrentOpt(ii)}
                                      theme={(theme) => ({
                                        ...theme,
                                        height: "26px",
                                        borderRadius: "5px",
                                      })}
                                      onChange={(v, triggeredAction) => {
                                        console.log({ triggeredAction });
                                        console.log(
                                          "In a Particular On Change.!",
                                          v
                                        );
                                        if (v == null) {
                                          // Clear happened
                                          console.log("clear index=>", ii);
                                          handleClearPayment(ii);
                                        } else {
                                          handleChangeArrayElement(
                                            "perticulars",
                                            v,
                                            ii
                                          );
                                        }
                                      }}
                                      value={setElementValue(
                                        "perticulars",
                                        ii
                                      )}
                                    />
                                  </FormGroup>
                                </td>

                                <td
                                  style={{
                                    width: "10%",
                                  }}
                                >
                                  <CustomInput
                                    type="text"
                                    // label="Debit"
                                    className={`form-control`}
                                    onChange={(e) => {
                                      let v = e.target.value;
                                      handleChangeArrayElement(
                                        "debit",
                                        v,
                                        ii
                                      );
                                    }}
                                    style={{ textAlign: "center" }}
                                    value={setElementValue("debit", ii)}
                                    readOnly={
                                      setElementValue("type", ii) &&
                                        setElementValue("type", ii)[
                                        "value"
                                        ] == "cr"
                                        ? false
                                        : true
                                    }
                                  />
                                </td>
                                <td
                                  style={{
                                    width: "10%",
                                  }}
                                >
                                  <CustomInput
                                    type="text"
                                    className={`form-control`}
                                    onChange={(e) => {
                                      let v = e.target.value;
                                      handleChangeArrayElement(
                                        "credit",
                                        v,
                                        ii
                                      );
                                    }}
                                    style={{ textAlign: "center" }}
                                    value={setElementValue("credit", ii)}
                                    readOnly={
                                      setElementValue("type", ii) &&
                                        setElementValue("type", ii)[
                                        "value"
                                        ] == "dr"
                                        ? false
                                        : true
                                    }
                                  />
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                      <thead>
                        <tr style={{ background: "#DDE2ED" }}>
                          <td
                            className="pr-2 qtotalqty"
                            style={{ width: "10%" }}
                          >
                            {" "}
                            Total
                          </td>
                          <td style={{ width: "70%" }}></td>
                          <td
                            style={{
                              width: "10 %",
                            }}
                          >
                            <FormGroup>
                              <CustomInput
                                className={`form-control`}
                                style={{
                                  textAlign: "center",
                                  // width: "8%",
                                  background: "transparent",
                                  border: "none",
                                }}
                                type="text"
                                placeholder=""
                                value={getTotalDebitAmt()}
                                readonly
                              />
                            </FormGroup>
                          </td>
                          <td style={{ width: "10%" }}>
                            {" "}
                            <FormGroup>
                              <CustomInput
                                className={`form-control`}
                                style={{
                                  textAlign: "center",
                                  //width: '8%',
                                  background: "transparent",
                                  border: "none",
                                }}
                                type="text"
                                placeholder=""
                                value={getTotalCreditAmt()}
                                readonly
                              />
                            </FormGroup>
                          </td>
                          {/* <td></td> */}
                        </tr>
                      </thead>
                    </Table>

                    <Row className="mb-2">
                      <Col sm={9}>
                        <Row className="mt-2">
                          {/* <Col sm={1}>
                        <label className="text-label">Narration:</label>
                      </Col> */}
                          <Col sm={10}>
                            <CustomInput
                              label="Narration"
                              className={`form-control`}
                              type="text"
                              placeholder="Enter Narration"
                              // style={{ height: "72px", resize: "none" }}
                              id="narration"
                              onChange={handleChange}
                              // rows={5}
                              // cols={25}
                              name="narration"
                              value={values.narration}
                            />

                          </Col>
                        </Row>
                      </Col>
                    </Row>

                    {/* <Row className="mt-2">
                      <Col className="text-end">
                        <Button type="submit" className="ms-2 submitBtn">
                          Submit
                        </Button>
                      </Col>
                    </Row> */}

                    {/* Submit and cancel buttons */}
                    <div>
                      <div className="row ">
                        <div
                          style={{
                            flex: "0 0 auto",
                            width: "80.666667%",
                            color: "#4D798B",
                            fontSize: " 14px",
                            fontStyle: " normal",
                            fontSeight: " 500",
                            lineSeight: " normal",
                          }}
                        >
                          {/* {`label`} */}
                        </div>
                        <div className="col-lg-1">
                          <Button
                            className="cancel-btn"
                            // type="submit"
                            onClick={() => {
                              navigate("/Dashboard/Tranx/receipt");
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                        <div className="col-lg-1">
                          <Button className="submit-btn" type="submit">
                            Submit
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/*
                <Row className="py-1">
                  <Col className="text-end">
                    <Button type="submit" className="successbtn-style me-2">
                      Submit
                    </Button>

                    <Button
                      className="cancel-btn"
                      onClick={(e) => {
                        e.preventDefault();
                        props.history.push("/receipt");
                      }}
                    >
                      Cancel
                    </Button>
                  </Col>
                </Row> */}
                </Form>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithUserPermission(ReceiptCreate);
