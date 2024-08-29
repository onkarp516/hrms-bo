import React, { useEffect } from "react";
import AddBtn from "../assets/images/MenuButton.png";
import { useLocation } from "react-router-dom";
import { Col, Row, Table } from "react-bootstrap";

export default function Page1(props) {
  const location = useLocation();
  const pathArray = location.pathname.split("/"); // Split the path into an array
  const name = pathArray[pathArray.length - 1]; // Get the last element of the array

  useEffect(() => {
    console.log("🚀 ~ file: Page1.jsx:7 ~ useEffect ~ props:", location);
  }, []);
  // const pathArray = props.location.pathname.split("/"); // Split the path into an array
  // const name = pathArray[pathArray.length - 1]; // Get the last element of the array

  const searchText = [];
  const filteredData = [];

  const jsonArray = [
    {
      id: 1,
      name: "John",
      age: 30,
      city: "New York",
      action: "",
    },
    {
      id: 2,
      name: "Alice",
      age: 25,
      city: "Los Angeles",
      action: "",
    },
    {
      id: 3,
      name: "Bob",
      age: 35,
      city: "Chicago",
      action: "",
    },
  ];

  console.log(jsonArray);

  return (
    <div>
      <div
        className="content-wrapper scrollable-div"
        style={{ position: "fixed", width: "95%" }}
      >
        <div className="pagePathLayout row">
          <div className="col-lg-11">
            <span className="bold">{location.pathname}</span>
          </div>
          <div className="col-lg-1">
            <img src={AddBtn} alt="" className="btn-add " />
          </div>
        </div>

        <div className="col-lg-12 path-label">
          <span>{name}</span>
        </div>
        <div className="col-lg-12 path-label2">
          <span>Manage All {name} Related Information</span>
        </div>

        <div
          className=" scrollable-div-page"
          style={{ position: "fixed", width: "93.8%" }}
        >
          <Row>
            <Col>
              <Table className="table-hover">
                <thead style={{ height: "5px" }}>
                  <tr>
                    <th className="table-th text-light">SR NO</th>
                    <th className="table-th text-light">Company Name</th>
                    <th className="table-th text-light">Description</th>
                    <th className="table-th text-light">Created Date</th>
                    <th className="table-th text-light">Mobile No</th>
                    <th className="table-th text-light">Actions</th>
                  </tr>
                </thead>

                <tbody
                // onDoubleClick={handleAddNewEdit}
                >
                  {/* {searchText !== ""
                    ? filteredData.map((record) => (
                        <tr
                          key={record.id}
                          style={{ backgroundColor: "#D9D9D9" }}
                        >
                          <td>{record.id}</td>
                          <td>{record.designation}</td>
                          <td>{record.level}</td>
                        </tr>
                      ))
                    : jsonArray.map((record) => (
                        <tr
                          // key={record.id}
                          style={{ backgroundColor: "#D9D9D9" }}
                        >
                          <td>{record.id}</td>
                          <td>{record.name}</td>
                          <td>{record.age}</td>
                        </tr>
                      ))} */}
                  {jsonArray.map((record) => (
                    <tr
                      // key={record.id}
                      style={{ backgroundColor: "#D9D9D9" }}
                    >
                      <td>{record.id}</td>
                      <td>{record.name}</td>
                      <td>{record.age}</td>
                      <td>{record.name}</td>
                      <td>{record.age}</td>
                      <td>{record.action}</td>
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
