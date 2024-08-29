import React, { useEffect, useState } from "react";
import AddBtn from "../../../assets/images/MenuButton.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Col, Row, Table, Tooltip } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import edit from "../../../assets/images/edit.png";
import Delete from "../../../assets/images/delete.png";
import {
  listOfEmployee,
  deleteEmployee,
} from "@/services/api_functions";
import moment from "moment";
import CustomInput from "../../../components/CustomInputs";
import { isActionExist } from "../../../helpers/constants";
import { WithUserPermission } from "../../../helpers/WithUserPermission";
import ResponseModal from "../../../components/ResponseModal";
import DeleteConfirmationModal from "../../../components/DeleteConfirmationModal";

function Employee(props) {
  const location = useLocation();
  const pathArray = location.pathname.split("/"); // Split the path into an array
  const name = pathArray[pathArray.length - 1]; // Get the last element of the array
  const [employee, setEmployee] = useState([]);
  const [filteredEmployee, setFilteredEmployee] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchVisible, setSearchVisible] = useState(false);
  const navigate = useNavigate();

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
    getEmployeeList();
  }, []);

  //List API Function
  const getEmployeeList = () => {
    listOfEmployee().then((response) => {
      let res = response.data;
      if (res.responseStatus === 200) {
        setEmployee(res.response);
        setFilteredEmployee(res.response);
      }
    })
      .catch((error) => {
        setEmployee([]);
        setFilteredEmployee([]);
        openModal(error, "error");
      })
  }

  //Delete API Function
  const onDelete = (id) => {
      let requestData = {
        id: id,
      }
      deleteEmployee(requestData).then((response) => {
        if (response.data.responseStatus === 200) {
          openModal(response.data.message, "cnf");
          getEmployeeList();
        }
        else {
          openModal(response.data.message, "error");
        }
      })
        .catch((error) => {
          openModal(error, "error");
        });
  }

  const handleSearch = (event) => {
    const searchText = event.target.value.toLowerCase();
    setSearchText(searchText);

    if (searchText === '') {
      setFilteredEmployee(employee);
    } else {
      const filteredEmployee = employee.filter((employee) =>
        employee.id.toString().toLowerCase().includes(searchText) ||
        employee.employeeName.toLowerCase().includes(searchText) ||
        employee.dob.toString().toLowerCase().includes(searchText) ||
        employee.mobileNumber.toString().toLowerCase().includes(searchText) ||
        employee.designationName.toString().toLowerCase().includes(searchText) ||
        employee.designationLevel.toString().toLowerCase().includes(searchText) ||
        employee.ShiftName.toString().toLowerCase().includes(searchText)
      );
      setFilteredEmployee(filteredEmployee);
    }
  };

  const toggleSearchVisibility = () => {
    setSearchVisible(!searchVisible);
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
            {isActionExist("employee", "create", props.userPermissions) && (
            <div className="col-lg-1 header-add-btn">
            <Link to="/Dashboard/Master/employee-create">
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
        <div>
          <Row>
            <div className="col-lg-1" >
              <div class="textOnInput">
                <Button style={{ backgroundColor: "transparent", color: "#000", border: "none" }} onClick={toggleSearchVisibility}>
                  <FontAwesomeIcon icon={faSearch} />
                </Button>
              </div>
            </div>
            <div className="col-lg-2" >
              <div class="textOnInput" style={{ marginLeft: "-110px" }}>
                {searchVisible && (
                  <CustomInput
                    type='text'
                    placeholder='Search'
                    style={{ width: '200px' }}
                    value={searchText}
                    onChange={handleSearch}
                  />
                )}
              </div>
            </div>

          </Row>
        </div>

        <div
          className=" scrollable-div-page"

        >
          <Row>
            <Col className="list-table">
              <Table className="table-hover">
                <thead className="list-thead">
                  <tr>
                    <th className="table-th text-light">SR NO</th>
                    <th className="table-th text-light">Name</th>
                    <th className="table-th text-light">Date of Birth</th>
                    <th className="table-th text-light">Mobile Number</th>
                    <th className="table-th text-light">Designation Name</th>
                    <th className="table-th text-light">Designation level</th>
                    <th className="table-th text-light">Shift</th>
                    <th className="table-th text-light">Created Date</th>
                    <th className="table-th text-light">Action</th>
                  </tr>
                </thead>

                <tbody style={{ maxHeight: "300px", overflowY: "auto" }}
                >
                  {filteredEmployee.length > 0 ? (
                    filteredEmployee.map((v, i) => (
                      <tr style={{ backgroundColor: "D9D9D9" }} onDoubleClick={() => {
                        navigate("/Dashboard/Master/employee-edit", {
                          state: {
                            id: v.id,
                          },
                        });
                      }}>
                        <td>{i + 1}</td>
                        <td>{v.employeeName}</td>
                        <td>{v.dob}</td>
                        <td>{v.mobileNumber}</td>
                        <td>{v.designationName}</td>
                        <td>{v.designationLevel}</td>
                        <td>{v.ShiftName}</td>
                        <td>
                          {moment(v.createdDate).format("DD-MM-yyyy")}
                        </td>
                        <td align="left">
                          {isActionExist(
                            "employee",
                            "delete",
                            props.userPermissions
                          ) && (
                          <img
                            src={Delete}
                            alt=""
                            className="img-delete"
                              onClick={() => openModalForDelete(v.id)}
                              />
                            )}

                          {isActionExist(
                            "employee",
                            "edit",
                            props.userPermissions
                          ) && (
                              <img
                            src={edit}
                            alt=""
                            className="img-edit"
                            onClick={(e) => {
                              navigate("/Dashboard/Master/employee-edit", {
                                state: {
                                  id: v.id,
                                },
                              });
                            }}
                          />
                            )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={12} className="text-center">
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
    </div>
  );
}

export default WithUserPermission(Employee);