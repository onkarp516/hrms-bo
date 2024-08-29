import React, { useEffect, useState } from "react";
import AddBtn from "../../../assets/images/MenuButton.png";
import BackBtn from "../../../assets/images/back.png";
import { useLocation, useNavigate } from "react-router-dom";
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
  createAssociateGroups,
  getLedgerGroups,
  findLedgerGroup,
  editLedgerGroups,
  deleteLedgerGroup,
  listOfLevels,
} from "@/services/api_functions";
import moment from "moment";
import CustomSelect from "../../../components/CustomSelect";
import { isActionExist } from "../../../helpers/constants";
import { WithUserPermission } from "../../../helpers/WithUserPermission";
import ResponseModal from "../../../components/ResponseModal";
import DeleteConfirmationModal from "../../../components/DeleteConfirmationModal";

function LedgerGroup(props) {
  const location = useLocation();
  const pathArray = location.pathname.split("/"); // Split the path into an array
  const name = pathArray[pathArray.length - 1]; // Get the last element of the array

  const [showModal, setShowModal] = useState(false); // State to control the modal visibility
  const [showModalEdit, setShowModalEdit] = useState(false); // State to control the modal visibility
  const [LedgerGroupObject, setLedgerGroupObject] = useState("");
  const [ledgerGroup, setLedgerGroup] = useState([]);
  const [filteredLedgerGroup, setFilteredLedgerGroup] = useState([]);
  const [LevelOptData, setLevelOptData] = useState([]);
  const [underGroupdata, setUnderGroup] = useState([]);
  const [ledgergroupOfOptData, setLedgerGroupOfOptData] = useState([]);

  const [ResModal, setResModal] = useState(false);
  const [ResText, setResText] = useState("");
  const [LogoType, setLogoType] = useState("");
  const [deptList, setdeptList] = useState([]);
  const [Submitting, setSubmitting] = useState([]);
  const [rowId, setrowId] = useState();
  const [DeleteConfirmation, setDeleteConfirmation] = useState();
  const [DeleteId, setDeleteId] = useState()

  // const [ResponseModal, setResponseModal] = useState(false);
  const navigate = useNavigate();
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
    getLedgerGroupList();
    lstUnders();
  }, []);

  //List of UnderGroup to Select One in the field(Dynamic).
  const lstUnders = () => {
    getUnderList()
      .then((response) => {
        let res = response.data;
        if (res.responseStatus === 200) {
          console.log("response.data: ", response.data);

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
              innerOpt["value"] = i;
              innerOpt["id"] = i;
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

  //List API Function
  const getLedgerGroupList = () => {
    getLedgerGroups()
      .then((responseObject) => {
        let res = responseObject.data;
        if (res.responseStatus === 200) {
          let options = res.responseObject.map(function (data) {
            return {
              value: data.id,
              label: data.principle_name,
            };
          });
          setUnderGroup(options);
          setLedgerGroup(res.responseObject);
          setFilteredLedgerGroup(res.responseObject);
        }
      })
      .catch((error) => {
        openModal(error, "error");
        setLedgerGroup([]);
        setFilteredLedgerGroup([]);
      });
  };

  //Before Editing Finding the record by Id
  const handleAddNewEdit = (status, id, rowIndex) => {
    if (status) {
      setcurrentIndex(rowIndex);
      let formdata = new FormData();
      formdata.append("id", id);

      findLedgerGroup(formdata)
        .then((response) => {
          if (response.data.responseStatus === 200) {
            console.log("hi", response.data);
            console.log("hi2", response.data.response);
            console.log("hi3", response.data.response.principleGroups);
            // console.log("hi4", response.data.response.principleGroups.groupName)
            let res = response.data.response;

            const {
              id,
              associatesName, //response coming in api
              underId,
              principleGroups,
            } = res;
            let options = {
              id: id,
              associates_group_name: associatesName, //setting the response in the fields.
              underGroup: underId,
            };
            console.log("options: ", res);

            setLedgerGroupObject(options);
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
      let formdata = new FormData();
      formdata.append("id", id);
      // let requestData = {
      //     id: id,
      // }
      deleteLedgerGroup(formdata)
        .then((response) => {
          if (response.data.responseStatus === 200) {
            openModal(response.data.message, "cnf");
            getLedgerGroupList();
            lstUnders();
          } else {
            openModal(response.data.message, "error");
          }
        })
        .catch((error) => {
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
            {isActionExist("ledger-group", "create", props.userPermissions) && (
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
                    <th className="table-th text-light">Ledger Group</th>
                    <th className="table-th text-light">Foundation</th>
                    <th className="table-th text-light">Principle</th>
                    <th className="table-th text-light">Sub Principle</th>
                    <th className="table-th text-light">Actions</th>
                  </tr>
                </thead>
                {/* {JSON.stringify(filteredLedgerGroup)} */}
                <tbody style={{ maxHeight: "300px", overflowY: "auto" }}>
                  {filteredLedgerGroup.length > 0 ? (
                    filteredLedgerGroup.map((v, i, record) => (
                      <tr
                        style={{ backgroundColor: "D9D9D9" }}
                        onDoubleClick={() =>
                          handleAddNewEdit(true, v.associates_id, i)
                        }
                      >
                        <td>{i + 1}</td>
                        <td>{v.associates_name}</td>
                        <td>{v.foundation_name}</td>
                        <td>{v.principle_name}</td>
                        <td>{v.subprinciple_name}</td>
                        <td align="left">
                          {isActionExist(
                            "ledger-group",
                            "delete",
                            props.userPermissions
                          ) && (
                            <img
                              src={Delete}
                              alt=""
                              className="img-delete"
                              onClick={() => openModalForDelete(v.associates_id)}
                            />
                          )}
                          {isActionExist(
                            "ledger-group",
                            "edit",
                            props.userPermissions
                          ) && (
                            <img
                              src={edit}
                              alt=""
                              className="img-edit"
                              onClick={() =>
                                handleAddNewEdit(true, v.associates_id, i)
                              }
                            />
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="text-center">
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
              <span className="bold">
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
                associates_group_name: "",
                underGroup: "",
              }}
              validationSchema={Yup.object().shape({
                associates_group_name: Yup.string().trim().required(" "),
                underGroup: Yup.string().trim().required(" "),
              })}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                console.log(underGroupdata);
                let filteredData = underGroupdata.find(
                  (v) => v.value == values.underGroup
                );
                console.log("filteredData", filteredData);
                let formdata = new FormData();
                formdata.append(
                  "associates_group_name",
                  values.associates_group_name
                );
                formdata.append("principle_id", filteredData.principle_id);
                formdata.append("under_prefix", filteredData.under_prefix);
                formdata.append(
                  "sub_principle_id",
                  filteredData.sub_principle_id
                );
                createAssociateGroups(formdata)
                  .then((response) => {
                    if (response.data.responseStatus === 200) {
                      setSubmitting(false);
                      resetForm();
                      openModal(response.data.message, "cnf");
                      setShowModal(false);
                      getLedgerGroupList();
                    } else {
                      openModal(response.data.message, "error");
                      setSubmitting(false);
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
                  <div className="modal-fields-row1 row">
                    <div className="col-lg-4">
                      <div class="textOnInput">
                        {/* <label for="inputText" className="common-input-label">ID</label> */}
                        <CustomInput
                          className={`form-control ${
                            touched.associates_group_name &&
                            errors.associates_group_name
                              ? "is-invalid"
                              : ""
                          }`}
                          type="text"
                          label="Ledger Group"
                          id="associates_group_name"
                          name="associates_group_name"
                          value={values.associates_group_name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          inputError={errors.associates_group_name}
                        />
                        {/* <div className="invalid-feedback">{errors.id}</div> */}
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div class="textOnInput">
                        <CustomSelect
                          label="Under Group"
                          className={`form-control ${
                            touched.underGroup && errors.underGroup
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
                  </div>
                  <div className="modal-fields-row2 row">
                    <div className="col-lg-4">
                      <div class="textOnInput"></div>
                    </div>
                    <div className="col-lg-4">
                      <div class="textOnInput"></div>
                    </div>
                    <div className="col-lg-4">
                      <div class="textOnInput"></div>
                    </div>
                  </div>
                  <Row className="mt-3">
                    <Col lg="10"></Col>
                    <Col lg="2">
                      <Button className="modal-submit-btn" type="submit">
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
            <div className="pagePathLayout-modal row">
              <span className="bold">
                {" "}
                <OverlayTrigger
                  style={{}}
                  placement="right"
                  overlay={
                    <Tooltip id="tooltip" className="tooltip-back-btn">
                      Back
                    </Tooltip>
                  } //tooltip-back-btn - to adjust the tooltip according to the button.
                >
                  <img
                    src={BackBtn}
                    alt=""
                    className="modal-header-backbtn"
                    onClick={handleCloseModalEdit}
                  />
                </OverlayTrigger>
                <span className="modal-header-span">{location.pathname}</span>
              </span>
            </div>
            <Formik
              initialValues={{
                associates_group_name:
                  LedgerGroupObject != null
                    ? LedgerGroupObject.associates_group_name
                    : "",
                underGroup:
                  LedgerGroupObject != null ? LedgerGroupObject.underGroup : "",
              }}
              validationSchema={Yup.object().shape({
                associates_group_name: Yup.string().trim().required(" "),
                underGroup: Yup.string().trim().required(" "),
              })}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                console.log("aaaa", LedgerGroupObject);
                // let requestData = {
                //     id: LedgerGroupObject.id,
                //     associates_group_name: values.associates_group_name,
                //     underGroup: values.underGroup,
                // };
                let filteredData = underGroupdata.find(
                  (v) => v.value == values.underGroup
                );
                let formdata = new FormData();
                formdata.append("associates_id", LedgerGroupObject.id);
                formdata.append(
                  "associates_group_name",
                  values.associates_group_name
                );
                formdata.append("principle_id", filteredData.principle_id);
                formdata.append("under_prefix", filteredData.under_prefix);
                if (filteredData.sub_principle_id) {
                  formdata.append(
                    "sub_principle_id",
                    filteredData.sub_principle_id
                  );
                }
                editLedgerGroups(formdata)
                  .then((response) => {
                    if (response.data.responseStatus === 200) {
                      setSubmitting(false);
                      handleCloseModalEdit();
                      openModal(response.data.message, "cnf");
                      getLedgerGroupList();
                      lstUnders();
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
                  <div className="modal-fields-row1 row">
                    <div className="col-lg-4">
                      <div class="textOnInput">
                        {/* <label for="inputText" className="common-input-label">ID</label> */}
                        <CustomInput
                          className={`form-control ${
                            touched.associates_group_name &&
                            errors.associates_group_name
                              ? "is-invalid"
                              : ""
                          }`}
                          type="text"
                          label="Ledger Group"
                          id="associates_group_name"
                          name="associates_group_name"
                          value={values.associates_group_name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          inputError={errors.associates_group_name}
                        />
                        {/* <div className="invalid-feedback">{errors.id}</div> */}
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div class="textOnInput">
                        <CustomSelect
                          label="Under Group"
                          className={`form-control ${
                            touched.underGroup && errors.underGroup
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
                  </div>
                  <div className="modal-fields-row2 row">
                    <div className="col-lg-4">
                      <div class="textOnInput"></div>
                    </div>
                    <div className="col-lg-4">
                      <div class="textOnInput"></div>
                    </div>
                    <div className="col-lg-4">
                      <div class="textOnInput"></div>
                    </div>
                  </div>
                  <Row className="mt-3">
                    <Col lg="10"></Col>
                    <Col lg="2">
                      <Button className="modal-submit-btn" type="submit">
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

export default WithUserPermission(LedgerGroup);
