import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "@/pages/NotFound";
import Dashboard from "@/pages/Dashboard";
import Page1 from "@/pages/Page1";
import Branch from "../pages/Master/Branch/Branch";
import BranchCreate from "../pages/Master/Branch/BranchCreate";
import BranchEdit from "../pages/Master/Branch/BranchEdit";
import Company from "../pages/Master/Company/Company";
import CompanyCreate from "../pages/Master/Company/CompanyCreate";
import CompanyEdit from "../pages/Master/Company/CompanyEdit";

import Page2 from "@/pages/Page2";
import { PrivateRoute } from "@/routes";
import Header from "../components/layouts/Header";
import Sidebar from "../components/layouts/Sidebar";
import Designation from "../pages/Master/Designation/Designation";
import Document from "../pages/Master/Documents/Documents";
import Levels from "../pages/Master/Levels/Levels";
import Shift from "../pages/Master/Shift/Shift";
import Allowance from "../pages/Master/SalaryHeads/Allowance";
import Deduction from "../pages/Master/SalaryHeads/Deduction";
import Break from "../pages/Master/Break/Break";
import Employee from "../pages/Master/Employee/Employee";
import EmployeeCreate from "../pages/Master/Employee/EmployeeCreate";
import EmployeeEdit from "../pages/Master/Employee/EmployeeEdit";
import User from "../pages/Master/User/User";
import UserCreate from "../pages/Master/User/UserCreate";
import Role from "../pages/Master/Role/Role";
import RoleCreate from "../pages/Master/Role/RoleCreate";
import UserEdit from "../pages/Master/User/UserEdit";

import RoleEdit from "../pages/Master/Role/RoleEdit";
import Login from "../pages/Login/Login";
import Payheads from "../pages/Master/SalaryHeads/Payheads";
import Payment from "../pages/Tranx/Payment/Payment";
import PaymentCreate from "../pages/Tranx/Payment/PaymentCreate";
import PaymentEdit from "../pages/Tranx/Payment/PaymentEdit";
import Ledger from "../pages/Tranx/Ledger/Ledger";
import LedgerCreate from "../pages/Tranx/Ledger/LedgerCreate";
import LedgerGroup from "../pages/Tranx/LedgerGroup/LedgerGroup";
import Receipt from "../pages/Tranx/Receipt/Receipt";
import ReceiptCreate from "../pages/Tranx/Receipt/ReceiptCreate";
import ReceiptEdit from "../pages/Tranx/Receipt/ReceiptEdit";
import Contra from "../pages/Tranx/Contra/Contra";
import ContraCreate from "../pages/Tranx/Contra/ContraCreate";
import ContraEdit from "../pages/Tranx/Contra/ContraEdit";
import Journal from "../pages/Tranx/Journal/Journal";
import JournalCreate from "../pages/Tranx/Journal/JournalCreate";
import JournalEdit from "../pages/Tranx/Journal/JournalEdit";
import LedgerEdit from "../pages/Tranx/Ledger/LedgerEdit";
import AttendanceApproval from "../pages/Attendance/AttendanceApproval";
import ManualAttendance from "../pages/Attendance/ManualAttendance";
import AdvancePayments from "../pages/Tranx/Advance Payments/AdvancePayments";
import InstallmentRepayment from "../pages/Tranx/Installment Repayment/InstallmentRepayment";
import LeaveApproval from "../pages/Attendance/LeaveApproval";
import LeaveReport from "../pages/Reports/LeaveReport";
import LeaveMaster from "../pages/LeaveManagement/LeaveMaster";
import AttendanceReport from "../pages/Reports/AttendanceReport";
import Payroll from "../pages/Tranx/Payroll/Payroll";
import SalaryProcess from "../pages/Tranx/Payroll/SalaryProcess";
import SalaryReport from "../pages/Reports/SalaryReport";
import History from "../helpers/historyhh";
function ManageRoutes() {
  return (
    <Routes history={History}>
      <Route path="/" element={<Login />} />
      <Route path="*" element={<NotFound />} />
      <Route element={<PrivateRoute />}>
        <Route
          path="/Dashboard"
          element={<Sidebar data={<Dashboard />} data1={<Header />} />}
        />

        <Route
          path="/Dashboard/Master/company"
          element={<Sidebar data={<Company />} data1={<Header />} />}
        />
        <Route
          path="/Dashboard/Master/company-create"
          element={<Sidebar data={<CompanyCreate />} data1={<Header />} />}
        />
        <Route
          path="/Dashboard/Master/company-edit"
          element={<Sidebar data={<CompanyEdit />} data1={<Header />} />}
        />
        <Route
          path="/Dashboard/page2"
          element={<Sidebar data={<Page2 />} data1={<Header />} />}
        />
        <Route
          path="/Dashboard/Master/branch"
          element={<Sidebar data={<Branch />} data1={<Header />} />}
        />
        <Route
          path="/Dashboard/Master/designation"
          element={<Sidebar data={<Designation />} data1={<Header />} />}
        />
        <Route
          path="/Dashboard/Master/document"
          element={<Sidebar data={<Document />} data1={<Header />} />}
        />
        <Route
          path="/Dashboard/Master/shift"
          element={<Sidebar data={<Shift />} data1={<Header />} />}
        />
        <Route
          path="/Dashboard/Master/levels"
          element={<Sidebar data={<Levels />} data1={<Header />} />}
        />

        <Route
          path="/Dashboard/Master/allowance"
          element={<Sidebar data={<Allowance />} data1={<Header />} />}
        />
        <Route
          path="/Dashboard/Master/deduction"
          element={<Sidebar data={<Deduction />} data1={<Header />} />}
        />

        <Route
          path="/Dashboard/Master/break"
          element={<Sidebar data={<Break />} data1={<Header />} />}
        />

        <Route
          path="/Dashboard/Master/employee"
          element={<Sidebar data={<Employee />} data1={<Header />} />}
        />

        <Route
          path="/Dashboard/Master/employee-create"
          element={<Sidebar data={<EmployeeCreate />} data1={<Header />} />}
        />

        <Route
          path="/Dashboard/Master/employee-edit"
          element={<Sidebar data={<EmployeeEdit />} data1={<Header />} />}
        />

        <Route
          path="/Dashboard/Master/user"
          element={<Sidebar data={<User />} data1={<Header />} />}
        />

        <Route
          path="/Dashboard/Master/user-create"
          element={<Sidebar data={<UserCreate />} data1={<Header />} />}
        />

        <Route
          path="/Dashboard/Master/branch-create"
          element={<Sidebar data={<BranchCreate />} data1={<Header />} />}
        />

        <Route
          path="/Dashboard/Master/branch-edit"
          element={<Sidebar data={<BranchEdit />} data1={<Header />} />}
        />

        <Route
          path="/Dashboard/Master/role"
          element={<Sidebar data={<Role />} data1={<Header />} />}
        />

        <Route
          path="/Dashboard/Master/role-create"
          element={<Sidebar data={<RoleCreate />} data1={<Header />} />}
        />

        <Route
          path="/Dashboard/Master/role-edit"
          element={<Sidebar data={<RoleEdit />} data1={<Header />} />}
        />

        <Route
          path="/Dashboard/Master/payheads"
          element={<Sidebar data={<Payheads />} data1={<Header />} />}
        />

        <Route
          path="/Dashboard/Master/user-edit"
          element={<Sidebar data={<UserEdit />} data1={<Header />} />}
        />
        <Route
          path="/Dashboard/Tranx/payment"
          element={<Sidebar data={<Payment />} data1={<Header />} />}
        />
        <Route
          path="/Dashboard/Tranx/payment-create"
          element={<Sidebar data={<PaymentCreate />} data1={<Header />} />}
        />

        <Route
          path="/Dashboard/Tranx/payment-edit"
          element={<Sidebar data={<PaymentEdit />} data1={<Header />} />}
        />

        <Route
          path="/Dashboard/Tranx/ledger"
          element={<Sidebar data={<Ledger />} data1={<Header />} />}
        />
        <Route
          path="/Dashboard/Tranx/ledger-create"
          element={<Sidebar data={<LedgerCreate />} data1={<Header />} />}
        />
        <Route
          path="/Dashboard/Tranx/ledger-group"
          element={<Sidebar data={<LedgerGroup />} data1={<Header />} />}
        />
        <Route
          path="/Dashboard/Tranx/receipt"
          element={<Sidebar data={<Receipt />} data1={<Header />} />}
        />
        <Route
          path="/Dashboard/Tranx/receipt-create"
          element={<Sidebar data={<ReceiptCreate />} data1={<Header />} />}
        />

        <Route
          path="/Dashboard/Tranx/receipt-edit"
          element={<Sidebar data={<ReceiptEdit />} data1={<Header />} />}
        />
        <Route
          path="/Dashboard/Tranx/contra"
          element={<Sidebar data={<Contra />} data1={<Header />} />}
        />
        <Route
          path="/Dashboard/Tranx/contra-create"
          element={<Sidebar data={<ContraCreate />} data1={<Header />} />}
        />

        <Route
          path="/Dashboard/Tranx/contra-edit"
          element={<Sidebar data={<ContraEdit />} data1={<Header />} />}
        />
        <Route
          path="/Dashboard/Tranx/journal"
          element={<Sidebar data={<Journal />} data1={<Header />} />}
        />
        <Route
          path="/Dashboard/Tranx/journal-create"
          element={<Sidebar data={<JournalCreate />} data1={<Header />} />}
        />
        <Route
          path="/Dashboard/Tranx/advance-payments"
          element={<Sidebar data={<AdvancePayments />} data1={<Header />} />}
        />
        <Route
          path="/Dashboard/Tranx/installment-repayment"
          element={
            <Sidebar data={<InstallmentRepayment />} data1={<Header />} />
          }
        />
        <Route
          path="/Dashboard/Tranx/ledger-edit"
          element={<Sidebar data={<LedgerEdit />} data1={<Header />} />}
        />
        <Route
          path="/Dashboard/Tranx/journal-edit"
          element={<Sidebar data={<JournalEdit />} data1={<Header />} />}
        />
        <Route
          path="/Dashboard/Tranx/payroll"
          element={<Sidebar data={<Payroll />} data1={<Header />} />}
        />
        <Route
          path="/Dashboard/Tranx/salary-process"
          element={<Sidebar data={<SalaryProcess />} data1={<Header />} />}
        />
        <Route
          path="/Dashboard/Attendance/attendance-approval"
          element={<Sidebar data={<AttendanceApproval />} data1={<Header />} />}
        />
        <Route
          path="/Dashboard/Attendance/manual-attendance"
          element={<Sidebar data={<ManualAttendance />} data1={<Header />} />}
        />

        <Route
          path="/Dashboard/Attendance/leave-approval"
          element={<Sidebar data={<LeaveApproval />} data1={<Header />} />}
        />

        <Route
          path="/Dashboard/Reports/leave-report"
          element={<Sidebar data={<LeaveReport />} data1={<Header />} />}
        />
        <Route
          path="/Dashboard/Reports/attendance-report"
          element={<Sidebar data={<AttendanceReport />} data1={<Header />} />}
        />
        <Route
          path="/Dashboard/LeaveManagement/leave-master"
          element={<Sidebar data={<LeaveMaster />} data1={<Header />} />}
        />

        <Route
          path="/Dashboard/Reports/salary-report"
          element={<Sidebar data={<SalaryReport />} data1={<Header />} />}
        />
      </Route>
    </Routes>
  );
}

export default ManageRoutes;
