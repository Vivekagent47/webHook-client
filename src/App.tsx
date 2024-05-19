import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Toaster } from "@/components/ui/sonner";
import { AuthContext } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import NavBar from "@/pages/Utils/NavBar";
import SideBar from "@/pages/Utils/SideBar";
import { Routing } from "@/router";

function App() {
  const navigate = useNavigate();
  const { isLogged, pageNotFound } = useContext(AuthContext);

  useEffect(() => {
    if (!isLogged) {
      navigate("/login");
    }
  }, [isLogged]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-secondary">
      {isLogged && !pageNotFound && <SideBar />}
      <div className={cn("flex-1", isLogged && "flex flex-col sm:gap-4 pl-14")}>
        {isLogged && !pageNotFound && <NavBar />}
        <Routing />
      </div>
      <Toaster richColors closeButton duration={5000} />
    </div>
  );
}

export default App;
