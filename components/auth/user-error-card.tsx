"use client";

import { cn } from "@/lib/utils";

import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
interface UserErrorCardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserErrorCard({ className, ...props }: UserErrorCardProps) {
  return (
    <div className={cn("grid gap-2", className)} {...props}>
      <div className="w-full flex justify-center items-center">
        <ExclamationTriangleIcon className="w-12 h-12 text-destructive" />
      </div>
    </div>
  );
}
