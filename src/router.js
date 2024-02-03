import { Routes, Route } from "react-router-dom";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import Home from "src/views/Home";
import Translation from "src/views/Translation";
import Test from "src/components/test";
import AdminLogin from "src/views/AdminLogin";
import Dashboard from "src/views/Admin/Dashboard";
import AllUsers from "src/views/Admin/AllUsers";
import AddUser from 'src/views/Admin/AddUser'
import { useEffect } from "react";
import AdminSidebar from "src/components/Admin/Sidebar";

const WebRoutes = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/ad-login" element={<AdminLogin />} />
      <Route exact path="/translation" element={<Translation />} />
      <Route exact path="/test" element={<Test />} />
    </Routes>
  );
};

const AdminRoutes = () => {
  const userData = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!userData.token) {
      navigate("/ad-login");
    }
  }, [userData]);
  return (
    <>
      <AdminSidebar />
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <Routes>
            <Route exact path="/admin/dashboard" element={<Dashboard />} />
            <Route exact path="/admin/allusers" element={<AllUsers />} />
            <Route exact path="/admin/adduser" element={<AddUser />} />

          </Routes>
        </div>
      </div>
    </>
  );
};
function AppRouter() {
  const location = useLocation();
  let currentPath = location.pathname;
  let isAdmin = currentPath.includes("admin");
  let isWebsite = !isAdmin;

  if (isAdmin) return <AdminRoutes />;
  if (isWebsite) return <WebRoutes />;
}

export default AppRouter;
