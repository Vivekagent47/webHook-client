import { SyntheticEvent, useContext, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthContext } from "@/context/AuthContext";

const SignUp = () => {
  const { setIsLoading, isLoading } = useContext(AuthContext);
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  async function onSubmit(event: SyntheticEvent) {
    try {
      event.preventDefault();
      setIsLoading(true);
    } catch (err) {
      // toast({
      //   title: "Error",
      //   description: err?.response?.data?.message,
      //   variant: "destructive",
      // });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="grid gap-4">
          <div className="flex gap-4">
            <div className="grid gap-1">
              <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                First Name
              </span>
              <Input
                value={registerData.firstName}
                placeholder="Vivek"
                type="text"
                name="firstName"
                autoCorrect="off"
                disabled={isLoading}
                onChange={(e) => {
                  setRegisterData((prv) => ({
                    ...prv,
                    firstName: e.target.value,
                  }));
                }}
              />
            </div>
            <div className="grid gap-1">
              <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Last Name
              </span>
              <Input
                value={registerData.lastName}
                placeholder="Chauahn"
                type="text"
                name="lastName"
                autoCorrect="off"
                disabled={isLoading}
                onChange={(e) => {
                  setRegisterData((prv) => ({
                    ...prv,
                    lastName: e.target.value,
                  }));
                }}
              />
            </div>
          </div>
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

export default SignUp;
