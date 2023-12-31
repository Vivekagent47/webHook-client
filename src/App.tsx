import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Toaster } from "@/components/ui/sonner";
import { AuthContext } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import NavBar from "@/pages/Utils/NavBar";
import SideBar from "@/pages/Utils/SideBar";
import { Routing } from "@/router";

function App() {
  const navigate = useNavigate();
  const { isLogged } = useContext(AuthContext);
  const [openSidebar, setOpenSidebar] = useState(false);

  useEffect(() => {
    if (!isLogged) {
      navigate("/login");
    }
  }, [isLogged]);

  return (
    <>
      {isLogged && <NavBar setOpenSidebar={setOpenSidebar} />}
      {isLogged && (
        <SideBar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
      )}
      <div className={cn("flex-1", isLogged && "p-4 lg:ml-64")}>
        <Routing />
      </div>
      <Toaster richColors closeButton />
    </>
  );
}

export default App;
