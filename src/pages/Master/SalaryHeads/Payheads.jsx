import React, { useEffect, useState } from "react";
import AddBtn from "../../../assets/images/MenuButton.png";
import BackBtn from "../../../assets/images/back.png";
import { useLocation } from "react-router-dom";
import { Col, Row, Table, Form, Modal, Card, Button } from "react-bootstrap";
import * as Yup from "yup";
import { Formik, ErrorMessage } from "formik";
import edit from "../../../assets/images/edit.png";
import Delete from "../../../assets/images/delete.png";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import CustomInput from "../../../components/CustomInputs";
import {
  getUnderList,
  createPayhead,
  payheadList,
  findPayhead,
  updatePayhead,
  deletePayhead,
} from "@/services/api_functions";
import { OnlyEnterNumbers } from "@/helpers";
import moment from "moment";
import { } from "../../../services/api_functions/branch.service";
import CustomToggleSwitch from "../../../components/CustomToggleSwitch";
import CustomToggleSwitchForModal from "../../../components/CustomToggleSwitchForModal";
import CustomSelect from "../../../components/CustomSelect";
import { isActionExist } from "../../../helpers/constants";
import { WithUserPermission } from "../../../helpers/WithUserPermission";
import ResponseModal from "../../../components/ResponseModal";
import DeleteConfirmationModal from "../../../components/DeleteConfirmationModal";

function Payheads(props) {
  const location = useLocation();
  const pathArray = location.pathname.split("/"); // Split the path into an array
  const name = pathArray[pathArray.length - 1]; // Get the last element of the array

  const [showModal, setShowModal] = useState(false); // State to control the modal visibility
  const [showModalEdit, setShowModalEdit] = useState(false); // State to control the modal visibility
  const [branch, setPayhead] = useState([]);
  const [filteredBranch, setFilteredPayhead] = useState([]);
  const [payheadObject, setPayheadObject] = useState("");
  const [underGroupdata, setUnderGroup] = useState([]);
  const [percentageOfOptData, setPercentageOfOptData] = useState([]);

  const [ResModal, setResModal] = useState(false);
  const [ResText, setResText] = useState(false);
  const [LogoType, setLogoType] = useState("");
  const [rowId, setrowId] = useState();
  const [DeleteConfirmation, setDeleteConfirmation] = useState();
  const [DeleteId, setDeleteId] = useState()

  useEffect(() => {
    // This effect will run whenever resText changes
    if (ResText) {
      // Check if ResText is not empty, and then open the modal
      setResModal(true);
    }
  }, [ResText]);

  const openModal = (text, logo_type, id) => {
    // Update the state to set the text
    setLogoType(logo_type);
    setResText(text);
    setrowId(id)
  };

  //Modal for Delete
  const openModalForDelete = (id) => {
    setDeleteId(id);
    setDeleteConfirmation(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setResModal(false);
    setDeleteConfirmation(false);
    setResText("");
    // navigate("/Dashboard/Tranx/receipt");
  };

  // Function to handle form submission with confirmation
  const handleConfirmSubmit = () => {
    // handleSubmit();
    // onDelete(rowId)
    closeModal(); // Close the modal after submission
  };
  // ... (other methods)

  const handleAddNew = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCloseModalEdit = () => {
    setShowModalEdit(false);
  };

  // Placeholder state functions for missing definitions
  const setEditModalShow = (status) => {
    console.log("setEditModalShow: ", status);
  };

  const setcurrentIndex = (index) => {
    console.log("setcurrentIndex: ", index);
  };

  useEffect(() => {
    getPayheadList();
    lstUnders();
  }, []);

  //List API Function
  const getPayheadList = () => {
    payheadList()
      .then((response) => {
        let res = response.data;
        if (res.responseStatus === 200) {
          let options = res.response.map(function (data) {
            return {
              value: data.id,
              label: data.payheadName,
            };
          });
          setPercentageOfOptData(options);
          setPayhead(res.response);
          setFilteredPayhead(res.response);
        }
      })
      .catch((error) => {
        setPayhead([]);
        setFilteredPayhead([]);
        openModal(error, "error");
      });
  };

  //Before Editing Finding the record by Id
  const handleAddNewEdit = (status, id, rowIndex) => {
    if (status) {
      setcurrentIndex(rowIndex);
      let reqData = { id: id };

      findPayhead(reqData)
        .then((response) => {
          if (response.data.responseStatus === 200) {
            let res = response.data.response
            const {
              id,
              name,
              percentage,
              percentageOf,
              isDeduction,
              showInEmpCreation,
              principle_id,
              opening_bal_type,
            } = res;
            let options = {
              id: id,
              payheadName: name,
              percentage: percentage,
              percentageOf: percentageOf,
              isDeduction: isDeduction,
              showinempOnboarding: showInEmpCreation,
              underGroup: principle_id,
              openingBalType: opening_bal_type,
            }
            setPayheadObject(options);
            setcurrentIndex(0);
            setShowModalEdit(status);
            setShowModalEdit(true);

          } else {
            openModal("Data Not Found", "error");
          }
        })
        .catch((error) => {
          openModal(error, "error");
        });
    } else {
      setEditModalShow(status);
      setcurrentIndex(0);
    }
  };


  //Delete API Function
  const onDelete = (id) => {
      let requestData = {
        id: id,
      };
      deletePayhead(requestData)
        .then((response) => {
          if (response.data.responseStatus === 200) {
            openModal(response.data.message, "cnf");
            getPayheadList();
          } else {
            openModal(response.data.message, "error");
          }
        })
        .catch((error) => {
          openModal(error, "error");
          // handle error
        });
  };


  //List of Opening Balance to Select One in the field(Static).
  const openingBalTypeList = [
    {
      id: 1,
      label: "DR",
    },
    {
      id: 2,
      label: "CR",
    },
  ];

  //List of UnderGroup to Select One in the field(Dynamic).
  const lstUnders = () => {
    getUnderList()
      .then((response) => {
        let res = response.data;
        if (res.responseStatus === 200) {
          let data = res.responseObject;
          let Opt = data.map((v, i) => {
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
          setUnderGroup(Opt);
        }
      })
      .catch((error) => {
        setUnderGroup([]);
        openModal(error, "error");
      });
  };

  return (
    <div>
      {/* Reusable Modal */}
      <ResponseModal
        isOpen={ResModal}
        onRequestClose={closeModal}
        onConfirm={() => handleConfirmSubmit()}
        text={`${ResText}`}
        LogoType={`${LogoType}`}
      />

      <DeleteConfirmationModal
        DeleteConfirmationModal={DeleteConfirmation}
        onRequestClose={closeModal}
        onConfirm={() => onDelete(DeleteId)}
        text={`Are you sure you want to Delete ?`}
      />
      <div
        className="content-wrapper scrollable-div"
        style={{ position: "fixed", width: "96%" }}
      >
        <div className="pagePathLayout row">
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
            {isActionExist("salary-heads", "create", props.userPermissions) && (
            <div className="col-lg-1 header-add-btn" onClick={handleAddNew}>
              <img src={AddBtn} alt="" className="btn-add " />
            </div>
            )}
          </OverlayTrigger>
        </div>

        <div className="col-lg-12 path-label">
          <span>{name}</span>
        </div>
        <div className="col-lg-12 path-label2">
          <span>Manage All {name} Related Information</span>
        </div>

        <div className=" scrollable-div-page">
          <Row>
            <Col className="list-table">
              <Table className="table-hover">
                <thead className="list-thead">
                  <tr>
                    <th className="table-th text-light">SR NO</th>
                    <th className="table-th text-light">Payhead Name</th>
                    <th className="table-th text-light">Percentage</th>
                    <th className="table-th text-light">Percentage Of</th>
                    <th className="table-th text-light">Created Date</th>
                    <th className="table-th text-light">Actions</th>
                  </tr>
                </thead>

                <tbody style={{ maxHeight: "300px", overflowY: "auto" }}>
                  {filteredBranch.length > 0 ? (
                    filteredBranch.map((v, i, record) => (
                      <tr
                        style={{ backgroundColor: "D9D9D9" }}
                        onDoubleClick={() => handleAddNewEdit(true, v.id, i)}
                      >
                        <td>{i + 1}</td>
                        <td>{v.payheadName}</td>
                        <td>{v.percentage}</td>
                        <td>{v.percentageOf}</td>
                        <td>
                          {moment(v.createdDate).format("DD-MM-yyyy")}
                        </td>
                        {v.isDefault === false && (
                          <td align="left">
                          {isActionExist(
                            "salary-heads",
                            "delete",
                            props.userPermissions
                          ) && (
                          <img
                            src={Delete}
                            alt=""
                            className="img-delete"
                                onClick={() => openModalForDelete(v.id)}
                              />
                            )}{" "}
                          {isActionExist(
                            "salary-heads",
                            "edit",
                            props.userPermissions
                          ) && ( 
                          <img
                            src={edit}
                            alt=""
                            className="img-edit"
                            onClick={() => handleAddNewEdit(true, v.id, i)}
                          />
                            )}
                        </td>
                        )}
                        {v.isDefault === true && (
                          <td align="right">

                          </td>
                        )}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="text-center">
                        No Data Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Col>
          </Row>
        </div>
      </div>

      {/* Add Modal */}
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        className="custom-modal"
        centered
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content modal-height-width ">
            {/* <Modal.Header className='pb-0' > */}
            {/*  */}
            <div className="pagePathLayout-modal row">
              <span className="bold" style={{ height: "38px", marginTop: "7px" }}>
                {" "}
                <OverlayTrigger
                  style={{}}
                  placement="right"
                  overlay={
                    <Tooltip id="tooltip" className="tooltip-back-btn">
                      Back
                    </Tooltip>
                  }
                >
                  <img
                    src={BackBtn}
                    alt=""
                    className="modal-header-backbtn"
                    onClick={handleCloseModal}
                  />
                </OverlayTrigger>
                <span className="modal-header-span">{location.pathname}</span>
              </span>
            </div>
            <Formik
              initialValues={{
                payheadName: "",
                percentage: "",
                percentageOf: "",
                isDeduction: "",
                underGroup: "",
                showinempOnboarding: "",
                openingBalType: "",
              }}
              validationSchema={Yup.object().shape({
                payheadName: Yup.string().trim().required(" "),
                percentage: Yup.string().trim().required(" "),
                percentageOf: Yup.string().trim().required(" "),
                underGroup: Yup.string().trim().required(" "),
                openingBalType: Yup.string().trim().required(" "),
              })}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                console.log(underGroupdata);
                let filteredData = underGroupdata.find((v) => v.value == values.underGroup)
                console.log("filteredData", filteredData);
                let requestData = {
                  payheadName: values.payheadName,
                  percentage: values.percentage,
                  payheadId: values.percentageOf,
                  is_dedcution: values.isDeduction,
                  principle_id: filteredData.principle_id,
                  under_prefix: filteredData.under_prefix,
                  principle_name: filteredData.principle_name,
                  show_in_emp_creation: values.showinempOnboarding,
                  opening_bal_type: values.openingBalType,
                };
                console.log("request Data >>", JSON.stringify(requestData));
                createPayhead(requestData)
                  .then((response) => {
                    console.log("response>>", response);
                    if (response.data.responseStatus === 200) {
                      setSubmitting(false);
                      resetForm();
                      openModal(response.data.message, "cnf");
                      setShowModal(false);
                      getPayheadList();
                    } else {
                      setSubmitting(false);
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
                setFieldValue,
                handleChange,
                handleSubmit,
                isSubmitting,
                resetForm,
                handleBlur,
              }) => (
                <Form noValidate onSubmit={handleSubmit} autoComplete="off">
                  <div className="modal-fields-row1-payhead row">
                    <div className="col-lg-4">
                      <div class="textOnInput">
                        <CustomInput
                          className={`form-control ${touched.payheadName && errors.payheadName
                            ? "is-invalid"
                            : ""
                            }`}
                          type="text"
                          id="payheadName"
                          label="Payhead Name"
                          name="payheadName"
                          value={values.payheadName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                    </div>

                    <div className="col-lg-4">
                      <div class="textOnInput">
                        <CustomInput
                          className={`form-control ${touched.percentage && errors.percentage
                            ? "is-invalid"
                            : ""
                            }`}
                          type="text"
                          id="percentage"
                          name="percentage"
                          label="Percentage"
                          value={values.percentage}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                    </div>

                    <div className="col-lg-4">
                      <div class="textOnInput">
                        <CustomSelect
                          label="Percentage Of"
                          className={`form-control ${touched.percentageOf && errors.percentageOf
                            ? "is-invalid"
                            : ""
                            }`}
                          id="percentageOf"
                          name="percentageOf"
                          data={percentageOfOptData}
                          value={values.percentageOf}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="modal-fields-row1-payhead row">
                    <div className="col-lg-4">
                      <div class="textOnInput">
                        <CustomToggleSwitchForModal
                          label="Is Deduction"
                          className={`form-control ${touched.isDeduction && errors.isDeduction
                            ? "is-invalid"
                            : ""
                            }`}
                          id="isDeduction"
                          name="isDeduction"
                          checked={values.isDeduction}
                          value={values.isDeduction}
                          onChange={() =>
                            setFieldValue("isDeduction", !values.isDeduction)
                          }
                          onBlur={handleBlur}
                        />
                      </div>
                    </div>

                    <div className="col-lg-4">
                      <div class="textOnInput">
                        <CustomSelect
                          label="Under Group"
                          className={`form-control ${touched.underGroup && errors.underGroup
                            ? "is-invalid"
                            : ""
                            }`}
                          id="underGroup"
                          name="underGroup"
                          data={underGroupdata}
                          value={values.underGroup}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                    </div>

                    <div className="col-lg-4">
                      <div class="textOnInput">
                        <CustomToggleSwitchForModal
                          label="Show in Emp Onboarding"
                          className={`form-control ${touched.showinempOnboarding && errors.showinempOnboarding
                            ? "is-invalid"
                            : ""
                            }`}
                          id="showinempOnboarding"
                          name="showinempOnboarding"
                          checked={values.showinempOnboarding}
                          value={values.showinempOnboarding}
                          onChange={() =>
                            setFieldValue("showinempOnboarding", !values.showinempOnboarding)
                          }
                          onBlur={handleBlur}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="modal-fields-row1-payhead row">


                    <div className="col-lg-4">
                        <div class="textOnInput">
                          <CustomSelect
                            label="Opening Balance Type"
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
                  <Row >
                      <Col lg="10"></Col>
                      <Col lg="2">
                        <Button
                          className="modal-submit-btn"
                          style={{ marginTop: "66px" }}
                          type="submit"
                        >
                          Submit
                        </Button>
                      </Col>
                  </Row>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </Modal>

      {/* Edit Modal */}
      <Modal
        show={showModalEdit}
        onHide={handleCloseModalEdit}
        className="custom-modal"
        centered
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content modal-height-width ">
            {/* <Modal.Header className='pb-0' > */}
            {/*  */}
            <div className="pagePathLayout-modal row" >



              <span className="bold" style={{ height: "38px", marginTop: "7px" }}>  <OverlayTrigger style={{}}
                placement="right"
                overlay={<Tooltip id="tooltip" className="tooltip-back-btn">Back</Tooltip>} //tooltip-back-btn - to adjust the tooltip according to the button.
              >

                <img src={BackBtn} alt="" className="modal-header-backbtn" onClick={handleCloseModalEdit} />

              </OverlayTrigger><span className="modal-header-span">{location.pathname}</span></span>

            </div>
            <Formik
              initialValues={{
                payheadName:
                  payheadObject != null ? payheadObject.payheadName : "",
                percentage: payheadObject != null ? payheadObject.percentage : "",
                percentageOf:
                  payheadObject != null ? payheadObject.percentageOf : "",
                isDeduction: payheadObject != null ? payheadObject.isDeduction : "",
                underGroup:
                  payheadObject != null ? payheadObject.underGroup : "",
                showinempOnboarding:
                  payheadObject != null ? payheadObject.showinempOnboarding : "",
                openingBalType:
                  payheadObject != null ? payheadObject.openingBalType : "",
              }}
              validationSchema={Yup.object().shape({
                payheadName: Yup.string().trim().required(" "),
                percentage: Yup.string().trim().required(" "),
                percentageOf: Yup.string().trim().required(" "),
                underGroup: Yup.string().trim().required(" "),
                openingBalType: Yup.string().trim().required(" "),
              })}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                let filteredData = underGroupdata.find((v) => v.value == values.underGroup)
                let requestData = {
                  id: payheadObject.id,
                  payheadName: values.payheadName,
                  percentage: values.percentage,
                  payheadId: values.percentageOf,
                  is_dedcution: values.isDeduction,
                  principle_id: filteredData.principle_id,
                  under_prefix: filteredData.under_prefix,
                  principle_name: filteredData.principle_name,
                  show_in_emp_creation: values.showinempOnboarding,
                  opening_bal_type: values.openingBalType,
                };
                console.log("request Data >>", JSON.stringify(requestData));
                updatePayhead(requestData)
                  .then((response) => {
                    console.log("response>>", response);
                    if (response.data.responseStatus === 200) {
                      setSubmitting(false);
                      handleCloseModalEdit();
                      openModal(response.data.message, "cnf");
                      getPayheadList();
                    } else {
                      setSubmitting(false);
                      openModal(response.data.message, "error");
                    }
                  })
                  .catch((error) => {
                    openModal(error, "error");
                    setSubmitting(false);
                  });
              }}
            >
              {({
                values,
                errors,
                touched,
                setFieldValue,
                handleChange,
                handleSubmit,
                isSubmitting,
                resetForm,
                handleBlur,
              }) => (
                <Form noValidate onSubmit={handleSubmit} autoComplete="off">
                  <div className="modal-fields-row1-payhead row">
                    <div className="col-lg-4">
                      <div class="textOnInput">
                        <CustomInput
                          className={`form-control ${touched.payheadName && errors.payheadName
                            ? "is-invalid"
                            : ""
                            }`}
                          type="text"
                          id="payheadName"
                          label="Payhead Name"
                          name="payheadName"
                          value={values.payheadName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                    </div>

                    <div className="col-lg-4">
                      <div class="textOnInput">
                        <CustomInput
                          className={`form-control ${touched.percentage && errors.percentage
                            ? "is-invalid"
                            : ""
                            }`}
                          type="text"
                          id="percentage"
                          name="percentage"
                          label="Percentage"
                          value={values.percentage}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                    </div>

                    <div className="col-lg-4">
                      <div class="textOnInput">
                        <CustomSelect
                          label="Percentage Of"
                          className={`form-control ${touched.percentageOf && errors.percentageOf
                            ? "is-invalid"
                            : ""
                            }`}
                          id="percentageOf"
                          name="percentageOf"
                          data={percentageOfOptData}
                          value={values.percentageOf}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="modal-fields-row1-payhead row">
                    <div className="col-lg-4">
                      <div class="textOnInput">
                        <CustomToggleSwitchForModal
                          label="Is Deduction"
                          className={`form-control ${touched.isDeduction && errors.isDeduction
                            ? "is-invalid"
                            : ""
                            }`}
                          id="isDeduction"
                          name="isDeduction"
                          checked={values.isDeduction ? true : false}
                          value={values.isDeduction}
                          onChange={() =>
                            setFieldValue("isDeduction", !values.isDeduction)
                          }
                          onBlur={handleBlur}
                        />
                      </div>
                    </div>

                    <div className="col-lg-4">
                      <div class="textOnInput">
                        <CustomSelect
                          label="Under Group"
                          className={`form-control ${touched.underGroup && errors.underGroup
                            ? "is-invalid"
                            : ""
                            }`}
                          id="underGroup"
                          name="underGroup"
                          data={underGroupdata}
                          value={values.underGroup}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                    </div>

                    <div className="col-lg-4">
                      <div class="textOnInput">
                        <CustomToggleSwitchForModal
                          label="Show in Emp Onboarding"
                          className={`form-control ${touched.showinempOnboarding && errors.showinempOnboarding
                            ? "is-invalid"
                            : ""
                            }`}
                          id="showinempOnboarding"
                          name="showinempOnboarding"
                          checked={values.showinempOnboarding ? true : false}
                          value={values.showinempOnboarding}
                          onChange={() =>
                            setFieldValue("showinempOnboarding", !values.showinempOnboarding)
                          }
                          onBlur={handleBlur}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="modal-fields-row1-payhead row">


                    <div className="col-lg-4">
                      <div class="textOnInput">
                        <CustomSelect
                          label="Opening Balance Type"
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

                  <Row >

                      <Col lg="10"></Col>
                      <Col lg="2">
                        <Button
                          className="modal-submit-btn"
                          style={{ marginTop: "66px" }}
                          type="submit"
                        >
                          Update
                        </Button>
                      </Col>
                  </Row>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default WithUserPermission(Payheads);
