import React, { useEffect, useState } from "react";
import AddBtn from "../../../assets/images/MenuButton.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Col, OverlayTrigger, Row, Table, Tooltip } from "react-bootstrap";
import edit from "../../../assets/images/edit.png";
import Delete from "../../../assets/images/delete.png";
import {
  DTRoles,
  deleteRole,
  deleteUser,
} from "../../../services/api_functions";
import { isActionExist } from "../../../helpers/constants";
import { WithUserPermission } from "../../../helpers/WithUserPermission";
import DeleteConfirmationModal from "../../../components/DeleteConfirmationModal";
import ResponseModal from "../../../components/ResponseModal";

function Role(props) {
  const location = useLocation();
  const pathArray = location.pathname.split("/"); // Split the path into an array
  const name = pathArray[pathArray.length - 1]; // Get the last element of the array
  const navigate = useNavigate();

  const [listData, setlistData] = useState([]);
  // const pathArray = props.location.pathname.split("/"); // Split the path into an array
  // const name = pathArray[pathArray.length - 1]; // Get the last element of the array
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

  const onDelete = (did) => {
    let requestData = new FormData();
    requestData.append("role_id", did);
    requestData.append("status", false);

    deleteRole(requestData)
      .then((response) => {
        if (response.status == 200) {
          openModal(response.data.message, "cnf");
          let res = response.data.response;

          console.log("res: ", res);
          getRolesList();

          // setCompanyEditData(options);
        }
        else {
          openModal(response.data.message, "error");
        }
      })
      .catch((error) => {
        openModal(error, "error");
      });
  };

  const searchText = [];
  const filteredData = [];

  useEffect(() => {
    getRolesList();
  }, []);

  //List API Function
  const getRolesList = () => {
    DTRoles()
      .then((response) => {
        let res = response.data;
        if (res.responseStatus === 200) {
          console.log("res.responseStatus: ", res);
          setlistData(res.responseObject);
          // setFilteredBranch(res.response);
        }
      })
      .catch((error) => {
        openModal(error, "error");

        // setBranch([]);
        // setFilteredBranch([]);
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
            overlay={<Tooltip id="tooltip" className="tooltip-add-btn">Create</Tooltip>}
          >
          {isActionExist("roled", "create", props.userPermissions) && (
              <div className="col-lg-1 header-add-btn">
              <Link to="/Dashboard/Master/role-create">
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
        </div>

        <div className=" scrollable-div-page">
          <Row>
            <Col className="list-table">
              <Table className="table-hover">
                <thead className="list-thead">
                  <tr>
                    <th className="table-th text-light">SR NO</th>
                    <th className="table-th text-light">Role Name</th>
                    <th className="table-th text-light">Created Date</th>
                    <th className="table-th text-light">Actions</th>
                  </tr>
                </thead>

                <tbody style={{ maxHeight: "300px", overflowY: "auto" }}
                // onDoubleClick={handleAddNewEdit}
                >
                  {listData &&
                    listData.map((record, index) => (
                      <tr
                        // key={record.id}
                        style={{ backgroundColor: "#D9D9D9" }}
                        onDoubleClick={(e) => {
                          navigate("/Dashboard/Master/role-edit", {
                            state: {
                              id: record.id,
                            },
                          });
                        }}
                      >
                        <td>{index + 1}</td>
                        <td>{record.name}</td>
                        <td>{record.created_at}</td>
                        <td align="left">
                          {isActionExist(
                            "roled",
                            "delete",
                            props.userPermissions
                          ) && (
                              <img
                                src={Delete}
                                alt=""
                                className="img-delete"
                                onClick={(e) => {
                                  openModalForDelete(record.id);
                                }}
                              />
                            )}
                          {isActionExist(
                            "roled",
                            "edit",
                            props.userPermissions
                          ) && (
                              <img
                                src={edit}
                                alt=""
                                className="img-edit"
                                onClick={(e) => {
                                  navigate("/Dashboard/Master/role-edit", {
                                    state: {
                                      id: record.id,
                                    },
                                  });
                                }}
                              // onClick={handleAddNewEdit}
                              />
                            )}
                        </td>{" "}
                        {/* <td>{record.age}</td> */}
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default WithUserPermission(Role);
