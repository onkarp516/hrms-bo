import React, { useEffect } from "react";
import AddBtn from "../../../assets/images/MenuButton.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Col,
  Row,
  Table,
  Button,
  Form as BootForm,
  Modal,
} from "react-bootstrap";
import { Formik, Form, useFormik } from "formik";
import * as Yup from "yup";
import CustomInput from "../../../components/CustomInputs";
import CustomToggleSwitch from "../../../components/CustomToggleSwitch";
import CustomSelect from "../../../components/CustomSelect";
import { useState } from "react";
import {
  createCompany,
  getAllMasterSystemConfig,
  getStateData,
  getGstData,
  getUnderListForLedger,
  createLedger,
  getLedgersById,
  editLedger,
} from "../../../services/api_functions";
import ConfirmationModal from "../../../components/ConfirmationModal";
import DeleteConfirmationModal from "../../../components/DeleteConfirmationModal";
import ResponseModal from "../../../components/ResponseModal";
import { getSelectValue } from "../../../helpers/constants";
import moment from "moment";

// Modal components
const Modal1 = ({ show, onHide }) => (
  <Modal
    // {...props}
    aria-labelledby="contained-modal-title-vcenter"
    show={show}
    centered
    onHide={onHide}
  >
    <Modal.Body className="modBody">
      <main>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="101"
          height="83"
          viewBox="0 0 101 83"
          fill="none"
        >
          <circle cx="38.5" cy="44.5" r="38.5" fill="#94E1FF" />
          <path
            d="M49.4045 48.7427L35.9587 36.1013C35.3469 35.5262 35 34.7238 35 33.8842C35 31.3344 37.9477 29.9151 39.941 31.5052L49.461 39.0996C51.414 40.6575 54.2171 40.5349 56.0265 38.8124L95.0743 1.64093C97.3075 -0.484963 101 1.09802 101 4.1813C101 5.1343 100.612 6.04626 99.9258 6.70739L81.9732 24L56.2959 48.7031C54.3761 50.5501 51.3453 50.5675 49.4045 48.7427Z"
            fill="#3EB72B"
          />
          <path
            d="M49.8339 62.0711L36.227 50.348C35.448 49.6768 35 48.6995 35 47.6712C35 44.6484 38.5493 43.0214 40.8394 44.9945L49.8331 52.7429C51.7675 54.4096 54.647 54.3509 56.5119 52.6067L95.8402 15.8256C97.7991 13.9936 101 15.3826 101 18.0647C101 18.8842 100.672 19.6697 100.089 20.2456L82.1174 37.9999L56.5119 61.9357C54.6469 63.6791 51.768 63.7375 49.8339 62.0711Z"
            fill="#3EB72B"
          />
        </svg>
      </main>
      <div id="res">Response Submitted Successfully</div>
      <div className="row mt-4">
        <div className="col-lg-6">
          <Button className="sub-modal-submit-btn" type="submit">
            Submit
          </Button>
        </div>
      </div>
    </Modal.Body>
  </Modal>
);

const Modal2 = ({ show, onHide }) => (
  <Modal
    aria-labelledby="contained-modal-title-vcenter"
    show={show}
    centered
    onHide={onHide}
  >
    <Modal.Body className="modBody">
      <div
        style={{
          width: "34px",
          height: "59px",
          flexShrink: "0",
          fill: "#0E56AF",
          marginBottom: "10px", // Add margin for separation
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="34"
          height="59"
          viewBox="0 0 34 59"
          fill="none"
        >
          <path
            d="M14.1013 30.5868C16.4982 26.2705 21.1052 23.7242 23.7823 19.9047C26.615 15.8989 25.0274 8.41526 16.9962 8.41526C11.7355 8.41526 9.15181 12.39 8.06231 15.6816L0 12.2968C2.21013 5.68263 8.21795 0 16.9651 0C24.2803 0 29.292 3.32263 31.8446 7.48368C34.0236 11.0547 35.2998 17.7311 31.9379 22.6995C28.2025 28.1958 24.6227 29.8726 22.6928 33.4126C21.9145 34.8411 21.6033 35.7726 21.6033 40.3684H12.6071C12.576 37.9463 12.2024 34.0026 14.1013 30.5868ZM23.2219 52.7895C23.2219 56.2053 20.4204 59 16.9962 59C13.5721 59 10.7705 56.2053 10.7705 52.7895C10.7705 49.3737 13.5721 46.5789 16.9962 46.5789C20.4204 46.5789 23.2219 49.3737 23.2219 52.7895Z"
            fill="#0E56AF"
          />
        </svg>
      </div>
      <div id="res">Submit Response</div>

      <div className="row mt-4">
        <div className="col-lg-6">
          <Button
            className="sub-modal-cancel-btn"
            type="submit"
          // onClick={() => setSubmitModal(false)}
          >
            Cancel
          </Button>
        </div>
        <div className="col-lg-6">
          <Button className="sub-modal-submit-btn" type="submit">
            Yes
          </Button>
        </div>
      </div>
    </Modal.Body>
  </Modal>
);

export default function Page1(props) {
  const location = useLocation();
  const pathArray = location.pathname.split("/"); // Split the path into an array
  const name = pathArray[pathArray.length - 1]; // Get the last element of the array
  const [OptionsSystemConf, setOptionsSystemConf] = useState([]);
  const [StateOptData, setStateOptData] = useState([]);
  const [GstOptData, setGstOptData] = useState([]);

  const [ConfirmModal, setConfirmModal] = useState(false);
  const [DeleteConfirmation, setDeleteConfirmation] = useState(false);
  const [Submitting, setSubmitting] = useState(false);
  const [UnderValue, setUnderValue] = useState([]);

  const [BankList, setBankList] = useState([]);

  const [openRow, setOpenRow] = useState(null);
  const [ResModal, setResModal] = useState(false);
  const [ResText, setResText] = useState("");
  const [LogoType, setLogoType] = useState("");
  const [InitVal, setInitVal] = useState([]);
  const [gstList, setgstList] = useState([]);
  const [billingList, setbillingList] = useState([]);
  const [shippingList, setshippingList] = useState([]);
  const [deptList, setdeptList] = useState([]);

  // const [ResponseModal, setResponseModal] = useState(false);

  useEffect(() => {
    // This effect will run whenever resText changes
    if (ResText) {
      // Check if ResText is not empty, and then open the modal
      setResModal(true);
    }
  }, [ResText]);

  // Function to open the modal
  const openModal = (text, logo_type) => {
    // Update the state to set the text
    setLogoType(logo_type);
    setResText(text);
  };

  // Function to close the modal
  const closeModal = () => {
    setResModal(false);
    navigate("/Dashboard/Tranx/ledger");
  };

  // Function to handle form submission with confirmation
  const handleConfirmSubmit = (handleSubmit) => {
    handleSubmit();
    closeModal(); // Close the modal after submission
  };

  const getSystemConfig = () => {
    getAllMasterSystemConfig()
      .then((response) => {
        if (response.status == 200) {
          let res = response.data.responseObject;
          console.log("res: ", res);

          // console.log("==>res", response);
          // let options = res.map(function (data) {
          //   return {
          //     value: data.id,
          //     label: data.companyName,
          //   };
          // });
          setOptionsSystemConf(res);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const getState = () => {
    getStateData()
      .then((response) => {
        if (response.status == 200) {
          let res = response.data.responseObject;
          console.log(res);

          let options = res.map(function (data) {
            return {
              id: data.id,
              label: data.stateName,
            };
          });

          console.log(options);
          setStateOptData(options);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getGstType = () => {
    getGstData()
      .then((response) => {
        if (response.status == 200) {
          let res = response.data.responseObject;
          console.log(res);

          let options = res.map(function (data) {
            return {
              id: data.id,
              label: data.gstType,
            };
          });

          console.log(options);
          setGstOptData(options);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    // lstUnders();
    // getLedgerDetails();
    getState();
    getSystemConfig();
    getGstType();
    // console.log("🚀 ~ file: Page1.jsx:7 ~ useEffect ~ props:", location);
  }, []);
  // const pathArray = props.location.pathname.split("/"); // Split the path into an array
  // const name = pathArray[pathArray.length - 1]; // Get the last element of the array

  const searchText = [];
  const filteredData = [];

  const jsonArray = [
    {
      id: 1,
      label: "John",
      age: 30,
      city: "New York",
      action: "",
    },
    {
      id: 2,
      label: "Alice",
      age: 25,
      city: "Los Angeles",
      action: "",
    },
    {
      id: 3,
      label: "Bob",
      age: 35,
      city: "Chicago",
      action: "",
    },
  ];

  const underGroup = [
    {
      id: 1,
      label: "1.LTD",
    },
    {
      id: 2,
      label: "2.PVT.LTD",
    },
    {
      id: 3,
      label: "3.LTD",
    },
  ];

  const CountryList = [
    {
      id: 1,
      label: "India",
    },
    {
      id: 2,
      label: "US",
    },
    {
      id: 3,
      label: "UK",
    },
  ];

  const openingBalTypeList = [
    {
      id: 1,
      label: "Dr",
    },
    {
      id: 2,
      label: "Cr",
    },
  ];

  // const tax_typeList = [
  //   {
  //     id: 1,
  //     label: "Dr",
  //   },
  //   {
  //     id: 2,
  //     label: "Cr",
  //   },
  //   {
  //     id: 3,
  //     label: "dd",
  //   },
  // ];

  const tax_typeList = [
    { value: "central_tax", label: "Central Tax" },
    { value: "state_tax", label: "State Tax" },
    { value: "integrated_tax", label: "Integrated Tax" },
  ];
  const [SubmitModal, setSubmitModal] = useState(false);
  const [SubmitModal1, setSubmitModal1] = useState(false);

  const navigate = useNavigate();

  const [modal1Visible, setModal1Visible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);

  // Function to handle modal visibility
  const handleModal1 = () => setModal1Visible(!modal1Visible);
  const handleModal2 = () => setModal2Visible(!modal2Visible);

  const lstUnders = () => {
    // alert("tesr")
    getUnderListForLedger()
      .then((response) => {
        let res = response.data;
        if (res.responseStatus == 200) {
          let d = res.responseObject;
          const filteredData = d.filter(
            (item) =>
              item.unique_code !== "SLAC" &&
              item.associates_name !== "Payable" &&
              item.unique_code !== "BAOD" &&
              item.ledger_form_parameter_slug !== "sundry_creditors" &&
              item.ledger_form_parameter_slug !== "sundry_debtors"
          );

          let Opt = filteredData.map((v, i) => {
            let innerOpt = {};
            if (v.associates_name != "") {
              innerOpt["value"] =
                v.principle_id +
                "_" +
                v.sub_principle_id +
                "_" +
                v.associates_id;
              innerOpt["label"] = v.associates_name;
              innerOpt["ledger_form_parameter_id"] = v.ledger_form_parameter_id;
              innerOpt["ledger_form_parameter_slug"] =
                v.ledger_form_parameter_slug;
              innerOpt["principle_id"] = v.principle_id;
              innerOpt["principle_name"] = v.principle_name;
              innerOpt["sub_principle_id"] = v.sub_principle_id;
              innerOpt["subprinciple_name"] = v.subprinciple_name;
              innerOpt["under_prefix"] = v.under_prefix;
              innerOpt["associates_id"] = v.associates_id;
              innerOpt["associates_name"] = v.associates_name;
            } else if (v.subprinciple_name != "") {
              innerOpt["value"] = v.principle_id + "_" + v.sub_principle_id;
              innerOpt["label"] = v.subprinciple_name;
              innerOpt["ledger_form_parameter_id"] = v.ledger_form_parameter_id;
              innerOpt["ledger_form_parameter_slug"] =
                v.ledger_form_parameter_slug;
              innerOpt["principle_id"] = v.principle_id;
              innerOpt["principle_name"] = v.principle_name;
              innerOpt["sub_principle_id"] = v.sub_principle_id;
              innerOpt["subprinciple_name"] = v.subprinciple_name;
              innerOpt["under_prefix"] = v.under_prefix;
              innerOpt["associates_id"] = v.associates_id;
              innerOpt["associates_name"] = v.associates_name;
            } else {
              innerOpt["value"] = v.principle_id;
              innerOpt["label"] = v.principle_name;
              innerOpt["ledger_form_parameter_id"] = v.ledger_form_parameter_id;
              innerOpt["ledger_form_parameter_slug"] =
                v.ledger_form_parameter_slug;
              innerOpt["principle_id"] = v.principle_id;
              innerOpt["principle_name"] = v.principle_name;
              innerOpt["sub_principle_id"] = v.sub_principle_id;
              innerOpt["subprinciple_name"] = v.subprinciple_name;
              innerOpt["under_prefix"] = v.under_prefix;
              innerOpt["associates_id"] = v.associates_id;
              innerOpt["associates_name"] = v.associates_name;
            }
            return innerOpt;
          });
          // this.setState({ undervalue: Opt });
          console.log("Opt: ", Opt);
          setUnderValue(Opt);
        }
      })
      .catch((error) => {
        console.log("error: ", error);
        setUnderValue([]);
        // this.setState({ undervalue: [] });
      });
  };

  return (
    <Formik
      // validateOnChange={false}
      //   validateOnBlur={false}
      enableReinitialize={true}
      initialValues={InitVal}
      // initialValues={{
      //   ledgerName: "",
      //   underGroup: "",
      //   openingBal: 0,
      //   openingBalType: "",

      //   areaId: "",
      //   associates_group_name: "",
      //   associates_id: "",
      //   bank_account_no: "",
      //   bank_branch: "",
      //   bank_ifsc_code: "",
      //   bank_name: "",
      //   is_private: "",
      //   ledger_name: "",
      //   mailing_name: "",
      //   opening_balance: "",
      //   opening_balance_type: "",
      //   salesmanId: "",
      // }}
      validationSchema={Yup.object().shape({

        ledgerName: Yup.string().trim().required(" "),
        underId: Yup.string().trim().required(" "),
        openingBal: Yup.string().trim().required(" "),
        openingBalType: Yup.string().trim().required(" "),


        // ledgerlabel: Yup.string().trim().required(" "),
        // companylabel: Yup.string().trim().required(" "),
        // underGroup: Yup.string().trim().required(" "),
        // cType: Yup.string().trim().required(" "),
        // // Registered Address
        // address: Yup.string().trim().required(" "),
        // area: Yup.string().trim().required(" "),
        // pincode: Yup.string().trim().required(" "),
        // city: Yup.string().trim().required(" "),
        // state: Yup.string().trim().required(" "),
        // country: Yup.string().trim().required(" "),
        // // Corporate Address
        // Caddress: Yup.string().trim().required(" "),
        // Carea: Yup.string().trim().required(" "),
        // Cpincode: Yup.string().trim().required(" "),
        // Ccity: Yup.string().trim().required(" "),
        // Cstate: Yup.string().trim().required(" "),
        // Ccountry: Yup.string().trim().required(" "),
        // // License Information
        // licenseNumber: Yup.string().trim().required(" "),
        // liceseExpiry: Yup.string().trim().required(" "),
        // // Other
        // email: Yup.string().trim().required(" "),
        // mobile: Yup.string().trim().required(" "),
        // whatsApp: Yup.string().trim().required(" "),
        // currency: Yup.string().trim().required(" "),
        // gst: Yup.string().trim().required(" "),
        // // Admin Details
        // a_fulllabel: Yup.string().trim().required(" "),
        // a_email: Yup.string().trim().required(" "),
        // a_mobile: Yup.string().trim().required(" "),
        // a_userlabel: Yup.string().trim().required(" "),
        // a_password: Yup.string().trim().required(" "),

        // // Toggle Switches
        // gstApplicable: Yup.string().trim().required(" "),
        // esic: Yup.string().trim().required(" "),
        // isCompanyPf: Yup.string().trim().required(" "),
        // pt: Yup.string().trim().required(" "),
      })}
      onSubmit={(values, { resetForm }) => {
        const formData = new FormData();
        console.log("Values--------", values);
        formData.append("id", location.state.id);
        let filteredUnderData = UnderValue.filter(
          (v) => v.value == values.underId
        );
        let filteredTaxData = tax_typeList.filter(
          (v) => v.value == values.tax_type
        );
        console.log("filteredTaxData: ", filteredTaxData);
        console.log("filteredUnderData: ", filteredUnderData);

        if (filteredUnderData && filteredUnderData.length > 0) {
          // return false;
          if (filteredUnderData && filteredUnderData[0].under_prefix != null) {
            formData.append(
              "under_prefix",
              filteredUnderData ? filteredUnderData[0].under_prefix : ""
            );
          }

          if (filteredUnderData && filteredUnderData[0].associates_id != null) {
            formData.append(
              "associates_id",
              filteredUnderData ? filteredUnderData[0].associates_id : ""
            );
          }

          if (
            filteredUnderData[0].ledger_form_parameter_slug.toLowerCase() ==
            "sundry_debtors"
          ) {
            if (values.ledgerName != null) {
              formData.append(
                "ledger_name",
                values.ledgerName ? values.ledgerName : ""
              );
            }
            if (values.supplier_code != null) {
              formData.append("supplier_code", values.supplier_code);
            }
            if (values.route != null) {
              formData.append("route", values.route);
            }
            if (
              filteredUnderData &&
              filteredUnderData[0].sub_principle_id != null
            ) {
              formData.append(
                "principle_group_id",
                filteredUnderData[0].sub_principle_id
                  ? filteredUnderData[0].sub_principle_id
                  : ""
              );
            }
            if (
              filteredUnderData &&
              filteredUnderData[0].principle_id != null
            ) {
              formData.append(
                "principle_id",
                filteredUnderData[0].principle_id
                  ? filteredUnderData[0].principle_id
                  : ""
              );
            }

            if (
              values.tradeOfBusiness != null &&
              values.tradeOfBusiness != "" &&
              values.tradeOfBusiness != undefined
            ) {
              formData.append("businessType", values.tradeOfBusiness);
            }
            if (
              values.natureOfBusiness != null &&
              values.natureOfBusiness != "" &&
              values.natureOfBusiness != undefined
            ) {
              formData.append("businessTrade", values.natureOfBusiness);
            }

            if (values.licenseNo != null && values.licenseNo != "") {
              formData.append("licenseNo", values.licenseNo);
            }
            if (values.license_expiry != null && values.license_expiry != "") {
              let fexp = moment(values.license_expiry, "DD/MM/YYYY").toDate();
              formData.append(
                "licenseExpiryDate",
                moment(new Date(fexp)).format("yyyy-MM-DD")
              );
            }

            if (values.fssai != null) {
              formData.append("fssai", values.fssai);
            }
            if (values.fssai_expiry != null && values.fssai_expiry != "") {
              let fexp = moment(values.fssai_expiry, "DD/MM/YYYY").toDate();
              formData.append(
                "foodLicenseExpiryDate",
                moment(new Date(fexp)).format("yyyy-MM-DD")
              );
            }

            if (values.drug_license_no != null) {
              formData.append("drug_license_no", values.drug_license_no);
            }
            if (values.drug_expiry != null && values.drug_expiry != "") {
              let dexp = moment(values.drug_expiry, "DD/MM/YYYY").toDate();
              formData.append(
                "drug_expiry",
                moment(new Date(dexp)).format("yyyy-MM-DD")
              );
            }

            if (values.mfg_license_no != null && values.mfg_license_no != "") {
              formData.append("manufacturingLicenseNo", values.mfg_license_no);
            }
            if (values.mfg_expiry != null && values.mfg_expiry != "") {
              let dexp = moment(values.mfg_expiry, "DD/MM/YYYY").toDate();
              formData.append(
                "manufacturingLicenseExpiry",
                moment(new Date(dexp)).format("yyyy-MM-DD")
              );
            }

            if (values.dob != null && values.dob != "") {
              let dexp = moment(values.dob, "DD/MM/YYYY").toDate();
              formData.append(
                "dob",
                moment(new Date(dexp)).format("yyyy-MM-DD")
              );
            }
            if (values.doa != null && values.doa != "") {
              let dexp = moment(values.doa, "DD/MM/YYYY").toDate();
              formData.append(
                "anniversary",
                moment(new Date(dexp)).format("yyyy-MM-DD")
              );
            }

            if (
              filteredUnderData &&
              filteredUnderData[0].ledger_form_parameter_id != null
            ) {
              formData.append(
                "underId",
                filteredUnderData[0].ledger_form_parameter_id
                  ? filteredUnderData[0].ledger_form_parameter_id
                  : ""
              );
            }
            if (values.mailing_name != null) {
              formData.append("mailing_name", values.mailing_name);
            }
            formData.append(
              "opening_bal_type",
              values.openingBalType
                ? values.openingBalType == "Dr"
                  ? "Dr"
                  : "Cr"
                : "Dr"
            );
            formData.append(
              "opening_bal",
              values.openingBal ? values.openingBal : 0
            );
            if (values.opening_balancing_method != null) {
              formData.append(
                "balancing_method",
                values.opening_balancing_method.value
              );
            }
            if (values.address != null) {
              formData.append("address", values.address);
            }
            if (values.stateId != null) {
              formData.append(
                "state",
                values.stateId
                  ? values.stateId != ""
                    ? values.stateId.value
                    : 0
                  : 0
              );
            }
            if (values.countryId != "" && values.countryId != null) {
              formData.append(
                "country",
                values.countryId
                  ? values.countryId != ""
                    ? values.countryId.value
                    : 0
                  : 0
              );
            }
            if (values.pincode != null) {
              formData.append("pincode", values.pincode);
            }
            if (values.city != null) {
              formData.append("city", values.city);
            }
            if (values.email_id && values.email_id != null) {
              formData.append("email", values.email_id);
            }
            if (values.phone_no != null) {
              formData.append("mobile_no", values.phone_no);
            }
            if (
              values.credit_days != null &&
              values.credit_days != "" &&
              values.credit_days != undefined
            ) {
              formData.append("credit_days", values.credit_days);
              if (values.applicable_from != null) {
                formData.append(
                  "applicable_from",
                  values.applicable_from.label
                );
              }
            }

            if (
              values.credit_bills != null &&
              values.credit_bills != "" &&
              values.credit_bills != undefined
            ) {
              formData.append("creditNumBills", values.credit_bills);
            }

            if (
              values.credit_values != null &&
              values.credit_values != "" &&
              values.credit_values != undefined
            ) {
              formData.append("creditBillValue", values.credit_values);
            }

            if (values.salesrate != null) {
              formData.append("salesrate", values.salesrate.value);
            }
            if (
              values.salesmanId != "" &&
              values.salesmanId != null &&
              values.salesmanId != undefined
            ) {
              // formData.append("salesman", values.salesman);
              formData.append("salesman", values.salesmanId.value);
            }
            if (
              values.areaId != null &&
              values.areaId != "" &&
              values.areaId != undefined
            ) {
              //formData.append("area", values.area);
              formData.append("area", values.areaId.value);
            }
            if (values.fssai != null) {
              formData.append("fssai", values.fssai);
            }
            if (values.isTaxation != null) {
              formData.append("taxable", values.isTaxation.value);
            }

            let gstdetails = [];
            if (values.isTaxation.value == true) {
              if (values.registraion_type != null) {
                formData.append(
                  "registration_type",
                  values.registraion_type.value
                );
              }
              // console.log("gst", JSON.stringify(gstList));

              gstdetails =
                gstList &&
                gstList.map((v, i) => {
                  let obj = {};
                  obj["gstin"] = v.gstin;

                  if (
                    v.dateofregistartion != "" &&
                    v.dateofregistartion != null
                  ) {
                    let pandateofregistration = moment(
                      new Date(),
                      "DD/MM/YYYY"
                    ).toDate();
                    obj["dateofregistartion"] = moment(
                      new Date(pandateofregistration)
                    ).format("yyyy-MM-DD");
                  }
                  // obj["dateofregistartion"] = moment(
                  //   v.dateofregistartion
                  // ).format("YYYY-MM-DD");

                  if (v.pan_no != "") obj["pancard"] = v.pan_no;

                  return obj;
                });
            }

            formData.append("gstdetails", JSON.stringify(gstdetails));

            let billingDetails = billingList.map((v, i) => {
              return {
                district: v.b_district,
                billing_address: v.billing_address,
              };
            });

            formData.append("billingDetails", JSON.stringify(billingDetails));

            formData.append("shippingDetails", JSON.stringify(shippingList));

            let deptDetails = [];
            deptDetails = deptList.map((v, i) => {
              let obj = {
                dept: v.dept,
                contact_person: v.contact_person,
                contact_no: v.contact_no,
              };

              if (v.email != "") obj["email"] = v.email;

              return obj;
            });
            formData.append("deptDetails", JSON.stringify(deptDetails));
          }
          if (
            filteredUnderData[0].ledger_form_parameter_slug.toLowerCase() ==
            "bank_account"
          ) {
            if (values.ledgerName != null) {
              formData.append(
                "ledger_name",
                values.ledgerName ? values.ledgerName : ""
              );
            }
            console.log("bank_account");

            if (
              filteredUnderData[0].sub_principle_id &&
              filteredUnderData[0].sub_principle_id != ""
            ) {
              formData.append(
                "principle_group_id",
                filteredUnderData[0].sub_principle_id
              );
              console.log("bank_account1");
            }
            if (
              filteredUnderData[0].principle_id &&
              filteredUnderData[0].principle_id != ""
            ) {
              formData.append(
                "principle_id",
                filteredUnderData[0].principle_id
              );
              console.log("bank_account2");
            }
            if (
              filteredUnderData[0].ledger_form_parameter_id &&
              filteredUnderData[0].ledger_form_parameter_id != ""
            ) {
              formData.append(
                "underId",
                filteredUnderData[0].ledger_form_parameter_id
              );
            }
            console.log("bank_account3_0");
            formData.append(
              "opening_bal_type",
              values.openingBalType
                ? values.openingBalType == "Dr"
                  ? "Dr"
                  : "Cr"
                : "Dr"
            );
            formData.append(
              "opening_bal",
              values.openingBal ? values.openingBal : 0
            );

            if (values.isTaxation != null) {
              formData.append("taxable", values.isTaxation.value);
            }

            if (values.bank_name != null) {
              formData.append("bank_name", values.bank_name);
            }

            if (values.bank_account_no != null) {
              formData.append("account_no", values.bank_account_no);
            }
            console.log("bank_account3_6");
            if (values.bank_ifsc_code != null) {
              formData.append("ifsc_code", values.bank_ifsc_code);
            }
            if (values.bank_branch != null) {
              formData.append("bank_branch", values.bank_branch);
            }
          }

          formData.append("bankDetails", JSON.stringify(BankList));

          if (
            filteredUnderData[0].ledger_form_parameter_slug.toLowerCase() ==
            "duties_taxes"
          ) {
            if (values.ledgerName != null) {
              formData.append("ledger_name", values.ledgerName);
            }

            if (
              filteredUnderData[0].sub_principle_id &&
              filteredUnderData[0].sub_principle_id != ""
            ) {
              formData.append(
                "principle_group_id",
                filteredUnderData[0].sub_principle_id
              );
            }
            if (
              filteredUnderData[0].principle_id &&
              filteredUnderData[0].principle_id != ""
            ) {
              formData.append(
                "principle_id",
                filteredUnderData[0].principle_id
              );
            }
            formData.append(
              "opening_bal_type",
              values.openingBalType
                ? values.openingBalType == "Dr"
                  ? "Dr"
                  : "Cr"
                : "Dr"
            );
            formData.append(
              "opening_bal",
              values.openingBal ? values.openingBal : 0
            );
            if (
              filteredUnderData[0].ledger_form_parameter_id &&
              filteredUnderData[0].ledger_form_parameter_id != ""
            ) {
              formData.append(
                "underId",
                filteredUnderData[0].ledger_form_parameter_id
              );
            }
            if (values.tax_type != null) {
              formData.append("tax_type", JSON.stringify(filteredTaxData));
            }
          }
          if (
            filteredUnderData[0].ledger_form_parameter_slug.toLowerCase() ==
            "assets"
          ) {
            if (values.ledgerName != null) {
              formData.append("ledger_name", values.ledgerName);
            }

            if (
              filteredUnderData[0].sub_principle_id &&
              filteredUnderData[0].sub_principle_id != ""
            ) {
              formData.append(
                "principle_group_id",
                filteredUnderData[0].sub_principle_id
              );
            }
            if (
              filteredUnderData[0].principle_id &&
              filteredUnderData[0].principle_id != ""
            ) {
              formData.append(
                "principle_id",
                filteredUnderData[0].principle_id
              );
            }
            if (
              filteredUnderData[0].ledger_form_parameter_id &&
              filteredUnderData[0].ledger_form_parameter_id != ""
            ) {
              formData.append(
                "underId",
                filteredUnderData[0].ledger_form_parameter_id
              );
            }
            formData.append(
              "opening_bal_type",
              values.openingBalType
                ? values.openingBalType == "Dr"
                  ? "Dr"
                  : "Cr"
                : "Dr"
            );
            formData.append(
              "opening_bal",
              values.openingBal ? values.openingBal : 0
            );
          }

          if (
            filteredUnderData[0].ledger_form_parameter_slug.toLowerCase() ==
            "others"
          ) {
            if (values.ledgerName != null) {
              formData.append("ledger_name", values.ledgerName);
            }
            if (
              filteredUnderData[0].sub_principle_id &&
              filteredUnderData[0].sub_principle_id != ""
            ) {
              formData.append(
                "principle_group_id",
                filteredUnderData[0].sub_principle_id
              );
            }
            if (
              filteredUnderData[0].principle_id &&
              filteredUnderData[0].principle_id != ""
            ) {
              formData.append(
                "principle_id",
                filteredUnderData[0].principle_id
              );
            }
            formData.append(
              "opening_bal_type",
              values.openingBalType
                ? values.openingBalType == "Dr"
                  ? "Dr"
                  : "Cr"
                : "Dr"
            );
            formData.append(
              "opening_bal",
              values.openingBal ? values.openingBal : 0
            );
            if (values.opening_balancing_method != null) {
              formData.append(
                "balancing_method",
                values.opening_balancing_method.value
              );
            }

            if (
              filteredUnderData[0].ledger_form_parameter_id &&
              filteredUnderData[0].ledger_form_parameter_id != ""
            ) {
              formData.append(
                "underId",
                filteredUnderData[0].ledger_form_parameter_id
              );
            }
            if (values.address != null) {
              formData.append("address", values.address);
            }
            if (values.stateId != "" && values.stateId != null) {
              formData.append(
                "state",
                values.stateId
                  ? values.stateId != ""
                    ? values.stateId.value
                    : 0
                  : 0
              );
            }

            if (values.countryId != "" && values.countryId != null) {
              formData.append(
                "country",
                values.countryId
                  ? values.countryId != ""
                    ? values.countryId.value
                    : 0
                  : 0
              );
            }
            if (values.pincode != null) {
              formData.append("pincode", values.pincode);
            }
            if (values.city != null) {
              formData.append("city", values.city);
            }
            if (values.phone_no != null) {
              formData.append("mobile_no", values.phone_no);
            }
          }
          formData.append(
            "slug",
            filteredUnderData[0].ledger_form_parameter_slug.toLowerCase()
          );
          // if (values.is_private != "") {
          //   formData.append("is_private", values.is_private.value);
          // }
          formData.append("bankDetails", JSON.stringify(BankList));

          for (let [name, value] of formData) {
            console.log(`${name} = ${value}`); // key1 = value1, then key2 = value2
          }
          editLedger(formData)
            .then((response) => {
              let res = response.data;
              if (response.data.responseStatus === 200) {
                openModal(response.data.message, "cnf");

                // if (this.state.source != "") {
                //   eventBus.dispatch("page_change", {
                //     from: "ledgercreate",
                //     to: this.state.source.from_page,
                //     prop_data: {
                //       ...this.state.source,
                //     },
                //     isNewTab: false,
                //   });
                //   this.setState({ source: "" });
                // } else {
                //   eventBus.dispatch("page_change", "ledgerlist");
                // }

                this.props.history.push(`/master/ledger/ledger-list`);
                resetForm();

                this.setLedgerCode();
              } else {
                openModal(res.message);
                setSubmitting(false);

                // toast.error("Error" + response.message);
              }
            })
            .catch((error) => { });
        }
      }}
    >
      {({
        values,
        errors,
        touched,
        // status,
        setFieldValue,
        handleChange,
        handleSubmit,
        isSubmitting,
        resetForm,
        handleBlur,
      }) => (
        <Form
          noValidate
          // onSubmit={handleSubmit}
          autoComplete="off"
        >
          <div>
            {/* Reusable Modal */}
            <ConfirmationModal
              isOpen={ConfirmModal}
              onRequestClose={closeModal}
              onConfirm={() => handleConfirmSubmit(handleSubmit)}
              text={`Are you sure you want to submit ?`}
            />

            {/* Reusable Modal */}
            <DeleteConfirmationModal
              isOpen={DeleteConfirmation}
              onRequestClose={closeModal}
              // onConfirm={() => handleConfirmSubmit(handleSubmit)}
              text={`Are you sure you want to Delete ?`}
            />

            {/* Reusable Modal */}
            <ResponseModal
              isOpen={false}
              onRequestClose={closeModal}
              // onConfirm={() => handleConfirmSubmit(handleSubmit)}
              text={`Response Submited Successfully`}
            />
            {/* Console Blocks */}
            {console.log("InitVal: ", InitVal)}
            {/* Reusable Modal */}
            <ResponseModal
              isOpen={ResModal}
              onRequestClose={closeModal}
              // onConfirm={() => handleConfirmSubmit(handleSubmit)}
              text={`${ResText}`}
              LogoType={`${LogoType}`}
            />

            <div
              className="content-wrapper scrollable-div"
              style={{ position: "fixed", width: "96%" }}
            >
              {/* <button onClick={handleModal1}>test</button>
              <button onClick={handleModal2}>test1</button> */}

              <div className="pagePathLayout row">
                <div className="col-lg-11 header-title">
                  <span className="bold">{location.pathname}</span>
                </div>
                {/* <div className="col-lg-1">
                  <Link to="/Dashboard/Tranx/ledger-create">
                    <img src={AddBtn} alt="" className="btn-add " />
                  </Link>
                </div> */}
              </div>

              <div className="col-lg-12 path-label">
                <span>{name}</span>
              </div>
              <div className="col-lg-12 path-label2">
                <span>Manage All {name} Related Information</span>
              </div>

              <div
                className="s"
                style={{
                  position: "fixed",
                  width: "93.8%",
                  padding: "10px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                }}
              >
                <div
                  className="s"
                  style={{
                    position: "fixed",
                    width: "93.8%",
                    padding: "10px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                  }}
                >
                  {/* Your existing content goes here */}
                  <div className="blockcntnr">
                    <div>
                      <div className="row">
                        <div
                          className="col-lg-2 subText"
                        // style={{ width: "1798px", height: "18px", flexShrink: "0" }}
                        >
                          Create Ledger
                        </div>
                        <div className="col-lg-10">
                          <hr className="strHr"></hr>
                        </div>
                        {/* <Button className="submit-btn" onClick={openModal}>
                          ss
                        </Button> */}
                      </div>

                      <div className="row mt-2 rowLay">
                        <div className="col-lg-4">
                          <div class="textOnInput">
                            <CustomInput
                              label="Ledger Name"
                              className={`form-control ${touched.ledgerName && errors.ledgerName
                                ? "is-invalid"
                                : ""
                                }`}
                              type="text"
                              id="ledgerName"
                              name="ledgerName"
                              value={values.ledgerName}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                        </div>

                        <div className="col-lg-2">
                          <div class="textOnInput">
                            <CustomSelect
                              label="Under Group"
                              className={`form-control ${touched.underId && errors.underId
                                ? "is-invalid"
                                : ""
                                }`}
                              id="underId"
                              name="underId"
                              data={UnderValue}
                              value={values.underId}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div class="textOnInput">
                            <CustomInput
                              label="Opening Balance"
                              className={`form-control ${touched.openingBal && errors.openingBal
                                ? "is-invalid"
                                : ""
                                }`}
                              type="text"
                              id="openingBal"
                              name="openingBal"
                              value={values.openingBal}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                        </div>
                        {console.log("values: ", values)}
                        <div className="col-lg-2">
                          <div class="textOnInput">
                            <CustomSelect
                              label="Ac Type"
                              className={`form-control ${touched.openingBalType && errors.openingBalType
                                ? "is-invalid"
                                : ""
                                }`}
                              id="openingBalType"
                              name="openingBalType"
                              data={openingBalTypeList}
                              value={values.openingBalType}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {console.log("values.underId: ", values.underId)}

                  {/* Dynamic Bank Account content goes here */}
                  {values.underId && values.underId == "3_2" ? (
                    <div
                      className="blockcntnr mt-3"
                    // style={{ border: "1px solid black" }}
                    >
                      {/* <hr></hr> */}
                      <div>
                        <div className="row">
                          <div
                            className="col-lg-2 subText"
                          // style={{ width: "1798px", height: "18px", flexShrink: "0" }}
                          >
                            Bank Details
                          </div>
                          <div className="col-lg-10">
                            <hr className="strHr"></hr>
                          </div>
                          {/* <Button className="submit-btn" onClick={openModal}>
                          ss
                        </Button> */}
                        </div>

                        <div className="row mt-2 rowLay">
                          <div className="col-lg-3">
                            <div class="textOnInput">
                              <CustomInput
                                label="Bank Name"
                                className={`form-control ${touched.bank_name && errors.bank_name
                                  ? "is-invalid"
                                  : ""
                                  }`}
                                type="text"
                                id="bank_name"
                                name="bank_name"
                                value={values.bank_name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </div>
                          </div>

                          <div className="col-lg-3">
                            <div class="textOnInput">
                              <CustomInput
                                label="Account Number"
                                className={`form-control ${touched.bank_account_no &&
                                  errors.bank_account_no
                                  ? "is-invalid"
                                  : ""
                                  }`}
                                type="text"
                                id="bank_account_no"
                                name="bank_account_no"
                                value={values.bank_account_no}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </div>
                          </div>

                          <div className="col-lg-3">
                            <div class="textOnInput">
                              <CustomInput
                                label="IFSC Code"
                                className={`form-control ${touched.bank_ifsc_code &&
                                  errors.bank_ifsc_code
                                  ? "is-invalid"
                                  : ""
                                  }`}
                                type="text"
                                id="bank_ifsc_code"
                                name="bank_ifsc_code"
                                value={values.bank_ifsc_code}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </div>
                          </div>

                          <div className="col-lg-3">
                            <div class="textOnInput">
                              <CustomInput
                                label="Branch"
                                className={`form-control ${touched.bank_branch && errors.bank_branch
                                  ? "is-invalid"
                                  : ""
                                  }`}
                                type="text"
                                id="bank_branch"
                                name="bank_branch"
                                value={values.bank_branch}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}

                  {/* Dynamic Tax Details content goes here */}
                  {values.underId && values.underId == "6_6" ? (
                    <div
                      className="blockcntnr mt-3"
                    // style={{ border: "1px solid black" }}
                    >
                      {/* <hr></hr> */}
                      <div>
                        <div className="row">
                          <div
                            className="col-lg-2 subText"
                          // style={{ width: "1798px", height: "18px", flexShrink: "0" }}
                          >
                            Tax Details
                          </div>
                          <div className="col-lg-10">
                            <hr className="strHr"></hr>
                          </div>
                        </div>

                        <div className="row mt-2 rowLay">
                          <div className="col-lg-3">
                            <div class="textOnInput">
                              <CustomSelect
                                label="Tax Type"
                                className={`form-control ${touched.tax_type && errors.tax_type
                                  ? "is-invalid"
                                  : ""
                                  }`}
                                id="tax_type"
                                name="tax_type"
                                data={tax_typeList}
                                value={values.tax_type}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}

                  {/* Submit and cancel buttons */}
                  <div style={{ marginTop: "16px" }}>
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
                          type="submit"
                          onClick={() => {
                            navigate("/Dashboard/Tranx/ledger");
                          }}
                        >
                          Cancel
                        </Button>
                      </div>



                      {/* <div className="col-lg-1">
                        <Button
                          className="submit-btn"
                          type="button"
                          onClick={openModal}
                        >
                          Submit
                        </Button>
                      </div> */}

                      <div className="col-lg-1">
                        <Button className="submit-btn" type="submit">
                          Update
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
