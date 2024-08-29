import React, { useEffect, useState } from "react";
import AddBtn from "../../../assets/images/MenuButton.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Col, OverlayTrigger, Row, Table } from "react-bootstrap";
import edit from "../../../assets/images/edit.png";
import Delete from "../../../assets/images/delete.png";
import { listOfCompany, deleteCompany } from "@/services/api_functions";
import moment from "moment";
import DeleteConfirmationModal from "../../../components/DeleteConfirmationModal";
import { WithUserPermission } from "../../../helpers/WithUserPermission";
import { setUserPermissions } from "@/redux/userPermissions/Action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { isActionExist } from "../../../helpers/constants";
import ResponseModal from "../../../components/ResponseModal";
import Tooltip from "react-bootstrap/Tooltip";
// import { setUserControl } from "@/redux/userControl/Action";

function Company(props) {
  const location = useLocation();
  const pathArray = location.pathname.split("/"); // Split the path into an array
  const name = pathArray[pathArray.length - 1]; // Get the last element of the array
  const [Options, setOptions] = useState([]);
  const [LogoType, setLogoType] = useState("");
  const [ResText, setResText] = useState("");
  const [ResModal, setResModal] = useState(false);
  const [DeleteConfirmation, setDeleteConfirmation] = useState();
  const [DeleteId, setDeleteId] = useState();
  const [rowId, setrowId] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    getList();
    console.log("🚀 ~ file: Company.jsx:7 ~ useEffect ~ props:", location);
  }, []);
  // const pathArray = props.location.pathname.split("/"); // Split the path into an array
  // const name = pathArray[pathArray.length - 1]; // Get the last element of the array

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
    onDelete(rowId)
    closeModal(); // Close the modal after submission
  };

  const getList = () => {
    listOfCompany()
      .then((response) => {
        if (response.status == 200) {
          let res = response.data.response;
          console.log(res);
          // let options = res.map(function (data) {
          //   return {
          //     value: data.id,
          //     label: data.companyName,
          //   };
          // });
          setOptions(res);
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

  const onDelete = (did) => {
    let requestData = {
      id: did, //yearMonth,
    };

    deleteCompany(requestData)
      .then((response) => {
        if (response.status == 200) {
          openModal(response.data.message, "cnf");
          getList();
          // setCompanyEditData(options);
        } else {
          openModal(response.data.message, "error");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const searchText = [];
  const filteredData = [];

  const jsonArray = [
    {
      id: 1,
      name: "John",
      age: 30,
      city: "New York",
      action1: Delete,
      action2: edit,
    },
    {
      id: 2,
      name: "Alice",
      age: 25,
      city: "Los Angeles",
      action1: Delete,
      action2: edit,
    },
    {
      id: 3,
      name: "Bob",
      age: 35,
      city: "Chicago",
      action1: Delete,
      action2: edit,
    },
  ];

  // console.log(jsonArray);

  return (
    <div>
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
            overlay={<Tooltip id="tooltip" className="tooltip-add-btn">Create</Tooltip>}
          >
          {isActionExist("companyd", "create", props.userPermissions) && (
              <div className="col-lg-1 header-add-btn">
              <Link to="/Dashboard/Master/company-create">
                  <img src={AddBtn} alt="" className="btn-add" />
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
        </div>

        <div className=" scrollable-div-page">
          <Row>
            <Col className="list-table">
              <Table className="table-hover">
                <thead className="list-thead">
                  <tr>
                    <th className="table-th text-light">SR NO</th>
                    <th className="table-th text-light">Company Name</th>
                    <th className="table-th text-light">Mobile No</th>
                    <th className="table-th text-light">Created Date</th>
                    <th className="table-th text-light">Actions</th>
                  </tr>
                </thead>

                <tbody style={{ maxHeight: "300px", overflowY: "auto" }}
                // onDoubleClick={handleAddNewEdit}
                >
                  {Options &&
                    Options.map((record, index) => (
                      <tr
                        // key={record.id}
                        style={{ backgroundColor: "#D9D9D9" }}
                        onDoubleClick={() => {
                          navigate("/Dashboard/Master/company-edit", {
                            state: {
                              id: record.id,
                            },
                          });
                        }}
                      >
                        <td>{index + 1}</td>
                        <td>{record.companyName}</td>
                        <td>{record.mobileNumber}</td>
                        <td>
                          {moment(record.createdAt).format("Do MMM YYYY")}
                        </td>

                        <td align="left">
                          {isActionExist(
                            "companyd",
                            "delete",
                            props.userPermissions
                          ) && (
                            <img
                              src={Delete}
                              alt=""
                              onClick={() => {
                                openModalForDelete(record.id);
                              }}
                              className="img-delete"
                            />
                          )}
                          {isActionExist(
                            "companyd",
                            "edit",
                            props.userPermissions
                          ) && (
                            <img
                              src={edit}
                              onClick={(e) => {
                                navigate("/Dashboard/Master/company-edit", {
                                  state: {
                                    id: record.id,
                                  },
                                });
                              }}
                              alt=""
                              className="img-edit"
                            />
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Col>
          </Row>
          <DeleteConfirmationModal
            DeleteConfirmationModal={DeleteConfirmation}
            onRequestClose={closeModal}
            onConfirm={() => onDelete(DeleteId)}
            text={`Are you sure you want to Delete ?`}
          />
        </div>
      </div>
    </div>
  );
}

export default WithUserPermission(Company);

// const mapStateToProps = ({ userPermissions, userControl }) => {
//   return { userPermissions, userControl };
// };

// const mapActionsToProps = (dispatch) => {
//   return bindActionCreators(
//     {
//       setUserPermissions,
//       setUserControl,
//     },
//     dispatch
//   );
// };

// export default connect(mapStateToProps, mapActionsToProps)(Company);
// export default connect(mapStateToProps, mapActionsToProps)(Company);
