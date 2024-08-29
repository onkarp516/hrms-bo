import React, { Component } from "react";
import AddBtn from "../../../assets/images/MenuButton.png";
import { Link, useLocation } from "react-router-dom";
import { Col, Row, Table, Tooltip } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import edit from "../../../assets/images/edit.png";
import Delete from "../../../assets/images/delete.png";
import { getContraListByCompany, get_contra_list_by_company } from "../../../services/api_functions";
import { WithUserPermission } from "../../../helpers/WithUserPermission";

class Contra extends Component {
    constructor(props) {
        super(props);
        //get_sundry_debtors_indirect_incomes
        this.state = {
            contraList: [],
            contraData: [],
            currentIndex: 0,
            search: "",
            initValue: {
                associates_id: "",
                associates_group_name: "",
                underId: "",
            },
        };
    }

    pageReload = () => {
        this.componentDidMount();
    };

    componentDidMount() {
        // this.lstUnders();
        this.getCompanyList();
    }

    setInitValue = () => {
        let initValue = {
            associates_id: "",
            underId: "",
            associates_group_name: "",
        };

        this.setState({ initValue: initValue });
    };

    getCompanyList = () => {
        get_contra_list_by_company()
            .then((response) => {
                console.log("getCompanyList:", response);
                let res = response.data ? response.data : [];
                if (res.responseStatus == 200) {
                    this.setState({ contraList: res.data, contraData: res.data });
                }
            })
            .catch((error) => {
                console.log("error", error);
            });
    };

    handleSearch = (vi) => {
        this.setState({ search: vi }, () => {
            let { contraData } = this.state;
            console.log("handleSearch:", { contraData });
            let contraData_F = contraData.filter(
                (v) =>
                    (v.narration != null &&
                        v.ledger_name != null &&
                        v.contra_code != null &&
                        v.narration.toLowerCase().includes(vi.toLowerCase())) ||
                    v.ledger_name.toLowerCase().includes(vi.toLowerCase()) ||
                    v.contra_code.toLowerCase().includes(vi.toLowerCase())
            );

            if (vi.length == 0) {
                this.setState({
                    contraList: contraData,
                });
            } else {
                this.setState({
                    contraList: contraData_F.length > 0 ? contraData_F : [],
                });
            }
        });
    };

    onEditModalShow = (status, data, rowIndex) => {
        if (status) {
            this.setState({ currentIndex: rowIndex });
            console.log("onEditmodalshow>>>", data);
            this.props.history.push("/master/contra-edit/" + data.id);
        } else {
            this.setState({ currentIndex: 0 });
        }
    };

    // onDeleteModalShow = (id) => {
    //     Swal.fire({
    //         title: "Are you sure?",
    //         text: "You won't be able to revert this!",
    //         // icon: "warning",
    //         customClass: "sweetclass",
    //         showCancelButton: true,
    //         confirmButtonColor: "#3085d6",
    //         cancelButtonColor: "#d33",
    //         confirmButtonText: "Delete",
    //     }).then((result) => {
    //         if (!result.isConfirmed) {
    //             return false;
    //         }

    //         let reqData = new FormData();
    //         reqData.append("id", id);
    //         console.log("id==>" + id)
    //         delete_contra(reqData)
    //             .then((response) => {
    //                 if (response.data.responseStatus == 200) {
    //                     // toast.success("✔ " + response.data.message);
    //                     this.componentDidMount();
    //                 } else {
    //                     // toast.error("✘ " + response.data.message);
    //                 }
    //             })
    //             .catch((error) => {
    //                 // toast.error("✘ " + error);
    //             });
    //     });
    // };


    render() {
        const { contraList } = this.state;
    // const location = useLocation();
    // const pathArray = location.pathname.split("/");
    // const name = pathArray[pathArray.length - 1];

    return (
        <div>
            <div
                className="content-wrapper scrollable-div"
                style={{ position: "fixed", width: "96%" }}
            >
                <div className="pagePathLayout row">
                    <div className="col-lg-11 header-title">
                        {/* <span className="bold">{location.pathname}</span> */}
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
                            <Link to="/Dashboard/Tranx/contra-create">
                                <img src={AddBtn} alt="" className="btn-add " />
                            </Link>
                        </div>
                    </OverlayTrigger>
                </div>

                <div className="col-lg-12 path-label">
                    {/* <span>{name}</span> */}
                </div>
                <div className="col-lg-12 path-label2">
                    {/* <span>Manage All {name} Related Information</span> */}
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

                                        <th className="table-th text-light">Contra No</th>
                                        <th className="table-th text-light">Transaction Date</th>
                                        <th className="table-th text-light">Ledger Name</th>
                                        <th className="table-th text-light">Narration</th>
                                        <th className="table-th text-light">Total Amt</th>
                                        <th className="table-th text-light">Action</th>
                                    </tr>
                                </thead>

                                <tbody style={{ maxHeight: "300px", overflowY: "auto" }}>
                                    {contraList && contraList.length > 0 ? (
                                        contraList.map((v, i) => (
                                            <tr
                                                style={{ backgroundColor: "D9D9D9" }}
                                            // onDoubleClick={() => {
                                            //     navigate("/Dashboard/Tranx/contra-edit", {
                                            //         state: {
                                            //             id: v.id,
                                            //         },
                                            //     });
                                            // }}
                                            >
                                                {/* <td style={{ width: "20%" }}>{i + 1}</td> */}
                                                <td style={{ width: "20%" }}>{v.contra_code}</td>
                                                <td style={{ width: "10%" }}>{v.transaction_dt}</td>
                                                <td style={{ width: "20%" }}>{v.ledger_name}</td>
                                                <td style={{ width: "20%" }}>{v.narration}</td>
                                                <td style={{ width: "15%" }}>{v.total_amount}</td>
                                                <td align="left">
                                                    <img
                                                        src={Delete}
                                                        alt=""
                                                        // onClick={() => {
                                                        //     openModal(record.id);
                                                        // }}
                                                        className="img-delete"
                                                    />

                                                    <img
                                                        src={edit}
                                                        alt=""
                                                        className="img-edit"
                                                        // onClick={(e) => {
                                                        //   navigate("/Dashboard/Master/user-edit", {
                                                        //     state: {
                                                        //       id: v.id,
                                                        //     },
                                                        //   });
                                                        // }}

                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            // this.onEditModalShow(true, v, i);
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
}

export default WithUserPermission(Contra);
