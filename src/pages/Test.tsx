import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/AuthContext";

const Test = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Button
        variant="default"
        size="lg"
        onClick={() => {
          logout();
          navigate("/login");
        }}
      >
        Log Out
      </Button>
    </div>
  );
};

export default Test;
