import { Route, Routes } from "react-router-dom";
import {
  Login,
  AdminDashboard,
  AddEmployee,
  ViewEmployee,
  Profile,
  Pagenotfound,
  ViewEmploy,
  UpdateEmployee,
  ViewAttendance,
  ViewLeave,
  UpdateLeave,
  AddAttendance,
  AddLeave
} from "./component";
// import { ViewEmploy } from "./component/admin/admin.menus/employee/ViewEmploy";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/admin" element={<AdminDashboard />}>
        <Route path="addemployee" element={<AddEmployee />} />
        <Route path="viewemployee" element={<ViewEmployee />} />
        <Route path="profile" element={<Profile />} />
        <Route path="viewuser" element={<ViewEmploy />}/>
        <Route path="updateuser" element={<UpdateEmployee />} />
        <Route path="viewattendance" element={<ViewAttendance />} />
        <Route path="viewleave" element={<ViewLeave /> } />
        <Route path="updateleave" element={<UpdateLeave />} />
        <Route path="addattendance" element={<AddAttendance />} />
        <Route path="leaverequest" element={<AddLeave/>} />

      </Route>
      <Route path="*" element={<Pagenotfound />} />
    </Routes>
  );
};

export default Routers;
