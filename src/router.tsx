import { Route, Routes } from "react-router-dom";

import Auth from "@/pages/Auth";
import Login from "@/pages/Auth/Login";
import SignUp from "@/pages/Auth/SignUp";
import Page404 from "@/pages/Page404";
import Test from "@/pages/Test";

export function Routing() {
  return (
    <Routes>
      <Route path="*" element={<Page404 />} />
      <Route
        path="/login"
        element={
          <Auth state="login">
            <Login />
          </Auth>
        }
      />
      <Route
        path="/signup"
        element={
          <Auth state="signup">
            <SignUp />
          </Auth>
        }
      />
      <Route path="/" element={<Test />} />
    </Routes>
  );
}
