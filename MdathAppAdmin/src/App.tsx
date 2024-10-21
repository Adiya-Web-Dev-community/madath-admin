import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./superAdmin/page/LoginPage";
import Layout from "./superAdmin/Layout/Layout";
import Admin from "./superAdmin/page/Admin";
import AdminForm from "./superAdmin/page/Admin/Form";
import VendorLayout from "./vendor/Layout/Layout";

import LoginUsers from "./superAdmin/page/User";

// import BookingComponent from "./superAdmin/page/BookingComponent";
import { useState } from "react";
import AuthenticatingRole from "./AuthenticatingRole/AuthemticatingRole";
import AuthenticatingPanelRole from "./AuthenticatingRole/AuthenticatingPanelRole";
import TV from "./superAdmin/page/Tv/Tv";
import Event from "./superAdmin/page/Event";
// import TV from "./superAdmin/page/Tv/Tv";

function App() {
  const [role, setRole] = useState(true);
  const [isRechecking, setIsRechecking] = useState(true);

  const userAuth = JSON.parse(localStorage.getItem("user-auth") || "{}")?.email;

  return (
    <>
      {!isRechecking && userAuth && location.pathname!=='/'&&(
        <AuthenticatingPanelRole
          setIsRechecking={setIsRechecking}
          setRole={setRole}
        />
      )}

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/role_checking"
            element={
              <AuthenticatingRole
                setIsRechecking={setIsRechecking}
                setRole={setRole}
              />
            }
          />

          {role
            ? isRechecking && (
              <Route path="Admin" element={<Layout />}>
                <Route path="Admin" element={<Admin />} />
                <Route
                  path="Admin/Form/:role/:status/:id"
                  element={<AdminForm />}
                />
                <Route path="Users" element={<LoginUsers />} />
                <Route path="Event" element={<Event />} />

              </Route>
            )
            : isRechecking && (
              <Route path="Admin" element={<VendorLayout />}>
                <Route path="Admin" element={<Admin />} />
              </Route>
              
            )}
                <Route path="/Admin_Tv/Tv" element={<TV />} />

        </Routes>
        
      </BrowserRouter>
    </>
  );
}

export default App;
