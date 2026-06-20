import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./user_dashboard/Login";
import Register from "./user_dashboard/Register";
import UserLayout from "./user_dashboard/UserLayout";
import UserLocationSelect from "./user_dashboard/UserLocationSelect";
import UserBookings from "./user_dashboard/UserBookings";
import UserVehicleSelect from "./user_dashboard/UserVehicleSelect";
import UserTimeSelect from "./user_dashboard/UserTimeSelect";
import UserSlotSelect from "./user_dashboard/UserSlotSelect";
import UserCheckout from "./user_dashboard/UserCheckout";
import UserSuccess from "./user_dashboard/UserSuccess";
import AdminLogin from "./admin_dashboard/AdminLogin";
import AdminLayout from "./admin_dashboard/AdminLayout";
import AdminOverview from "./admin_dashboard/AdminOverview";
import AdminBookings from "./admin_dashboard/AdminBookings";
import AdminUsers from "./admin_dashboard/AdminUsers";
import AdminLocations from "./admin_dashboard/AdminLocations";
import AdminRevenue from "./admin_dashboard/AdminRevenue";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/dashboard" element={<UserLayout />}>
          <Route path="location" element={<UserLocationSelect />} />
          <Route path="bookings" element={<UserBookings />} />
          <Route path="vehicle" element={<UserVehicleSelect />} />
          <Route path="time" element={<UserTimeSelect />} />
          <Route path="slot" element={<UserSlotSelect />} />
          <Route path="checkout" element={<UserCheckout />} />
          <Route path="success" element={<UserSuccess />} />
        </Route>

        <Route path="/admin" element={<AdminLogin />} />
        
        {/* Admin Dashboard Pages Wrapped in Layout */}
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminOverview />} />
          <Route path="/admin/bookings" element={<AdminBookings />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/locations" element={<AdminLocations />} />
          <Route path="/admin/revenue" element={<AdminRevenue />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
