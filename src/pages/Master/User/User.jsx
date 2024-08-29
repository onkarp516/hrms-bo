import React, { useEffect, useState } from "react";
import AddBtn from "../../../assets/images/MenuButton.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Col, OverlayTrigger, Row, Table, Tooltip } from "react-bootstrap";
import edit from "../../../assets/images/edit.png";
import Delete from "../../../assets/images/delete.png";
import { deleteUser, getUsersList } from "../../../services/api_functions";
import DeleteConfirmationModal from "../../../components/DeleteConfirmationModal";
import { isActionExist } from "../../../helpers/constants";
import { WithUserPermission } from "../../../helpers/WithUserPermission";
import ResponseModal from "../../../components/ResponseModal";

function User(props) {
  const location = useLocation();
  const pathArray = location.pathname.split("/"); // Split the path into an array
  const name = pathArray[pathArray.length - 1]; // Get the last element of the array
  const navigate = useNavigate();
  const [ListData, setListData] = useState([]);

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

  useEffect(() => {
    getList();
  }, []);

  //List API Function
  const getList = () => {
    getUsersList()
      .then((response) => {
        let res = response.data;
        if (res.responseStatus === 200) {
          console.log("res.responseStatus: ", res);
          setListData(res.responseObject);
          // setFilteredBranch(res.response);
        }
      })
      .catch((error) => {
        openModal(error, "error");

        // setBranch([]);
        // setFilteredBranch([]);
      });
  };

  // const pathArray = props.location.pathname.split("/"); // Split the path into an array
  // const name = pathArray[pathArray.length - 1]; // Get the last element of the array

  const searchText = [];
  const filteredData = [];

  const jsonArray = [
    {
      id: 1,
      name: "John",
      role: 30,
      created_date: "10/10/2023",
      action1: Delete,
      action2: edit,
    },
    {
      id: 2,
      name: "Alice",
      role: 25,
      created_date: "10/10/2023",
      action1: Delete,
      action2: edit,
    },
    {
      id: 3,
      name: "Bob",
      role: 35,
      role: 25,
      created_date: "10/10/2023",
      action1: Delete,
      action2: edit,
    },
  ];

  console.log(jsonArray);

  const onDelete = (did) => {
    // let requestData = {
    //   userId: did, //yearMonth,
    //   status: false,
    // };

    let requestData = new FormData();

    requestData.append("user_id", did);
    requestData.append("status", false);

    deleteUser(requestData)
      .then((response) => {
        if (response.status == 200) {
          openModal(response.data.message, "cnf");
          getList();
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
          {/* {isActionExist("user", "create", props.userPermissions) && ( */}
            <div className="col-lg-1 header-add-btn">
            <Link to="/Dashboard/Master/user-create">
                <img src={AddBtn} alt="" className="btn-add" />
            </Link>
          </div>
          {/* )} */}
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
                    <th className="table-th text-light">User Name</th>
                    <th className="table-th text-light">Created Date</th>
                    <th className="table-th text-light">Actions</th>
                  </tr>
                </thead>

                <tbody style={{ maxHeight: "300px", overflowY: "auto" }}
                // onDoubleClick={handleAddNewEdit}
                >
                  {ListData.map((record, index) => (
                    <tr
                      // key={record.id}
                      onDoubleClick={(e) => {
                        navigate("/Dashboard/Master/user-edit", {
                          state: {
                            id: record.id,
                          },
                        });
                      }}
                      style={{ backgroundColor: "#D9D9D9" }}
                    >
                      <td>{index + 1}</td>
                      <td>{record.name}</td>
                      <td>{record.created_at}</td>
                      <td align="left">
                        {/* {isActionExist(
                          "user",
                          "delete",
                          props.userPermissions
                        ) && ( */}
                        <img
                          src={Delete}
                          alt=""
                          onClick={() => {
                            openModalForDelete(record.id);
                          }}
                          className="img-delete"
                        />
                        {/* )}{" "} */}
                        {/* {isActionExist(
                          "user",
                          "edit",
                          props.userPermissions
                        ) && ( */}
                        <img
                          src={edit}
                          alt=""
                          className="img-edit"
                          onClick={(e) => {
                            navigate("/Dashboard/Master/user-edit", {
                              state: {
                                id: record.id,
                              },
                            });
                          }}
                        // onClick={handleAddNewEdit}
                        />
                        {/* )} */}
                      </td>{" "}
                      {/* <td>{record.age}</td> */}
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

export default WithUserPermission(User);