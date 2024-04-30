import { useContext } from "react";

import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/AuthContext";

const Test = () => {
  const { logout } = useContext(AuthContext);

  return (
    <div className="h-full flex flex-1 justify-center items-center gap-4">
      <Button
        variant="default"
        size="lg"
        onClick={() => {
          logout();
        }}
      >
        Log Out
      </Button>
    </div>
  );
};

export default Test;
