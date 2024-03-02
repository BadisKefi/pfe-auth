import { Logo } from "@/components/Logo";
import { UserResetForm } from "@/components/user-reset-form";
import Link from "next/link";

export default function ResetPage() {
  return (
    <div className="pt-24 lg:p-8">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <div className="lg:hidden flex justify-center items-center w-42 mb-2">
            <Logo size="lg" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Forgot your password ?
          </h1>
          <p className="text-sm text-muted-foreground">
            you will recieve an email, to change your password
          </p>
        </div>
        <UserResetForm />
      </div>
    </div>
  );
}
