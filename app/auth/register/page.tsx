import { Logo } from "@/components/Logo";
import { Social } from "@/components/auth/social";
import { UserRegisterForm } from "@/components/auth/user-register-form";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="pt-24 lg:p-8">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <div className="lg:hidden flex justify-center items-center w-42 mb-2">
            <Logo size="lg" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Create an account
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email and other informations to create your account, you
            will recieve a verification email to confirm your registration
          </p>
        </div>
        <UserRegisterForm />
        <Social />
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
  );
}
