import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import InnerContent from "./components/elements/InnerContent";
import Dashboard from "./components/elements/Dashboard";
import Tabs from "./components/elements/Tabs";
import Timesheet from "./components/timesheet/Timesheet";
import TimesheetApproveListForm from "./components/timesheet/TimesheetApproveListForm";
import Login from "./components/elements/Login";
import Logout from "./components/elements/Logout";
import Users from "./components/elements/Users";
import SingleUser from "./components/elements/SingleUser";
import NewUser from "./components/elements/NewUser";
import DynamicForm from "./components/elements/DynamicForm";

import Tab1 from "./components/elements/Tab1";
import Tab2 from "./components/elements/Tab2";
import Tab3 from "./components/elements/Tab3";

import ProtectedRoutes from "./components/elements/ProtectedRoutes";
import PublicRoutes from "./components/elements/PublicRoutes";
import PermissionDenied from "./components/elements/PermissionDenied";
import ProposalFormList from "./components/proposal/ProposalListForm";
import ProposalDetailForm from "./components/proposal/ProposalDetailForm";
import LeaveApproveForm from "./components/leave/LeaveApproveForm";
import LeaveRequestDetailForm from "./components/leave-request/LeaveRequestDetailForm";
import EmployeeListForm from "./components/employee/EmployeeListForm";
import EmployeeDetailForm from "./components/employee/EmployeeDetailForm";
import WorkListForm from "./components/work/WorkListForm";
import WorkDetailForm from "./components/work/WorkDetailForm";

import CustomerListForm from "./components/customer/CustomerListForm";
import CustomerDetailForm from "./components/customer/CustomerDetailForm";

import DepartmentListForm from "./components/department/DepartmentListForm";
import DepartmentDetailForm from "./components/department/DepartmentDetailForm";
import LeaveRequestListForm from "./components/leave-request/LeaveRequestListForm";

const MainRoutes = () => (
  <Routes>
    {/** Protected Routes */}
    {/** Wrap all Route under ProtectedRoutes element */}
    <Route path="/" element={<ProtectedRoutes />}>
      <Route path="/" element={<InnerContent />}>
        <Route path="/" element={<Navigate replace to="dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route
          path="tabs"
          element={<Tabs props={{ userName: "Bikash web" }} />}
        >
          <Route path="/tabs" element={<Navigate replace to="tab1" />} />
          <Route path="tab1" element={<Tab1 />} />
          <Route path="tab2" element={<ProtectedRoutes roleRequired="USER" />}>
            <Route path="/tabs/tab2" element={<Tab2 />} />
          </Route>
          <Route path="tab3" element={<Tab3 />} />
        </Route>
        <Route path="timesheet" element={<Timesheet />} />
        <Route
          path="timesheet-approve-list-form"
          element={<TimesheetApproveListForm />}
        />
        <Route
          path="leave-request-detail/:id"
          element={<LeaveRequestDetailForm />}
        />
        <Route path="leave-request-list" element={<LeaveRequestListForm />} />
        <Route path="leave-approve-form" element={<LeaveApproveForm />} />
        <Route path="proposal-list" element={<ProposalFormList />} />
        <Route path="proposal-detail/:id" element={<ProposalDetailForm />} />
        <Route path="dynamic-form" element={<DynamicForm />} />
        <Route path="employee-list" element={<EmployeeListForm />} />
        <Route path="employee-detail/:id" element={<EmployeeDetailForm />} />
        <Route path="work-list" element={<WorkListForm />} />
        <Route path="work-detail/:id" element={<WorkDetailForm />} />
        <Route path="customer-list" element={<CustomerListForm />} />
        <Route path="customer-detail/:id" element={<CustomerDetailForm />} />
        <Route path="department-list" element={<DepartmentListForm />} />
        <Route
          path="department-detail/:id"
          element={<DepartmentDetailForm />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route
          path="users"
          element={<Users extraItem="test extra item from router" />}
        />
        <Route path="users/:userId" element={<SingleUser />} />
        <Route path="users/new" element={<NewUser />} />
      </Route>
    </Route>

    {/** Public Routes */}
    {/** Wrap all Route under PublicRoutes element */}
    {/**  
    <Route path="login" element={<PublicRoutes />}>
      <Route path="/login" element={<Login />} />
    </Route>
    */}
    {/**
    <Route path="login" element={<PublicRoutes />}>
      <Route path="/login" element={<Login />} />
    </Route>
    */}
    {/** Permission denied route */}
    <Route path="/denied" element={<PermissionDenied />} />
  </Routes>
);

export default MainRoutes;
