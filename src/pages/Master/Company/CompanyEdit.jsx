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
import { Formik, Form } from "formik";
import * as Yup from "yup";
import CustomInput from "../../../components/CustomInputs";
import CustomToggleSwitch from "../../../components/CustomToggleSwitch";
import CustomSelect from "../../../components/CustomSelect";
import { useState } from "react";
import moment from "moment";

import {
  updateCompany,
  findCompany,
  getAllMasterSystemConfig,
  getStateData,
  getGstData,
} from "../../../services/api_functions";
import ResponseModal from "../../../components/ResponseModal";

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

  const [CompanyEditData, setCompanyEditData] = useState([]);

  const [openRow, setOpenRow] = useState(null);
  const [ResModal, setResModal] = useState(false);
  const [ResText, setResText] = useState(false);
  const [LogoType, setLogoType] = useState("");

  useEffect(() => {
    // This effect will run whenever resText changes
    if (ResText) {
      // Check if ResText is not empty, and then open the modal
      setResModal(true);
    }
  }, [ResText]);

  const handleConfirmSubmit = () => {
    // handleSubmit();
    closeModal(); // Close the modal after submission
  };

  const openModal = (text, logo_type) => {
    // Update the state to set the text
    setLogoType(logo_type);
    setResText(text);
  };

  // Function to close the modal
  const closeModal = () => {
    setResModal(false);
    navigate("/Dashboard/Master/company");
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
          // if (setVal != null && options.length > 0) {
          //   let desg = getSelectValue(options, setVal);
          //   props.setFieldValue("designationId", desg);
          // }
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
              value: data.id,
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

  const getCompanyDataById = () => {
    let requestData = {
      id: location.state.id, //yearMonth,
    };

    findCompany(requestData)
      .then((response) => {
        if (response.status == 200) {
          let res = response.data.response;
          console.log(res);
          console.log(res.companyCode);
          console.log(res.configArray);
          // setOptionsSystemConf(res.configArray);

          const {
            company_id,
            companyCode,
            companyName,
            companyType,
            regAddress,
            regPincode,
            regArea,
            regCityId,
            regStateId,
            regCountryId,
            sameAsReg,
            corpAddress,
            corpPincode,
            corpArea,
            corpCityId,
            corpStateId,
            pfRegistrationNumber,
            ptRegistrationNumber,
            corpCountryId,
            licenseNo,
            licenseExpiryDate,
            websiteUrl,
            emailId,
            mobileNumber,
            whatsappNumber,
            currency,
            gstApplicable,
            gstNumber,
            gstTypeId,
            gstApplicableDate,
            user,
            gstApplicationDate,
            isCompanyActive,
            isCompanyVerified,
            pfRegistration,
            esiRegistration,
            ptRegistration,
            createdAt,
            createdBy,
            updatedAt,
            updatedBy,
            isCompanyEsic,
            isCompanyPf,
            isCompanyPt,
            configArray,
            sameAsRegisterAddress,
            holidayFromDate,
            holidayToDate,
          } = res;

          let options = {
            company_id: company_id,
            companyCode: companyCode,
            companyName: companyName,
            companyType: companyType,
            cType: "",

            // Registered Address
            address: regAddress,
            area: regArea,
            pincode: regPincode,
            city: regCityId,
            state: regStateId,
            country: regCountryId,

            // Corporate Address
            Caddress: corpAddress,
            Carea: corpArea,
            Cpincode: corpPincode,
            Ccity: corpCityId,
            Cstate: corpStateId,
            Ccountry: corpCountryId,

            // License Information
            licenseNumber: licenseNo,
            liceseExpiry: licenseExpiryDate,
            holidayFromDate: holidayFromDate,
            holidayToDate: holidayToDate,

            // other
            email: emailId,
            mobile: mobileNumber,
            whatsApp: whatsappNumber,
            currency: currency,
            gst: gstNumber,

            // Admin Details
            a_fullname: user.fullname,
            a_email: user.email,
            a_mobile: user.mobile,
            a_username: user.username,
            password: user.password,

            // Toggle Switches
            // empOfGeneration: false,
            esic: isCompanyEsic,
            isCompanyPf: isCompanyPf,
            pt: isCompanyPt,

            gstApplicable: gstApplicable,
            gstNumber: gstNumber,
            gstTypeId: gstTypeId,
            gstApplicableDate: gstApplicableDate,

            pf_num: pfRegistrationNumber,
            pt_num: ptRegistrationNumber,
            sameAsAbove: sameAsRegisterAddress,

            systemConfig: configArray,
          };

          setOptionsSystemConf(configArray);

          console.log("opt==>", options);
          setCompanyEditData(options);
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
              value: data.id,
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
    getGstType();
    getCompanyDataById();
    getState();
    // getSystemConfig();
    console.log("🚀 ~ file: Page1.jsx:7 ~ useEffect ~ props:", location);
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

  const companyType = [
    {
      value: 0,
      label: "LTD",
    },
    {
      value: 1,
      label: "PVT.LTD",
    },
    {
      value: 2,
      label: "LTD",
    },
  ];

  const CountryList = [
    {
      id: 1,
      value: 1,
      label: "India",
    },
    {
      id: 2,
      value: 2,
      label: "US",
    },
    {
      id: 3,
      value: 3,
      label: "UK",
    },
  ];

  const cityList = [
    {
      id: 1,
      value: 1,
      label: "Solapur",
    },
    {
      id: 2,
      value: 2,
      label: "Pune",
    },
    {
      id: 3,
      value: 3,
      label: "Mumbai",
    },
  ];

  const [SubmitModal, setSubmitModal] = useState(false);
  const [SubmitModal1, setSubmitModal1] = useState(false);

  const navigate = useNavigate();

  const [modal1Visible, setModal1Visible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);

  // Function to handle modal visibility
  const handleModal1 = () => setModal1Visible(!modal1Visible);
  const handleModal2 = () => setModal2Visible(!modal2Visible);

  console.log("CompanyEditData: ", CompanyEditData.companyCode);

  return (
    <Formik
      // validateOnChange={false}
      //   validateOnBlur={false}
      enableReinitialize={true}
      initialValues={CompanyEditData}
      validationSchema={Yup.object().shape({
        companyCode: Yup.string().trim().required(" "),
        pincode: Yup.string()
          .required()
          .matches(/^[0-9]+$/, "Must be only digits")
          .min(6, 'Must be exactly 6 digits')
          .max(6, 'Must be exactly 6 digits'),
        holidayFromDate: Yup.string()
          .trim()
          .required(" "),
        holidayToDate: Yup.string()
          .trim()
          .required(" "),
        // companyName: Yup.string().trim().required(" "),
        // companyType: Yup.string().trim().required(" "),
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
        // a_fullname: Yup.string().trim().required(" "),
        // a_email: Yup.string().trim().required(" "),
        // a_mobile: Yup.string().trim().required(" "),
        // a_username: Yup.string().trim().required(" "),
        // password: Yup.string().trim().required(" "),

        // // Toggle Switches
        // empOfGeneration: Yup.string().trim().required(" "),
        // esic: Yup.string().trim().required(" "),
        // isCompanyPf: Yup.string().trim().required(" "),
        // pt: Yup.string().trim().required(" "),
      })}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        console.log(
          "🚀 ~ file: CompanyCreate.jsx:112 ~ Page1 ~ values:",
          values
        );

        console.log(values.cType.name);

        const systemConfigJSON = JSON.stringify(OptionsSystemConf);
        console.log('systemConfigJSON: ', systemConfigJSON);

        // const systemConfigJSON =
        //   OptionsSystemConf.length > 0 ? JSON.stringify(OptionsSystemConf) : "";
        // console.log("systemConfigJSON: ", systemConfigJSON);

        let requestData = new FormData();

        requestData.append("id", values.company_id);
        requestData.append("companyName", values.companyName);
        requestData.append("companyType", values.companyType);
        requestData.append("companyCode", values.companyCode);
        requestData.append("mobileNumber", values.mobile);
        requestData.append("whatsappNumber", values.whatsApp);
        requestData.append("emailId", values.email);
        requestData.append("companyLogo", values.cType.name);

        requestData.append("regAddress", values.address);
        requestData.append("regPincode", values.pincode);
        requestData.append("regArea", values.area);
        requestData.append("regCityId", values.city ? values.city : "");
        requestData.append("regStateId", values.state ? values.state : "");
        requestData.append(
          "regCountryId",
          values.country ? values.country : ""
        );

        requestData.append("sameAsRegisterAddress", values.sameAsAbove); //need to state

        requestData.append("corpAddress", values.Caddress);
        requestData.append("corpPincode", values.Cpincode);
        requestData.append("corpArea", values.Carea);
        requestData.append("corpCityId", values.Ccity ? values.Ccity : "");
        requestData.append("corpStateId", values.Cstate ? values.Cstate : "");
        requestData.append(
          "corpCountryId",
          values.Ccountry ? values.Ccountry : ""
        );
        requestData.append("licenseNo", values.licenseNumber);

        // requestData.append("licenseExpiryDate", values.liceseExpiry);
        // requestData.append("websiteUrl", "web url test"); //need to state
        // requestData.append("currency", values.currency);
        // requestData.append("gstApplicable", "yes"); //need to state
        // requestData.append("gstNumber", values.gst);

        // requestData.append("isCompanyEsic", values.esic);
        // requestData.append("isCompanyPf", values.isCompanyPf);
        // requestData.append("isCompanyPt", values.pt);

        // requestData.append("pfRegistrationNumber", values.pf_num);
        // requestData.append("ptRegistrationNumber", values.pt_num);

        requestData.append("licenseExpiryDate", values.liceseExpiry);
        requestData.append(
          "holidayFromDate",
          moment(values.holidayFromDate).format("YYYY-MM-DD")
        );
        requestData.append(
          "holidayToDate",
          moment(values.holidayToDate).format("YYYY-MM-DD")
        );
        requestData.append("websiteUrl", "web url test"); //need to state
        requestData.append("currency", values.currency);
        requestData.append("gstApplicable", values.gstApplicable); //need to state
        requestData.append("gstNumber", values.gstNumber);
        requestData.append("gstTypeId", values.gstTypeId);

        requestData.append("isCompanyEsic", values.esic);
        requestData.append("isCompanyPf", values.isCompanyPf);
        requestData.append("isCompanyPt", values.pt);

        requestData.append("pfRegistrationNumber", values.pf_num);
        requestData.append("ptRegistrationNumber", values.pt_num);
        requestData.append("gstApplicableDate", values.gstApplicableDate);

        // requestData.append(
        //   "emp_of_gen",
        //   values.emp_of_gen_num ? values.emp_of_gen_num : ""
        // ); //need to state
        // requestData.append(
        //   "esic_num",
        //   values.esic_num ? values.esic_num : ""
        // );
        requestData.append(
          "pfRegistrationNumber",
          values.pf_num ? values.pf_num : ""
        ); //need to state
        requestData.append(
          "ptRegistrationNumber",
          values.pt_num ? values.pt_num : ""
        );

        requestData.append("fullName", values.a_fullname);
        requestData.append("adminEmailId", values.a_email);
        requestData.append("adminMobileNumber", values.a_mobile);

        requestData.append("username", values.a_username);
        requestData.append("password", values.password);
        requestData.append("configData", systemConfigJSON);
        console.log("requestData: ", requestData);

        // return false;
        updateCompany(requestData)
          .then((response) => {
            if (response.data.status === 200) {
              // setSubmitting(false);
              handleModal2();
              // navigate("/Dashboard/Master/Company");
              openModal(response.data.message, "cnf"); 

              // resetForm();
              // onAddModalShow(false);
              // setisLoading(false);
              // getDesignationOptions(response.data.response.id);
              // setFieldValue();
            } else {
              // setSubmitting(false);
              openModal(response.data.message, "error");
            }
          })
          .catch((error) => {
            setSubmitting(false);
            openModal(error, "error");
          });
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
            {/* Render modals */}
            {/* <Modal1 show={modal1Visible} onHide={handleModal1} />
            <Modal2 show={modal2Visible} onHide={handleModal2} /> */}


            {/* Reusable Modal */}
            <ResponseModal
              isOpen={ResModal}
              onRequestClose={closeModal}
              onConfirm={() => handleConfirmSubmit()}
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
                  <Link to="/Dashboard/Master/company-create">
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
                {/* Hide the ScrollBar but it works Properly */}
                <div className="s hide-scrollbar">
                  {/* Your existing content goes here */}
                  <div className="blockcntnr">
                    <div>
                      <div className="row">
                        <div
                          className="col-lg-2 subText"
                          // style={{ width: "1798px", height: "18px", flexShrink: "0" }}
                        >
                          Company Information
                        </div>
                        <div className="col-lg-10">
                          <hr className="strHr"></hr>
                        </div>
                      </div>

                      <div className="row mt-2 rowLay">
                        <div className="col-lg-4">
                          <div class="textOnInput">
                            <CustomInput
                              label="Company Code"
                              className={`form-control ${
                                touched.companyCode && errors.companyCode
                                  ? "is-invalid"
                                  : ""
                              }`}
                              type="text"
                              id="companyCode"
                              name="companyCode"
                              value={values.companyCode}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                        </div>

                        <div className="col-lg-4">
                          <div class="textOnInput">
                            <CustomInput
                              label="Company Name"
                              className={`form-control ${
                                touched.companyName && errors.companyName
                                  ? "is-invalid"
                                  : ""
                              }`}
                              type="text"
                              id="companyName"
                              name="companyName"
                              value={values.companyName}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                        </div>

                        <div className="col-lg-2">
                          <div class="textOnInput">
                            <CustomSelect
                              label="Company Type"
                              className={`form-control ${
                                touched.companyType && errors.companyType
                                  ? "is-invalid"
                                  : ""
                              }`}
                              id="companyType"
                              name="companyType"
                              data={companyType}
                              value={values.companyType}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                        </div>

                        <div className="col-lg-2">
                          <div class="imgInput">
                            <CustomInput
                              label="Company Logo"
                              className={`form-control ${
                                touched.cType && errors.cType
                                  ? "is-invalid"
                                  : ""
                              }`}
                              type="file"
                              id="cType"
                              name="cType"
                              // value={values.cType}
                              // onChange={handleChange}
                              onChange={(e) => {
                                setFieldValue("cType", e.target.files[0]);
                              }}
                              onBlur={handleBlur}
                            />
                            {/* <div className="form-control">
                              <label class="btn btn-default btn-file">
                                Browser
                              </label>

                              <input type="file" style={{ display: "none" }} />
                              <Button className="imgBtn" type="submit">
                                upload
                              </Button>
                            </div> */}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Registered Address */}
                    <div>
                      <div className="row mt-2">
                        <div
                          className="col-lg-2 subText"
                          // style={{ width: "1798px", height: "18px", flexShrink: "0" }}
                        >
                          Registered Address
                        </div>
                        <div className="col-lg-10">
                          <hr className="strHr"></hr>
                        </div>
                      </div>
                      <div className="row mt-2 rowLay">
                        <div className="col-lg-4">
                          <div class="textOnInput">
                            <CustomInput
                              label="Address"
                              className={`form-control ${
                                touched.address && errors.address
                                  ? "is-invalid"
                                  : ""
                              }`}
                              type="text"
                              id="address"
                              name="address"
                              value={values.address}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                        </div>

                        <div className="col-lg-4">
                          <div class="textOnInput">
                            <CustomInput
                              label="Area"
                              className={`form-control ${
                                touched.area && errors.area ? "is-invalid" : ""
                              }`}
                              type="text"
                              id="area"
                              name="area"
                              value={values.area}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                        </div>

                        <div className="col-lg-1">
                          <div class="textOnInput">
                            <CustomInput
                              label="Pincode"
                              className={`form-control ${
                                touched.pincode && errors.pincode
                                  ? "is-invalid"
                                  : ""
                              }`}
                              type="text"
                              id="pincode"
                              name="pincode"
                              value={values.pincode}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />{" "}
                          </div>
                        </div>
                        <div className="col-lg-1">
                          <div class="textOnInput">
                            <CustomSelect
                              label="City"
                              className={`form-control ${
                                touched.city && errors.city ? "is-invalid" : ""
                              }`}
                              id="city"
                              name="city"
                              data={cityList}
                              value={values.city}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                        </div>
                        <div className="col-lg-1">
                          <div class="textOnInput">
                            <CustomSelect
                              label="State"
                              className={`form-control ${
                                touched.state && errors.state
                                  ? "is-invalid"
                                  : ""
                              }`}
                              id="state"
                              name="state"
                              data={StateOptData}
                              value={values.state}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {/* <CustomInput
                              label="State"
                              className={`form-control ${
                                touched.state && errors.state
                                  ? "is-invalid"
                                  : ""
                              }`}
                              type="text"
                              id="state"
                              name="state"
                              value={values.state}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />{" "} */}
                          </div>
                        </div>
                        <div className="col-lg-1">
                          <div class="textOnInput">
                            <CustomSelect
                              label="Country"
                              className={`form-control ${
                                touched.country && errors.country
                                  ? "is-invalid"
                                  : ""
                              }`}
                              id="country"
                              name="country"
                              data={CountryList}
                              value={values.country}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Corporate Address */}
                    <div>
                      <div className="row mt-4 inputCheckLabel">
                        <div id="label" className="subText">
                          Corporate Address
                        </div>

                        <div id="check">
                          <BootForm.Check
                            name="sameAsAbove"
                            checked={values.sameAsAbove}
                            onChange={(e) => {
                              setFieldValue("sameAsAbove", e.target.checked);
                              if (e.target.checked == true) {
                                setFieldValue("Caddress", values.address);
                                setFieldValue("Carea", values.area);
                                setFieldValue("Cpincode", values.pincode);
                                setFieldValue("Ccity", values.city);
                                setFieldValue("Cstate", values.state);
                                setFieldValue("Ccountry", values.country);
                              } else {
                                setFieldValue("Caddress", "");
                                setFieldValue("Carea", "");
                                setFieldValue("Cpincode", "");
                                setFieldValue("Ccity", "");
                                setFieldValue("Cstate", "");
                                setFieldValue("Ccountry", "");
                              }
                            }}
                          ></BootForm.Check>
                        </div>
                        <div id="label2">(same as above)</div>

                        <div className="col-lg-10">
                          <hr className="strHr"></hr>
                        </div>
                      </div>

                      <div className="row mt-2 rowLay">
                        <div className="col-lg-4">
                          <div class="textOnInput">
                            <CustomInput
                              label="Address"
                              className={`form-control ${
                                touched.Caddress && errors.Caddress
                                  ? "is-invalid"
                                  : ""
                              }`}
                              type="text"
                              id="Caddress"
                              name="Caddress"
                              value={values.Caddress}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              readOnly={values.sameAsAbove}
                            />
                          </div>
                        </div>

                        <div className="col-lg-4">
                          <div class="textOnInput">
                            <CustomInput
                              label="Area"
                              className={`form-control ${
                                touched.Carea && errors.Carea
                                  ? "is-invalid"
                                  : ""
                              }`}
                              type="text"
                              id="Carea"
                              name="Carea"
                              value={values.Carea}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              readOnly={values.sameAsAbove}
                            />{" "}
                          </div>
                        </div>
                        <div className="col-lg-1">
                          <div class="textOnInput">
                            <CustomInput
                              label="Pincode"
                              className={`form-control ${
                                touched.Cpincode && errors.Cpincode
                                  ? "is-invalid"
                                  : ""
                              }`}
                              type="text"
                              id="Cpincode"
                              name="Cpincode"
                              value={values.Cpincode}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              readOnly={values.sameAsAbove}
                            />{" "}
                          </div>
                        </div>
                        <div className="col-lg-1">
                          <div class="textOnInput">
                            <CustomSelect
                              label="City"
                              className={`form-control ${
                                touched.Ccity && errors.Ccity
                                  ? "is-invalid"
                                  : ""
                              }`}
                              id="Ccity"
                              name="Ccity"
                              data={cityList}
                              value={values.Ccity}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              disabled={values.sameAsAbove}
                            />
                          </div>
                        </div>
                        <div className="col-lg-1">
                          <div class="textOnInput">
                            <CustomSelect
                              label="State"
                              className={`form-control ${
                                touched.Cstate && errors.Cstate
                                  ? "is-invalid"
                                  : ""
                              }`}
                              id="Cstate"
                              name="Cstate"
                              data={StateOptData}
                              value={values.Cstate}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              disabled={values.sameAsAbove}
                            />
                          </div>
                        </div>
                        <div className="col-lg-1">
                          <div class="textOnInput">
                            <CustomSelect
                              label="Country"
                              className={`form-control ${
                                touched.Ccountry && errors.Ccountry
                                  ? "is-invalid"
                                  : ""
                              }`}
                              id="Ccountry"
                              name="Ccountry"
                              data={CountryList}
                              value={values.Ccountry}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              disabled={values.sameAsAbove}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* License Information  */}
                    <div>
                      <div className="row mt-2">
                        <div
                          className="col-lg-2 subText"
                          // style={{ width: "1798px", height: "18px", flexShrink: "0" }}
                        >
                          License Information
                        </div>
                        <div className="col-lg-10">
                          <hr className="strHr"></hr>
                        </div>
                      </div>

                      <div className="row mt-2 rowLay">
                        <div className="col-lg-3">
                          <div class="textOnInput">
                            <CustomInput
                              label="License number"
                              className={`form-control ${
                                touched.licenseNumber && errors.licenseNumber
                                  ? "is-invalid"
                                  : ""
                              }`}
                              type="text"
                              id="licenseNumber"
                              name="licenseNumber"
                              value={values.licenseNumber}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                        </div>

                        <div className="col-lg-3">
                          <div class="textOnInput">
                            <CustomInput
                              label="License expiry"
                              className={`form-control ${
                                touched.liceseExpiry && errors.liceseExpiry
                                  ? "is-invalid"
                                  : ""
                              }`}
                              type="date"
                              id="liceseExpiry"
                              name="liceseExpiry"
                              value={values.liceseExpiry}
                              // value={moment(values.liceseExpiry).format(
                              //   "Do-MMM-YYYY"
                              // )}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                        </div>
                        <div
                          className="col-lg-2 subText"
                        // style={{ width: "1798px", height: "18px", flexShrink: "0" }}
                        >
                          Holiday Calendar
                        </div>
                        <div className="col-lg-2">
                          <div class="textOnInput">
                            <CustomInput
                              label="From Date"
                              className={`form-control ${touched.holidayFromDate && errors.holidayFromDate
                                ? "is-invalid"
                                : ""
                                }`}
                              type="date"
                              id="holidayFromDate"
                              name="holidayFromDate"
                              value={values.holidayFromDate}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                        </div>
                        <div className="col-lg-2">
                          <div class="textOnInput">
                            <CustomInput
                              label="To Date"
                              className={`form-control ${touched.holidayToDate && errors.holidayToDate
                                ? "is-invalid"
                                : ""
                                }`}
                              type="date"
                              id="holidayToDate"
                              name="holidayToDate"
                              value={values.holidayToDate}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Other */}
                    <div>
                      <div className="row mt-2">
                        <div
                          className="col-lg-2 subText"
                          // style={{ width: "1798px", height: "18px", flexShrink: "0" }}
                        >
                          Other
                        </div>
                        <div className="col-lg-10">
                          <hr className="strHr"></hr>
                        </div>
                      </div>

                      <div className="row mt-2 rowLay">
                        <div className="col-lg-3">
                          <div class="textOnInput">
                            <CustomInput
                              label="Email"
                              className={`form-control ${
                                touched.email && errors.email
                                  ? "is-invalid"
                                  : ""
                              }`}
                              type="text"
                              id="email"
                              name="email"
                              value={values.email}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                        </div>

                        <div className="col-lg-3">
                          <div class="textOnInput">
                            <CustomInput
                              label="Mobile Number"
                              className={`form-control ${
                                touched.mobile && errors.mobile
                                  ? "is-invalid"
                                  : ""
                              }`}
                              type="text"
                              id="mobile"
                              name="mobile"
                              value={values.mobile}
                              onChange={(e) => {
                                const inputValue = e.target.value;
                                // Check if the input is a valid number
                                if (!isNaN(inputValue)) {
                                  // Check if the length is less than or equal to 10
                                  if (inputValue.length <= 10) {
                                    // Update the value if it's a number and within the limit
                                    handleChange(e);
                                  }
                                  // Ignore the input if the length exceeds 10
                                }
                                // Ignore the input if it's not a number
                              }}
                              onBlur={handleBlur}
                            />{" "}
                          </div>
                        </div>

                        <div className="col-lg-2">
                          <div class="textOnInput">
                            <CustomInput
                              label="Whats App"
                              className={`form-control ${
                                touched.whatsApp && errors.whatsApp
                                  ? "is-invalid"
                                  : ""
                              }`}
                              type="text"
                              id="whatsApp"
                              name="whatsApp"
                              value={values.whatsApp}
                              onChange={(e) => {
                                const inputValue = e.target.value;
                                // Check if the input is a valid number
                                if (!isNaN(inputValue)) {
                                  // Check if the length is less than or equal to 10
                                  if (inputValue.length <= 10) {
                                    // Update the value if it's a number and within the limit
                                    handleChange(e);
                                  }
                                  // Ignore the input if the length exceeds 10
                                }
                                // Ignore the input if it's not a number
                              }}
                              onBlur={handleBlur}
                            />{" "}
                          </div>
                        </div>
                        <div className="col-lg-2">
                          <div class="textOnInput">
                            <CustomInput
                              label="Currency"
                              className={`form-control ${
                                touched.currency && errors.currency
                                  ? "is-invalid"
                                  : ""
                              }`}
                              type="text"
                              id="currency"
                              name="currency"
                              value={values.currency}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />{" "}
                          </div>
                        </div>
                        {/* <div className="col-lg-2">
                          <div class="textOnInput">
                            <CustomInput
                              label="GST"
                              className={`form-control ${
                                touched.gst && errors.gst ? "is-invalid" : ""
                              }`}
                              type="text"
                              id="gst"
                              name="gst"
                              value={values.gst}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                        </div> */}
                      </div>
                    </div>

                    {/* Admin Details */}
                    <div>
                      <div className="row mt-2">
                        <div
                          className="col-lg-2 subText"
                          // style={{ width: "1798px", height: "18px", flexShrink: "0" }}
                        >
                          Admin Details
                        </div>
                        <div className="col-lg-10">
                          <hr className="strHr"></hr>
                        </div>
                      </div>

                      <div className="row mt-2 rowLay">
                        <div className="col-lg-3">
                          <div class="textOnInput">
                            <CustomInput
                              label="Fullname"
                              className={`form-control ${
                                touched.a_fullname && errors.a_fullname
                                  ? "is-invalid"
                                  : ""
                              }`}
                              type="text"
                              id="a_fullname"
                              name="a_fullname"
                              value={values.a_fullname}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                        </div>

                        <div className="col-lg-3">
                          <div class="textOnInput">
                            <CustomInput
                              label="Email"
                              className={`form-control ${
                                touched.a_email && errors.a_email
                                  ? "is-invalid"
                                  : ""
                              }`}
                              type="text"
                              id="a_email"
                              name="a_email"
                              value={values.a_email}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />{" "}
                          </div>
                        </div>

                        <div className="col-lg-2">
                          <div class="textOnInput">
                            <CustomInput
                              label="Mobile Number"
                              className={`form-control ${
                                touched.a_mobile && errors.a_mobile
                                  ? "is-invalid"
                                  : ""
                              }`}
                              type="text"
                              id="a_mobile"
                              name="a_mobile"
                              value={values.a_mobile}
                              onChange={(e) => {
                                const inputValue = e.target.value;
                                // Check if the input is a valid number
                                if (!isNaN(inputValue)) {
                                  // Check if the length is less than or equal to 10
                                  if (inputValue.length <= 10) {
                                    // Update the value if it's a number and within the limit
                                    handleChange(e);
                                  }
                                  // Ignore the input if the length exceeds 10
                                }
                                // Ignore the input if it's not a number
                              }}
                              onBlur={handleBlur}
                            />{" "}
                          </div>
                        </div>
                        <div className="col-lg-2">
                          <div class="textOnInput">
                            <CustomInput
                              label="Username"
                              className={`form-control ${
                                touched.a_username && errors.a_username
                                  ? "is-invalid"
                                  : ""
                              }`}
                              type="text"
                              id="a_username"
                              name="a_username"
                              value={values.a_username}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />{" "}
                          </div>
                        </div>
                        <div className="col-lg-2">
                          <div class="textOnInput">
                            <CustomInput
                              label="Password"
                              className={`form-control ${
                                touched.password && errors.password
                                  ? "is-invalid"
                                  : ""
                              }`}
                              type="password"
                              id="password"
                              name="password"
                              value={values.password}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />{" "}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Toggle Switches */}
                    <div className="row mt-2 rowLay">
                      <CustomToggleSwitch
                        label="Is GST Applicable"
                        className={`form-control ${
                          touched.gstApplicable && errors.gstApplicable
                            ? "is-invalid"
                            : ""
                        }`}
                        id="gstApplicable"
                        name="gstApplicable"
                        checked={values.gstApplicable}
                        value={values.gstApplicable}
                        onChange={() =>
                          setFieldValue("gstApplicable", !values.gstApplicable)
                        }
                        onBlur={handleBlur}
                      />
                    </div>

                    {/* Toogle Input Details */}
                    <div>
                      {values.gstApplicable == true ? (
                        <div className="row mt-2 rowLay">
                          <div className="col-lg-3">
                            <div class="textOnInput">
                              <CustomInput
                                label="Gst Number"
                                className={`form-control ${
                                  touched.gstNumber && errors.gstNumber
                                    ? "is-invalid"
                                    : ""
                                }`}
                                type="text"
                                id="gstNumber"
                                name="gstNumber"
                                value={values.gstNumber}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </div>
                          </div>

                          <div className="col-lg-3">
                            <div class="textOnInput">
                              <CustomSelect
                                label="Gst Type"
                                className={`form-control ${
                                  touched.gstTypeId && errors.gstTypeId
                                    ? "is-invalid"
                                    : ""
                                }`}
                                id="gstTypeId"
                                name="gstTypeId"
                                data={GstOptData}
                                value={values.gstTypeId}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </div>
                          </div>

                          <div className="col-lg-3">
                            <div class="textOnInput">
                              <CustomInput
                                label="Gst Applicable Date"
                                className={`form-control ${
                                  touched.gstApplicableDate &&
                                  errors.gstApplicableDate
                                    ? "is-invalid"
                                    : ""
                                }`}
                                type="text"
                                id="gstApplicableDate"
                                name="gstApplicableDate"
                                value={values.gstApplicableDate}
                                // value={moment(values.liceseExpiry).format(
                                //   "Do-MMM-YYYY"
                                // )}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </div>
                          </div>
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <div className="row mt-2 rowLay">
                        <CustomToggleSwitch
                          label="ESIC"
                          className={`form-control ${
                            touched.name && errors.name ? "is-invalid" : ""
                          }`}
                          id="esic"
                          name="esic"
                          checked={values.esic}
                          value={values.esic}
                          onChange={() => setFieldValue("esic", !values.esic)}
                          onBlur={handleBlur}
                        />

                        <CustomToggleSwitch
                          label="PF Registered"
                          className={`form-control ${
                            touched.isCompanyPf && errors.isCompanyPf
                              ? "is-invalid"
                              : ""
                          }`}
                          id="isCompanyPf"
                          name="isCompanyPf"
                          checked={values.isCompanyPf}
                          value={values.isCompanyPf}
                          onChange={() =>
                            setFieldValue("isCompanyPf", !values.isCompanyPf)
                          }
                          onBlur={handleBlur}
                        />
                        {values.isCompanyPf == true ? (
                          <div className="col-lg-2">
                            <div class="textOnInput">
                              <CustomInput
                                label="PF Number"
                                className={`form-control ${touched.pf_num && errors.pf_num
                                  ? "is-invalid"
                                  : ""
                                  }`}
                                type="text"
                                id="pf_num"
                                name="pf_num"
                                value={values.pf_num}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </div>
                          </div>
                        ) : null}

                        <CustomToggleSwitch
                          label="PT"
                          className={`form-control ${
                            touched.name && errors.name ? "is-invalid" : ""
                          }`}
                          id="pt"
                          name="pt"
                          checked={values.pt}
                          value={values.pt}
                          onChange={() => setFieldValue("pt", !values.pt)}
                          onBlur={handleBlur}
                        />
                        {values.pt == true ? (
                          <div className="col-lg-2">
                            <div class="textOnInput">
                              <CustomInput
                                label="PT Number"
                                className={`form-control ${touched.pt_num && errors.pt_num
                                  ? "is-invalid"
                                  : ""
                                  }`}
                                type="text"
                                id="pt_num"
                                name="pt_num"
                                value={values.pt_num}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </div>


                    {/* <div className="row mt-2 ">
                      {values.isCompanyPf == true ? (
                        <div className="col-lg-3">
                          <div class="textOnInput">
                            <CustomInput
                              label="PF Number"
                              className={`form-control ${
                                touched.pf_num && errors.pf_num
                                  ? "is-invalid"
                                  : ""
                              }`}
                              type="text"
                              id="pf_num"
                              name="pf_num"
                              value={values.pf_num}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                        </div>
                      ) : null}

                      {values.pt == true ? (
                        <div className="col-lg-3">
                          <div class="textOnInput">
                            <CustomInput
                              label="PT Number"
                              className={`form-control ${
                                touched.pt_num && errors.pt_num
                                  ? "is-invalid"
                                  : ""
                              }`}
                              type="text"
                              id="pt_num"
                              name="pt_num"
                              value={values.pt_num}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                        </div>
                      ) : null}
                    </div> */}

                    <div>

                      <div className="row mt-2 rowlay">
                        {OptionsSystemConf.map((item, key) => {
                          console.log('item: ', item);
                          const fieldName = `systemConfToggle${key}`;
                          const isChecked = values[fieldName];

                          return (
                            <CustomToggleSwitch
                              key={key}
                              label={item.display_name}
                              className={`form-control ${
                                touched[fieldName] && errors[fieldName]
                                  ? "is-invalid"
                                  : ""
                              }`}
                              name={fieldName}
                              checked={item.value}
                              onChange={(e) => {
                                const newValues = { ...values };
                                newValues[fieldName] = !values[fieldName];

                                // if (newValues[fieldName]) {
                                // If the switch is checked, update the value to 'checked'
                                // You can update item.value if needed
                                // item.value = true;

                                // Add the item to the systemConfig array
                                const updatedOptionsSystemConf = [
                                  ...OptionsSystemConf,
                                ];
                                updatedOptionsSystemConf[key] = {
                                  ...item,
                                  value: e.target.checked, // or update as needed
                                };
                                setOptionsSystemConf(updatedOptionsSystemConf);
                                // }

                                // Update the form field value
                                setFieldValue(fieldName, !values[fieldName]);

                                // You might not need this line if "systemConfig" is not a direct field in your form values
                                // setFieldValue("systemConfig", newValues.systemConfig);
                              }}
                              onBlur={handleBlur}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Submit and cancel buttons */}
                <div style={{ marginTop: "773px" }}>
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
                              navigate("/Dashboard/Master/Company");
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
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
        </Form>
      )}
    </Formik>
  );
}
