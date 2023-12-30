import { RouterProvider } from "react-router-dom";

import { Toaster } from "@/components/ui/sonner";
import { router } from "@/router";
import { useEffect } from "react";

function App() {
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
