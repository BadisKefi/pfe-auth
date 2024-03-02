"use client";
import { BeatLoader } from "react-spinners";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { newVerification } from "@/actions/new-verification";
import { FormSuccess } from "@/components/form-success";
import { FormError } from "@/components/form-error";
import { cn } from "@/lib/utils";

interface UserNewVerificationFormProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function UserNewVerficiationForm({
  className,
  ...props
}: UserNewVerificationFormProps) {
  const [success, setSuccess] = useState<string | undefined>("");
  const [counter, setCounter] = useState<number>(0);
  const [error, setError] = useState<string | undefined>("");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const onSubmit = useCallback(() => {
    if (!token) {
      setError("Missing token!");
      return;
    }
    newVerification(token)
      .then((data) => {
        setError(data.error);
        setSuccess(data.success);
      })
      .catch(() => {
        setError("Something went wrong!");
      });
  }, [token, counter]);
  useEffect(() => {
    setCounter((prev) => {
      return prev++;
    });
    if (counter <= 1) {
      onSubmit();
    }
  }, [onSubmit, counter]);

  return (
    <div className={cn("grid gap-2", className)} {...props}>
      <div className="flex items-center w-full justify-center">
        {!success && !error && <BeatLoader />}
        <FormSuccess message={success} />
        <FormError message={error} />
      </div>
    </div>
  );
}
