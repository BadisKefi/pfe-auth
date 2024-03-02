import { Logo } from "@/components/Logo";
import { UserNewVerficiationForm } from "@/components/auth/user-new-verification-form";
import Link from "next/link";

export default function NewVerificationPage() {
  return (
    <div className="pt-24 lg:p-8">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <div className="lg:hidden flex justify-center items-center w-42 mb-2">
            <Logo size="lg" />
          </div>
        </div>
        <UserNewVerficiationForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          click{" "}
          <Link
            href="/auth/login"
            className="underline underline-offset-4 hover:text-primary"
          >
            here
          </Link>{" "}
          to go back to login.
        </p>
      </div>
    </div>
  );
}
