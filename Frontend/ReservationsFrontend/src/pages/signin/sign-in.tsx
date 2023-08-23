import { Icons } from "@/assets/icons";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SignInForm } from "@/pages/signin/components/sign-in-form"
import { Link } from "react-router-dom";

export function SignIn() {
  return (
    <>
      <div className="container relative hidden h-screen flex-col items-center justify-center max-md:grid md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          to="/sign-up"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          Sign up
        </Link>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative h-full z-20 flex items-center justify-center text-lg font-medium">
            <Icons.logoWhite className="w-64 h-64" />
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Sign in
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email and password below to sign in
              </p>
            </div>
            <SignInForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              Terms of Service and Privacy Policy              .
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
