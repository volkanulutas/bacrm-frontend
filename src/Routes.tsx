import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import InnerContent from "./components/InnerContent";
import Dashboard from "./components/Dashboard";
import Tabs from "./components/Tabs";
import Timesheet from "./components/Timesheet";
import Login from "./components/Login";
import Users from "./components/Users";
import SingleUser from "./components/SingleUser";
import NewUser from "./components/NewUser";
import DynamicForm from "./components/DynamicForm";

import Tab1 from "./components/Tab1";
import Tab2 from "./components/Tab2";
import Tab3 from "./components/Tab3";

import ProtectedRoutes from "./components/ProtectedRoutes";
import PublicRoutes from "./components/PublicRoutes";
import PermissionDenied from "./components/PermissionDenied";
import ProposalFormList from "./components/proposal/ProposalFormList";
import LeaveApproveForm from "./components/leave/LeaveApproveForm";
import LeaveForm from "./components/leave/LeaveRequestForm";
import EmployeeForm from "./EmployeeForm";
import EmployeeEditForm from "./EmployeeEditForm";
import LoginScren from "./LoginScren";

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
        <Route path="leave-form" element={<LeaveForm />} />
        <Route path="leave-approve-form" element={<LeaveApproveForm />} />
        <Route path="proposal-form-list" element={<ProposalFormList />} />
        <Route path="dynamic-form" element={<DynamicForm />} />
        <Route path="login-scren" element={<LoginScren />} />
        <Route path="employee" element={<EmployeeForm />} />
        <Route path="employee-edit-form" element={<EmployeeEditForm />} />
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
    <Route path="login" element={<PublicRoutes />}>
      <Route path="/login" element={<Login />} />
    </Route>

    {/** Permission denied route */}
    <Route path="/denied" element={<PermissionDenied />} />
  </Routes>
);

export default MainRoutes;
