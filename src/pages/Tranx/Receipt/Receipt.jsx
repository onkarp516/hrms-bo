import React, { useEffect, useState } from "react";
import AddBtn from "../../../assets/images/MenuButton.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Col, Row, Table, Tooltip } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import edit from "../../../assets/images/edit.png";
import Delete from "../../../assets/images/delete.png";
import { listOfEmployee, deleteEmployee } from "@/services/api_functions";
import moment from "moment";
import { getReceiptListByCompany } from "../../../services/api_functions";
import { isActionExist } from "../../../helpers/constants";
import { WithUserPermission } from "../../../helpers/WithUserPermission";

function Receipt(props) {
  const location = useLocation();
  const pathArray = location.pathname.split("/"); // Split the path into an array
  const name = pathArray[pathArray.length - 1]; // Get the last element of the array
  const [ReceiptList, setReceiptList] = useState([]);
  const [ReceiptData, setReceiptData] = useState([]);
  const [ResModal, setResModal] = useState(false);
  const [ResText, setResText] = useState(false);
  const [LogoType, setLogoType] = useState("");

   const [filteredEmployee, setFilteredEmployee] = useState([]);
   const navigate = useNavigate();

   useEffect(() => {
     getReceiptList();
   }, []);

  // List API Function

   const getReceiptList = () => {
    getReceiptListByCompany()
      .then((response) => {
        console.log("getReceiptList:", response);
        let res = response.data ? response.data : [];
        if (res.responseStatus == 200) {
          setReceiptData(res.data);
          setReceiptList(res.data);
        //   this.setState({ receiptList: res.data, receiptData: res.data });
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const openModal = (text, logo_type) => {
    // Update the state to set the text
    setLogoType(logo_type);
    setResText(text);
  };

   //Delete API Function
   // const onDelete = (id) => {
   //     //Display a confirmation dialog
   //     const isConfirmed = window.confirm("Do you want to delete?");
   //     if (isConfirmed) {
   //         let requestData = {
   //             id: id,
   //         }
   //         deleteEmployee(requestData).then((response) => {
  //             if (response.data.responseStatus === 200) {
   //                 getEmployeeList();
   //             }
  //             else {
   //             }
   //         })
   //             .catch((error) => {
  //                 // toast.error("✘ " + error);
   //             });
   //     }
   // }

   return (
     <div>
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
             <div className="col-lg-1 header-add-btn">
               <Link to="/Dashboard/Tranx/receipt-create">
                 <img src={AddBtn} alt="" className="btn-add " />
               </Link>
             </div>
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
                    {/* <th className="table-th text-light">SR NO</th>
                    <th className="table-th text-light">Voucher No</th>
                    <th className="table-th text-light">Tranx Date</th>
                    <th className="table-th text-light">Narrations</th>
                    <th className="table-th text-light">Action</th> */}

                    <th className="table-th text-light">Receipt No</th>
                    <th className="table-th text-light">Transaction Date</th>
                    <th className="table-th text-light">Ledger Name</th>
                    <th className="table-th text-light">Narration</th>
                    <th className="table-th text-light">Total Amt</th>
                    <th className="table-th text-light">Action</th>
                  </tr>
                </thead>

                <tbody style={{ maxHeight: "300px", overflowY: "auto" }}>
                  {ReceiptList.length > 0 ? (
                    ReceiptList.map((v, i) => (
                      <tr
                        style={{ backgroundColor: "D9D9D9" }}
                        onDoubleClick={() => {
                          navigate("/Dashboard/Tranx/receipt-edit", {
                            state: {
                              id: v.id,
                            },
                          });
                        }}
                      >
                        {/* <td style={{ width: "20%" }}>{i + 1}</td> */}
                        <td style={{ width: "20%" }}>{v.receipt_code}</td>
                        <td style={{ width: "10%" }}>{v.transaction_dt}</td>
                        <td style={{ width: "20%" }}>{v.ledger_name}</td>
                        <td style={{ width: "20%" }}>{v.narration}</td>
                        <td style={{ width: "15%" }}>{v.total_amount}</td>
                        <td align="left">
                          <img
                            src={Delete}
                            alt=""
                            onClick={() => {
                              openModal(v.id);
                            }}
                            className="img-delete"
                          />

                          <img
                            src={edit}
                            alt=""
                            className="img-edit"
                            onClick={(e) => {
                              navigate("/Dashboard/Tranx/receipt-edit", {
                                state: {
                                  id: v.id,
                                },
                              });
                            }}
                          // onClick={handleAddNewEdit}
                          />
                        </td>{" "}
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

export default WithUserPermission(Receipt);
