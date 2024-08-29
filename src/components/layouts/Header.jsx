import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Redirect, useNavigate } from "react-router-dom";
import {
  faBars,
  faBell,
  faCalendarCheck,
  faFile,
  faGear,
  faHouse,
  faInbox,
  faLayerGroup,
  faPowerOff,
  faUserGroup,
  faXmark,
  hamburger,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
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
import logo from "../../assets/images/Logo.png";
import bell from "../../assets/images/bellLogo.png";

import { Link } from "react-router-dom";
// import { ReduxSetAppV, ReduxGetAppV, ReduxCleanAppV } from "@/redux/actions";
import { bindActionCreators } from "redux";
import { connect, useDispatch } from "react-redux";
import { withNavigate } from "@/routes";
import { AuthenticationService } from "../../services/api_functions";
import { setUserPermissions } from "../../redux/userPermissions/Action";
import { setListData } from "../../redux/listData/Action";
import { WithUserPermission } from "../../helpers/WithUserPermission";
import { setUserData } from "../../redux/userDetails/Action";
// import { checkWindowTabId, findDataExistWindowTabId } from "@/helpers";
// import {
//   AuthenticationService,
// } from "../../services/api_functions/authenticate.service";
function Header(props) {
  const [outlets, setOutlets] = useState([]);
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const userDetails = props.userDetails;
  const index = props.userDetails;
  const firstUser = index[0];
  const userRole = firstUser.userRole;
  return (
    <div className="fixed-header">
      <Navbar expand="lg" className="top-nav-style">
        <Container fluid>
          {/* <Navbar.Brand href="#"> */}
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="" className="logo_style" />
          </Link>
          {/* </Navbar.Brand> */}
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            ></Nav>
            {/* {userRole != "badmin" && ( */}
            <div className="d-flex">
              <div>
                <p className="mb-0 org-style">Organization:</p>
                <Dropdown>
                  <Dropdown.Toggle
                    id="dropdown-basic"
                    className=" style-dropdown"
                  >
                    <span className="dropdown-style">
                      Paradise System
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        style={{ color: "#0070ee", paddingLeft: "5px" }}
                      />
                      {/* <FontAwesomeIcon icon={faLayerGroup} /> */}
                    </span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {userRole == "sadmin" ?
                      <Dropdown.Item ><span className="mb-0 org-style">Company :</span></Dropdown.Item> :
                      <Dropdown.Item ><span className="mb-0 org-style">Branch :</span></Dropdown.Item>
                    }

                    {console.log('props.listCompData: InHeader ', props)}

                    <Dropdown.Divider />
                    {/* {outlets.map((outlet) => ( */}
                    {props.listCompData && props.listCompData.length > 0 ? (
                      props.listCompData.map((v, i) => {
                        return <Dropdown.Item className="header-name2"><span className="dropdown-style">{v.name}</span></Dropdown.Item>;
                      })
                    ) : (
                      <tr>
                        <td colSpan={5} className="text-center">
                          No Data Found
                        </td>
                      </tr>
                    )}
                    {/* ))} */}
                    {/* <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                                <Dropdown.Item href="#/action-2">
                                                    Another action
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#/action-3">
                                                    Something else
                                                </Dropdown.Item> */}
                  </Dropdown.Menu>

                </Dropdown>
              </div>
              <div class="vertical"></div>
            </div>
            {/* )} */}
            {/* {["end"].map((placement, idx) => (
                                    <OffCanvasExample
                                        key={idx}
                                        placement={placement}
                                        name={placement}
                                    />
                                ))} */}
            <img src={bell} alt="" className="common_icons me-3" />
            <Row className="backgroundStyle">
              {/* {console.log('userDetails: ', props)} */}
              <Col className="d-flex">
                <div className="nameCodeStyle">{userDetails && userDetails.length > 0 && userDetails[0].fullName != null ? userDetails[0].fullName.split(/\s/).reduce((response, word) => response += word.slice(0, 1), '') : "SA"}</div>

                <div className="fullNameStyle">{userDetails && userDetails.length > 0 && userDetails[0].fullName != null ? userDetails[0].fullName : "Super Admin"}</div>
              </Col>
            </Row>
            {/* <Link to="/"> */}
            <FontAwesomeIcon
              style={{ color: "#0070ee", fontSize: "24px" }}
              icon={faPowerOff}
              // to="/login"
              onClick={(e) => {
                e.preventDefault();
                dispatch(setUserPermissions([]));

                dispatch(setListData([]));
                dispatch(setUserData([]));

                // console.log("Logout Clicked");
                AuthenticationService.logout();
                // props.ReduxCleanAppV();
                navigate("/");

                // window.location.reload();
              }}
            />
            {/* </Link> */}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

// !Redux state variables
// const mapStateToProps = ({ appReducer }) => {
//   console.log("appReducer: ", appReducer);

//   return { appReducer };
// };

// !Redux dispatch Functions
// const mapActionsToProps = (dispatch) => {
//   console.log("dispatch: ", dispatch);

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
// )(withNavigate(Header));

// export default Header;
export default WithUserPermission(Header);
