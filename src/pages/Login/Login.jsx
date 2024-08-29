import React, { useEffect, useState } from "react";
import { withNavigate } from "@/routes";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import logo from "../../assets/images/Logo.png";
import { Row, Col, Form, Button, Spinner } from "react-bootstrap";
// import { authenticationService } from "@/services/api_functions";
import CustomInput from "../../components/CustomInputs";
import {
  AuthenticationService,
  getUserPermission,
} from "../../services/api_functions";
import { Redirect, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUserPermissions } from "@/redux/userPermissions/Action";
import { setListData } from "@/redux/listData/Action";
import { setUserData } from "@/redux/userDetails/Action";
// import { setListData } from "@/redux/ListData/Action";
import ResponseModal from "../../components/ResponseModal";
// import { setUserData } from "../../redux/userDetails/Action";
// import { setHeaderData } from "../../redux/userPermissions/Action";
// import { setListData } from "../../redux/ListData/Action";
// import ResponseModalForErr from "../../components/ResponseModal";

const Login = (props) => {
  // const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const togglePasswordVisiblity = () => {
    setShowPassword(showPassword ? false : true);
  };
  const handleClick = () => {
    var elem = document.getElementById("loginform");
    elem.style.transition = "all 2s ease-in-out";
    elem.style.display = "none";
    document.getElementById("recoverform").style.display = "block";
  };
  const [isRedirect, setIsRedirect] = useState(false);
  const [IsAdmin, setIsAdmin] = useState(false);
  const [IsCAdmin, setIsCAdmin] = useState(false);
  const [IsBAdmin, setIsBAdmin] = useState(false);
  //   const redirect = () => {
  //     if (isRedirect == true) {
  //       return (
  //         <Redirect
  //           to={{
  //             pathname: "/dashboard",
  //             state: { from: props.location },
  //           }}
  //         />
  //       );
  //     } else {
  //       return "";
  //     }
  //   };
  //   useEffect(() => {
  //     if (AuthenticationService.currentUserValue) {
  //       setIsRedirect(true);
  //     }
  //   }, []);

  const [ResModal, setResModal] = useState(false);
  const [ResText, setResText] = useState(false);
  const [LogoType, setLogoType] = useState("");

  const callUserPermission = (userId, list, userObject) => {
    const requestData = new FormData();
    requestData.append("user_id", userId);
    getUserPermission(requestData)
      .then((response) => {
        console.log("user permission : ", response);
        if (response.status === 200) {
          console.log("data", response.data.userActions);
          let userPerm = response.data.userActions;

          // let userPerm = {
          //   userActions: response.data.userActions,
          //   list: list
          // }
          openModal("Login Successful", "cnf");
          console.log('list: ', list);
          // let data=[userObject]
          dispatch(setUserData([userObject]));

          dispatch(setUserPermissions(userPerm));
          dispatch(setListData(list));
          // navigate("/home");

          // navigate("/home");

          // toast.success("✔ Login Success", {
          // onClose: () => props.history.push(from),
          // window.location.href = "/dashboard"
          // onClose: () => props.history.push("/dashboard", true),
          // });
        } else {
          // toast.error("✘ You are not authorized user");
          openModal("You are not authorized user", "error")
        }
      })
      .catch((error) => {
        console.log("error : ", error);
      });
  };

  // Function to close the modal
  const closeModal = () => {
    setResModal(false);
    setResText("");

  };


  // Function to handle form submission with confirmation
  const handleConfirmSubmit = () => {
    console.log(ResText);
    if (ResText == "error") {
      setResModal(false);
      setResText("")

      return false
    }
    // handleSubmit();
    // closeModal(); // Close the modal after submission
    if (LogoType == "cnf" && IsAdmin) {
      navigate("/Dashboard/Master/company");
    } else if (LogoType == "cnf" && IsCAdmin) {
      navigate("/Dashboard/Master/branch");
    } else if (LogoType == "cnf" && IsBAdmin) {
      navigate("/Dashboard");
    } else {
      navigate("/");
      closeModal();
    }

  };

  useEffect(() => {
    // This effect will run whenever resText changes
    if (ResText) {
      // Check if ResText is not empty, and then open the modal
      setResModal(true);
    }
  }, [ResText]);

  const openModal = (text, logo_type) => {
    // Update the state to set the text
    setLogoType(logo_type);
    setResText(text);
  };

  return (
    <>
      <div className="login_style" id="loginform">
        <Row>
          <Col lg={8} className="bg_style"></Col>
          <Col lg={4} className="my-auto">
            <Row>
              <Col>
                <div className="text-center">
                  <img src={logo} alt="" className="logo_style" />
                </div>

                <h3 className="cTol">Login to continue</h3>
                {/* <div className="p-5 text-center"> */}
                <Formik
                  // validateOnChange={false}
                  validateOnBlur={false}
                  initialValues={{
                    username: "",
                    password: "",
                  }}
                  validationSchema={Yup.object().shape({
                    username: Yup.string()
                      .trim()
                      .required("Username is required"),
                    password: Yup.string()
                      .trim()
                      .required("Password is required"),
                  })}
                  onSubmit={(
                    { username, password },
                    { setSubmitting, resetForm }
                  ) => {
                    AuthenticationService.login(username, password).then(
                      (user) => {
                        // console.log("user object : ", { user });
                        if (user.status == "OK") {

                          console.log("userLogined", user);
                          if (user.userRole == "sadmin") {
                            setIsAdmin(true)
                          } else if (user.userRole == "cadmin") {
                            setIsCAdmin(true);
                          } else if (user.userRole == "badmin") {
                            setIsBAdmin(true);
                          }
                          localStorage.setItem(
                            "authenticationService",
                            user.token
                          );
                          openModal(user.message);

                          // dispatch(setUserPermissions(user));

                          // console.log("props: ", props);
                          //   const { from } = props.location.state || {
                          //     from: { pathname: "/" },
                          //   };

                          // navigate("/home");
                          callUserPermission(user.userId, user.list, user.userObject);

                          //   console.log(
                          //     "access toll",
                          //     response["response"].access_token
                          //   );
                          //   localStorage.setItem(
                          //     "authenticationService",
                          //     response["response"].access_token
                          //   );
                          //   const { from } = props.location.state || {
                          //     from: { pathname: "/" },
                          //   };
                          // console.log("from");
                          //   callUserPermission(user.userId);
                          // toast.success("✔ Login Success", {
                          //   // onClose: () => props.history.push(from),
                          //   onClose: () =>
                          //     (window.location.href = "/dashboard"),
                          // });
                        } else {
                          openModal("Please Enter Valid Username And Password", "error");
                          setSubmitting(false);
                          //   if (user.responseStatus == 404) {
                          //     toast.error("✘ " + user.message);
                          //     setStatus(user.message);
                          //   } else {
                          //     toast.error("✘ You are not authorized user");
                          //     setStatus(
                          //       "Server Error! Please Check Your Connectivity"
                          //     );
                          //   }
                        }
                      },
                      (error) => {
                        setSubmitting(false);
                        // setStatus("Check your username and password");
                        console.log("error", error);
                        openModal("✘ Check your username and password", "error");
                      }
                    );
                  }}
                >
                  {({
                    values,
                    errors,
                    touched,
                    // status,
                    handleChange,
                    handleSubmit,
                    isSubmitting,
                    resetForm,
                    handleBlur,
                  }) => (
                    <Form
                      onSubmit={handleSubmit}
                      noValidate
                      autoComplete={"off"}
                    >
                      <Row className="justify-content-center">
                        <Col lg={6} md={8} xs={12}>
                          <div className="username-field">
                            <CustomInput
                              className={`form-control ${touched.username && errors.username
                                ? "is-invalid"
                                : ""
                                }`}
                              type="text"
                              id="username"
                              label="Username"
                              name="username"
                              value={values.username}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                          <div className="password-field">
                            <CustomInput
                              className={`form-control ${touched.password && errors.password
                                ? "is-invalid"
                                : ""
                                }`}
                              type="password"
                              id="password"
                              label="Password"
                              name="password"
                              value={values.password}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                          <Row>
                            <Col className="d-flex">
                              <Button
                                type="submit"
                                className="blueBtnStyle mt-4"
                                disabled={isSubmitting}
                              >
                                {isSubmitting ? (
                                  <>
                                    <Spinner
                                      as="span"
                                      animation="border"
                                      size="sm"
                                      role="status"
                                      aria-hidden="true"
                                    />
                                    Loading...
                                  </>
                                ) : (
                                  "Login"
                                )}
                              </Button>
                              {/* <Button className="lighftBlueBtnStyle ms-3 mt-4">
                                Register
                              </Button> */}
                            </Col>
                          </Row>
                          <div className="text-center mb-2"></div>
                          {/* {status && (
                            <div className={"alert alert-danger"}>{status}</div>
                          )} */}

                          <p className="btmText mt-10">
                            By using HRMS you agree to our{" "}
                            <span className="underLineText">terms</span> and{" "}
                            <span className="underLineText">policy.</span>
                          </p>
                        </Col>
                      </Row>
                    </Form>
                  )}
                </Formik>
                {/* </div> */}
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      {/* Reusable Modal */}
      <ResponseModal
        isOpen={ResModal}
        onRequestClose={closeModal}
        onConfirm={() => handleConfirmSubmit()}
        text={`${ResText}`}
        LogoType={`${LogoType}`}
      />

    </>
  );
};

// export default withNavigate(Login);
export default Login;
