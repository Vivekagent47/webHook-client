import { Route, Routes } from "react-router-dom";

import Page404 from "@/pages/Page404";
import Test from "@/pages/Test";
import Auth from "@/pages/auth";
import Login from "@/pages/auth/Login";
import SignUp from "@/pages/auth/SignUp";

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
      <Route path="/" element={<Test />}></Route>
    </Routes>
  );
}
