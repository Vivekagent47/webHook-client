"use client";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/stores/authStore";
import Link from "next/link";
import { SyntheticEvent } from "react";

export default function UserAuthForm() {
  const {
    registerData,
    setRegisterData,
    isLoading,
    setIsLoading,
    activePage,
    setActivePage,
  } = useAuthStore();

  async function onSubmit(event: SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);
    console.log(registerData);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  return (
    <>
      <div className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Button
          variant="ghost"
          onClick={() => {
            if (activePage === "login") {
              setActivePage("register");
            } else {
              setActivePage("login");
            }
          }}
          className={"absolute right-4 top-4 md:right-8 md:top-8"}
        >
          {activePage === "login" ? "Sign Up" : "Log In"}
        </Button>
        <div className="relative hidden h-screen flex-col bg-muted p-10 bg-zinc-900 text-white dark:border-r lg:flex">
          <div className="relative z-20 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            Web Play
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;This library has saved me countless hours of work and
                helped me deliver stunning designs to my clients faster than
                ever before.&rdquo;
              </p>
              <footer className="text-sm">Sofia Davis</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8 flex items-center justify-center h-screen">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                {activePage === "login"
                  ? "Sign in to your account"
                  : "Create an account"}
              </h1>
              {activePage === "register" && (
                <p className="text-sm text-muted-foreground">
                  Enter your email below to create your account
                </p>
              )}
            </div>
            <div className="grid gap-6">
              <form onSubmit={onSubmit}>
                <div className="grid gap-4">
                  {activePage === "register" && (
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
                            setRegisterData({ firstName: e.target.value });
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
                            setRegisterData({ lastName: e.target.value });
                          }}
                        />
                      </div>
                    </div>
                  )}
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
                        setRegisterData({ email: e.target.value });
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
                        setRegisterData({ password: e.target.value });
                      }}
                    />
                  </div>
                  <Button disabled={isLoading}>
                    {isLoading && (
                      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {`${
                      activePage === "login" ? "Sign In" : "Create Account"
                    } with Email`}
                  </Button>
                </div>
              </form>
            </div>
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
