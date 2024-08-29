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
  create_journal,
  create_payments,
  create_receipts,
  getCashACBankAccountDetails,
  getReceiptLastRecords,
  getSundryDebtorsIndirectIncome,
  get_last_record_journal,
  get_ledger_list_by_company,
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

class JournalCreate extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.invoiceDateRef = React.createRef();
    this.state = {
      ledgersLst: [],
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
        journal_sr_no: 1,
        journal_code: 1,
        transaction_dt: "",
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

  get_last_record_journalFun = () => {
    get_last_record_journal()
      .then((response) => {
        let res = response.data;
        if (res.responseStatus == 200) {
          const { initVal } = this.state;
          //initVal['payment_sr_no'] = res.count;
          initVal["journal_sr_no"] = res.journal_sr_no;
          initVal["journal_code"] = res.journal_code;

          console.log({ initVal });
          this.setState({ initVal: initVal });
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  handleChangeArrayElement = (element, value, index) => {
    let debitBal = 0;
    let creditBal = 0;
    console.log({ element, value, index });
    let { rows } = this.state;
    console.log("rows>>>>", rows);
    let debitamt = 0;
    let creditamt = 0;
    let frows = rows.map((v, i) => {
      // console.log("v-type => ", v["type"]);
      // console.log("i => ", { v, i });
      if (v["type"]["value"] == "dr") {
        debitamt = parseFloat(debitamt) + parseFloat(v["paid_amt"]);
        // bal = parseFloat(bal);
        if (v["paid_amt"] != "")
          debitBal = debitBal + parseFloat(v["paid_amt"]);
        // console.log('bal', bal);
      } else if (v["type"]["value"] == "cr") {
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
        // this.FetchPendingBills(
        //   obj.perticulars.id,
        //   obj.perticulars.type,
        //   obj.perticulars.balancing_method
        // );
      } else if (obj.type.value == "cr") {
        console.log("obj", obj);
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

  getTotalDebitAmt = () => {
    let { rows } = this.state;
    let debitamt = 0;
    rows.map((v) => {
      if (v.type.value == "dr") {
        debitamt = parseFloat(debitamt) + parseFloat(v["debit"]);
      }
    });
    return isNaN(debitamt) ? 0 : debitamt;
  };
  getTotalCreditAmt = () => {
    let { rows } = this.state;
    // console.log("Total Credit ", rows);
    let creditamt = 0;
    rows.map((v) => {
      if (v.type.value == "cr" && v["credit"] != "") {
        creditamt = parseFloat(creditamt) + parseFloat(v["credit"]);
      }
    });
    return isNaN(creditamt) ? 0 : creditamt;
  };

  lstgetledgerDetails = () => {
    get_ledger_list_by_company()
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
              };
              resLst.push(innerrow);
            });
          }
          this.setState({ ledgersLst: resLst });
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
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
      // type: "",
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

  getCurrentOpt = (index) => {
    let { rows, sundryCreditorLst, cashAcbankLst } = this.state;

    // console.log({ sundryCreditorLst });
    // console.log({ cashAcbankLst });
    let currentObj = rows.find((v, i) => i == index);
    console.log("currentObject", currentObj);
    if (currentObj.type.value == "cr") {
      return sundryCreditorLst;
    } else if (currentObj.type.value == "dr") {
      return cashAcbankLst;
    }
    return [];
  };

  componentDidMount() {
    this.get_last_record_journalFun();
    this.lstgetledgerDetails();
    this.initRows();
  }


  render() {
    const { isLoading, initVal, ledgersLst, rows } = this.state;

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
                  // receipt_sr_no: Yup.string()
                  //   .trim()
                  //   .required("Receipt  no is required"),
                  // transaction_dt: Yup.string().required(
                  //   "Transaction date is required"
                  // ),
                  // sundryindirectid: Yup.string().required().value,
                })}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                  console.log("values ----", values);
                  if (
                    this.getTotalDebitAmt() == this.getTotalCreditAmt() &&
                    this.getTotalCreditAmt() > 0 &&
                    this.getTotalDebitAmt() > 0
                  ) {
                    let requestData = new FormData();
                    this.setState({
                      invoice_data: values,
                    });

                    let frow = rows.filter((v) => v.type != "");
                    console.log("rows", JSON.stringify(frow));
                    console.log(rows);

                    frow = frow.map((v, i) => {
                      let perObj = {
                        id: v.perticulars.id,
                        type: v.perticulars.type,
                        label: v.perticulars.label,
                      };
                      if (v["debit"] != "" && v["type"]["value"] == "dr") {
                        v["paid_amt"] = v.debit;
                      } else if (v["credit"] != "" && v["type"]["value"] == "cr") {
                        v["paid_amt"] = v.credit;
                      }

                      return {
                        type: v.type,
                        paid_amt: v.paid_amt,
                        perticulars: perObj,
                      };
                    });
                    console.log("frow ---------", JSON.stringify(frow));

                    let formData = new FormData();

                    if (values.narration != null && values.narration != "")
                      formData.append("narration", values.narration);
                    formData.append("rows", JSON.stringify(frow));
                    formData.append(
                      "transaction_dt", values.transaction_dt
                      // moment(values.transaction_dt).format("YYYY-MM-DD")
                    );
                    formData.append("journal_sr_no", values.journal_sr_no);
                    let total_amt = this.getTotalDebitAmt();
                    formData.append("total_amt", total_amt);
                    formData.append("journal_code", values.journal_code);

                    create_journal(formData)
                      .then((response) => {
                        let res = response.data;

                        if (res.responseStatus == 200) {
                          alert("✔" + res.message);
                          resetForm();
                          this.componentDidMount();
                          this.props.history.push("/journal");
                        } else {
                          setSubmitting(false);
                          if (response.responseStatus == 401) {
                            alert("✘", response.message);
                          } else {
                            alert(
                              "Server Error! Please Check Your Connectivity"
                            );
                            console.log(
                              "Server Error! Please Check Your Connectivity"
                            );
                          }
                        }
                      })
                      .catch((error) => {
                        console.log("error", error);
                      });
                  } else {
                    alert("Please match the credit & debit Amount");
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
                              className={`form-control`}
                              type="text"
                              onChange={handleChange}
                              placeholder="Voucher No"
                              name="journal_sr_no"
                              id="journal_sr_no"
                              value={values.journal_sr_no}
                            // invalid={errors.mobile ? true : false}
                            // onChange={handleChange}
                            // inputError={errors.mobile}
                            // onBlur={onBlur}
                            />
                            <span className="text-danger">
                              {errors.journal_sr_no}
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
                              className={`form-control`}
                              type="text"
                              onChange={handleChange}
                              placeholder="Voucher No"
                              name="journal_code"
                              id="journal_code"
                              value={values.journal_code}
                            // invalid={errors.mobile ? true : false}
                            // onChange={handleChange}
                            // inputError={errors.mobile}
                            // onBlur={onBlur}
                            />
                            <span className="text-danger">
                              {errors.journal_code}
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
                              className={`form-control`}
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
                                        options={ledgersLst}
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
                            <Link to="/Dashboard/Tranx/journal">
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

export default WithUserPermission(JournalCreate);
