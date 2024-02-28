import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { UserAuthForm } from "@/components/user-auth-form";
import { ModeToggle } from "@/components/mode-toggle";
import { Logo } from "@/components/Logo";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default function AuthenticationPage() {
  return (
    <>
      <div className="container relative h-full flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="absolute right-4 top-4 md:right-8 md:top-8 flex gap-2">
          <Link
            href="/examples/authentication"
            className={cn(buttonVariants({ variant: "ghost" }))}
          >
            Login
          </Link>
          <div>
            <ModeToggle />
          </div>
        </div>

        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          {/* Three ways to do the same thing , add background */}
          {/* I also added gradient in the third one to display the text better */}
          {/* <div className="absolute inset-0 bg-zinc-900" /> */}
          {/* <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url('/9.png')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          /> */}
          <div className="absolute inset-0">
            <Image
              src="/9.png"
              layout="fill"
              objectFit="cover"
              alt="Background Image"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
          </div>
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
            Packedin.tn Inc
          </div>
          {/* I need this only when background is zink black but currently it's an image */}
          {/* <div className="relative z-20 mt-auto flex justify-center items-center w-42 mb-2">
            <Image
              src={LogoPackedInDark}
              width={LogoPackedInDark.width}
              height={LogoPackedInDark.height}
              alt={"LogoPackedInDark"}
            />
          </div> */}
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
                Enter your email below to create your account
              </p>
            </div>
            <UserAuthForm />
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
