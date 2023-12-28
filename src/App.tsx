import { RouterProvider } from "react-router-dom";

import { router } from "@/router";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
      <Toaster richColors closeButton />
    </>
  );
}

export default App;
