import Dashboard from "../pages/Dashboard/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import RaiseTicket from "../pages/RaiseTicket/RaiseTicket";
import MyTickets from "../pages/MyTickets/MyTickets";
import EditTicket from "../pages/EditTicket/EditTicket";
import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";
import ProtectedRoute from "../components/ProtectedRoute";
import AdminRoute from "../components/AdminRoute";
function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />
        <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/raise-ticket"
  element={
    <ProtectedRoute>
      <RaiseTicket />
    </ProtectedRoute>
  }
/>

<Route
  path="/my-tickets"
  element={
    <ProtectedRoute>
      <MyTickets />
    </ProtectedRoute>
  }
/>

<Route
  path="/edit-ticket/:id"
  element={
    <ProtectedRoute>
      <EditTicket />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin"
  element={
    <ProtectedRoute>
      <AdminDashboard />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin"
  element={
    <AdminRoute>
      <AdminDashboard />
    </AdminRoute>
  }
/>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;