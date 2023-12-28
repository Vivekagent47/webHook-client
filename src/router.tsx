import { createBrowserRouter } from "react-router-dom";

import Test from "@/pages/Test";
import Auth from "@/pages/auth";
import Login from "@/pages/auth/Login";
import SignUp from "@/pages/auth/SignUp";

export const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    element: <Test />,
  },
  {
    id: "login",
    path: "/login",
    element: (
      <Auth state="login">
        <Login />
      </Auth>
    ),
  },
  {
    id: "signup",
    path: "/signup",
    element: (
      <Auth state="signup">
        <SignUp />
      </Auth>
    ),
  },
]);