import Test from "@/pages/Test";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    element: <Test />,
  },
]);
