import React, { useEffect, useState } from "react";
import NextBtn from "../../../assets/images/next.png";
import BackBtn from "../../../assets/images/back.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Col, Row, Table, Form, Modal, Card, Button } from "react-bootstrap";
import * as Yup from "yup";
import { Formik, ErrorMessage } from "formik";
import edit from "../../../assets/images/edit.png";
import Delete from "../../../assets/images/delete.png";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import CustomInput from "../../../components/CustomInputs";
import {
    createLeaveMaster,
    listOfLeaveMasters,
    findLeaveMaster,
    updateLeaveMaster,
    deleteLeaveMaster,
    getSundryDebtorsIndirectIncome,
    create_emp_payroll
} from "@/services/api_functions";
import moment from "moment";
import CustomSelect from "../../../components/CustomSelect";
import { isActionExist } from "../../../helpers/constants";
import { WithUserPermission } from "../../../helpers/WithUserPermission";
import CustomToggleSwitchForModal from "../../../components/CustomToggleSwitchForModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import ResponseModal from "../../../components/ResponseModal";

function Payroll(props) {
    const location = useLocation();
    const navigate = useNavigate();
    const pathArray = location.pathname.split("/"); // Split the path into an array
    const name = pathArray[pathArray.length - 1]; // Get the last element of the array

    const [payrollData, setPayrollData] = useState([]);
    const [filteredPayroll, setFilteredPayroll] = useState([]);


    useEffect(() => {
        getPayrollList();
    }, []);


    //List API Function
    const getPayrollList = () => {
        let year = new Date().getFullYear();
        let month = new Date().getMonth();
        if (month === 0) {
            month = 12;
            year = year - 1;
        }
        console.log("month>>>>>", month);
        const monthStr = month < 10 ? "0" + month : month;
        const yearMonth = year + "-" + monthStr;

        let formData = new FormData();
        formData.append("fromMonth", yearMonth);
        getSundryDebtorsIndirectIncome(formData)
            .then((response) => {
                let res = response.data;
                if (res.responseStatus === 200) {
                    setPayrollData(res.list);
                    setFilteredPayroll(res.list);
                }
            })
            .catch((error) => {
                openModal(error, "error");
                setPayrollData([]);
                setFilteredPayroll([]);
            });
    }

    const handleCheckboxSelection = (e, v, index, employeeWagesType, wagesPerDay) => {
        const { name, checked } = e.target;

        if (name === "all") {
            const updatedDebtorsData = payrollData.map((item) => ({
                ...item,
                attendanceStatus: item.payableAmount !== undefined && item.isSalaryProcessed !== true ? checked : false,
            }));

            setPayrollData(updatedDebtorsData);
        } else {
            const updatedDebtorsData = [...payrollData];
            updatedDebtorsData[index] = {
                ...updatedDebtorsData[index],
                attendanceStatus: checked,
            };

            setPayrollData(updatedDebtorsData);
        }
    };

    const getEmployeeSalaryData = (v) => {
        navigate("/Dashboard/Tranx/salary-process", {
            state: {
                id: v.id,
            },
        });
    };

    const isBtn = (salProc) => {
        console.log(
            "🚀 ~ file: PayrollList.jsx:140 ~ PayrollList ~ salProc:",
            salProc
        );
        return salProc == true ? false : true;
    };

    const [openRow, setOpenRow] = useState(null);
    const [ResModal, setResModal] = useState(false);
    const [ResText, setResText] = useState("");
    const [LogoType, setLogoType] = useState("");
    const [deptList, setdeptList] = useState([]);
    const [Submitting, setSubmitting] = useState([]);
    const [rowId, setrowId] = useState();

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


    // Function to close the modal
    const closeModal = () => {
        setResModal(false);
        setResText("");
        // navigate("/Dashboard/Tranx/ledger");
    };

    // Function to handle form submission with confirmation
    const handleConfirmSubmit = () => {
        // handleSubmit();
        // onDelete(rowId)
        closeModal(); // Close the modal after submission
    };
    // ... (other methods)

    const validateBooleanData = (data) => {
        let filteredData = (data.filter((v) => v.isSalaryProcessed == false || v.payableAmount === undefined || v.payableAmount === ""))
        // disabled={v.isSalaryProcessed == true || v.payableAmount === undefined || v.payableAmount === ""}
        return filteredData && filteredData.length > 0;

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
            <div
                className="content-wrapper scrollable-div"
                style={{ position: "fixed", width: "96%" }}
            >
                <div className="pagePathLayout row">
                    <div className="col-lg-11 header-title">
                        <span className="bold" >{location.pathname}</span>
                    </div>
                </div>

                <div className="col-lg-12 path-label">
                    <span>{name}</span>
                </div>
                <div className="col-lg-12 path-label2">
                    <span>Manage All {name} Related Information</span>
                </div>
                <div>
                    <Formik
                        validateOnBlur={false}
                        validateOnChange={false}
                        initialValues={{
                            fromDate: "",
                            employeeId: "",
                            attStatus: "",
                            attendanceDate: ""
                        }}
                        // validationSchema={Yup.object().shape({
                        //   fromDate: Yup.string().trim().required(" "),
                        //   attendanceDate: Yup.string().trim().required(" "),
                        //   employeeId: Yup.string().required(" "),
                        // })}
                        onSubmit={(values, { setSubmitting, resetForm }) => {
                            const filteredArray = payrollData.filter(
                                (item) => item.attendanceStatus != false && item.isAttendanceApproved != true
                            );

                            console.log(
                                "🚀 ~ file: Attendance2.jsx:1100 ~ Attendance2 ~ filteredArray:",
                                filteredArray
                            );

                            let formData = new FormData();
                            formData.append("list", JSON.stringify(filteredArray));
                            create_emp_payroll(formData)
                                .then((response) => {
                                    console.log("response>>", response)
                                    if (response.data.responseStatus === 200) {

                                        setSubmitting(false);
                                        resetForm();
                                        openModal(response.data.message, "cnf");
                                        getPayrollList();
                                    } else {
                                        setSubmitting(false);
                                        openModal("No Data Found", "error");
                                    }
                                })
                                .catch((error) => {
                                    openModal(error, "error");
                                    setSubmitting(false);
                                });

                        }}
                        render={({ errors, status, touched, isSubmitting, handleChange, handleSubmit, setFieldValue, values, handleBlur }) => (
                            <Form onSubmit={handleSubmit}>
                                <Row className="list-heading">
                                    <div className="col-lg-1 list-head-fields" >
                                        <div class="textOnInput">
                                            <Form.Label >
                                                <input
                                                    name="all"
                                                    type="checkbox"
                                                    onChange={(e) => {
                                                        handleCheckboxSelection(
                                                            e
                                                            // v.id,
                                                            // i,
                                                            // v.employeeWagesType,
                                                            // v.wagesPerDay,
                                                        );
                                                    }}
                                                    disabled={validateBooleanData(payrollData)}
                                                    style={{ marginTop: "25px" }}
                                                />
                                                <span style={{ marginLeft: "5px", marginBottom: "2px" }}>Select all</span>
                                            </Form.Label>
                                        </div>
                                    </div>

                                    <div className="col-lg-1">
                                        <div class="textOnInput">

                                            <Button
                                                style={{ marginTop: '30px' }}
                                                className="modal-submit-btn"
                                                type="submit"
                                                disabled={validateBooleanData(payrollData)}
                                            >
                                                Approve
                                            </Button>
                                        </div>
                                    </div>
                                </Row>
                            </Form>
                        )}
                    />
                </div>
                <div
                    className=" scrollable-div-page"
                >
                    <Row>
                        <Col className="list-table">
                            <Table className="table-hover">
                                <thead className="list-thead">
                                    <tr>
                                        <th className="table-th text-light">Select</th>
                                        <th className="table-th text-light">Sr No</th>
                                        <th className="table-th text-light">Date</th>
                                        <th className="table-th text-light">Ledger Name</th>
                                        <th className="table-th text-light">Balancing Method</th>
                                        <th className="table-th text-light">Type</th>
                                        <th className="table-th text-light">Present Days</th>
                                        <th className="table-th text-light">Payble Amount</th>
                                        <th className="table-th text-light">Action</th>
                                    </tr>
                                </thead>

                                <tbody style={{ maxHeight: "300px", overflowY: "auto" }}
                                >
                                    {payrollData.length > 0 ? (
                                        payrollData.map((v, i, record) => (
                                            <>
                                                {v.type != "CA" ? (<tr style={{ backgroundColor: "D9D9D9" }}>
                                                <td>  <input
                                                    name="attendanceStatus"
                                                    type="checkbox"
                                                    checked={v.attendanceStatus}
                                                    defaultChecked={false}
                                                    disabled={v.isSalaryProcessed == true || v.payableAmount === undefined || v.payableAmount === ""}
                                                    onChange={(e) => {
                                                        handleCheckboxSelection(
                                                            e,
                                                            v.id,
                                                            i,
                                                            v.employeeWagesType,
                                                            v.wagesPerDay
                                                        );
                                                    }}
                                                    style={{ marginTop: "5px" }}
                                                /></td>
                                                <td>{i + 1}</td>
                                                <td>{v.payrollDate}</td>
                                                <td>{v.ledger_name}</td>
                                                <td> {v.balancing_method}</td>
                                                <td>{v.type}</td>
                                                <td> {v.noDaysPresent}</td>
                                                <td>{v.payableAmount}</td>
                                                <td>
                                                    {/* {v.isAttendanceApproved === true ? <td></td> : ( */}
                                                        <td align="left">
                                                        {isActionExist("attendance-approval", "create", props.userPermissions) && (
                                                            <img src={NextBtn} alt="" className="btn-add " onClick={(e) => {
                                                                if (
                                                                    isActionExist(
                                                                        "payroll",
                                                                        "view",
                                                                        props.userPermissions
                                                                    ) &&
                                                                    isBtn(v.isSalaryProcessed) &&
                                                                    v.payableAmount
                                                                )
                                                                    getEmployeeSalaryData(v);
                                                                else {
                                                                    openModal("Permission is denied! Please Approve Attendance", "error");
                                                                }
                                                            }} />
                                                            // <FontAwesomeIcon
                                                            //     icon={faCheck}
                                                            //     className="img-delete"
                                                                
                                                            // />
                                                        )}
                                                    </td>
                                                    {/* )} */}
                                                </td>
                                                </tr>) : null}
                                            </>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={10} className="text-center">
                                                No Data Found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </div >
            </div >
        </div >
    );
}

export default WithUserPermission(Payroll);