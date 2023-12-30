import { SyntheticEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthContext } from "@/context/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
  });

  async function onSubmit(event: SyntheticEvent) {
    try {
      event.preventDefault();
      setIsLoading(true);
      await login({
        email: registerData.email,
        password: registerData.password,
      });

      navigate("/");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err.message || "Unable to login", {
        description: err?.message,
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const accessToken = localStorage.getItem("access-token");
    if (accessToken) {
      navigate(-1);
    }
  }, []);

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="grid gap-4">
          <div className="grid gap-1">
            <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Email
            </span>
            <Input
              value={registerData.email}
              placeholder="name@example.com"
              type="email"
              name="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              onChange={(e) => {
                setRegisterData((prv) => ({ ...prv, email: e.target.value }));
              }}
            />
          </div>
          <div className="grid gap-1">
            <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Password
            </span>
            <Input
              value={registerData.password}
              placeholder="********"
              type="password"
              name="password"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              onChange={(e) => {
                setRegisterData((prv) => ({
                  ...prv,
                  password: e.target.value,
                }));
              }}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-4 w-4 animate-spin"
              >
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
            )}
            Create Account with Email
          </Button>
        </div>
      </form>
    </>
  );
};

export default Login;
