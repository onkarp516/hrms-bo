import React, { useEffect } from "react";
import AddBtn from "../../../assets/images/MenuButton.png";
import SubstractBtn from "../../../assets/images/Frame445.png";

import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Col,
  Row,
  Table,
  Button,
  Form as BootForm,
  Collapse,
} from "react-bootstrap";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import CustomInput from "../../../components/CustomInputs";
import CustomToggleSwitch from "../../../components/CustomToggleSwitch";
import CustomSelect from "../../../components/CustomSelect";
import { useState } from "react";
import { getUserAccessPermission } from "../../../helpers/accessPermission";

import {
  createUserRole,
  createUserWithRoles,
  getMasterActions,
  getRolePermissions,
  getSystemsAllPermissions,
  getUserById,
  listOfBranch,
  listOfCompany,
  updateUser,
} from "../../../services/api_functions";
import ResponseModal from "../../../components/ResponseModal";
import ConfirmationModal from "../../../components/ConfirmationModal";
import { DTRoles } from "../../../services/api_functions";

export default function Page1(props) {
  const location = useLocation();
  const pathArray = location.pathname.split("/"); // Split the path into an array
  const name = pathArray[pathArray.length - 1]; // Get the last element of the array
  // const [open, setOpen] = useState(false);

  const [openRow, setOpenRow] = useState(null);
  const [ResModal, setResModal] = useState(false);
  const [ResText, setResText] = useState(false);
  const [LogoType, setLogoType] = useState("");

  const [sysPermission, setSysPermission] = useState([]);
  const [userPermission, setuserPermission] = useState([]);

  const [OrgSysPermission, setOrgSysPermission] = useState([]);
  const [ActionsOptions, setActionsOptions] = useState([]);
  const [RoleList, setRoleList] = useState([]);
  const [CompanyList, setCompanyList] = useState([]);
  const [BranchList, setBranchList] = useState([]);
  const [rowId, setrowId] = useState();
  const [InitVal, setInitVal] = useState({
    userName: "",
    password: "",
    role: "",
    roleName: "",
    userRole: "",
    user_id: "",
    companyId: "",
    branchId: "",
    fullName: "",
  });

  const handleRowToggle = (index) => {
    setOpenRow((prevOpenRow) => (prevOpenRow === index ? null : index));
  };

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
    navigate("/Dashboard/Master/user");
  };

  // Function to handle form submission with confirmation
  const handleConfirmSubmit = () => {
    // handleSubmit();
    // onDelete(rowId)
    closeModal(); // Close the modal after submission
  };
  // ... (other methods)

  const listSysPermission = (roleId = 0, initVal = "") => {
    // console.log("inside function : ", roleId);
    // let requestData = {
    //   roleId: roleId,
    // };
    let requestData = new FormData();
    requestData.append("roleId", roleId);
    getRolePermissions(requestData)
      .then((response) => {
        let res = response.data;
        let fdata = [];
        if (res.responseStatus == 200) {
          let data = res.level;
          console.log("Response : ", data);
          data.map((v) => {
            let check = fdata.find((vi) => vi.id == v.id);
            let d;
            if (check) {
              d = {
                id: v.id,
                level: [
                  ...check.level,
                  {
                    id: v.level.id,
                    actions: v.level.actions,
                    name: v.level.name,
                    value: v.level.id,
                    label: v.level.name,
                  },
                ],
                name: v.name,
                value: v.id,
                label: v.name,
              };
              fdata = fdata.filter((vi) => vi.id != v.id);
            } else {
              d = {
                id: v.id,
                level: [
                  {
                    id: v.level.id,
                    actions: v.level.actions,
                    name: v.level.name,
                    value: v.level.id,
                    label: v.level.name,
                  },
                ],
                name: v.name,
                value: v.id,
                label: v.name,
              };
            }
            fdata = [...fdata, d];
          });
          // console.log("fdata", fdata);
          fdata = fdata.sort((a, b) => (a.id < b.id ? -1 : 1));
          let userPer;
          if (initVal != "") {
            userPer = getUserAccessPermission(fdata, initVal.permissions);
            // this.setState({
            //   orgUserPermission: userPer,
            // });
            setOrgSysPermission(userPer);
          } else {
            userPer = fdata.map((v) => {
              console.log("v", v);
              let inner_modules =
                v.level &&
                v.level.map((vi) => {
                  let action_inner = vi.actions.filter((va) => parseInt(va));
                  return {
                    mapping_id: parseInt(vi.id),
                    actions: action_inner,
                  };
                });

              let obj = {
                id: parseInt(v.id),
                name: v.name,
                modules: inner_modules,
              };
              return obj;
            });
          }
          // this.setState({
          //   sysPermission: fdata,
          //   orgSysPermission: fdata,
          //   // orgUserPermission: userPer,
          //   userPermission: userPer,
          // });
          setSysPermission(fdata);
          console.log("fdata: ", fdata);
          setOrgSysPermission(fdata);
          setuserPermission(userPer);
          console.log("userPer: ", userPer);
        } else {
          // this.setState({ sysPermission: [], orgSysPermission: [] });
          setSysPermission([]);
          setOrgSysPermission([]);
        }
      })
      .catch((error) => {
        // this.setState({ sysPermission: [] });
        setSysPermission([]);
        openModal(error, "error");
      });
  };

  const lstSysActionsOptions = () => {
    getMasterActions()
      .then((response) => {
        let res = response.data;
        if (res.responseStatus == 200) {
          let data = res.list;
          let opt = data.map((v) => {
            return { label: v.name, value: v.id, ...v };
          });
          if (opt.length > 0) {
            setActionsOptions(opt);
          }
        }
      })
      .catch((error) => {
        openModal(error, "error");
      });
  };

  const isChildchecked = (parent_id, child_id) => {
    // let { sysPermission, userPermission } = this.state;
    let res = false;
    let sysParentExist = sysPermission.find(
      (v) => parseInt(v.id) === parseInt(parent_id)
    );

    let userParentExist = userPermission.find(
      (v) => parseInt(v.id) === parseInt(parent_id)
    );

    if (sysParentExist && userParentExist) {
      let sysChildExist = sysParentExist.level.find(
        (v) => parseInt(v.id) === parseInt(child_id)
      );
      let userChildExist = userParentExist.modules.find(
        (v) => parseInt(v.mapping_id) === parseInt(child_id)
      );
      if (sysChildExist && userChildExist) {
        if (sysChildExist.actions.length == userChildExist.actions.length) {
          res = true;
        }
      }
    }

    return res;
  };

  const getRolesList = () => {
    DTRoles()
      .then((response) => {
        let res = response.data;
        if (res.responseStatus === 200) {
          console.log("res.responseStatus: ", res);
          let options = res.responseObject.map(function (data) {
            return {
              value: data.id,
              label: data.name,
            };
          });

          setRoleList(options);
          // setRoleList(res.responseObject);
          // setFilteredBranch(res.response);
        }
      })
      .catch((error) => {
        openModal(error, "error");

        // setBranch([]);
        // setFilteredBranch([]);
      });
  };

  const getDataById = () => {
    let requestData = new FormData();
    requestData.append("id", location.state.id);
    getUserById(requestData)
      .then((response) => {
        let res = response.data;
        if (res.responseStatus === 200) {
          console.log("res.responseStatus: ", res.responseObject);
          // setRoleList(res.responseObject);
          // setFilteredBranch(res.response);

          let initVal = {
            // id: data.id,
            userName: res.responseObject.userName,
            password: res.responseObject.password,
            role: res.responseObject.roleId,
            roleName: res.responseObject.roleName,
            userRole: res.responseObject.userRole,
            user_id: res.responseObject.id,
            company: res.responseObject.companyId,
            branch: res.responseObject.branchId,
            permissions: res.responseObject.permissions,
            fullName: res.responseObject.fullname,
          };
          setInitVal(initVal);

          listSysPermission(res.responseObject.roleId, initVal);

          // let userPer = [
          //   {
          //     id: 1,
          //     name: "Master",
          //     modules: res.responseObject.permissions
          //       ? res.responseObject.permissions
          //       : null,
          //   },
          // ];
          // console.log("userPer: ", userPer);

          // // setSysPermission(res.responseObject.permissions);
          // // setOrgSysPermission(res.responseObject.permissions);
          // if (userPer.modules.length > 0) {
          //   setuserPermission(userPer);
          //   setSysPermission(sysPermission);
          //   console.log("[]: ", []);
          //   setOrgSysPermission(OrgSysPermission);
          // }
          // console.log("initVal: ", initVal);

          // setuserPermission(res.responseObject.permissions);
        }
      })
      .catch((error) => {
        openModal(error, "error");

        // setBranch([]);
        // setFilteredBranch([]);
      });
  };

  const listGetCompany = () => {
    listOfCompany()
      .then((response) => {
        let res = response.data;
        if (res.responseStatus == 200) {
          let data = res.response;
          console.log(res.response);
          let opt = data.map((v) => {
            console.log("v");
            console.log(v);
            return { label: v.companyName, value: v.id, ...v };
          });
          if (opt.length > 0) {
            setCompanyList(opt);
            // this.setState({ companyOptions: opt });
          }
        }
      })
      .catch((error) => {
        openModal(error, "error");
      });
  };

  const listGetBranch = () => {
    listOfBranch()
      .then((response) => {
        let res = response.data;
        if (res.responseStatus == 200) {
          let data = res.response;
          console.log(res.response);
          let opt = data.map((v) => {
            console.log("v");
            console.log(v);
            return { label: v.branchName, value: v.id, ...v };
          });
          if (opt.length > 0) {
            // setBranch(opt);
            setBranchList(opt);
            // this.setState({ companyOptions: opt });
          }
        }
      })
      .catch((error) => {
        openModal(error, "error");
      });
  };

  useEffect(() => {
    listGetBranch();
    listGetCompany();
    getRolesList();
    // listSysPermission();
    getDataById();
    lstSysActionsOptions();
    // console.log("🚀 ~ file: Page1.jsx:7 ~ useEffect ~ props:", location);
  }, []);
  // const pathArray = props.location.pathname.split("/"); // Split the path into an array
  // const name = pathArray[pathArray.length - 1]; // Get the last element of the array

  const searchText = [];
  const filteredData = [];

  const companyType = [
    {
      id: 1,
      name: "1.LTD",
    },
    {
      id: 2,
      name: "2.PVT.LTD",
    },
    {
      id: 3,
      name: "3.LTD",
    },
  ];

  const navigate = useNavigate();

  const isParentChecked = (parent_id) => {
    // let { sysPermission, userPermission } = this.state;
    let res = false;

    let sysParentExist = sysPermission.find(
      (v) => parseInt(v.id) === parseInt(parent_id)
    );
    let userParentExist = userPermission.find(
      (v) => parseInt(v.id) === parseInt(parent_id)
    );
    if (sysParentExist && userParentExist) {
      let resArr = [];
      if (sysParentExist.level.length == userParentExist.modules.length) {
        userParentExist.modules.map((v) => {
          let r = isChildchecked(parent_id, v.mapping_id);
          resArr.push(r);
        });
      }
      if (resArr.length > 0 && !resArr.includes(false)) {
        res = true;
      }
    }
    return res;
  };

  const getActionOptionChecked = (parent_id, child_id, action_id) => {
    // let { userPermission } = this.state;
    let res = false;
    let parentExist = userPermission.find((v) => v.id == parent_id);
    if (parentExist) {
      let childExist = parentExist.modules.find(
        (vi) => parseInt(vi.mapping_id) == parseInt(child_id)
      );
      if (childExist) {
        let childInnerExist = childExist.actions.find(
          (v) => parseInt(v) == parseInt(action_id)
        );
        if (childInnerExist) {
          res = true;
        }
      }
    }
    // console.log({ parent_id, child_id, action_id });
    return res;
  };

  const handleUserSelection = (
    parent_id,
    child_id = 0,
    action_id = 0,
    status = false
  ) => {
    // let { userPermission, sysPermission } = this.state;
    let filterUserPermission = [];
    let fuserPermissions = [];
    if (child_id == 0 && action_id == 0) {
      let f = sysPermission.find((v) => parseInt(v.id) == parseInt(parent_id));
      if (status == true) {
        let modules = [];
        if (f.level) {
          modules = f.level.map((vi) => {
            return { mapping_id: vi.id, actions: vi.actions };
          });
        }
        let d = {
          id: f.id,
          name: f.name,
          modules: modules,
        };
        // fuserPermissions.push(d);
        fuserPermissions = [...fuserPermissions, d];

        if (userPermission.length > 0) {
          filterUserPermission = userPermission.filter(
            (v) => parseInt(v.id) != parseInt(f.id)
          );
        }
        fuserPermissions = [...fuserPermissions, ...filterUserPermission];
      } else {
        if (userPermission.length > 0) {
          filterUserPermission = userPermission.filter(
            (v) => parseInt(v.id) != parseInt(f.id)
          );
        }
        fuserPermissions = filterUserPermission;
      }
      setuserPermission(fuserPermissions);
      // this.setState({ userPermission: fuserPermissions });
    } else if (action_id == 0) {
      if (status == true) {
        let f = sysPermission.find(
          (v) => parseInt(v.id) == parseInt(parent_id)
        );
        if (userPermission.length == 0) {
          let check = f.level.find(
            (v) => parseInt(v.value) == parseInt(child_id)
          );
          let modules = [];
          if (check) {
            modules.push({ mapping_id: check.id, actions: check.actions });
          }
          let d = {
            id: f.id,
            name: f.name,
            modules: modules,
          };
          // fuserPermissions.push(d);
          fuserPermissions = [...fuserPermissions, d];
        } else {
          // !IMP
          fuserPermissions = [...userPermission];
          let checkinner = userPermission.find(
            (v) => parseInt(v.id) == parseInt(parent_id)
          );

          if (checkinner) {
            let modules = [];
            // !IMP
            modules = checkinner.modules.filter(
              (v) => parseInt(v.mapping_id) != parseInt(child_id)
            );

            let Syscheck = f.level.find(
              (v) => parseInt(v.value) == parseInt(child_id)
            );

            if (Syscheck) {
              modules.push({
                mapping_id: Syscheck.id,
                actions: Syscheck.actions,
              });
            }
            let d = {
              id: f.id,
              name: f.name,
              modules: modules,
            };

            if (userPermission.length > 0) {
              filterUserPermission = userPermission.filter(
                (v) => parseInt(v.id) != parseInt(parent_id)
              );
            }
            fuserPermissions = [
              //! ...fuserPermissions,
              ...filterUserPermission,
              d,
            ];
          } else {
            let check = f.level.find(
              (v) => parseInt(v.value) == parseInt(child_id)
            );
            let modules = [];
            if (check) {
              modules.push({ mapping_id: check.id, actions: check.actions });
            }
            let d = {
              id: f.id,
              name: f.name,
              modules: modules,
            };
            if (userPermission.length > 0) {
              filterUserPermission = userPermission.filter(
                (v) => parseInt(v.id) != parseInt(parent_id)
              );
            }
            fuserPermissions = [
              ...fuserPermissions,
              ...filterUserPermission,
              d,
            ];
          }
        }
      } else {
        let checkinner = userPermission.find(
          (v) => parseInt(v.id) == parseInt(parent_id)
        );
        if (checkinner) {
          let check = checkinner.modules.filter(
            (v) => parseInt(v.mapping_id) !== parseInt(child_id)
          );
          let incheck = {
            id: checkinner.id,
            name: checkinner.name,
            modules: check,
          };
          let fcheckinner = userPermission.filter(
            (v) => parseInt(v.id) !== parseInt(parent_id)
          );
          fuserPermissions = [...fcheckinner, incheck];
        }
      }
      setuserPermission(fuserPermissions);
      // this.setState({ userPermission: fuserPermissions });
    } else {
      if (userPermission.length > 0) {
        if (status == true) {
          let checkinner = userPermission.find((v) => v.id == parent_id);
          let scheck = [];
          if (checkinner) {
            let check = checkinner.modules.find(
              (v) => parseInt(v.mapping_id) == parseInt(child_id)
            );
            if (check) {
              let actions = [...check.actions, action_id];
              check.actions = actions;
              let fcheck = checkinner.modules.filter(
                (v) => parseInt(v.mapping_id) !== parseInt(child_id)
              );
              scheck = [...fcheck, check];
              let incheck = {
                id: checkinner.id,
                name: checkinner.name,
                modules: scheck,
              };
              let fcheckinner = userPermission.filter(
                (v) => parseInt(v.id) !== parseInt(parent_id)
              );
              fuserPermissions = [...fuserPermissions, ...fcheckinner, incheck];
              // this.setState({ userPermission: fuserPermissions });
              setuserPermission(fuserPermissions);
            } else {
              let f = sysPermission.find(
                (v) => parseInt(v.id) == parseInt(parent_id)
              );
              let check = f.level.find(
                (v) => parseInt(v.value) == parseInt(child_id)
              );
              let modules = [...checkinner.modules];
              modules.push({ mapping_id: check.id, actions: [action_id] });
              let incheck = {
                id: f.id,
                name: f.name,
                modules: modules,
              };
              let fcheckinner = userPermission.filter(
                (v) => parseInt(v.id) !== parseInt(parent_id)
              );
              fuserPermissions = [...fuserPermissions, ...fcheckinner, incheck];
              setuserPermission(fuserPermissions);

              // this.setState({ userPermission: fuserPermissions });
            }
          } else {
            let f = sysPermission.find(
              (v) => parseInt(v.id) == parseInt(parent_id)
            );
            if (f) {
              let check = f.level.find(
                (v) => parseInt(v.value) == parseInt(child_id)
              );
              let modules = [];
              if (check) {
                modules.push({ mapping_id: check.id, actions: [action_id] });
              }
              if (check) {
                let d = {
                  id: f.id,
                  name: f.name,
                  modules: modules,
                };
                fuserPermissions = [d];
              }
              fuserPermissions = [...fuserPermissions, ...userPermission];
              // this.setState({ userPermission: fuserPermissions });
              setuserPermission(fuserPermissions);
            }
          }
        } else {
          let checkinner = userPermission.find(
            (v) => parseInt(v.id) == parseInt(parent_id)
          );
          let scheck = [];
          if (checkinner) {
            let check = checkinner.modules.find(
              (v) => parseInt(v.mapping_id) == parseInt(child_id)
            );
            if (check) {
              let actions = check.actions.filter(
                (v) => parseInt(v) != parseInt(action_id)
              );
              // let actions = [...check.actions, action_id];
              check.actions = actions;
              let fcheck = checkinner.modules.filter(
                (v) => parseInt(v.mapping_id) !== parseInt(child_id)
              );

              scheck = [...fcheck, check];
              let incheck = {
                id: checkinner.id,
                name: checkinner.name,
                modules: scheck,
              };
              let fcheckinner = userPermission.filter(
                (v) => parseInt(v.id) !== parseInt(parent_id)
              );
              fuserPermissions = [...fuserPermissions, ...fcheckinner, incheck];
              // this.setState({ userPermission: fuserPermissions });
              setuserPermission(fuserPermissions);
            }
          }
        }
      } else {
        if (status == true) {
          let f = sysPermission.find(
            (v) => parseInt(v.id) == parseInt(parent_id)
          );
          if (f) {
            let check = f.level.find(
              (v) => parseInt(v.value) == parseInt(child_id)
            );
            let modules = [];
            if (check) {
              modules.push({ mapping_id: check.id, actions: [action_id] });
            }
            if (check) {
              let d = {
                id: f.id,
                name: f.name,
                modules: modules,
              };
              fuserPermissions = [d];
            }
            setuserPermission(fuserPermissions);

            // this.setState({ userPermission: fuserPermissions });
          }
        } else {
          setuserPermission([]);

          // this.setState({ userPermission: [] });
        }
      }
    }
  };

  const getSelectAllOption = (mapping_id) => {
    // let { userPermission, orgSysPermission } = this.state;
    let res = false;
    let obj = OrgSysPermission.find((v) => v.id == mapping_id);
    let action_ids = obj.actions.map((vi) => {
      return vi.id;
    });

    userPermission.map((v) => {
      if (v.mapping_id == mapping_id) {
        if (action_ids.length == v.actions.length) {
          res = true;
        }
      }
    });

    return res;
  };
  const validationSchema = () => {
    return Yup.object().shape({
      userName: Yup.string()
        .nullable()
        .trim()
        .required("User Name is required"),
      password: Yup.string().nullable().trim().required("Password is required"),
      fullName: Yup.string()
        .nullable()
        .trim()
        .required("Full Name is required"),
    });
  };

  return (
    <Formik
      // validateOnChange={false}
      //   validateOnBlur={false}
      // validationSchema={validationSchema}
      enableReinitialize={true}
      autoComplete="off"
      initialValues={InitVal}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        console.log("values", values);
        // return false;
        let requestData = new FormData();
        let keys = Object.keys(InitVal);
        requestData.append("userName", values.userName);
        requestData.append("password", values.password);
        requestData.append("role", values.roleName);
        requestData.append("userRole", values.userRole);
        requestData.append("user_id", values.user_id);
        requestData.append("roleId", values.role);
        requestData.append("del_user_permissions", "[]");
        requestData.append("companyId", CompanyList[0].value);

        // requestData.append("companyId", values.company);
        requestData.append("branchId", values.branch);
        requestData.append("fullName", values.fullName)

        let usrPerm = [];
        if (userPermission && userPermission.length > 0) {
          userPermission.map((v) => {
            usrPerm.push(...v.modules);
          });
        }
        // requestData.append("permissions", JSON.stringify(usrPerm));
        requestData.append("user_permissions", JSON.stringify(usrPerm));

        // requestData.append("permissions", );

        // console.log("response user per---", requestData);
        // Display the key/value pairs
        for (var pair of requestData.entries()) {
          console.log(pair[0] + ", " + pair[1]);
        }
        console.log("requestData: ", requestData);

        updateUser(requestData)
          .then((response) => {
            let res = response.data;
            if (res.responseStatus == 200) {
              console.log(res.message);
              // this.setState({ isLoading: false });
              //   onClose: () => this.props.history.push("/master/role", true),
              // });
              openModal(res.message, "cnf");

              setSubmitting(false);
            } else {
              openModal(res.message, "error");

              setSubmitting(false);
              // this.setState({ isLoading: false });
            }
          })
          .catch((error) => {
            setSubmitting(false);
            openModal(error, "error");
          });
      }}
    >
      {({
        values,
        errors,
        touched,
        // status,
        setFieldValue,
        handleChange,
        handleSubmit,
        isSubmitting,
        resetForm,
        handleBlur,
      }) => (
        <Form
          noValidate
          // onSubmit={handleSubmit}
          autoComplete="off"
        >
          <div>
            <div
              className="content-wrapper scrollable-div"
              style={{ position: "fixed", width: "96%" }}
            >
              {/* Reusable Modal */}
              <ResponseModal
                isOpen={ResModal}
                onRequestClose={closeModal}
                onConfirm={() => handleConfirmSubmit()}
                text={`${ResText}`}
                LogoType={`${LogoType}`}
              />
              <div className="pagePathLayout row">
                <div className="col-lg-11 header-title">
                  <span className="bold">{location.pathname}</span>
                </div>
                {/* <div className="col-lg-1">
                  <Link to="/Dashboard/Master/company-create">
                    <img src={AddBtn} alt="" className="btn-add " />
                  </Link>
                </div> */}
              </div>

              <div className="col-lg-12 path-label">
                <span>{name}</span>
              </div>
              <div className="col-lg-12 path-label2">
                <span>Manage All {name} Related Information</span>
              </div>

              <div
                className="s"
                style={{
                  position: "fixed",
                  width: "93.8%",
                  padding: "10px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                }}
              >
                <div
                  className="card"
                  style={{
                    position: "fixed",
                    width: "93.8%",
                    padding: "10px",
                    whiteSpace: "nowrap",
                    // overflow: "hidden",
                    height: "820px",
                  }}
                >
                  {/* Your existing content goes here */}
                  {/* <Button
                    onClick={() => setOpen(!open)}
                    aria-controls="example-collapse-text"
                    aria-expanded={open}
                  >
                    click
                  </Button> */}

                  <div className="modal-fields-row1 row">
                    <div className="col-lg-4">
                      <div class="textOnInput">
                        <CustomInput
                          className={`form-control ${touched.userName && errors.userName
                              ? "is-invalid"
                              : ""
                            }`}
                          type="text"
                          id="userName"
                          label="User Name"
                          name="userName"
                          value={values.userName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                      <span className="text-danger">
                        {errors.userName && errors.userName}
                      </span>
                    </div>
                    <div className="col-lg-4">
                      <div class="textOnInput">
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
                      <span className="text-danger">
                        {errors.password && errors.password}
                      </span>
                    </div>

                    <div className="col-lg-4">
                      <div class="textOnInput">
                        {console.log(values)}
                        <CustomSelect
                          label="Select Role"
                          className={`form-control ${touched.role && errors.role ? "is-invalid" : ""
                            }`}
                          id="role"
                          name="role"
                          data={RoleList}
                          value={values.role}
                          onChange={(e) => {
                            console.log("role selection : ", e.target.value);
                            // console.log("v: ", v);
                            let value = e.target.value;
                            if (value != null) {
                              setFieldValue("role", value);
                              setFieldValue("roleId", value);
                              listSysPermission(value);
                              // this.setState({ opBranchList: [] });
                              // this.listGetBranch(v);
                            } else {
                              setFieldValue("role", "");
                            }
                          }}
                          onBlur={handleBlur}
                        />
                      </div>
                      <span className="text-danger">
                        {errors.role && errors.role}
                      </span>
                    </div>
                  </div>
                  {/* {console.log("values: ", values)}
                  {console.log("CompanyList: ", CompanyList)} */}

                  <div className="modal-fields-row1 row">
                    <div className="col-lg-4">
                      <div class="textOnInput">
                        <CustomSelect
                          label="Select Company"
                          className={`form-control ${touched.company && errors.company
                              ? "is-invalid"
                              : ""
                            }`}
                          id="company"
                          name="company"
                          data={CompanyList} 
                          disabled={true}
                          value={`1`}
                          onChange={(e) => {
                            console.log("company selection : ", e.target.value);
                            // console.log("v: ", v);
                            let value = e.target.value;
                            if (value != null) {
                              setFieldValue("company", value);
                              setFieldValue("company_id", value);
                              // listSysPermission(value);
                              // this.setState({ opBranchList: [] });
                              // this.listGetBranch(v);
                            } else {
                              setFieldValue("company", "");
                            }
                          }}
                          onBlur={handleBlur}
                        />
                      </div>
                      <span className="text-danger">
                        {errors.userName && errors.userName}
                      </span>
                    </div>
                    <div className="col-lg-4">
                      <div class="textOnInput">
                        <CustomSelect
                          label="Select Branch"
                          className={`form-control ${touched.branch && errors.branch ? "is-invalid" : ""
                            }`}
                          id="branch"
                          name="branch"
                          data={BranchList}
                          value={values.branch}
                          onChange={(e) => {
                            console.log("branch selection : ", e.target.value);
                            // console.log("v: ", v);
                            let value = e.target.value;
                            if (value != null) {
                              setFieldValue("branch", value);
                              setFieldValue("branch_id", value);
                              // listSysPermission(value);
                              // this.setState({ opBranchList: [] });
                              // this.listGetBranch(v);
                            } else {
                              setFieldValue("branch", "");
                            }
                          }}
                          onBlur={handleBlur}
                        />
                      </div>
                      <span className="text-danger">
                        {errors.userName && errors.userName}
                      </span>
                    </div>
                    <div className="col-lg-4">
                      <div class="textOnInput">
                        {console.log("vallllllues", values)}
                        <CustomInput
                          className={`form-control ${touched.fullName && errors.fullName
                            ? "is-invalid"
                            : ""
                            }`}
                          type="text"
                          id="fullName"
                          label="Full Name"
                          name="fullName"
                          value={values.fullName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                      <span className="text-danger">
                        {errors.fullName && errors.fullName}
                      </span>
                    </div>
                  </div>
                  <div style={{ overflowY: "scroll", height: "538px", marginTop: "20px", scrollbarWidth: "none", msOverflowStyle: "none" }}>
                    <Table className="table-hover" style={{ width: "99%" }}>
                    {sysPermission.map((vi, ii) => (
                      <React.Fragment key={ii}>
                        <thead style={{ height: "5px" }}>
                          <tr
                            style={{ cursor: "pointer" }}
                            aria-controls={`example-collapse-text-${ii}`}
                            aria-expanded={openRow === ii}
                            className="user_nestedTable-th"
                          >
                            <th
                              id="headText"
                              style={{
                                width: "7%",
                                borderTop: "1px solid #CACACA",
                                borderBottom: "1px solid #CACACA",
                                borderLeft: "1px solid #CACACA",
                                background: "#EAF9FF",
                              }}
                            >
                              <div className="check row">
                                <div className="col-lg-6">
                                  <BootForm.Check
                                    //  type={"checkbox"}
                                    id={`check-api-${ii}`}
                                    type={"checkbox"}
                                    defaultChecked={false}
                                    name="level1"
                                    checked={isParentChecked(vi.id)}
                                    // checked={this.getActionSelectionOption(
                                    //   vi.id,
                                    //   vii.id
                                    // )}
                                    onChange={(e) => {
                                      handleUserSelection(
                                        vi.id,
                                        0,
                                        0,
                                        e.target.checked
                                      );
                                    }}
                                    // value={vi.id}
                                  ></BootForm.Check>
                                </div>
                                <div className="col-lg-6">{vi.id}</div>
                              </div>
                            </th>
                            <th
                              id="headText"
                              style={{
                                width: "70%",
                                borderTop: "1px solid #CACACA",
                                borderBottom: "1px solid #CACACA",
                                borderLeft: "1px solid #CACACA",
                                background: "#EAF9FF",
                              }}
                              onClick={() => handleRowToggle(ii)}
                            >
                              {vi.name}
                            </th>
                            <th
                              style={{
                                borderTop: "1px solid #CACACA",
                                borderBottom: "1px solid #CACACA",
                                borderLeft: "1px solid #CACACA",
                                background: "#EAF9FF",
                              }}
                            >
                              Create
                            </th>
                            <th
                              style={{
                                borderTop: "1px solid #CACACA",
                                borderBottom: "1px solid #CACACA",
                                borderLeft: "1px solid #CACACA",
                                background: "#EAF9FF",
                              }}
                            >
                              Edit
                            </th>
                            <th
                              style={{
                                borderTop: "1px solid #CACACA",
                                borderBottom: "1px solid #CACACA",
                                borderLeft: "1px solid #CACACA",
                                background: "#EAF9FF",
                              }}
                            >
                              Delete
                            </th>
                            <th
                              className="row"
                              style={{
                                borderTop: "1px solid #CACACA",
                                borderBottom: "1px solid #CACACA",
                                borderLeft: "1px solid #CACACA",
                                background: "#EAF9FF",
                              }}
                            >
                              <div className="col-lg-6">View</div>
                              <div className="col-lg-1">
                                {openRow === ii ? (
                                  <img
                                    src={SubstractBtn}
                                    alt=""
                                    className="user_btn-add "
                                    onClick={() => handleRowToggle(ii)}

                                  />
                                ) : (
                                  <img
                                    src={AddBtn}
                                    alt=""
                                    className="user_btn-add "
                                      onClick={() => handleRowToggle(ii)}

                                  />
                                )}
                              </div>
                            </th>
                          </tr>
                        </thead>

                        <Collapse in={openRow === ii}>
                          <tbody id={`example-collapse-text-${ii}`}>
                            {vi["level"] &&
                              vi["level"].map((vii, iii) => {
                                return (
                                  <tr>
                                    <td className="row">
                                      <div className="check col-lg-1">
                                        <BootForm.Check
                                          id={`check-api-${ii}-${iii}`}
                                          // defaultChecked={false}
                                          type={"checkbox"}
                                          defaultChecked={false}
                                          name="level1"
                                          checked={isChildchecked(
                                            vi.id,
                                            vii.id
                                          )}
                                          onChange={(e) => {
                                            handleUserSelection(
                                              vi.id,
                                              vii.id,
                                              0,
                                              e.target.checked
                                            );
                                          }}
                                          value={vii.id}
                                        ></BootForm.Check>
                                      </div>
                                      <div className="col-lg-1">{vii.id}</div>
                                    </td>
                                    <td>{vii.name}</td>

                                    {ActionsOptions &&
                                      ActionsOptions.map((va, vai) => {
                                        {
                                          /* console.log("va: ", va); */
                                        }
                                        return (
                                          <td>
                                            <div className="check col-lg-1">
                                              <BootForm.Check
                                                type={"checkbox"}
                                                // defaultChecked={false}
                                                id={`check-api-${vai}`}
                                                defaultChecked={false}
                                                name="inner_level"
                                                checked={getActionOptionChecked(
                                                  vi.id,
                                                  vii.id,
                                                  va.id
                                                )}
                                                // checked={() =>
                                                //   getActionOptionChecked(
                                                //     vi.id,
                                                //     vii.id,
                                                //     va.id
                                                //   )
                                                // }
                                                onChange={(e) => {
                                                  handleUserSelection(
                                                    vi.id,
                                                    vii.id,
                                                    va.id,
                                                    e.target.checked
                                                  );
                                                }}
                                                value={va}
                                              ></BootForm.Check>
                                            </div>
                                          </td>
                                        );
                                      })}

                                    {/* 

                                    <td>
                                      <div className="check ">
                                        <BootForm.Check
                                          name={`create${key}`}
                                          checked={values[`create${key}`]}
                                          onChange={(e) => {
                                            setFieldValue(
                                              `create${key}`,
                                              e.target.checked
                                            );

                                            let val = (jsonArray[0].block[
                                              key
                                            ].create = e.target.checked);

                                            setJsonArray([...jsonArray], val);
                                            if (e.target.checked == true) {
                                              setFieldValue(
                                                `create${key}`,
                                                values.create
                                              );
                                            } else {
                                              setFieldValue(`create${key}`, "");
                                            }
                                          }}
                                        />
                                      </div>
                                    </td>

                                    <td>
                                      <div className="check ">
                                        <BootForm.Check
                                          name={`edit${key}`}
                                          checked={values[`edit${key}`]}
                                          onChange={(e) => {
                                            setFieldValue(
                                              `edit${key}`,
                                              e.target.checked
                                            );

                                            let val = (jsonArray[0].block[
                                              key
                                            ].edit = e.target.checked);

                                            setJsonArray([...jsonArray], val);
                                            if (e.target.checked == true) {
                                              setFieldValue(
                                                `edit${key}`,
                                                values.edit
                                              );
                                            } else {
                                              setFieldValue(`edit${key}`, "");
                                            }
                                          }}
                                        />
                                      </div>
                                    </td>

                                    <td>
                                      <div className="check ">
                                        <BootForm.Check
                                          name="delete"
                                          checked={values.delete}
                                          onChange={(e) => {
                                            setFieldValue(
                                              `delete${key}`,
                                              e.target.checked
                                            );

                                            let val = (jsonArray[0].block[
                                              key
                                            ].delete = e.target.checked);

                                            setJsonArray([...jsonArray], val);
                                            if (e.target.checked == true) {
                                              setFieldValue(
                                                `delete${key}`,
                                                values.delete
                                              );
                                            } else {
                                              setFieldValue(`delete${key}`, "");
                                            }
                                          }}
                                        />
                                      </div>
                                    </td>

                                    <td>
                                      <div className="check ">
                                        <BootForm.Check
                                          name="sameAsAbove"
                                          checked={values.sameAsAbove}
                                          onChange={(e) => {
                                            setFieldValue(
                                              `view${key}`,
                                              e.target.checked
                                            );

                                            let val = (jsonArray[0].block[
                                              key
                                            ].view = e.target.checked);

                                            setJsonArray([...jsonArray], val);
                                            if (e.target.checked == true) {
                                              setFieldValue(
                                                `view${key}`,
                                                values.view
                                              );
                                            } else {
                                              setFieldValue(`view${key}`, "");
                                            }
                                          }}
                                        />
                                      </div>
                                    </td> */}
                                  </tr>
                                );
                              })}
                          </tbody>
                        </Collapse>
                      </React.Fragment>
                    ))}
                  </Table>
                  </div>
                  {/* Submit and cancel buttons */}
                  <div style={{ marginTop: "16px" }}>
                    <div className="row ">
                      <div
                        style={{
                          flex: "0 0 auto",
                          width: "80.666667%",
                          color: "#4D798B",
                          fontSize: " 14px",
                          fontStyle: " normal",
                          fontSeight: " 500",
                          lineSeight: " normal",
                        }}
                      >
                        {/* {`label`} */}
                      </div>
                      <div className="col-lg-1">
                        <Button
                          className="cancel-btn"
                          // type="submit"
                          onClick={() => {
                            navigate("/Dashboard/Master/user");
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                      <div className="col-lg-1">
                        <Button className="submit-btn" type="submit">
                          Update
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
