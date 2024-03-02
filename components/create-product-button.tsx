import React from "react";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { PlusIcon } from "lucide-react";

export const CreateProductButton = () => {
  return (
    <div>
      <Link
        className={buttonVariants({ variant: "default" })}
        href="/dashboard/products/create-product"
      >
        <div className="space-x-2 flex items-center">
          <PlusIcon className="w-4 h-4" />
          <span>New</span>
        </div>
      </Link>
    </div>
  );
};
