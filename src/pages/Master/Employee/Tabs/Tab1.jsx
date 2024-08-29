import React from 'react'

const Tab1 = () => {
    return (
        <div>
            <Form noValidate
                // onSubmit={handleSubmit}
                autoComplete="off">
                <div>
                    <div
                        className="content-wrapper scrollable-div"
                        style={{ position: "fixed", width: "95%" }}
                    >
                        <div className="pagePathLayout row">
                            <div className="col-lg-11">
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
                                overflow: "hidden"
                            }}
                        >

                            <div
                                className="s"
                                style={{
                                    position: "fixed",
                                    width: "93.8%",
                                    padding: "10px",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden"
                                }}
                            >
                                {/* Your existing content goes here */}
                                <div style={{ overflow: "auto", maxHeight: "700px", overflowX: "hidden" }}>
                                    <div>
                                        <div className="row">
                                            <div className="col-lg-2"
                                            // style={{ width: "1798px", height: "18px", flexShrink: "0" }}
                                            >
                                                Company Information
                                            </div>
                                            <div className="col-lg-10">
                                                <hr className="strHr"></hr>
                                            </div>
                                        </div>

                                        <div className="row mt-2">
                                            <div className="col-lg-4">
                                                <div class="textOnInput">

                                                    <CustomInput
                                                        label="Company Code"
                                                        className={`form-control ${touched.companyCode && errors.companyCode ? 'is-invalid' : ''}`}
                                                        type="text"
                                                        id="companyCode"
                                                        name="companyCode"
                                                        value={values.companyCode}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />

                                                </div>
                                            </div>

                                            <div className="col-lg-4">
                                                <div class="textOnInput">
                                                    <CustomInput
                                                        label="Company Name"
                                                        className={`form-control ${touched.companyName && errors.companyName ? 'is-invalid' : ''}`}
                                                        type="text"
                                                        id="companyName"
                                                        name="companyName"
                                                        value={values.companyName}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                </div>
                                            </div>



                                            <div className="col-lg-2">
                                                <div class="textOnInput">

                                                    <CustomSelect
                                                        label="Company Type"
                                                        className={`form-control ${touched.cType && errors.cType ? 'is-invalid' : ''}`}
                                                        id="companyType"
                                                        name="companyType"
                                                        data={companyType}
                                                        value={values.companyType}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />


                                                </div>
                                            </div>


                                            <div className="col-lg-2">
                                                <div class="textOnInput">
                                                    <CustomInput
                                                        label="Company Type"
                                                        className={`form-control ${touched.cType && errors.cType ? 'is-invalid' : ''}`}
                                                        type="file"
                                                        id="cType"
                                                        name="cType"
                                                        value={values.cType}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                </div>
                                            </div>



                                        </div>
                                    </div>




                                    {/* Submit and cancel buttons */}
                                    <div>
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
                                            </div >
                                            <div className="col-lg-1">
                                                <Button
                                                    className="cancel-btn"
                                                    type="submit"
                                                    onClick={() => {
                                                        navigate("/Dashboard/Master/Company")
                                                    }}
                                                >
                                                    Cancel
                                                </Button>
                                            </div>
                                            <div className="col-lg-1">
                                                <Button
                                                    className="submit-btn"
                                                    type="submit"
                                                >
                                                    Submit
                                                </Button>
                                            </div>





                                        </div>






                                    </div>



                                </div>
                            </div>





                        </div>




                    </div>

                </div>

            </Form>
        </div>
    )
}

export default Tab1
