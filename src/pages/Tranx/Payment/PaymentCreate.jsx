import React, { Component, useRef } from "react";
// import "react-toastify/dist/ReactToastify.css";
// import { toast } from "react-toastify";
import moment from "moment";
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
import { Link, useNavigate } from "react-router-dom";
import AddBtn from "../../../assets/images/MenuButton.png";
import CustomDateInputs from "../../../components/CustomDateInputs";

// import {
//   Input,
//   FormFeedback,
//   Row,
//   Col,
//   Spinner,
//   FormGroup,
//   Label,
//   Button,
//   Card,
//   CardBody,
//   CardTitle,
//   Table, // CardHeader,
// } from "react-bootstrap";
// import {
//   WithUserPermission,
//   isActionExist,
//   MyDatePicker,
//   checkInvoiceDateIsBetweenFYFun,
//   getSelectValue,
// } from "@/helpers";
import Select from "react-select";
// import {
//   AuthenticationCheck,
//   getPOPendingOrderWithIds,
//   getReceiptLastRecords,
//   getSundryDebtorsIndirectIncome,
//   getdebtorspendingbills,
//   getCashACBankAccountDetails,
//   create_receipts,
// } from "@/services/api_function";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  create_payments,
  create_receipts,
  getCashACBankAccountDetails,
  getReceiptLastRecords,
  getSundryDebtorsIndirectIncome,
  getcreditorspendingbills,
  getpaymentinvoicelastrecords,
  getsundrycreditorsindirectexpenses,
} from "../../../services/api_functions";
import { getSelectValue, isActionExist } from "../../../helpers/constants";
import CustomInput from "../../../components/CustomInputs";
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

class PaymentCreate extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.invoiceDateRef = React.createRef();
    this.state = {
      isLoading: false,
      show: false,
      invoice_data: "",
      amtledgershow: false,
      onaccountmodal: false,
      billadjusmentmodalshow: false,
      billadjusmentDebitmodalshow: false,
      bankledgershow: false,
      isDisabled: false,
      bankchequeshow: false,
      isAllCheckeddebit: false,
      sundryindirect: [],
      cashAcbankLst: [],
      purchaseAccLst: [],
      supplierNameLst: [],
      supplierCodeLst: [],
      selectedBillsdebit: [],
      selectedBillsCredit: [],
      billLst: [],
      billLstSc: [],
      selectedBills: [],
      accountLst: [],
      invoiceedit: false,
      adjusmentbillmodal: false,
      createproductmodal: false,
      pendingordermodal: false,
      pendingorderprdctsmodalshow: false,
      productLst: [],
      unitLst: [],
      rows: [],
      serialnopopupwindow: false,

      serialnoshowindex: -1,
      serialnoarray: [],
      lstDisLedger: [],
      additionalCharges: [],
      lstAdditionalLedger: [],
      additionalChargesTotal: 0,
      taxcal: { igst: [], cgst: [], sgst: [] },
      isAllChecked: false,
      selectedProductDetails: [],
      selectedPendingOrder: [],
      purchasePendingOrderLst: [],
      selectedPendingChallan: [],
      initVal: {
        payment_sr_no: 1,
        payment_code: "",
        transaction_dt: "",
        po_sr_no: 1,
        sundryindirectid: "",
        id: "",
        type: "",
        balancing_method: "",
        amount: "",
      },

      voucher_edit: false,
      voucher_data: {
        voucher_sr_no: 1,
        transaction_dt: moment(new Date()).format("DD-MM-YYYY"),
        payment_dt: moment(new Date()).format("DD-MM-YYYY"),
      },
      rows: [],
      sundryCreditorLst: [],
      cashAccLedgerLst: [],
      lstSundryCreditorsPayment: [],

      index: 0,
      crshow: false,
      onaccountcashaccmodal: false,
      bankaccmodal: false,
    };
  }

  getTotalDebitAmt = () => {
    let { rows } = this.state;
    let debitamt = 0;
    rows.map((v) => {
      if (v.type.value == "dr") {
        debitamt = parseFloat(debitamt) + parseFloat(v["paid_amt"]);
      }
    });
    return isNaN(debitamt) ? 0 : debitamt;
  };
  getTotalCreditAmt = () => {
    let { rows } = this.state;
    // console.log("Total Credit ", rows);
    let creditamt = 0;
    rows.map((v) => {
      if (v.type.value == "cr") {
        creditamt = parseFloat(creditamt) + parseFloat(v["credit"]);
      }
    });
    return isNaN(creditamt) ? 0 : creditamt;
  };

  initRows = () => {
    let rows = [];
    for (let index = 0; index < 10; index++) {
      let innerrow = {
        type: "",
        perticulars: "",
        paid_amt: "",
        bank_payment_type: "",
        bank_payment_no: "",
        debit: "",
        credit: "",
        narration: "",
      };
      if (index == 0) {
        // innerrow["type"] = "cr";
        innerrow["type"] = getSelectValue(typeOpts, "dr");
      }
      rows.push(innerrow);
    }
    this.setState({ rows: rows });
  };

  setElementValue = (element, index) => {
    let elementCheck = this.state.rows.find((v, i) => {
      return i == index;
    });
    return elementCheck ? elementCheck[element] : "";
  };
  getElementObject = (index) => {
    let elementCheck = this.state.rows.find((v, i) => {
      return i == index;
    });
    return elementCheck ? elementCheck : "";
  };

  handleClearPayment = (index) => {
    const { rows } = this.state;
    let frows = [...rows];
    let data = {
      type: "",
      paid_amt: "",
      perticulars: "",
      credit: "",
      debit: "",
      bank_payment_type: "",
      bank_payment_no: "",
    };
    frows[index] = data;
    this.setState({ rows: frows }, () => { });
  };

  lstgetcashAcbankaccount = () => {
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
          this.setState({ cashAcbankLst: resLst });
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  getCurrentOpt = (index) => {
    let { rows, sundryCreditorLst, cashAcbankLst } = this.state;

    // console.log({ sundryCreditorLst });
    // console.log({ cashAcbankLst });
    let currentObj = rows.find((v, i) => i == index);
    console.log("currentObject", currentObj);
    if (currentObj.type.value == "dr") {
      return sundryCreditorLst;
    } else if (currentObj.type.value == "cr") {
      return cashAcbankLst;
    }
    return [];
  };

  setpaymentinvoiceSerialNo = () => {
    getpaymentinvoicelastrecords()
      .then((response) => {
        let res = response.data;
        if (res.responseStatus == 200) {
          const { initVal } = this.state;
          //initVal['payment_sr_no'] = res.count;
          initVal["payment_sr_no"] = res.payment_sr_no;
          initVal["payment_code"] = res.payment_code;

          console.log({ initVal });
          this.setState({ initVal: initVal });
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  lstgetsundrycreditors_indirectexpenses = () => {
    getsundrycreditorsindirectexpenses()
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
          this.setState({
            sundryCreditorLst: resLst,
          });
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  FetchPendingBills = (id, type, balancing_method) => {
    // debugger;
    console.log("balancing_method", balancing_method);
    let reqData = new FormData();
    reqData.append("ledger_id", id);
    reqData.append("type", type);
    reqData.append("balancing_method", balancing_method);
    getcreditorspendingbills(reqData)
      .then((response) => {
        // debugger;
        let res = response.data;
        console.log("Res Bill List ", res);
        if (res.responseStatus == 200) {
          let data = res.list;
          console.log("data", data);
          if (data.length > 0) {
            if (balancing_method === "bill-by-bill" && type === "SC") {
              //console.log('OPT', opt);
              this.setState({ billLst: data, billadjusmentmodalshow: true });
            } else if (balancing_method === "bill-by-bill" && type === "SD") {
              this.setState({
                billLstSc: data,
                billadjusmentCreditmodalshow: true,
              });
            } else {
              if (balancing_method === "on-account")
                this.setState({
                  billLst: data,
                  onaccountmodal: true,
                });
            }
          }
        }
      })
      .catch((error) => {
        console.log("error", error);
        this.setState({ billLst: [] });
      });
  };

  // lstPOPendingOrder = (values) => {
  //   const { invoice_data } = this.state;
  //   let { supplierCodeId } = invoice_data;

  //   let reqData = new FormData();
  //   reqData.append(
  //     "supplier_code_id",
  //     supplierCodeId ? supplierCodeId.value : ""
  //   );
  //   getPOPendingOrderWithIds(reqData)
  //     .then((response) => {
  //       console.log("Pending Order Response", response);
  //       let res = response.data;
  //       if (res.responseStatus == 200) {
  //         this.setState({ purchasePendingOrderLst: res.data });
  //       }
  //     })
  //     .catch((error) => {
  //       console.log("error", error);
  //       this.setState({ purchasePendingOrderLst: [] });
  //     });
  // };

  componentDidMount() {
    this.setpaymentinvoiceSerialNo();
    this.lstgetsundrycreditors_indirectexpenses();
    this.lstgetcashAcbankaccount();

    this.initRows();
  }

  handleChangeArrayElement = (element, value, index) => {
    // debugger;
    let debitBal = 0;
    let creditBal = 0;
    console.log({ element, value, index });
    let { rows } = this.state;
    let debitamt = 0;
    let creditamt = 0;
    let frows = rows.map((v, i) => {
      // debugger;
      console.log("v-type => ", v["type"]);
      console.log("i => ", { v, i });
      console.log("Rowsssss", rows);
      if (v["type"]["type"] == "dr") {
        debitamt = parseFloat(debitamt) + parseFloat(v["paid_amt"]);
        // bal = parseFloat(bal);
        if (v["paid_amt"] != "")
          debitBal = debitBal + parseFloat(v["paid_amt"]);
        // console.log('bal', bal);
      } else if (v["type"] == "cr") {
        if (v["credit"] != "" && !isNaN(v["credit"]))
          creditBal = creditBal + parseFloat(v["credit"]);
      }
      if (i == index) {
        if (element == "debit") {
          v["paid_amt"] = value;
          console.log("Dr value", value);
        } else if (element == "credit") {
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

    if (element == "perticulars") {
      let obj = frows.find((v, i) => i == index);

      if (obj.type.value == "dr") {
        this.FetchPendingBills(
          obj.perticulars.id,
          obj.perticulars.type,
          obj.perticulars.balancing_method
        );
      } else if (obj.type.value == "cr") {
        console.log("obj-----", obj);
        frows = rows.map((vi, ii) => {
          if (ii == index) {
            // (lastCrBal = lastCrBal - vi['paid_amt']),
            vi["credit"] = lastCrBal;
            console.log("vi", vi);
          }
          return vi;
        });
        if (obj.perticulars.type == "others") {
        } else if (obj.perticulars.type == "bank_account") {
          this.setState({ bankaccmodal: true });
        }
      }
    }
    console.log("frows", { frows });

    this.setState({ rows: frows, index: index });
  };

  render() {
    const { isLoading, initVal, rows } = this.state;

    return (
      <div>
        <div
          className="content-wrapper scrollable-div"
          style={{ position: "fixed", width: "96%" }}
        >
          <ResponseModal
            isOpen={this.state.ResModal}
            onRequestClose={this.closeModal}
            // onConfirm={() => this.handleConfirmSubmit(handleSubmit)}
            text={`${this.state.ResText}`}
            LogoType={`${this.state.LogoType}`}
          />
          {/* <div className="pagePathLayout row">
            <div className="col-lg-11 header-title">
              <span className="bold">{location.pathname}</span>
            </div>
            <OverlayTrigger
              placement="left"
              overlay={
                <Tooltip id="tooltip" className="tooltip-add-btn">
                  Create
                </Tooltip>
              }
            >
              {isActionExist(
                "journal",
                "create",
                this.props.userPermissions
              ) && (
                <div className="col-lg-1 header-add-btn">
                  <Link to="/Dashboard/Tranx/journal-create">
                    <img src={AddBtn} alt="" className="btn-add " />
                  </Link>
                </div>
              )}
            </OverlayTrigger>
          </div>

          <div className="col-lg-12 path-label">
            <span>{name}</span>
          </div>
          <div className="col-lg-12 path-label2">
            <span>Manage All {name} Related Information</span>
          </div> */}

          <div className="scrollable-div-page">
            <div>
              <Formik
                validateOnBlur={false}
                validateOnChange={false}
                initialValues={initVal}
                validationSchema={Yup.object().shape({
                  payment_sr_no: Yup.string()
                    .trim()
                    .required("Payment no is required"),
                  payment_code: Yup.string()
                    .trim()
                    .required("Payment code is required"),
                  transaction_dt: Yup.string().required(
                    "Transaction date is required"
                  ),
                  // sundryindirectid: Yup.string().required("").value,
                })}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                  let data;
                  if (
                    this.getTotalDebitAmt() == this.getTotalCreditAmt() &&
                    this.getTotalCreditAmt() > 0 &&
                    this.getTotalDebitAmt() > 0
                  ) {
                    let requestData = new FormData();
                    this.setState({
                      invoice_data: values,
                    });
                    let filterRow = rows.filter((v) => {
                      if (v.bank_payment_type != "") {
                        v.bank_payment_type = v.bank_payment_type.value;
                      }
                      return v;
                    });
                    // if (creditamt == debitamt) {
                    let frow = filterRow.filter((v) => v.type != "");
                    let formData = new FormData();
                    console.log("frow", frow);

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
                              // return vi;
                              billRow.push(vi);
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
                            }
                          });

                        // console.log("billrow >>>>>>", billRow);
                        // billRow = billRow.filter((v) => v != undefined);
                        // console.log("billrow >>>>>>", billRow);

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
                          // bank_payment_type: v.bank_payment_type,
                          // bank_payment_no: v.bank_payment_no,
                          perticulars: perObj,
                        };
                      } else if (v.perticulars && v.perticulars.type == "IE") {
                        let perObj = {
                          id: v.perticulars.id,
                          type: v.perticulars.type,
                          ledger_name: v.perticulars.label,
                        };
                        return {
                          type: v.type,
                          paid_amt: v.debit,

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
                          type: v.type,
                          paid_amt: v.paid_amt,
                          // bank_payment_type: v.bank_payment_type,
                          // bank_payment_no: v.bank_payment_no,
                          perticulars: perObj,
                        };
                      } else {
                        let perObj = {
                          id: v.perticulars.id,
                          type: v.perticulars.type,
                          ledger_name: v.perticulars.label,
                        };
                        return {
                          type: v.type,
                          paid_amt: v.credit,
                          bank_payment_type: v.bank_payment_type,
                          bank_payment_no: v.bank_payment_no,
                          perticulars: perObj,
                        };
                      }
                    });
                    console.log("frow ---------", frow);

                    // var filtered = frow.filter(function (el) {
                    //   return el != null;
                    // });
                    formData.append("row", JSON.stringify(frow));

                    // formData.append('rows', JSON.stringify(frow));
                    // console.log('rows', rows);
                    formData.append(
                      "transaction_dt",
                      moment(values.transaction_dt).format("YYYY-MM-DD")
                    );
                    formData.append("payment_sr_no", values.payment_sr_no);
                    formData.append("payment_code", values.payment_code);
                    let total_amt = this.getTotalDebitAmt();
                    formData.append("total_amt", total_amt);

                    if (values.narration != null) {
                      formData.append("narration", values.narration);
                    }
                    // console.log("Debit total amt", this.getTotalDebitAmt());
                    // console.log("credit total amt", this.getTotalCreditAmt());
                    create_payments(formData)
                      .then((response) => {
                        console.log("response", response);
                        let res = response.data;
                        if (res.responseStatus == 200) {
                          alert("✔ Payment Created Successfully")
                          // navigate("/Dashboard/Tranx/p ayment");

                          setSubmitting(false);
                          // toast.success("✔", res.message);
                          // toast.success(
                          //   "✔ Payment Created Successfully",
                          //   res.message
                          // );

                          resetForm();
                          this.initRows();
                          this.props.history.push("/payment");
                        } else {
                          setSubmitting(false);
                          this.props.history.push("/payment");
                          // toast.error("✘ " + res.message);
                          // ShowNotification("Please Correct the Credit and Debit values");
                          setSubmitting(false);
                          this.props.history.push("/payment");
                          // if (response.responseStatus == 401) {
                          //   toast.error("✘ No Data Found" + response.message);
                          // } else {
                          //   toast.error("Please Select Ledger First");
                          //   console.log(
                          //     "Server Error! Please Check Your Connectivity"
                          //   );
                          // }
                        }
                      })
                      .catch((error) => {
                        console.log("error", error);
                      });
                  } else {
                    alert("Please match the Credit and debit Amount");
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
                              className={`form-control ${touched.payment_sr_no && errors.payment_sr_no
                                ? "is-invalid"
                                : ""
                                }`}
                              type="text"
                              onChange={handleChange}
                              placeholder="Voucher Sr No"
                              name="payment_sr_no"
                              id="payment_sr_no"
                              value={values.payment_sr_no}
                            // invalid={errors.mobile ? true : false}
                            // onChange={handleChange}
                            // inputError={errors.mobile}
                            // onBlur={onBlur}
                            />
                            <span className="text-danger">
                              {errors.payment_sr_no}
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
                              className={`form-control ${touched.payment_code && errors.payment_code
                                ? "is-invalid"
                                : ""
                                }`}
                              type="text"
                              onChange={handleChange}
                              placeholder="Voucher No"
                              name="payment_code"
                              id="payment_code"
                              value={values.payment_code}
                            // invalid={errors.mobile ? true : false}
                            // onChange={handleChange}
                            // inputError={errors.mobile}
                            // onBlur={onBlur}
                            />
                            <span className="text-danger">
                              {errors.payment_code}
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

                            <th
                              style={{ width: "10%", textAlign: "center" }}
                              className="pl-4"
                            >
                              Debit &nbsp;
                            </th>
                            <th style={{ width: "10%", textAlign: "center" }}>
                              Credit &nbsp;
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
                                        ////isClearable={true}
                                        // required
                                        onChange={(v) => {
                                          this.handleChangeArrayElement(
                                            "type",
                                            v,
                                            ii
                                          );
                                        }}
                                        value={this.setElementValue("type", ii)}
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
                                        options={this.getCurrentOpt(ii)}
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
                                            this.handleClearPayment(ii);
                                          } else {
                                            this.handleChangeArrayElement(
                                              "perticulars",
                                              v,
                                              ii
                                            );
                                          }
                                        }}
                                        value={this.setElementValue(
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
                                        this.handleChangeArrayElement(
                                          "debit",
                                          v,
                                          ii
                                        );
                                      }}
                                      style={{ textAlign: "center" }}
                                      value={this.setElementValue("debit", ii)}
                                      readOnly={
                                        this.setElementValue("type", ii) &&
                                          this.setElementValue("type", ii)[
                                          "value"
                                          ] == "dr"
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
                                        this.handleChangeArrayElement(
                                          "credit",
                                          v,
                                          ii
                                        );
                                      }}
                                      style={{ textAlign: "center" }}
                                      value={this.setElementValue("credit", ii)}
                                      readOnly={
                                        this.setElementValue("type", ii) &&
                                          this.setElementValue("type", ii)[
                                          "value"
                                          ] == "cr"
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
                                  value={this.getTotalDebitAmt()}
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
                                  value={this.getTotalCreditAmt()}
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
                              {/* <Form.Control
                              as="textarea"
                              resize="none"
                              placeholder="Enter Narration"
                              style={{ height: "72px" }}
                              className="text-box"
                              id="narration"
                              onChange={handleChange}
                              name="narration"
                              value={values.narration}
                            /> */}
                            </Col>
                          </Row>
                        </Col>
                      </Row>

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
                            <Link to="/Dashboard/Tranx/payment">
                              <Button
                                className="cancel-btn"
                              // type="submit"

                              >
                                Cancel
                              </Button>
                            </Link>
                          </div>
                          <div className="col-lg-1">
                            <Button className="submit-btn" type="submit">
                            Submit
                          </Button>
                          </div>
                        </div>
                      </div>
                    </div>


                  </Form>
                )}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default WithUserPermission(PaymentCreate);
