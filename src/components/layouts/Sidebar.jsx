import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Form,
  Nav,
  Navbar,
  NavDropdown,
  Offcanvas,
  Row,
  Col,
  Dropdown,
  Tabs,
  Tab,
  Card,
} from "react-bootstrap";

import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import home from "../../assets/images/home.png";
import reports from "../../assets/images/reports.png";
import master from "../../assets/images/master.png";
import team from "../../assets/images/team.png";
import leave from "../../assets/images/LeaveManagement.png";
import Transactions from "../../assets/images/transactions.png";
import attendence from "../../assets/images/AttendanceManagement.png";
import status from "../../assets/images/status.png";
import authorization from "../../assets/images/authorization.png";
import settings from "../../assets/images/settings.png";
import Vector from "../../assets/images/Vector.png";
import close from "../../assets/images/close.png";
// import masterIcon from "../../assets/images/masterIcon.png";

import shifIcon from "../../assets/images/shiftIcon.png";
import images from "../../utils/imageLoader.js";

import arrowToExpand from "../../assets/images/arrow-hrms.png";
import AddBtn from "../../assets/images/MenuButton.png";

import Page2 from "../../pages/Page2";

import { Link, useLocation, useNavigate } from "react-router-dom";
// import { ReduxSetAppV, ReduxGetAppV, ReduxCleanAppV } from "@/redux/actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withNavigate } from "@/routes";
import { isActionExist } from "../../helpers/constants.js";
import { WithUserPermission } from "../../helpers/WithUserPermission.js";
// import { checkWindowTabId, findDataExistWindowTabId } from "@/helpers";
// import { authenticationService, SuperAdminOutletList } from "@/services/api_functions";

const Sidebar = (props) => {
  console.log("props: ", props);
  const [show, setShow] = useState(true);
  const [show1, setShow1] = useState(true);
  const [redirect, setredirect] = useState(false);
  const [popoverPosition1, setPopoverPosition1] = useState({
    top: 2,
    left: 110,
  });

  // const pathArray = props.location.pathname.split("/"); // Split the path into an array
  // const name = pathArray[pathArray.length - 1]; // Get the last element of the array
  const user = JSON.parse(localStorage.getItem(`loginUser`));

  const handleClose = () => {
    show == true ? setShow(false) : setShow(true);
    show1 == true ? setShow1(false) : setShow1(true);
  };

  const toggleShow = () => setShow((s) => !s);
  const navigate = useNavigate();

  // ! Redux set function for new version
  // const setAppVersion = () => {
  //   props.ReduxSetAppV({
  //     windowTabId: checkWindowTabId(),
  //     data: "Version =-> " + parseInt(Math.random(0, 10) * 1000),
  //   });
  // };

  const renderRedirect = () => {
    if (setredirect) {
      //   return <Redirect to="/login" />;
    }
  };

  const [navVisible, setNavVisible] = useState(true);
  const [activeIconIndex, setActiveIconIndex] = useState(null);
  const [activeIconIndex1, setActiveIconIndex1] = useState(null);
  const [activeIconIndex2, setActiveIconIndex2] = useState(null);

  const toggleNav = (index) => {
    setActiveIconIndex1(null);
    console.log("🚀 ~ file: Sidebar.jsx:67 ~ toggleNav ~ index:", index);
    if (index == 1) {
      setPopoverPosition1({ top: 66, left: 60 });
      setActiveIconIndex(activeIconIndex === index ? null : index);
    } else if (index == 2) {
      setPopoverPosition1({ top: 123, left: 60 });
      setActiveIconIndex(activeIconIndex === index ? null : index);
    } else if (index == 3) {
      setPopoverPosition1({ top: 176, left: 60 });
      setActiveIconIndex(activeIconIndex === index ? null : index);
    } else if (index == 4) {
      setPopoverPosition1({ top: 230, left: 60 });
      setActiveIconIndex(activeIconIndex === index ? null : index);
    } else if (index == 5) {
      setPopoverPosition1({ top: 286, left: 60 });
      setActiveIconIndex(activeIconIndex === index ? null : index);
    } else if (index == 6) {
      setPopoverPosition1({ top: 343, left: 60 });
      setActiveIconIndex(activeIconIndex === index ? null : index);
    } 
      // else if (index == 7) {
      //   setPopoverPosition1({ top: 400, left: 60 });
      //   setActiveIconIndex(activeIconIndex === index ? null : index);
      // } else if (index == 8) {
      //   setPopoverPosition1({ top: 457, left: 60 });
      //   setActiveIconIndex(activeIconIndex === index ? null : index);
      // }
    else {
      return false;
    }
  };

  const toggleNav1 = (index) => {
    console.log("🚀 ~ file: Sidebar.jsx:67 ~ toggleNav ~ index:", index);
    if (index == 0) {
      // setPopoverPosition1({ top: 66, left: 60 });
      setActiveIconIndex1(activeIconIndex1 === index ? null : index);
    } else if (index == 1) {
      // setPopoverPosition1({ top: 66, left: 60 });
      setActiveIconIndex1(activeIconIndex1 === index ? null : index);
    } else if (index == 2) {
      // setPopoverPosition1({ top: 123, left: 60 });
      setActiveIconIndex1(activeIconIndex1 === index ? null : index);
    } else if (index == 3) {
      // setPopoverPosition1({ top: 176, left: 60 });
      setActiveIconIndex1(activeIconIndex1 === index ? null : index);
    } else if (index == 4) {
      // setPopoverPosition1({ top: 230, left: 60 });
      setActiveIconIndex1(activeIconIndex1 === index ? null : index);
    } else if (index == 5) {
      // setPopoverPosition1({ top: 286, left: 60 });
      setActiveIconIndex1(activeIconIndex1 === index ? null : index);
    } else {
      return false;
    }
  };

  const toggleNav2 = (index) => {
    console.log("🚀 ~ file: Sidebar.jsx:67 ~ toggleNav ~ index:", index);
    if (index == 0) {
      // setPopoverPosition1({ top: 66, left: 60 });
      setActiveIconIndex2(activeIconIndex2 === index ? null : index);
    } else if (index == 1) {
      // setPopoverPosition1({ top: 66, left: 60 });
      setActiveIconIndex2(activeIconIndex2 === index ? null : index);
    } else if (index == 2) {
      // setPopoverPosition1({ top: 123, left: 60 });
      setActiveIconIndex2(activeIconIndex2 === index ? null : index);
    } else if (index == 3) {
      // setPopoverPosition1({ top: 176, left: 60 });
      setActiveIconIndex2(activeIconIndex2 === index ? null : index);
    } else if (index == 4) {
      // setPopoverPosition1({ top: 230, left: 60 });
      setActiveIconIndex2(activeIconIndex2 === index ? null : index);
    } else if (index == 5) {
      // setPopoverPosition1({ top: 286, left: 60 });
      setActiveIconIndex2(activeIconIndex2 === index ? null : index);
    } else if (index == 6) {
      // setPopoverPosition1({ top: 286, left: 60 });
      setActiveIconIndex2(activeIconIndex2 === index ? null : index);
    } else {
      return false;
    }
  };

  const linkData = [
    {
      className: "nav-link",
      icon: home,
      alt: "Dashboard",
      Link: "/Dashboard",
    },
    {
      className: "nav-link",
      icon: master,
      alt: "Master",
    },
    {
      className: "nav-link",
      icon: team,
      alt: "Team",
    },
    {
      className: "nav-link",
      icon: Transactions,
      alt: "Transactions",
    },
    {
      className: "nav-link",
      icon: attendence,
      alt: "Attendance",
    },
    // {
    //   className: "nav-link",
    //   icon: status,
    //   alt: "Status",
    // },
    // {
    //   className: "nav-link",
    //   icon: authorization,
    //   alt: "Authorization",
    // },
    {
      className: "nav-link",
      icon: leave,
      alt: "Leave",
    },
    {
      className: "nav-link",
      icon: reports,
      alt: "Reports",
    },
  ];
  const linkDataForSuperAdmin = [
    {
      // className: "nav-link",
      // icon: home,
      // alt: "Home",
      // Link: "/home",
    },
    {
      className: "nav-link",
      icon: master,
      alt: "Master",
    },
  ];

  const linkDataForCadmin = [
    {
      // className: "nav-link",
      // icon: home,
      // alt: "Dashboard",
      // Link: "/Dashboard",
    },
    {
      className: "nav-link",
      icon: master,
      alt: "Master",
    },
    // {
    //   className: "nav-link",
    //   icon: Transactions,
    //   alt: "Transactions",
    // },
    // {
    //   className: "nav-link",
    //   icon: attendence,
    //   alt: "Attendance",
    // },
    // {
    //   className: "nav-link",
    //   icon: reports,
    //   alt: "Reports",
    // },
    // {
    //   className: "nav-link",
    //   icon: leave,
    //   alt: "Leave",
    // },
  ];

  var MasterMenus = [
    {
      page: "Company",
      slug: "companyd",
      actionSlug: "view",
      Link: "/Dashboard/Master/company",
      icon: images["./masterIcon.png"],
    },
    // {
    //   page: "Branch",
    //   slug: "branch",
    //   actionSlug: "view",
    //   Link: "/Dashboard/Master/branch",
    //   icon: images["./branchIcon.png"],
    // },
    {
      page: "Document",
      slug: "document",
      actionSlug: "view",
      Link: "/Dashboard/Master/document",
      icon: images["./docIcon.png"],
    },
    {
      page: "Shift",
      slug: "shift",
      actionSlug: "view",
      Link: "/Dashboard/Master/shift",
      icon: images["./shiftIcon.png"],
    },
    {
      page: "Level/Designation/Department",
      slug: "level-designation-department",
      actionSlug: "view",
      Link: "/Dashboard/Master/LevelDesignationDepartment",
      // icon: images["./leveldesignationdepartment.png"],
      icon: images["./leveldesignationdepartment.png"],
    },
    // {
    //   page: "Levels",
    //   slug: "level",
    //   actionSlug: "view",
    //   Link: "/Dashboard/Master/levels",
    //   icon: images["./levelsIcon.png"],
    // },
    // {
    //   page: "Designation",
    //   slug: "designation",
    //   actionSlug: "view",
    //   Link: "/Dashboard/Master/designation",
    //   icon: images["./desIcon.png"],
    // },
    {
      page: "Salary Heads",
      slug: "salary-heads",
      actionSlug: "view",
      Link: "/Dashboard/Master/payheads",
      icon: images["./salHeadIcon.png"],
      // nestedSubMenus: [
      //   {
      //     page: "Allowance",
      //     icon:images["./salHeadIcon.png"],
      //     Link: "/Dashboard/Master/payheads",
      //   },
      //   {
      //     page: "Deduction",
      //     icon: images["masterIcon"],
      //     Link: "/Dashboard/Master/deduction",
      //   },
      // ],
    },


    // {
    //   page: "Department",
    //   slug: "department",
    //   actionSlug: "view",
    //   Link: "/Dashboard/Master/department",
    //   icon: images["./department.png"],
    // },
    {
      page: "Break",
      slug: "break",
      actionSlug: "view",
      Link: "/Dashboard/Master/break",
      icon: images["./breakIcon.png"],
    },
    {
      page: "Employee",
      slug: "employee",
      actionSlug: "view",
      Link: "/Dashboard/Master/employee",
      icon: images["./newEmployee.png"],
    },
    {
      page: "Holiday",
      slug: "holiday",
      actionSlug: "view",
      Link: "/Dashboard/Master/holiday",
      icon: images["./holidayCalendar.png"],
    },
    // {
    //   page: "User",
    //   slug: "user",
    //   actionSlug: "view",
    //   Link: "/Dashboard/Master/user",
    //   icon: images["./userIcon.png"],
    // },

    {
      page: "Roles",
      slug: "roled",
      actionSlug: "view",
      Link: "/Dashboard/Master/role",
      icon: images["./rolesIcon.png"],
    },
  ];
  var MasterMenusForCadmin = [

    {
      page: "Branch",
      slug: "branch",
      actionSlug: "view",
      Link: "/Dashboard/Master/branch",
      icon: images["./branchIcon.png"],
    },


    {
      page: "User",
      slug: "user",
      actionSlug: "view",
      Link: "/Dashboard/Master/user",
      icon: images["./userIcon.png"],
    },
    // {
    //   page: "Roles",
    //   slug: "roled",
    //   actionSlug: "view",
    //   Link: "/Dashboard/Master/role",
    //   icon: images["./rolesIcon.png"],
    // },
  ];

  var TeamManagementMenus = [
    // {
    //   page: "Holiday/Calender",
    //   slug: "holiday-calender",
    //   actionSlug: "view",
    //   icon: images["./userIcon.png"],
    //   Link: "ledger",
    // },
    {
      page: "Lead-Site Mapping",
      slug: "lead-site-mapping",
      actionSlug: "view",
      icon: images["./leadsitemapping.png"],
      Link: "/Dashboard/Team/lead-site-mapping",
    },
    {
      page: "Team Allocation",
      slug: "team-allocation",
      actionSlug: "view",
      icon: images["./teamallocation.png"],
      Link: "/Dashboard/Team/team-allocation",
    },
  ];

  var TransactionMenus = [
    {
      page: "Ledger",
      slug: "ledger",
      actionSlug: "view",
      icon: images["./ledger.png"],
      Link: "/Dashboard/Tranx/ledger",
    },
    {
      page: "Ledger Group",
      slug: "ledger-group",
      actionSlug: "view",
      icon: images["./ledgerGroup.png"],
      Link: "/Dashboard/Tranx/ledger-group",
    },
    {
      page: "Payment",
      slug: "payment",
      actionSlug: "view",
      icon: images["./Payments.png"],
      Link: "/Dashboard/Tranx/payment",
    },
    // {
    //   page: "Receipt",
    //   slug: "receipt",
    //   actionSlug: "view",
    //   icon: images["./Receipt.png"],
    //   Link: "/Dashboard/Tranx/receipt",
    // },
    {
      page: "Contra",
      slug: "contra",
      actionSlug: "view",
      icon: images["./Receipt.png"],
      Link: "/Dashboard/Tranx/contra",
    },
    // {
    //   page: "Journal",
    //   slug: "journal",
    //   actionSlug: "view",
    //   icon: images["./Receipt.png"],
    //   Link: "/Dashboard/Tranx/journal",
    // },
    {
      page: "Advance Payment",
      slug: "advance-payment",
      actionSlug: "view",
      icon: images["./Receipt.png"],
      Link: "/Dashboard/Tranx/advance-payments",
    },
    {
      page: "Installment Repayment",
      slug: "installment-repayment",
      actionSlug: "view",
      icon: images["./Payments.png"],
      Link: "/Dashboard/Tranx/installment-repayment",
    },
    {
      page: "Payroll",
      slug: "payroll",
      actionSlug: "view",
      icon: images["./userIcon.png"],
      Link: "/Dashboard/Tranx/payroll",
    },
  ];

  var AttendanceManagementMenus = [
    {
      page: "Attendance Approval",
      slug: "attendance-approval",
      actionSlug: "view",
      icon: images["./AttendanceApproval.png"],
      Link: "/Dashboard/Attendance/attendance-approval",
    },
    {
      page: "Manual Attendance",
      slug: "manual-attendance",
      actionSlug: "view",
      icon: images["./ManualAttendance.png"],
      Link: "/Dashboard/Attendance/manual-attendance",
    },

    {
      page: "Leave Approval",
      slug: "leave-approval",
      actionSlug: "view",
      icon: images["./Leaves.png"],
      Link: "/Dashboard/Attendance/leave-approval",
    },
  ];

  var StatusManagementMenus = [
    {
      page: "Self",
      slug: "self-attendance",
      actionSlug: "view",
      icon: images["./self.png"],
      Link: "/Dashboard/Status/self-attendance",
    },
    {
      page: "Team",
      slug: "team-attendance",
      actionSlug: "view",
      icon: images["./teams.png"],
      Link: "/Dashboard/Status/team-attendance",
    },
    {
      page: "Absent List",
      slug: "absent-employee",
      actionSlug: "view",
      icon: images["./absent-list.png"],
      Link: "/Dashboard/Status/absent-employee",
    },
  ];

  var AuthorizationManagementMenus = [
    {
      page: "Punch In",
      slug: "punch-in",
      actionSlug: "view",
      icon: images["./punchin.png"],
      Link: "/Dashboard/Authorization/punch-in",
    },
    {
      page: "Punch Out",
      slug: "punch-out",
      actionSlug: "view",
      icon: images["./punchout.png"],
      Link: "/Dashboard/Authorization/punch-out",
    },
    {
      page: "Exceptions",
      slug: "exceptions",
      actionSlug: "view",
      icon: images["./exception.png"],
      Link: "/Dashboard/Authorization/exceptions",
    },
    {
      page: "History Data",
      slug: "history-data",
      actionSlug: "view",
      icon: images["./historydata.png"],
      Link: "/Dashboard/Authorization/history-data",
    },
  ];
  var LeaveManagementMenus = [
    // {
    //   page: "Holiday/Calender",
    //   slug: "holiday-calender",
    //   actionSlug: "view",
    //   icon: images["./userIcon.png"],
    //   Link: "ledger",
    // },
    {
      page: "Leave Master",
      slug: "leave-master",
      actionSlug: "view",
      icon: images["./Leaves.png"],
      Link: "/Dashboard/LeaveManagement/leave-master",
    },
    {
      page: "Leave Approval",
      slug: "leave-approval",
      actionSlug: "view",
      icon: images["./Leaves.png"],
      Link: "/Dashboard/Attendance/leave-approval",
    },
  ];


  var ReportsMenus = [
    {
      page: "Attendance",
      slug: "attendance-report",
      actionSlug: "view",
      icon: images["./Attendance.png"],
      Link: "/Dashboard/Reports/attendance-report",
      // nestedSubMenus: [
      //   {
      //     page: "Late",
      //     slug: "late",
      //     actionSlug: "view",
      //     icon: images["./userIcon.png"],
      //     Link: "ledger",
      //   },
      //   {
      //     page: "Manual",
      //     slug: "manual",
      //     actionSlug: "view",
      //     icon: images["./userIcon.png"],
      //     Link: "ledger",
      //   },
      //   {
      //     page: "Monthly Present",
      //     slug: "monthly-present",
      //     actionSlug: "view",
      //     icon: images["./userIcon.png"],
      //     Link: "ledger",
      //   },
      //   {
      //     page: "Yearly Present",
      //     slug: "yearly-present",
      //     actionSlug: "view",
      //     icon: images["./userIcon.png"],
      //     Link: "ledger",
      //   },
      //   {
      //     page: "Yearly Absent",
      //     slug: "yearly-absent",
      //     actionSlug: "view",
      //     icon: images["./userIcon.png"],
      //     Link: "ledger",
      //   },
      // ],
    },
    {
      page: "Leave",
      slug: "leaves-report",
      actionSlug: "view",
      icon: images["./Leaves.png"],
      Link: "/Dashboard/Reports/leave-report",
    },
    {
      page: "Salary",
      slug: "salary-report",
      actionSlug: "view",
      icon: images["./SalarySlip.png"],
      Link: "/Dashboard/Reports/salary-report",
    },
  ];


  // const location =useLocation()

  useEffect(() => {
    document.addEventListener("click", handleClick);
    function handleClick(e) {
      const classes = (e.target.getAttribute("class") || "").split(" ");

      if (classes[0] != "sidebar-logo") {
        // if(classes[0]!="nav-link"){
        //   setActiveIconIndex(null);
        // }
        setActiveIconIndex(null);
      }
    }

    console.log("🚀 ~ file: Sidebar.jsx:339 ~ useEffect ~ props:", props);
  }, []);

  // useEffect(() => {
  //   console.log(activeIconIndex != null || false);
  //   if (activeIconIndex != null || activeIconIndex != false) {
  //     document.addEventListener("mousedown", fnClose);
  //   }
  //   return () => {
  //     console.log(activeIconIndex);

  //     if (activeIconIndex != null || activeIconIndex != false) {
  //       document.removeEventListener("mousedown", fnClose);
  //     } else {
  //       return false;
  //     }
  //   };
  // }, []);

  const fnClose = () => {
    setActiveIconIndex(null);
    console.log("State is set to true.");
  };

  const renderTooltip = (menuName) => (
    <Tooltip id="tooltip" className="custom-tooltip">
      {menuName}
    </Tooltip>
  );

  return (
    <>
      <div className="dashboard_style">
        <div>
          {props.data1}
          <div>
            <Container>
              {/* <Offcanvas
                show={show}
                {...props}
                style={{ width: "306px", opacity: "1" }}
              >
                <Offcanvas.Header>
                  <div onClick={handleClose} className="me-2">
                    <div onClick={handleClose} className="me-2 d-flex">
                      <img src={close} alt="" className="sidebar-close" />{" "}
                      <p className="menu-close"> Main Menu</p>
                    </div>
                  </div>
                </Offcanvas.Header>
              </Offcanvas> */}
              <div>
                <Offcanvas
                  {...props}
                  backdrop={false}
                  keyboard={false}
                  show={show}
                  onHide={true}
                  enforceFocus={false}
                  style={{
                    width: "60px",
                    opacity: "1",
                    backgroundColor: "#0E3E78",
                    border: "none",
                    // background-colo: linear-gradient(to bottom right, red, yellow);
                    // backgroundColor: "linear-gradient(to bottom right, red, yellow)",
                  }}
                >
                  {console.log("user", user)}
                  <Offcanvas.Body>
                    {user.userRole == "sadmin" ? (
                      <>
                        {linkDataForSuperAdmin.map((item, index) => {
                          return (
                            <React.Fragment key={index}>
                              <Link className="nav-link" to={item.Link}>
                                <OverlayTrigger
                                  placement="right"
                                  overlay={renderTooltip(item.alt)}
                                >
                                  <div
                                    className={`me-2 icon-container ${activeIconIndex === index ? "active" : ""
                                      }`}
                                    onClick={() => toggleNav(index)}
                                    style={{ position: "relative" }}
                                  >
                                    <img
                                      src={item.icon}
                                      alt={item.alt}
                                      className="sidebar-logo"
                                    />
                                  </div>
                                </OverlayTrigger>
                              </Link>
                              {activeIconIndex === index && (
                                <div
                                  // className="nav-bar"
                                  className="card"
                                  style={{
                                    position: "absolute",
                                    top: popoverPosition1.top + "px",
                                    left: popoverPosition1.left + "px",
                                    zIndex: 1000 /* Set a higher z-index value */,
                                    background: "#E3F0FF",
                                    // border: "1px solid #100303",
                                    boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
                                    display: "flex",
                                    flexDirection: "column",
                                    // width: "250px" /* Adjust the width as needed */,
                                    // color: "#0f0505",
                                    // padding: "5px",

                                    width: "220px",
                                    color: "rgb(15, 5, 5)",
                                    padding: "0px",
                                    borderRadius: "4px",
                                    paddingBottom: "2px",
                                  }}
                                >
                                  {index == 1 ? (
                                    <ul>
                                      <li>
                                        <Card className="master-menu">
                                          <span>Master</span>
                                        </Card>
                                      </li>

                                      {MasterMenus.map((item, index) => {
                                        return (
                                          <>
                                            {isActionExist(
                                              item.slug,
                                              item.actionSlug,
                                              props.userPermissions
                                            ) && (
                                                <li className="card-li">
                                                  <Card className="div-card">
                                                    <li
                                                      className="nav-link"
                                                      onClick={() => {
                                                        // if (index == 6) {
                                                        //   toggleNav2(index);
                                                        // } else {
                                                        navigate(item.Link);
                                                        // }
                                                      }}
                                                    >
                                                      <div className="sidebar-divs-card">
                                                        <img
                                                          src={item.icon}
                                                          alt=""
                                                          className="sidebar-nested-logo"
                                                        />
                                                        <p className="sidebar-title">
                                                          {item.page}
                                                        </p>
                                                        {/* <img
                                                    src={arrowToExpand}
                                                    alt=""
                                                    className="right-arrow"
                                                  /> */}
                                                      </div>
                                                    </li>
                                                  </Card>
                                                </li>
                                              )}
                                          </>
                                        );
                                      })}
                                    </ul>
                                  ) : null}
                                </div>
                              )}
                            </React.Fragment>
                          );
                        })}
                      </>
                    ) : null}
                    {user.userRole == "badmin" ? (

                      <>
                        {linkData.map((item, index) => {
                          return (
                            <React.Fragment key={index}>
                              <Link className="nav-link" to={item.Link}>
                                <OverlayTrigger
                                  placement="right"
                                  overlay={renderTooltip(item.alt)}
                                >
                                  <div
                                    className={`me-2 icon-container ${activeIconIndex === index ? "active" : ""
                                      }`}
                                    onClick={() => toggleNav(index)}
                                    style={{ position: "relative" }}
                                  >
                                    <img
                                      src={item.icon}
                                      alt={item.alt}
                                      className="sidebar-logo"
                                    />
                                  </div>
                                </OverlayTrigger>
                              </Link>
                              {activeIconIndex === index && (
                                <div
                                  // className="nav-bar"
                                  className="card"
                                  style={{
                                    position: "absolute",
                                    top: popoverPosition1.top + "px",
                                    left: popoverPosition1.left + "px",
                                    zIndex: 1000 /* Set a higher z-index value */,
                                    background: "#E3F0FF",
                                    // border: "1px solid #100303",
                                    boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
                                    display: "flex",
                                    flexDirection: "column",
                                    // width: "250px" /* Adjust the width as needed */,
                                    // color: "#0f0505",
                                    // padding: "5px",

                                    width: "263px",
                                    color: "rgb(15, 5, 5)",
                                    padding: "0px",
                                    borderRadius: "4px",
                                    paddingBottom: "2px",
                                  }}
                                >
                                  {index == 1 ? (
                                    <ul>
                                      <li>
                                        <Card className="master-menu">
                                          <span>Master</span>
                                        </Card>
                                      </li>

                                      {MasterMenus.map((item, index) => {
                                        return (
                                          <>
                                            {isActionExist(
                                              item.slug,
                                              item.actionSlug,
                                              props.userPermissions
                                            ) && (
                                                <li className="card-li">
                                                  <Card className="div-card">
                                                    <li
                                                      className="nav-link"
                                                      onClick={() => {
                                                        // if (index == 6) {
                                                        //   toggleNav2(index);
                                                        // } else {
                                                        navigate(item.Link);
                                                        // }
                                                      }}
                                                    >
                                                      <div className="sidebar-divs-card">
                                                        <img
                                                          src={item.icon}
                                                          alt=""
                                                          className="sidebar-nested-logo"
                                                        />
                                                        <p className="sidebar-title">
                                                          {item.page}
                                                        </p>
                                                        {/* <img
                                                    src={arrowToExpand}
                                                    alt=""
                                                    className="right-arrow"
                                                  /> */}
                                                      </div>
                                                    </li>
                                                  </Card>
                                                </li>
                                              )}
                                          </>
                                        );
                                      })}
                                    </ul>
                                  ) : null}

                                  {index == 2 ? (
                                    <ul>
                                      <li>
                                        <Card className="master-menu">
                                          <span>Team</span>
                                        </Card>
                                      </li>
                                      {TeamManagementMenus.map(
                                        (item, index) => {
                                          return (
                                            <>
                                              {isActionExist(
                                                item.slug,
                                                item.actionSlug,
                                                props.userPermissions
                                              ) && (
                                                  <li
                                                    className="card-li"
                                                    onClick={() =>
                                                      toggleNav1(index)
                                                    }
                                                  >
                                                    <Card className="div-card">
                                                      <li
                                                        className="nav-link"
                                                        onClick={() => {
                                                          navigate(item.Link);
                                                        }}
                                                      >
                                                        <div className="sidebar-divs-card">
                                                          <img
                                                            src={item.icon}
                                                            alt=""
                                                            className="sidebar-nested-logo"
                                                          />
                                                          <p className="sidebar-title">
                                                            {item.page}
                                                          </p>
                                                          {/* <img
                                                    src={arrowToExpand}
                                                    alt=""
                                                    className="right-arrow"
                                                  /> */}
                                                        </div>
                                                      </li>
                                                    </Card>
                                                  </li>
                                                )}
                                            </>
                                          );
                                        }
                                      )}
                                    </ul>
                                  ) : null}

                                  {index == 3 ? (
                                    <ul>
                                      <li>
                                        <Card className="master-menu">
                                          <span>Transaction</span>
                                        </Card>
                                      </li>
                                      {TransactionMenus.map((item, index) => {
                                        return (
                                          <>
                                            {isActionExist(
                                              item.slug,
                                              item.actionSlug,
                                              props.userPermissions
                                            ) && (
                                                <li className="card-li">
                                                  <Card className="div-card">
                                                    <li
                                                      className="nav-link"
                                                      onClick={() => {
                                                        // if (index == 6) {
                                                        //   toggleNav2(index);
                                                        // } else {
                                                        navigate(item.Link);
                                                        // }
                                                      }}
                                                    >
                                                      <div className="sidebar-divs-card">
                                                        <img
                                                          src={item.icon}
                                                          alt=""
                                                          className="sidebar-nested-logo"
                                                        />
                                                        <p className="sidebar-title">
                                                          {item.page}
                                                        </p>
                                                        {/* <img
                                                    src={arrowToExpand}
                                                    alt=""
                                                    className="right-arrow"
                                                  /> */}
                                                      </div>
                                                    </li>
                                                  </Card>
                                                </li>
                                              )}
                                          </>
                                        );
                                      })}
                                    </ul>
                                  ) : null}

                                  {index == 4 ? (
                                    <ul>
                                      <li>
                                        <Card className="master-menu">
                                          <span>Attendance Management</span>
                                        </Card>
                                      </li>
                                      {AttendanceManagementMenus.map(
                                        (item, index) => {
                                          return (
                                            <>
                                              {isActionExist(
                                                item.slug,
                                                item.actionSlug,
                                                props.userPermissions
                                              ) && (
                                                  <li>
                                                    <Card className="div-card">
                                                      <li
                                                        className="nav-link"
                                                        onClick={() => {
                                                          navigate(item.Link);
                                                        }}
                                                      >
                                                        <div className="sidebar-divs-card">
                                                          <img
                                                            src={item.icon}
                                                            alt=""
                                                            className="sidebar-nested-logo"
                                                          />
                                                          <p className="sidebar-title">
                                                            {item.page}
                                                          </p>
                                                          {/* <img
                                                      src={arrowToExpand}
                                                      alt=""
                                                      className="right-arrow"
                                                    /> */}
                                                        </div>
                                                      </li>
                                                    </Card>
                                                  </li>
                                                )}
                                            </>
                                          );
                                        }
                                      )}
                                    </ul>
                                  ) : null}
                                  {/* {index == 5 ? (
                                    <ul>
                                      <li>
                                        <Card className="master-menu">
                                          <span>Status</span>
                                        </Card>
                                      </li>
                                      {StatusManagementMenus.map(
                                        (item, index) => {
                                          return (
                                            <>
                                              {isActionExist(
                                                item.slug,
                                                item.actionSlug,
                                                props.userPermissions
                                              ) && (
                                                  <li
                                                    className="card-li"
                                                    onClick={() =>
                                                      toggleNav1(index)
                                                    }
                                                  >
                                                    <Card className="div-card">
                                                      <li
                                                        className="nav-link"
                                                        onClick={() => {
                                                          navigate(item.Link);
                                                        }}
                                                      >
                                                        <div className="sidebar-divs-card">
                                                          <img
                                                            src={item.icon}
                                                            alt=""
                                                            className="sidebar-nested-logo"
                                                          />
                                                          <p className="sidebar-title">
                                                            {item.page}
                                                        </p>
                                                        </div>
                                                      </li>
                                                    </Card>
                                                  </li>
                                                )}
                                            </>
                                          );
                                        }
                                      )}
                                    </ul>
                                  ) : null}
                                  {index == 6 ? (
                                    <ul>
                                      <li>
                                        <Card className="master-menu">
                                          <span>Authorization</span>
                                        </Card>
                                      </li>
                                      {AuthorizationManagementMenus.map(
                                        (item, index) => {
                                          return (
                                            <>
                                              {isActionExist(
                                                item.slug,
                                                item.actionSlug,
                                                props.userPermissions
                                              ) && (
                                                  <li
                                                    className="card-li"
                                                    onClick={() =>
                                                      toggleNav1(index)
                                                    }
                                                  >
                                                    <Card className="div-card">
                                                      <li
                                                        className="nav-link"
                                                        onClick={() => {
                                                          navigate(item.Link);
                                                        }}
                                                      >
                                                        <div className="sidebar-divs-card">
                                                          <img
                                                            src={item.icon}
                                                            alt=""
                                                            className="sidebar-nested-logo"
                                                          />
                                                          <p className="sidebar-title">
                                                            {item.page}
                                                          </p>
                                                        </div>
                                                      </li>
                                                    </Card>
                                                  </li>
                                                )}
                                            </>
                                          );
                                        }
                                      )}
                                    </ul>
                                  ) : null} */}

                                  {index == 5 ? (
                                    <ul>
                                      <li>
                                        <Card className="master-menu">
                                          <span>Leave Management</span>
                                        </Card>
                                      </li>
                                      {LeaveManagementMenus.map(
                                        (item, index) => {
                                          return (
                                            <>
                                              {isActionExist(
                                                item.slug,
                                                item.actionSlug,
                                                props.userPermissions
                                              ) && (
                                                  <li
                                                    className="card-li"
                                                    onClick={() =>
                                                      toggleNav1(index)
                                                    }
                                                  >
                                                    <Card className="div-card">
                                                      <li
                                                        className="nav-link"
                                                        onClick={() => {
                                                          navigate(item.Link);
                                                        }}
                                                      >
                                                        <div className="sidebar-divs-card">
                                                          <img
                                                            src={item.icon}
                                                            alt=""
                                                            className="sidebar-nested-logo"
                                                          />
                                                          <p className="sidebar-title">
                                                            {item.page}
                                                          </p>
                                                          {/* <img
                                                    src={arrowToExpand}
                                                    alt=""
                                                    className="right-arrow"
                                                  /> */}
                                                        </div>
                                                      </li>
                                                    </Card>
                                                  </li>
                                                )}
                                            </>
                                          );
                                        }
                                      )}
                                    </ul>
                                  ) : null}

                                  {index == 6 ? (
                                    <ul>
                                      <li>
                                        <Card className="master-menu">
                                          <span>Reports</span>
                                        </Card>
                                      </li>
                                      {ReportsMenus.map((item, index) => {
                                        return (
                                          <>
                                            {isActionExist(
                                              item.slug,
                                              item.actionSlug,
                                              props.userPermissions
                                            ) && (
                                                <>
                                                  <li
                                                    onClick={() =>
                                                      toggleNav1(index)
                                                    }
                                                  >
                                                    <Card className="div-card">
                                                      <div
                                                        className="nav-link"
                                                        onClick={() => {
                                                          navigate(item.Link);
                                                        }}
                                                      >
                                                        <div className="sidebar-divs-card">
                                                          <img
                                                            src={item.icon}
                                                            alt=""
                                                            className="sidebar-nested-logo"
                                                          />
                                                          <p className="sidebar-title">
                                                            {item.page}
                                                          </p>
                                                          {/* <img
                                                      src={arrowToExpand}
                                                      alt=""
                                                      className="right-arrow"
                                                    /> */}
                                                        </div>
                                                      </div>
                                                    </Card>
                                                  </li>
                                                </>
                                              )}
                                          </>
                                        );
                                      })}
                                    </ul>
                                  ) : null}


                                </div>
                              )}
                            </React.Fragment>
                          );
                        })}
                      </>
                    ) : null}
                    {user.userRole == "cadmin" ? (

                      <>
                        {linkDataForCadmin.map((item, index) => {
                          return (
                            <React.Fragment key={index}>
                              <Link className="nav-link" to={item.Link}>
                                <OverlayTrigger
                                  placement="right"
                                  overlay={renderTooltip(item.alt)}
                                >
                                  <div
                                    className={`me-2 icon-container ${activeIconIndex === index ? "active" : ""
                                      }`}
                                    onClick={() => toggleNav(index)}
                                    style={{ position: "relative" }}
                                  >
                                    <img
                                      src={item.icon}
                                      alt={item.alt}
                                      className="sidebar-logo"
                                    />
                                  </div>
                                </OverlayTrigger>
                              </Link>
                              {activeIconIndex === index && (
                                <div
                                  // className="nav-bar"
                                  className="card"
                                  style={{
                                    position: "absolute",
                                    top: popoverPosition1.top + "px",
                                    left: popoverPosition1.left + "px",
                                    zIndex: 1000 /* Set a higher z-index value */,
                                    background: "#E3F0FF",
                                    // border: "1px solid #100303",
                                    boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
                                    display: "flex",
                                    flexDirection: "column",
                                    // width: "250px" /* Adjust the width as needed */,
                                    // color: "#0f0505",
                                    // padding: "5px",

                                    width: "220px",
                                    color: "rgb(15, 5, 5)",
                                    padding: "0px",
                                    borderRadius: "4px",
                                    paddingBottom: "2px",
                                  }}
                                >
                                  {index == 1 ? (
                                    <ul>
                                      <li>
                                        <Card className="master-menu">
                                          <span>Master</span>
                                        </Card>
                                      </li>

                                      {MasterMenusForCadmin.map((item, index) => {
                                        return (
                                          <>
                                            {/* {isActionExist(
                                              item.slug,
                                              item.actionSlug,
                                              props.userPermissions
                                            ) && ( */}
                                            <li className="card-li">
                                              <Card className="div-card">
                                                <li
                                                  className="nav-link"
                                                  onClick={() => {
                                                    // if (index == 6) {
                                                    //   toggleNav2(index);
                                                    // } else {
                                                    navigate(item.Link);
                                                    // }
                                                  }}
                                                >
                                                  <div className="sidebar-divs-card">
                                                    <img
                                                      src={item.icon}
                                                      alt=""
                                                      className="sidebar-nested-logo"
                                                    />
                                                    <p className="sidebar-title">
                                                      {item.page}
                                                    </p>
                                                    {/* <img
                                                    src={arrowToExpand}
                                                    alt=""
                                                    className="right-arrow"
                                                  /> */}
                                                  </div>
                                                </li>
                                              </Card>
                                            </li>
                                            {/* )} */}
                                          </>
                                        );
                                      })}
                                    </ul>
                                  ) : null}

                                  {index == 2 ? (
                                    <ul>
                                      <li>
                                        <Card className="master-menu">
                                          <span>Team</span>
                                        </Card>
                                      </li>
                                      {TeamManagementMenus.map(
                                        (item, index) => {
                                          return (
                                            <>
                                              {isActionExist(
                                                item.slug,
                                                item.actionSlug,
                                                props.userPermissions
                                              ) && (
                                                  <li
                                                    className="card-li"
                                                    onClick={() =>
                                                      toggleNav1(index)
                                                    }
                                                  >
                                                    <Card className="div-card">
                                                      <li
                                                        className="nav-link"
                                                        onClick={() => {
                                                          navigate(item.Link);
                                                        }}
                                                      >
                                                        <div className="sidebar-divs-card">
                                                          <img
                                                            src={item.icon}
                                                            alt=""
                                                            className="sidebar-nested-logo"
                                                          />
                                                          <p className="sidebar-title">
                                                            {item.page}
                                                          </p>
                                                          {/* <img
                                                    src={arrowToExpand}
                                                    alt=""
                                                    className="right-arrow"
                                                  /> */}
                                                        </div>
                                                      </li>
                                                    </Card>
                                                  </li>
                                                )}
                                            </>
                                          );
                                        }
                                      )}
                                    </ul>
                                  ) : null}

                                  {index == 3 ? (
                                    <ul>
                                      <li>
                                        <Card className="master-menu">
                                          <span>Transaction</span>
                                        </Card>
                                      </li>
                                      {TransactionMenus.map((item, index) => {
                                        return (
                                          <>
                                            {isActionExist(
                                              item.slug,
                                              item.actionSlug,
                                              props.userPermissions
                                            ) && (
                                                <li className="card-li">
                                                  <Card className="div-card">
                                                    <li
                                                      className="nav-link"
                                                      onClick={() => {
                                                        // if (index == 6) {
                                                        //   toggleNav2(index);
                                                        // } else {
                                                        navigate(item.Link);
                                                        // }
                                                      }}
                                                    >
                                                      <div className="sidebar-divs-card">
                                                        <img
                                                          src={item.icon}
                                                          alt=""
                                                          className="sidebar-nested-logo"
                                                        />
                                                        <p className="sidebar-title">
                                                          {item.page}
                                                        </p>
                                                        {/* <img
                                                    src={arrowToExpand}
                                                    alt=""
                                                    className="right-arrow"
                                                  /> */}
                                                      </div>
                                                    </li>
                                                  </Card>
                                                </li>
                                              )}
                                          </>
                                        );
                                      })}
                                    </ul>
                                  ) : null}

                                  {index == 4 ? (
                                    <ul>
                                      <li>
                                        <Card className="master-menu">
                                          <span>Attendance Management</span>
                                        </Card>
                                      </li>
                                      {AttendanceManagementMenus.map(
                                        (item, index) => {
                                          return (
                                            <>
                                              {isActionExist(
                                                item.slug,
                                                item.actionSlug,
                                                props.userPermissions
                                              ) && (
                                                  <li>
                                                    <Card className="div-card">
                                                      <li
                                                        className="nav-link"
                                                        onClick={() => {
                                                          navigate(item.Link);
                                                        }}
                                                      >
                                                        <div className="sidebar-divs-card">
                                                          <img
                                                            src={item.icon}
                                                            alt=""
                                                            className="sidebar-nested-logo"
                                                          />
                                                          <p className="sidebar-title">
                                                            {item.page}
                                                          </p>
                                                          {/* <img
                                                      src={arrowToExpand}
                                                      alt=""
                                                      className="right-arrow"
                                                    /> */}
                                                        </div>
                                                      </li>
                                                    </Card>
                                                  </li>
                                                )}
                                            </>
                                          );
                                        }
                                      )}
                                    </ul>
                                  ) : null}
                                  {/* {index == 5 ? (
                                    <ul>
                                      <li>
                                        <Card className="master-menu">
                                          <span>Status</span>
                                        </Card>
                                      </li>
                                      {StatusManagementMenus.map(
                                        (item, index) => {
                                          return (
                                            <>
                                              {isActionExist(
                                                item.slug,
                                                item.actionSlug,
                                                props.userPermissions
                                              ) && (
                                                  <li
                                                    className="card-li"
                                                    onClick={() =>
                                                      toggleNav1(index)
                                                    }
                                                  >
                                                    <Card className="div-card">
                                                      <li
                                                        className="nav-link"
                                                        onClick={() => {
                                                          navigate(item.Link);
                                                        }}
                                                      >
                                                        <div className="sidebar-divs-card">
                                                          <img
                                                            src={item.icon}
                                                            alt=""
                                                            className="sidebar-nested-logo"
                                                          />
                                                          <p className="sidebar-title">
                                                            {item.page}
                                                          </p>
                                                        </div>
                                                      </li>
                                                    </Card>
                                                  </li>
                                                )}
                                            </>
                                          );
                                        }
                                      )}
                                    </ul>
                                  ) : null}
                                  {index == 6 ? (
                                    <ul>
                                      <li>
                                        <Card className="master-menu">
                                          <span>Authorization</span>
                                        </Card>
                                      </li>
                                      {AuthorizationManagementMenus.map(
                                        (item, index) => {
                                          return (
                                            <>
                                              {isActionExist(
                                                item.slug,
                                                item.actionSlug,
                                                props.userPermissions
                                              ) && (
                                                  <li
                                                    className="card-li"
                                                    onClick={() =>
                                                      toggleNav1(index)
                                                    }
                                                  >
                                                    <Card className="div-card">
                                                      <li
                                                        className="nav-link"
                                                        onClick={() => {
                                                          navigate(item.Link);
                                                        }}
                                                      >
                                                        <div className="sidebar-divs-card">
                                                          <img
                                                            src={item.icon}
                                                            alt=""
                                                            className="sidebar-nested-logo"
                                                          />
                                                          <p className="sidebar-title">
                                                            {item.page}
                                                          </p>
                                                        </div>
                                                      </li>
                                                    </Card>
                                                  </li>
                                                )}
                                            </>
                                          );
                                        }
                                      )}
                                    </ul>
                                  ) : null} */}

                                  {index == 5 ? (
                                    <ul>
                                      <li>
                                        <Card className="master-menu">
                                          <span>Leave Management</span>
                                        </Card>
                                      </li>
                                      {LeaveManagementMenus.map(
                                        (item, index) => {
                                          return (
                                            <>
                                              {isActionExist(
                                                item.slug,
                                                item.actionSlug,
                                                props.userPermissions
                                              ) && (
                                                  <li
                                                    className="card-li"
                                                    onClick={() =>
                                                      toggleNav1(index)
                                                    }
                                                  >
                                                    <Card className="div-card">
                                                      <li
                                                        className="nav-link"
                                                        onClick={() => {
                                                          navigate(item.Link);
                                                        }}
                                                      >
                                                        <div className="sidebar-divs-card">
                                                          <img
                                                            src={item.icon}
                                                            alt=""
                                                            className="sidebar-nested-logo"
                                                          />
                                                          <p className="sidebar-title">
                                                            {item.page}
                                                          </p>
                                                          {/* <img
                                                    src={arrowToExpand}
                                                    alt=""
                                                    className="right-arrow"
                                                  /> */}
                                                        </div>
                                                      </li>
                                                    </Card>
                                                  </li>
                                                )}
                                            </>
                                          );
                                        }
                                      )}
                                    </ul>
                                  ) : null}

                                  {index == 6 ? (
                                    <ul>
                                      <li>
                                        <Card className="master-menu">
                                          <span>Reports</span>
                                        </Card>
                                      </li>
                                      {ReportsMenus.map((item, index) => {
                                        return (
                                          <>
                                            {isActionExist(
                                              item.slug,
                                              item.actionSlug,
                                              props.userPermissions
                                            ) && (
                                                <>
                                                  <li
                                                    onClick={() =>
                                                      toggleNav1(index)
                                                    }
                                                  >
                                                    <Card className="div-card">
                                                      <div
                                                        className="nav-link"
                                                        onClick={() => {
                                                          navigate(item.Link);
                                                        }}
                                                      >
                                                        <div className="sidebar-divs-card">
                                                          <img
                                                            src={item.icon}
                                                            alt=""
                                                            className="sidebar-nested-logo"
                                                          />
                                                          <p className="sidebar-title">
                                                            {item.page}
                                                          </p>
                                                          {/* <img
                                                      src={arrowToExpand}
                                                      alt=""
                                                      className="right-arrow"
                                                    /> */}
                                                        </div>
                                                      </div>
                                                    </Card>
                                                  </li>
                                                </>
                                              )}
                                          </>
                                        );
                                      })}
                                    </ul>
                                  ) : null}


                                </div>
                              )}
                            </React.Fragment>
                          );
                        })}
                      </>
                    ) : null}
                  </Offcanvas.Body>
                </Offcanvas>
              </div>
            </Container>
          </div>
          {/* Here we pass the dynamic main components by props */}

          <div
            className=" scrollable-div-page"
            style={{ position: "fixed", width: "95%" }}
          >
            {props.data}
          </div>
          {/* </div> */}
          {/* common end */}
        </div>
      </div>
    </>
  );
};

{
  /* <style>
  {`
  .fade offcanvas-backdrop show{
    opacity: 0 !important;
  }
`}
</style>; */
}

// // !Redux state variables
// const mapStateToProps = ({ appReducer }) => {
//   return { appReducer };
// };

// // !Redux dispatch Functions
// const mapActionsToProps = (dispatch) => {
//   return bindActionCreators(
//     {
//       ReduxSetAppV,
//       ReduxGetAppV,
//       ReduxCleanAppV,
//     },
//     dispatch
//   );
// };

// export default connect(
//   mapStateToProps,
//   mapActionsToProps
// )(withNavigate(Sidebar));

export default WithUserPermission(Sidebar);
