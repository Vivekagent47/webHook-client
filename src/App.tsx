import { RouterProvider } from "react-router-dom";

import { Toaster } from "@/components/ui/sonner";
import { router } from "@/router";
import { useEffect } from "react";

function App() {
  // check if user is logged in
  // if yes, fetch user data
  // if no, redirect to login page
  // if error, redirect to login page
  // if loading, show loading screen
  useEffect(() => {
    const accessToken = localStorage.getItem("access-token");
    if (!accessToken) {
      router.navigate("/login");
    }
  }, []);

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
      <Toaster richColors closeButton />
    </>
  );
}

export default App;
