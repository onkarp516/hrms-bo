import React, { useEffect } from "react";
// import AddBtn from "../assets/images/MenuButton.png";
import { Link, useLocation } from "react-router-dom";
import { Col, Row, Table, Card, Form } from "react-bootstrap";
import CustomInput from "../../../components/CustomInputs";
import CustomToggleSwitch from "../../../components/CustomToggleSwitch";

export default function ContraEdit(props) {
    const location = useLocation();
    const pathArray = location.pathname.split("/"); // Split the path into an array
    const name = pathArray[pathArray.length - 1]; // Get the last element of the array

    useEffect(() => {
        console.log("🚀 ~ file: PaymentEdit.jsx:7 ~ useEffect ~ props:", location);
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
                        {/* <span className="bold">Dashboard</span> */}
                    </div>
                    {/* <div className="col-lg-1">
            <Link to="/Dashboard/Master/company-create">
              <img src={AddBtn} alt="" className="btn-add " />
            </Link>
          </div> */}
                </div>

                {/* <div className="col-lg-12 path-label">
          <span>{name}</span>
        </div>
        <div className="col-lg-12 path-label2">
          <span>Manage All {name} Related Information</span>
        </div> */}

                <div
                    className=" scrollable-div-page ledgerStyle"
                    style={{
                        position: "fixed",
                        width: "93.8%",
                        overflowX: "hidden",
                        overflowY: "auto",
                    }}
                >
                    <Row className="mt-1">
                        <Col lg={2}>
                            <CustomInput
                                label="Company Type"
                                className={`form-control`}
                                type="text"
                                // id=""
                                placeholder="Select Type"
                                name="mobile"
                            // value={values.mobile}
                            // invalid={errors.mobile ? true : false}
                            // onChange={handleChange}
                            // inputError={errors.mobile}
                            // onBlur={onBlur}
                            />
                        </Col>
                        <Col lg={2}>
                            <CustomInput
                                label="Code"
                                className={`form-control`}
                                type="text"
                                // id=""
                                placeholder="Enter Code"
                                name="mobile"
                            // value={values.mobile}
                            // invalid={errors.mobile ? true : false}
                            // onChange={handleChange}
                            // inputError={errors.mobile}
                            // onBlur={onBlur}
                            />
                        </Col>
                        <Col lg={2}>
                            <CustomInput
                                label="Name"
                                className={`form-control`}
                                type="text"
                                // id=""
                                placeholder="Enter Name"
                                name="mobile"
                            // value={values.mobile}
                            // invalid={errors.mobile ? true : false}
                            // onChange={handleChange}
                            // inputError={errors.mobile}
                            // onBlur={onBlur}
                            />
                        </Col>
                        <Col lg={2}>
                            <CustomInput
                                label="Balancing Method"
                                className={`form-control`}
                                type="text"
                                // id=""
                                placeholder="Select Method"
                                name="mobile"
                            // value={values.mobile}
                            // invalid={errors.mobile ? true : false}
                            // onChange={handleChange}
                            // inputError={errors.mobile}
                            // onBlur={onBlur}
                            />
                        </Col>
                        <Col lg={2}>
                            <CustomInput
                                label="Opening Balance"
                                className={`form-control`}
                                type="text"
                                // id=""
                                placeholder="Openig Balance"
                                name="mobile"
                            // value={values.mobile}
                            // invalid={errors.mobile ? true : false}
                            // onChange={handleChange}
                            // inputError={errors.mobile}
                            // onBlur={onBlur}
                            />
                        </Col>
                        <Col lg={2}>
                            <Row>
                                <Col lg={6}>
                                    <CustomInput
                                        label="Select"
                                        className={`form-control`}
                                        type="text"
                                        // id=""
                                        placeholder="Enter Code"
                                        name="mobile"
                                    // value={values.mobile}
                                    // invalid={errors.mobile ? true : false}
                                    // onChange={handleChange}
                                    // inputError={errors.mobile}
                                    // onBlur={onBlur}
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="mt-5">
                        <Col lg={4}>
                            <CustomInput
                                label="Registered Address"
                                className={`form-control`}
                                type="text"
                                // id=""
                                placeholder="Enter Address"
                                name="mobile"
                            // value={values.mobile}
                            // invalid={errors.mobile ? true : false}
                            // onChange={handleChange}
                            // inputError={errors.mobile}
                            // onBlur={onBlur}
                            />
                        </Col>
                        <Col lg={6}>
                            <CustomInput
                                label="Address"
                                className={`form-control`}
                                type="text"
                                // id=""
                                placeholder="Enter Address"
                                name="mobile"
                            // value={values.mobile}
                            // invalid={errors.mobile ? true : false}
                            // onChange={handleChange}
                            // inputError={errors.mobile}
                            // onBlur={onBlur}
                            />
                        </Col>
                        <Col lg={2}>
                            <CustomInput
                                label="State"
                                className={`form-control`}
                                type="text"
                                // id=""
                                placeholder="Select State"
                                name="mobile"
                            // value={values.mobile}
                            // invalid={errors.mobile ? true : false}
                            // onChange={handleChange}
                            // inputError={errors.mobile}
                            // onBlur={onBlur}
                            />
                        </Col>
                    </Row>
                    <Row className="mt-5">
                        <Col lg={2}>
                            <CustomInput
                                label="Pin"
                                className={`form-control`}
                                type="text"
                                // id=""
                                placeholder="Enter Pim"
                                name="mobile"
                            // value={values.mobile}
                            // invalid={errors.mobile ? true : false}
                            // onChange={handleChange}
                            // inputError={errors.mobile}
                            // onBlur={onBlur}
                            />
                        </Col>
                        <Col lg={2}>
                            <CustomInput
                                label="Phone Number"
                                className={`form-control`}
                                type="text"
                                // id=""
                                placeholder="Phone"
                                name="mobile"
                            // value={values.mobile}
                            // invalid={errors.mobile ? true : false}
                            // onChange={handleChange}
                            // inputError={errors.mobile}
                            // onBlur={onBlur}
                            />
                        </Col>
                        <Col lg={2}>
                            <CustomInput
                                label="What's app Number"
                                className={`form-control`}
                                type="text"
                                // id=""
                                placeholder="Enter Number"
                                name="mobile"
                            // value={values.mobile}
                            // invalid={errors.mobile ? true : false}
                            // onChange={handleChange}
                            // inputError={errors.mobile}
                            // onBlur={onBlur}
                            />
                        </Col>
                        <Col lg={2}>
                            <CustomInput
                                label="Email ID"
                                className={`form-control`}
                                type="text"
                                // id=""
                                placeholder="Enter Email"
                                name="mobile"
                            // value={values.mobile}
                            // invalid={errors.mobile ? true : false}
                            // onChange={handleChange}
                            // inputError={errors.mobile}
                            // onBlur={onBlur}
                            />
                        </Col>
                        <Col lg={2}>
                            <CustomInput
                                label="Registered Number"
                                className={`form-control`}
                                type="text"
                                // id=""
                                placeholder="Enter Number"
                                name="mobile"
                            // value={values.mobile}
                            // invalid={errors.mobile ? true : false}
                            // onChange={handleChange}
                            // inputError={errors.mobile}
                            // onBlur={onBlur}
                            />
                        </Col>
                        <Col lg={2}>
                            <CustomInput
                                label="Registered Date"
                                className={`form-control`}
                                type="text"
                                // id=""
                                placeholder="Enter Date"
                                name="mobile"
                            // value={values.mobile}
                            // invalid={errors.mobile ? true : false}
                            // onChange={handleChange}
                            // inputError={errors.mobile}
                            // onBlur={onBlur}
                            />
                        </Col>
                    </Row>
                    <Row className="mt-5">
                        <Col lg={2}>
                            {/* <div className="d-flex"> */}
                            <CustomToggleSwitch
                                label="Credits"
                                // className={`form-control ${touched.name && errors.name ? 'is-invalid' : ''}`}
                                className="form-control"
                            //   id="hobbies"
                            //   name="hobbies"
                            // checked={values.hobbies}
                            // value={values.hobbies}
                            // onChange={() => setFieldValue("hobbies", !values.hobbies)}
                            // onBlur={onBlur}
                            />
                            {/* </div> */}
                        </Col>
                        <Col lg={2}>
                            <CustomInput
                                label="Select Rate"
                                className={`form-control`}
                                type="text"
                                // id=""
                                placeholder="Select Rate"
                                name="mobile"
                            // value={values.mobile}
                            // invalid={errors.mobile ? true : false}
                            // onChange={handleChange}
                            // inputError={errors.mobile}
                            // onBlur={onBlur}
                            />
                        </Col>
                        <Col lg={2}>
                            <CustomInput
                                label="Business Nature"
                                className={`form-control`}
                                type="text"
                                // id=""
                                placeholder="Business Nature"
                                name="mobile"
                            // value={values.mobile}
                            // invalid={errors.mobile ? true : false}
                            // onChange={handleChange}
                            // inputError={errors.mobile}
                            // onBlur={onBlur}
                            />
                        </Col>
                        <Col lg={6}>
                            <Row>
                                <Col lg={2} className="d-flex">
                                    <Form.Label>Trade</Form.Label>
                                </Col>
                                <Col lg={10}>
                                    <Form.Group
                                        className="d-flex"
                                    // onKeyDown={(e) => {
                                    //   if (e.keyCode == 13) {
                                    //     this.handleKeyDown(e, "natureOfBusiness");
                                    //   }
                                    // }}
                                    >
                                        <Form.Check
                                            type="radio"
                                            label="Retailer"
                                            className="cpt"
                                            id="Retailer"
                                            name="tradeOfBusiness"
                                        //   value="retailer"
                                        //   checked={
                                        //     values.tradeOfBusiness == "retailer" ? true : false
                                        //   }
                                        //   onChange={handleChange}
                                        />
                                        <Form.Check
                                            className="mx-3 cpt"
                                            type="radio"
                                            label="Distributor"
                                            id="distributor"
                                            //   name="tradeOfBusiness"
                                            value="distributor"
                                        //   checked={
                                        //     values.tradeOfBusiness == "distributor" ? true : false
                                        //   }
                                        //   onChange={handleChange}
                                        />
                                        <Form.Check
                                            className="ms-2 cpt"
                                            type="radio"
                                            label="Manufaturer"
                                            id="Manufaturer"
                                            name="tradeOfBusiness"
                                        //   value="manufacturer"
                                        //   checked={
                                        //     values.tradeOfBusiness == "manufacturer" ? true : false
                                        //   }
                                        //   onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="mt-5">
                        <Col lg={6}>
                            <Card>
                                <Card.Body>
                                    <Row>
                                        <Col lg={2}>
                                            <p>
                                                <span>GST</span>
                                            </p>
                                        </Col>
                                        <Col lg={10} className="text-end">
                                            <Form.Check // prettier-ignore
                                                type="switch"
                                            // id="disabled-custom-switch"
                                            />
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col lg={6}></Col>
                    </Row>
                </div>
            </div>
        </div>
    );
}
