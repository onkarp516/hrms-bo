import React, { useEffect, useState } from "react";
import AddBtn from "../../../assets/images/MenuButton.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Col, OverlayTrigger, Row, Table, Tooltip } from "react-bootstrap";
import edit from "../../../assets/images/edit.png";
import Delete from "../../../assets/images/delete.png";
import { delete_ledger, getLedgers } from "../../../services/api_functions";
import DeleteConfirmationModal from "../../../components/DeleteConfirmationModal";
import { WithUserPermission } from "../../../helpers/WithUserPermission";
import { isActionExist } from "../../../helpers/constants";
import ResponseModal from "../../../components/ResponseModal";

function Ledger(props) {
  const location = useLocation();
  const pathArray = location.pathname.split("/"); // Split the path into an array
  const name = pathArray[pathArray.length - 1]; // Get the last element of the array

  const [Ledger, setLedger] = useState({
    lstLedger: [],
    orgData: [],
    showloader: [],
    search: [],
  });
  const [IsLedgerFilterd, setIsLedgerFilterd] = useState(true);
  const [showloader, setshowloader] = useState(false);
  const [orgData, setorgData] = useState([]);
  const [totalDr, settotalDr] = useState(0);
  const [totalCr, settotalCr] = useState(0);
  const [search, setsearch] = useState("");
  const [LstLedgerFiltered, setLstLedgerFiltered] = useState([]);
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
    getlstLedger();

    console.log("🚀 ~ file: Page1.jsx:7 ~ useEffect ~ props:", location);
  }, []);
  // const pathArray = props.location.pathname.split("/"); // Split the path into an array
  // const name = pathArray[pathArray.length - 1]; // Get the last element of the array

  const onDelete = (did) => {
    // let requestData = {
    //   userId: did, //yearMonth,
    //   status: false,
    // };

    let requestData = new FormData();

    requestData.append("id", did);
    // requestData.append("status", false);

    delete_ledger(requestData)
      .then((response) => {
        if (response.status == 200) {
          openModal(response.data.message, "cnf");
          getlstLedger();

          // setCompanyEditData(options);
        } else {
          openModal(response.data.message, "error");
        }
      })
      .catch((error) => {
        openModal(error, "error");
      });
  };

  const getFilterLstLedger = () => {
    // let { IsLedgerFilterd, lstLedger } = this.state;

    if (Ledger.lstLedger.length > 0) {
      let filterLst = Ledger.lstLedger;
      if (IsLedgerFilterd) {
        filterLst = filterLst.filter(
          (v) => v.dr > 0 || v.cr > 0 || v.rdr > 0 || v.rcr > 0
        );
      }
      setLstLedgerFiltered(filterLst);
      // this.setState({ lstLedgerFiltered: filterLst });
    }
  };
  useEffect(() => {
    // Call the getFilterLstLedger function when the state is updated
    getFilterLstLedger();
  }, [Ledger]); // The sec

  const getlstLedger = () => {
    // this.setState({ showloader: true });
    getLedgers()
      .then((response) => {
        console.log(response);
        let res = response.data;
        if (res.responseStatus == 200) {
          setLedger({
            lstLedger: res.responseList,
            orgData: res.responseList,
            showloader: false,
            search: "",
          });
          // this.setState(
          //   {
          //     lstLedger: res.responseList,
          //     orgData: res.responseList,
          //     showloader: false,
          //     search: "",
          //   },
          //   () => {
          //     this.getFilterLstLedger();
          //   }
          // );
        }
      })
      .catch((error) => {
        openModal(error, "error");
      });
  };

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
          {isActionExist("ledger", "create", props.userPermissions) && (
              <div className="col-lg-1 header-add-btn">
            <Link to="/Dashboard/Tranx/ledger-create">
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
                    {/* <th className="table-th text-light">SR NO</th> */}
                    <th className="table-th text-light">Ledger Name</th>
                    <th className="table-th text-light">Foundation</th>
                    <th className="table-th text-light">Principle</th>
                    <th className="table-th text-light">Sub Principle </th>
                    <th className="table-th text-light">Debit</th>
                    <th className="table-th text-light">Credit </th>
                    <th className="table-th text-light">Action</th>
                  </tr>
                </thead>

                <tbody style={{ maxHeight: "300px", overflowY: "auto" }}
                // onDoubleClick={handleAddNewEdit}
                >
                  {Ledger.lstLedger &&
                    Ledger.lstLedger.map((record) => (
                      <tr
                        // key={record.id}
                        onDoubleClick={(e) => {
                          navigate("/Dashboard/Tranx/ledger-edit", {
                            state: {
                              id: record.id,
                            },
                          });
                        }}
                        style={{ backgroundColor: "#D9D9D9" }}
                      >
                        {/* <td>{record.id}</td> */}
                        <td>{record.ledger_name}</td>
                        <td>{record.foundations_name}</td>
                        <td>{record.principle_name}</td>
                        <td>{record.subprinciple_name}</td>
                        <td>{record.dr}</td>
                        <td>{record.cr}</td>
                        <td align="left">
                          {isActionExist(
                            "ledger",
                            "delete",
                            props.userPermissions
                          ) && (
                          <img
                            src={Delete}
                            alt=""
                            className="img-delete"
                            onClick={() => {
                              openModalForDelete(record.id);
                            }}
                          />
                            )}
                          {isActionExist(
                            "ledger",
                            "edit",
                            props.userPermissions
                          ) && (
                          <img
                            src={edit}
                            alt=""
                            className="img-edit"
                            onClick={() => {
                              navigate("/Dashboard/Tranx/ledger-edit", {
                                state: {
                                  id: record.id,
                                },
                              });
                            }}
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

// export default tes
export default WithUserPermission(Ledger);
